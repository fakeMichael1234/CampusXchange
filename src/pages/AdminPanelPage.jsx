import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  ShoppingBag, 
  Building, 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  Ban, 
  Search,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useStore, formatINR } from '../context/StoreContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { INDIAN_CAMPUSES, INITIAL_USERS } from '../data/mockData';

export const AdminPanelPage = ({ onNavigate }) => {
  const { products, deleteProduct, reports, resolveReport, showToast } = useStore();
  const [activeTab, setActiveTab] = useState('reports');
  const [campusesList, setCampusesList] = useState(INDIAN_CAMPUSES);
  const [newCampusInput, setNewCampusInput] = useState('');

  const totalVolume = products.reduce((acc, p) => acc + (p.price || 0), 0);

  const handleAddCampus = (e) => {
    e.preventDefault();
    if (newCampusInput.trim()) {
      setCampusesList(prev => [...prev, newCampusInput.trim()]);
      setNewCampusInput('');
      showToast("New campus network added.", "Campus Verified");
    }
  };

  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 font-sans flex flex-col justify-between selection:bg-cx-0 selection:text-cx-950">
      
      <Navbar currentPath="/admin" onNavigate={onNavigate} />

      <main className="py-8 flex-1">
        <Container size="xl" className="space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cx-800">
            <div>
              <div className="inline-flex items-center space-x-2 bg-cx-900 border border-cx-750 px-2.5 py-1 rounded text-[11px] font-mono text-cx-300 mb-2">
                <ShieldAlert className="w-3.5 h-3.5 text-cx-0" />
                <span>CAMPUS MODERATION CONSOLE</span>
              </div>
              <h1 className="text-3xl font-extrabold text-cx-0 tracking-tight uppercase">
                ADMINISTRATION PANEL
              </h1>
            </div>

            <button
              onClick={() => onNavigate('/marketplace')}
              className="text-xs font-mono text-cx-400 hover:text-cx-0 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Marketplace</span>
            </button>
          </div>

          {/* Admin Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-cx-900 border border-cx-800 rounded-cx-xl space-y-1">
              <span className="text-cx-500 uppercase text-[10px]">TOTAL VERIFIED USERS</span>
              <div className="text-2xl font-bold text-cx-0">{INITIAL_USERS.length + 120}</div>
              <div className="text-[10px] text-cx-400">Student members</div>
            </div>

            <div className="p-4 bg-cx-900 border border-cx-800 rounded-cx-xl space-y-1">
              <span className="text-cx-500 uppercase text-[10px]">ACTIVE LISTINGS</span>
              <div className="text-2xl font-bold text-cx-0">{products.length}</div>
              <div className="text-[10px] text-cx-400">Classified items</div>
            </div>

            <div className="p-4 bg-cx-900 border border-cx-800 rounded-cx-xl space-y-1">
              <span className="text-cx-500 uppercase text-[10px]">REPORTED LISTINGS</span>
              <div className="text-2xl font-bold text-cx-0">{reports.length}</div>
              <div className="text-[10px] text-cx-400">Pending review</div>
            </div>

            <div className="p-4 bg-cx-900 border border-cx-800 rounded-cx-xl space-y-1">
              <span className="text-cx-500 uppercase text-[10px]">TOTAL VOLUME (₹)</span>
              <div className="text-2xl font-bold text-cx-0">{formatINR(totalVolume)}</div>
              <div className="text-[10px] text-cx-400">Active marketplace value</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 border-b border-cx-800 font-mono text-xs pb-1">
            {[
              { id: 'reports', label: `Listing Reports (${reports.length})` },
              { id: 'listings', label: `Manage Listings (${products.length})` },
              { id: 'campuses', label: `Campuses (${campusesList.length})` },
              { id: 'users', label: `Users & Verification` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-t-cx-md font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cx-900 border-t border-x border-cx-750 text-cx-0'
                    : 'text-cx-400 hover:text-cx-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Listing Reports */}
          {activeTab === 'reports' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-cx-0 uppercase">FLAGGED LISTINGS FOR MODERATION</h3>
              {reports.length === 0 ? (
                <div className="p-8 text-center text-cx-500 bg-cx-900 rounded-cx-xl border border-cx-800">
                  No pending listing reports.
                </div>
              ) : (
                <div className="space-y-3">
                  {reports.map((rep) => (
                    <div key={rep.id} className="p-4 bg-cx-900 border border-cx-750 rounded-cx-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-cx-950 text-cx-0 px-2 py-0.5 rounded border border-cx-700 font-bold">{rep.reason}</span>
                          <span className="text-cx-400">Product: {rep.productTitle}</span>
                        </div>
                        <p className="text-cx-300 font-sans text-xs">{rep.details}</p>
                        <span className="text-[10px] text-cx-500">Reported by {rep.reportedBy} on {rep.date}</span>
                      </div>

                      <div className="flex space-x-2 shrink-0">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            deleteProduct(rep.productId);
                            resolveReport(rep.id, 'Removed Listing');
                          }}
                          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                        >
                          Delete Listing
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => resolveReport(rep.id, 'Dismissed')}
                          leftIcon={<Check className="w-3.5 h-3.5" />}
                          className="border border-cx-750"
                        >
                          Dismiss Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Manage Listings */}
          {activeTab === 'listings' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-cx-0 uppercase">ALL MARKETPLACE LISTINGS</h3>
              <div className="bg-cx-900 border border-cx-800 rounded-cx-xl overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-cx-950 border-b border-cx-800 text-cx-500 text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Title</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Seller</th>
                      <th className="p-3">Campus</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cx-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-cx-850">
                        <td className="p-3 text-cx-0 font-sans font-semibold">{p.title}</td>
                        <td className="p-3 text-cx-0 font-bold">{formatINR(p.price)}</td>
                        <td className="p-3 text-cx-400">{p.sellerName}</td>
                        <td className="p-3 text-cx-400 truncate max-w-[150px]">{p.campus}</td>
                        <td className="p-3">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-cx-400 hover:text-cx-0 transition-colors"
                            title="Remove Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Campuses */}
          {activeTab === 'campuses' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-cx-0 uppercase">VERIFIED CAMPUS NETWORKS</h3>
              
              <form onSubmit={handleAddCampus} className="flex space-x-2 max-w-md">
                <input
                  type="text"
                  placeholder="Add new campus name (e.g. BITS Pilani)"
                  value={newCampusInput}
                  onChange={(e) => setNewCampusInput(e.target.value)}
                  className="flex-1 bg-cx-900 border border-cx-700 text-cx-0 p-2 rounded text-xs focus:outline-none focus:border-cx-0"
                />
                <Button type="submit" variant="primary" size="sm">Add Campus</Button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {campusesList.map((c) => (
                  <div key={c} className="p-3 bg-cx-900 border border-cx-800 rounded-cx-lg flex items-center justify-between">
                    <span className="text-cx-0 font-bold">{c}</span>
                    <span className="text-[10px] text-cx-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-cx-0" />
                      <span>Verified Node</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Users */}
          {activeTab === 'users' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-cx-0 uppercase">REGISTERED STUDENT ACCOUNTS</h3>
              <div className="space-y-3">
                {INITIAL_USERS.map((u) => (
                  <div key={u.id} className="p-4 bg-cx-900 border border-cx-800 rounded-cx-xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-cx-0">{u.name}</h4>
                        <p className="text-[10px] text-cx-400">{u.email} — {u.college}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-cx-300 bg-cx-950 px-2 py-1 rounded border border-cx-750">
                        {u.itemsSold} Items Sold
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </Container>
      </main>

      <Footer onNavigate={onNavigate} />

    </div>
  );
};
