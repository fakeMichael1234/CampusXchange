import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USERS, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTIFICATIONS,
  INITIAL_OFFERS,
  INITIAL_REPORTS,
  INDIAN_CAMPUSES
} from '../data/mockData';

const StoreContext = createContext(null);

// ─── Helpers ────────────────────────────────────────────────────────────────
export const formatINR = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
};

// Simple deterministic hash (not for security — only for dev login comparison)
const simpleHash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h.toString(16);
};

// ─── Load / save helpers ────────────────────────────────────────────────────
const ls = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
};
const lsSet = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

// ─── Provider ───────────────────────────────────────────────────────────────
export const StoreProvider = ({ children }) => {

  // Account registry: array of { id, email, hash, profile }
  const [accounts, setAccounts] = useState(() => {
    const saved = ls('cx3_accounts', null);
    if (saved && Array.isArray(saved) && saved.length > 0) return saved;
    // Seed demo accounts
    return INITIAL_USERS.map(u => ({
      id: u.id,
      email: u.email.toLowerCase(),
      hash: simpleHash('password123'),
      profile: u,
    }));
  });

  // Logged-in user profile (null = not logged in)
  const [currentUser, setCurrentUser] = useState(() => ls('cx3_session', null));

  // Persist accounts
  useEffect(() => { lsSet('cx3_accounts', accounts); }, [accounts]);
  // Persist session
  useEffect(() => { lsSet('cx3_session', currentUser); }, [currentUser]);

  // ── Other global state ──────────────────────────────────────────
  const [selectedCampus, setSelectedCampus] = useState(() =>
    localStorage.getItem('cx3_selected_campus') || INDIAN_CAMPUSES[0]
  );
  const [products,      setProducts]      = useState(() => ls('cx3_products', INITIAL_PRODUCTS));
  const [wishlist,      setWishlist]      = useState(() => ls('cx3_wishlist', ['prod_1', 'prod_5']));
  const [orders,        setOrders]        = useState(() => ls('cx3_orders', INITIAL_ORDERS));
  const [offers,        setOffers]        = useState(() => ls('cx3_offers', INITIAL_OFFERS));
  const [messages,      setMessages]      = useState(() => ls('cx3_messages', INITIAL_MESSAGES));
  const [notifications, setNotifications] = useState(() => ls('cx3_notifications', INITIAL_NOTIFICATIONS));
  const [reports,       setReports]       = useState(() => ls('cx3_reports', INITIAL_REPORTS));
  const [searchQuery,   setSearchQuery]   = useState('');
  const [toast,         setToast]         = useState(null);

  useEffect(() => { localStorage.setItem('cx3_selected_campus', selectedCampus); }, [selectedCampus]);
  useEffect(() => { lsSet('cx3_products',       products);      }, [products]);
  useEffect(() => { lsSet('cx3_wishlist',        wishlist);      }, [wishlist]);
  useEffect(() => { lsSet('cx3_orders',          orders);        }, [orders]);
  useEffect(() => { lsSet('cx3_offers',          offers);        }, [offers]);
  useEffect(() => { lsSet('cx3_messages',        messages);      }, [messages]);
  useEffect(() => { lsSet('cx3_notifications',   notifications); }, [notifications]);
  useEffect(() => { lsSet('cx3_reports',         reports);       }, [reports]);

  // ── Toast ────────────────────────────────────────────────────────
  const showToast = (message, title = 'Notification') => {
    setToast({ id: Date.now(), title, message });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Auth ─────────────────────────────────────────────────────────

  /** Register new student. Returns { success, error? } */
  const signup = (userData) => {
    const emailLower = userData.email.toLowerCase().trim();
    const passTrim   = (userData.password || '').trim();

    // Duplicate check
    if (accounts.find(a => a.email === emailLower)) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }

    const newProfile = {
      id:           `usr_${Date.now()}`,
      name:         userData.name.trim(),
      email:        userData.email.trim(),
      mobile:       userData.mobile || '',
      college:      userData.college || INDIAN_CAMPUSES[0],
      campus:       userData.campus || userData.college || INDIAN_CAMPUSES[0],
      course:       userData.course || 'Undergraduate Student',
      department:   userData.department || '',
      year:         userData.year || '1st Year',
      verified:     true,
      rating:       5.0,
      reviewsCount: 0,
      avatar:       userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      joinedDate:   new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      itemsSold:    0,
      bio:          `Verified student at ${userData.college || INDIAN_CAMPUSES[0]}.`,
    };

    const newAccount = {
      id:      newProfile.id,
      email:   emailLower,
      hash:    simpleHash(passTrim),
      profile: newProfile,
    };

    const nextAccounts = [...accounts, newAccount];
    setAccounts(nextAccounts);
    lsSet('cx3_accounts', nextAccounts);

    setCurrentUser(newProfile);
    lsSet('cx3_session', newProfile);

    showToast(`Welcome to CampusXchange, ${newProfile.name}!`, 'Account Created');
    return { success: true };
  };

  /** Login with email + password. Returns { success, error? } */
  const login = (email, password) => {
    const emailLower = (email || '').toLowerCase().trim();
    const passTrim   = (password || '').trim();
    const account    = accounts.find(a => a.email === emailLower);

    if (!account) {
      return { success: false, error: 'No account found with this email. Please check your email or register.' };
    }
    if (account.hash !== simpleHash(passTrim)) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(account.profile);
    lsSet('cx3_session', account.profile);
    showToast(`Welcome back, ${account.profile.name}!`, 'Logged In');
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    lsSet('cx3_session', null);
    showToast('You have been logged out.', 'Session Ended');
  };

  const updateUserProfile = (updatedFields) => {
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    lsSet('cx3_session', updated);
    
    setAccounts(prev => {
      const next = prev.map(a =>
        (a.id && a.id === updated.id) || a.email === updated.email.toLowerCase()
          ? { ...a, email: updated.email.toLowerCase(), profile: updated }
          : a
      );
      lsSet('cx3_accounts', next);
      return next;
    });
    showToast('Profile updated.', 'Profile Saved');
  };

  // ── Products ─────────────────────────────────────────────────────
  const addProduct = (productData) => {
    const newProd = {
      id:             `prod_${Date.now()}`,
      ...productData,
      price:          Number(productData.price),
      sellerId:       currentUser?.id   || 'usr_guest',
      sellerName:     currentUser?.name || 'Student Member',
      sellerCollege:  currentUser?.college || selectedCampus,
      verifiedSeller: true,
      campus:         productData.campus || currentUser?.college || selectedCampus,
      views:          1,
      likes:          0,
      createdAt:      new Date().toISOString(),
      postedDate:     'Just now',
      status:         'active',
      featured:       false,
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`"${newProd.title}" published to campus marketplace.`, 'Listing Live');
    return newProd;
  };

  const updateProduct = (id, fields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...fields } : p));
    showToast('Listing updated.', 'Saved');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setWishlist(prev => prev.filter(w => w !== id));
    showToast('Listing removed.', 'Deleted');
  };

  const markProductSold = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'sold' } : p));
    showToast('Item marked as sold.', 'Updated');
  };

  // ── Wishlist ──────────────────────────────────────────────────────
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from saved list.', 'Wishlist');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Saved to wishlist.', 'Wishlist');
    }
  };
  const isInWishlist = (productId) => wishlist.includes(productId);

  // ── Orders ────────────────────────────────────────────────────────
  const createOrder = (product) => {
    const newOrder = {
      id:             `ord_${Date.now()}`,
      productId:      product.id,
      productTitle:   product.title,
      price:          product.price,
      sellerName:     product.sellerName,
      buyerName:      currentUser?.name || 'Student Member',
      campus:         product.campus,
      date:           new Date().toISOString().split('T')[0],
      status:         'Confirmed',
      transactionId:  `TXN-${Math.floor(100000 + Math.random() * 900000)}-CX`,
    };
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order confirmed. Seller notified for handover.`, 'Order Created');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order marked as ${newStatus}.`, 'Updated');
  };

  // ── Offers ────────────────────────────────────────────────────────
  const makeOffer = (product, offerPrice) => {
    const newOffer = {
      id:           `off_${Date.now()}`,
      productId:    product.id,
      productTitle: product.title,
      originalPrice: product.price,
      offerPrice:   Number(offerPrice),
      buyerId:      currentUser?.id || 'usr_guest',
      buyerName:    currentUser?.name || 'Student Member',
      buyerCollege: currentUser?.college || selectedCampus,
      sellerId:     product.sellerId,
      sellerName:   product.sellerName,
      status:       'Pending',
      createdAt:    new Date().toISOString(),
    };
    setOffers(prev => [newOffer, ...prev]);
    startChatWithSeller(
      { name: product.sellerName, college: product.campus, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80' },
      product.title,
      `Hello! I made an offer of ${formatINR(offerPrice)} for your listing "${product.title}".`
    );
    showToast(`Offer of ${formatINR(offerPrice)} submitted to ${product.sellerName}.`, 'Offer Sent');
    return newOffer;
  };

  const respondOffer = (offerId, status) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status } : o));
    showToast(`Offer ${status.toLowerCase()}.`, 'Offer Updated');
  };

  // ── Messages ──────────────────────────────────────────────────────
  const sendMessage = (threadId, text) => {
    const newMsg = { sender: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => prev.map(t =>
      t.id === threadId ? { ...t, lastMessage: text, timestamp: newMsg.time, chatHistory: [...t.chatHistory, newMsg] } : t
    ));
  };

  const startChatWithSeller = (seller, productTitle, initialText = null) => {
    const existing = messages.find(m => m.participant.name === seller.name && m.itemTitle === productTitle);
    if (existing) { if (initialText) sendMessage(existing.id, initialText); return existing.id; }
    const newId = `msg_thread_${Date.now()}`;
    const firstText = initialText || `Hi ${seller.name}, is "${productTitle}" still available on campus?`;
    setMessages(prev => [{
      id: newId,
      participant: { name: seller.name || 'Campus Student', college: seller.college || selectedCampus, avatar: seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', online: true },
      itemTitle: productTitle,
      lastMessage: firstText,
      timestamp: 'Just now',
      unread: false,
      chatHistory: [{ sender: 'me', text: firstText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
    }, ...prev]);
    showToast(`Chat started with ${seller.name}.`, 'Message Sent');
    return newId;
  };

  // ── Notifications ─────────────────────────────────────────────────
  const markNotificationRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllNotificationsRead = () => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); showToast('All cleared.', 'Notifications'); };

  // ── Reports ───────────────────────────────────────────────────────
  const reportListing = (productId, productTitle, reason, details) => {
    const newReport = { id: `rep_${Date.now()}`, productId, productTitle, reportedBy: currentUser?.name || 'Student', reason, details, date: new Date().toISOString().split('T')[0], status: 'Pending' };
    setReports(prev => [newReport, ...prev]);
    showToast('Report submitted to moderators.', 'Report Logged');
  };
  const resolveReport = (reportId, action) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: action } : r));
    showToast(`Report ${action.toLowerCase()}.`, 'Moderation');
  };

  // ── Context Value ─────────────────────────────────────────────────
  return (
    <StoreContext.Provider value={{
      // Auth
      currentUser, accounts, login, signup, logout, updateUserProfile,
      // Campus
      selectedCampus, setSelectedCampus,
      // Marketplace
      products, wishlist, orders, offers, messages, notifications, reports,
      searchQuery, setSearchQuery, toast, showToast,
      addProduct, updateProduct, deleteProduct, markProductSold,
      toggleWishlist, isInWishlist,
      createOrder, updateOrderStatus,
      makeOffer, respondOffer,
      sendMessage, startChatWithSeller,
      markNotificationRead, markAllNotificationsRead,
      reportListing, resolveReport,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
