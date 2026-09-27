import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  ArrowLeft, 
  Share2, 
  AlertTriangle,
  ShoppingBag,
  User,
  Star,
  CheckCircle2
} from 'lucide-react';
import { useStore, formatINR } from '../context/StoreContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { ProductCard } from '../components/marketplace/ProductCard';

export const ProductDetailPage = ({ productId, onNavigate }) => {
  const { 
    products, 
    isInWishlist, 
    toggleWishlist, 
    createOrder, 
    makeOffer, 
    startChatWithSeller, 
    reportListing, 
    showToast 
  } = useStore();

  const product = products.find(p => p.id === productId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerPriceInput, setOfferPriceInput] = useState(product ? Math.round(product.price * 0.9) : 1000);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Fraud');
  const [reportDetails, setReportDetails] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleStartChat = () => {
    startChatWithSeller(
      { name: product.sellerName, college: product.campus },
      product.title
    );
    onNavigate('/dashboard/messages');
  };

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (offerPriceInput && Number(offerPriceInput) > 0) {
      makeOffer(product, offerPriceInput);
      setIsOfferModalOpen(false);
    }
  };

  const handleSendReport = (e) => {
    e.preventDefault();
    reportListing(product.id, product.title, reportReason, reportDetails);
    setIsReportModalOpen(false);
  };

  const handleConfirmOrder = () => {
    setIsOrderModalOpen(false);
    createOrder(product);
    onNavigate('/dashboard/purchases');
  };

  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 font-sans flex flex-col justify-between selection:bg-cx-0 selection:text-cx-950">
      
      {/* Top Header */}
      <Navbar currentPath={`/product/${product.id}`} onNavigate={onNavigate} />

      <main className="py-8 flex-1">
        <Container size="xl" className="space-y-8">
          
          {/* Top Back & Share Navigation */}
          <div className="flex items-center justify-between pb-4 border-b border-cx-800">
            <button
              onClick={() => onNavigate('/marketplace')}
              className="inline-flex items-center space-x-2 text-xs font-mono text-cx-400 hover:text-cx-0 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO MARKETPLACE</span>
            </button>

            <div className="flex items-center space-x-3 font-mono text-xs">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast("Listing URL copied to clipboard.", "Link Copied");
                }}
                className="px-3 py-1.5 rounded-cx-md bg-cx-900 border border-cx-750 text-cx-300 hover:text-cx-0 text-xs flex items-center space-x-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-3 py-1.5 rounded-cx-md bg-cx-900 border border-cx-750 text-cx-400 hover:text-cx-0 text-xs flex items-center space-x-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Report</span>
              </button>
            </div>
          </div>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] w-full bg-cx-900 rounded-cx-2xl border border-cx-750 overflow-hidden shadow-cx-card-dark">
                <img
                  src={product.images ? (product.images[activeImageIndex] || product.images[0]) : 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-cx-950/90 text-cx-0 px-3 py-1 rounded text-xs font-mono border border-cx-700 font-medium flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cx-0" />
                    <span>{product.campus}</span>
                  </span>
                </div>
              </div>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center space-x-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 rounded-cx-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-cx-0 opacity-100' : 'border-cx-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Information & Actions Box */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="bg-cx-900 text-cx-300 px-2.5 py-1 rounded border border-cx-750">{product.condition}</span>
                  <span className="text-cx-500">{product.postedDate}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-cx-0 tracking-tight">
                  {product.title}
                </h1>

                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-cx-0">
                    {formatINR(product.price)}
                  </span>
                  <span className="text-xs font-mono text-cx-400">P2P HANDOVER</span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="p-5 bg-cx-900 border border-cx-750 rounded-cx-xl space-y-3 shadow-cx-card-dark">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                  onClick={handleStartChat}
                  className="font-mono uppercase text-xs font-bold"
                >
                  Chat with Seller
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setIsOfferModalOpen(true)}
                    className="font-mono text-xs"
                  >
                    Make Offer
                  </Button>

                  <Button
                    variant={isWishlisted ? "primary" : "outline"}
                    size="md"
                    leftIcon={<Heart className={`w-4 h-4 ${isWishlisted ? 'fill-cx-950' : ''}`} />}
                    onClick={() => toggleWishlist(product.id)}
                    className="font-mono text-xs"
                  >
                    {isWishlisted ? "Saved" : "Save Listing"}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                  onClick={() => setIsOrderModalOpen(true)}
                  className="text-cx-400 hover:text-cx-0 text-xs font-mono border border-cx-800"
                >
                  Buy Now / Commit Handover
                </Button>
              </div>

              {/* Handover Location Info */}
              <div className="p-4 bg-cx-950 border border-cx-800 rounded-cx-lg space-y-2 text-xs font-mono">
                <div className="flex items-center space-x-2 text-cx-0 font-semibold">
                  <MapPin className="w-4 h-4 text-cx-0" />
                  <span>CAMPUS HANDOVER SPOT</span>
                </div>
                <p className="text-cx-300 pl-6 font-sans">{product.pickupLocation || 'Central Library Lobby / Campus Food Court'}</p>
              </div>

              {/* Seller Profile Card */}
              <Card variant="technical">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-cx-500 uppercase">
                    <span>SELLER CREDENTIALS</span>
                    <span className="text-cx-0 font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-cx-0" />
                      <span>VERIFIED STUDENT</span>
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                      alt={product.sellerName}
                      className="w-12 h-12 rounded-full border border-cx-700 object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-cx-0">{product.sellerName}</h4>
                      <p className="text-xs text-cx-400 font-mono">{product.sellerCollege || product.campus}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs font-mono text-cx-400 border-t border-cx-800">
                    <span className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-cx-0 fill-cx-0" />
                      <span>4.9 (24 Reviews)</span>
                    </span>
                    <span>18 Items Sold</span>
                  </div>
                </CardContent>
              </Card>

              {/* Item Description */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-cx-400 font-semibold">
                  ITEM DESCRIPTION
                </h3>
                <div className="text-xs text-cx-300 leading-relaxed font-normal bg-cx-900/60 p-4 rounded-cx-lg border border-cx-800">
                  {product.description}
                </div>
              </div>

            </div>

          </div>

          {/* Related Listings */}
          {relatedProducts.length > 0 && (
            <div className="pt-12 border-t border-cx-800 space-y-6">
              <h2 className="text-xl font-bold text-cx-0 uppercase tracking-tight font-mono">
                MORE ITEMS IN {product.category.toUpperCase()}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} onNavigate={onNavigate} onContact={() => onNavigate(`/product/${p.id}`)} />
                ))}
              </div>
            </div>
          )}

        </Container>
      </main>

      {/* Make Offer Modal */}
      <Modal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        title="Make an Offer to Seller"
        subtitle={`Listing: ${product.title} (Listed at ${formatINR(product.price)})`}
      >
        <form onSubmit={handleSendOffer} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-cx-400 mb-1">YOUR OFFER PRICE (₹)</label>
            <input
              type="number"
              value={offerPriceInput}
              onChange={(e) => setOfferPriceInput(e.target.value)}
              className="w-full bg-cx-950 border border-cx-700 text-cx-0 p-2.5 rounded-cx-md text-sm focus:outline-none focus:border-cx-0"
              required
            />
          </div>
          <p className="text-cx-500 font-sans text-xs">
            The seller will receive your offer notification in their messages tab and can Accept, Reject, or Counter.
          </p>
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsOfferModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Submit Offer</Button>
          </div>
        </form>
      </Modal>

      {/* Report Listing Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Report Listing to Campus Admin"
        subtitle={product.title}
      >
        <form onSubmit={handleSendReport} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-cx-400 mb-1">REASON FOR REPORT</label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full bg-cx-950 border border-cx-700 text-cx-0 p-2 rounded-cx-md text-xs"
            >
              <option value="Fraud">Fraud or Scam</option>
              <option value="Wrong information">Wrong or Misleading Information</option>
              <option value="Prohibited item">Prohibited / Illegal Item</option>
              <option value="Duplicate listing">Duplicate Listing</option>
              <option value="Harassment">Harassment / Abusive Seller</option>
              <option value="Other">Other Reason</option>
            </select>
          </div>
          <div>
            <label className="block text-cx-400 mb-1">DETAILS / EXPLANATION</label>
            <textarea
              rows={3}
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              placeholder="Explain the issue for campus moderators..."
              className="w-full bg-cx-950 border border-cx-700 text-cx-0 p-2 rounded-cx-md text-xs focus:outline-none focus:border-cx-0"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsReportModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Submit Report</Button>
          </div>
        </form>
      </Modal>

      {/* Purchase Confirmation Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title="Confirm Campus Purchase Order"
        subtitle={product.title}
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-cx-950 rounded-cx-md border border-cx-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-cx-400">PRICE:</span>
              <span className="text-cx-0 font-bold">{formatINR(product.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cx-400">CAMPUS:</span>
              <span className="text-cx-0">{product.campus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cx-400">HANDOVER SPOT:</span>
              <span className="text-cx-0">{product.pickupLocation || 'Central Library'}</span>
            </div>
          </div>
          <p className="text-xs text-cx-400 font-sans">
            By confirming, you commit to meeting the seller on campus for in-person inspection and transaction.
          </p>
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsOrderModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleConfirmOrder}>Confirm Order</Button>
          </div>
        </div>
      </Modal>

      <Footer onNavigate={onNavigate} />

      {/* Mobile Navigation */}
      <MobileBottomNav currentPath={`/product/${product.id}`} onNavigate={onNavigate} />

    </div>
  );
};
