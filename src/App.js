import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Minus, 
  Plus, 
  Trash2, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram,
  Facebook,
  Twitter,
  Send,
  Navigation,
  Percent,
  ArrowLeft,
  Heart,
  MessageCircle,
  ExternalLink,
  Grid,
  User,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  Calendar,
  Filter,
  Sun,
  Moon
} from 'lucide-react';
import { SHOP_LOCATION, INSTAGRAM_URL, GOOGLE_FORM_URL } from './bakery_config';
import { PRODUCTS, PORTFOLIO_POSTS } from './bakery_data';

// --- DEPLOYMENT CONFIGURATION ---
// Set this to "cloud" when deploying to GitHub Pages with separate config files.
// Set this to "preview" to run in this standalone Canvas environment.
const deployment_type = "preview"; 

// --- API CONFIGURATION ---
//const BACKEND_API_URL = "http://localhost:3001/api"; // Base API URL
const BACKEND_API_URL = "https://bakery-backend-vercel-nnw2eaf0w.vercel.app/api"
// --- CONFIGURATION & DATA SETUP ---

// [CLOUD SETUP] 
// Uncomment the lines below when deployment_type is "cloud"
/*
import './bakery_styles.css';
import { SHOP_LOCATION, INSTAGRAM_URL, GOOGLE_FORM_URL } from './bakery_config';
import { PRODUCTS, PORTFOLIO_POSTS } from './bakery_data';
*/

// [PREVIEW SETUP]
// These definitions are used when deployment_type is "preview".
// If switching to "cloud", you can either comment these out or let the imports override them if your bundler supports it.

// -- Inline Styles for Preview (Simulating bakery_styles.css) --
const PREVIEW_STYLES = deployment_type === "preview" ? `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;800&family=Inter:wght@300;400;600;800&display=swap');
  :root { --font-sans: 'Inter', sans-serif; --font-serif: 'Playfair Display', serif; --color-primary: #ea580c; }
  .font-serif { font-family: var(--font-serif); }
  .font-sans { font-family: var(--font-sans); }
  .animate-in { animation-duration: 0.6s; animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); animation-fill-mode: both; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation-name: fadeIn; }
  @keyframes zoomIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
  .zoom-in, .zoom-in-95 { animation-name: zoomIn; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .7; } }
  .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  .backdrop-blur-md { -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); }
` : "";

// -- Inline Data for Preview --

// const SHOP_LOCATION = {
//   lat: 12.9961, // Whitefield/Kadugodi area (approx for 560067)
//   lng: 77.7127,
//   pincode: "560067",
//   name: "Crumbs A Microbakery"
// };

// const INSTAGRAM_URL = "https://www.instagram.com/crumbs.a.microbakery/";

// // REPLACE THIS WITH YOUR ACTUAL GOOGLE FORM EMBED URL
// const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder_id/viewform?embedded=true"; 

// const PRODUCTS = [
//   {
//     id: 1,
//     name: "Sourdough Supreme",
//     price: 250,
//     category: "Breads",
//     image: "https://images.unsplash.com/photo-1585476263060-b7324cc81f00?auto=format&fit=crop&q=80&w=800",
//     description: "Fermented for 48 hours, crusty outside, airy inside.",
//     isDeal: false
//   },
//   {
//     id: 2,
//     name: "Belgian Chocolate Croissant",
//     price: 180,
//     discountPrice: 150,
//     category: "Pastries",
//     image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&q=80&w=800",
//     description: "Buttery layers filled with 70% dark belgian chocolate.",
//     isDeal: true
//   },
//   {
//     id: 3,
//     name: "Berry Bliss Tart",
//     price: 220,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=800",
//     description: "Fresh seasonal berries on a vanilla bean custard.",
//     isDeal: false
//   },
//   {
//     id: 4,
//     name: "Garlic Cream Cheese Bagel",
//     price: 120,
//     discountPrice: 99,
//     category: "Breads",
//     image: "https://images.unsplash.com/photo-1621253457002-30cb1943899f?auto=format&fit=crop&q=80&w=800",
//     description: "Topped with sesame, poppy seeds, garlic, and onion.",
//     isDeal: true
//   },
//   {
//     id: 5,
//     name: "Lavender Macarons (Pack of 6)",
//     price: 450,
//     category: "Pastries",
//     image: "https://images.unsplash.com/photo-1569864358637-2d1d544bc1a8?auto=format&fit=crop&q=80&w=800",
//     description: "Delicate French macarons with floral notes.",
//     isDeal: false
//   },
//   {
//     id: 6,
//     name: "Classic Baguette",
//     price: 80,
//     category: "Breads",
//     image: "https://images.unsplash.com/photo-1595586143283-9fef27856d60?auto=format&fit=crop&q=80&w=800",
//     description: "Classic French style, perfect for sandwiches.",
//     isDeal: false
//   },
//   {
//     id: 7,
//     name: "Red Velvet Cupcake",
//     price: 90,
//     discountPrice: 75,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1614707267469-951e84d47b4c?auto=format&fit=crop&q=80&w=800",
//     description: "Moist red velvet cake with cream cheese frosting.",
//     isDeal: true
//   }
// ];

// const PORTFOLIO_POSTS = [
//   { id: 1, likes: 124, comments: 12, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" },
//   { id: 2, likes: 89, comments: 8, image: "https://images.unsplash.com/photo-1483695028939-5bb13f86d8b0?auto=format&fit=crop&q=80&w=600" },
//   { id: 3, likes: 256, comments: 34, image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=600" },
//   { id: 4, likes: 145, comments: 15, image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=600" },
//   { id: 5, likes: 98, comments: 5, image: "https://images.unsplash.com/photo-1506368083636-6defb67639a7?auto=format&fit=crop&q=80&w=600" },
//   { id: 6, likes: 312, comments: 42, image: "https://images.unsplash.com/photo-1579306094655-412429e4b935?auto=format&fit=crop&q=600" },
// ];

// --- Helper Functions ---

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const calculateDeliveryFee = (distance) => {
  if (distance <= 2) return 0;
  if (distance <= 5) return 40;
  if (distance <= 10) return 80;
  return 80 + Math.ceil(distance - 10) * 10; // Base ₹80 + ₹10 per extra km
};

// --- Components ---

const Header = ({ cartCount, onViewChange, currentView, locationData, setIsLocationModalOpen, isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${isDarkMode ? 'bg-stone-950/80 border-stone-800' : 'bg-white/80 border-white/20'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          
          <div className="flex items-center cursor-pointer group" onClick={() => onViewChange('home')}>
            <span className={`text-3xl font-extrabold tracking-tight transition-colors ${isDarkMode ? 'text-stone-100 hover:text-orange-500' : 'text-orange-900 group-hover:text-orange-600'}`}>Crumbs<span className="text-orange-500">.</span></span>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center space-x-1 p-1.5 rounded-full border shadow-sm ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'}`}>
            {['home', 'products', 'portfolio', 'about', 'admin'].map((item) => (
              <button 
                key={item}
                onClick={() => onViewChange(item)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  currentView === item 
                    ? (isDarkMode ? 'bg-stone-800 text-orange-500 shadow-md transform scale-105' : 'bg-white text-orange-600 shadow-md transform scale-105') 
                    : (isDarkMode ? 'text-stone-400 hover:text-orange-400 hover:bg-stone-800' : 'text-stone-500 hover:text-orange-600 hover:bg-white/50')
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all shadow-sm hover:shadow border ${isDarkMode ? 'bg-stone-900 text-stone-100 border-stone-800 hover:bg-stone-800' : 'bg-white text-stone-700 border-stone-200 hover:bg-orange-50'}`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-full transition-all shadow-sm hover:shadow border group ${isDarkMode ? 'bg-stone-900 text-stone-100 border-stone-800 hover:bg-stone-800' : 'bg-white text-stone-700 border-stone-200 hover:bg-orange-50'}`}
            >
              <MapPin size={18} className="text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="truncate max-w-[120px] text-sm font-semibold">{locationData.address || "Set Location"}</span>
            </button>

            <button 
              onClick={() => onViewChange('cart')}
              className="relative p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
             <button 
              onClick={() => onViewChange('cart')}
              className={`relative p-2 ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isDarkMode ? 'text-stone-100 hover:text-orange-500' : 'text-stone-800 hover:text-orange-600'}`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden border-t absolute w-full shadow-xl rounded-b-3xl ${isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-white border-stone-100'}`}>
          <div className="px-6 py-6 space-y-2">
            {['home', 'products', 'portfolio', 'about', 'admin'].map((item) => (
              <button 
                key={item}
                onClick={() => { onViewChange(item); setIsMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 font-bold rounded-2xl transition-colors ${isDarkMode ? 'text-stone-300 hover:bg-stone-900 hover:text-orange-500' : 'text-stone-700 hover:bg-orange-50 hover:text-orange-600'}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <div className="flex gap-4 pt-4 border-t border-stone-800/20">
              <button 
                onClick={toggleTheme} 
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-2xl ${isDarkMode ? 'bg-stone-900 text-stone-100' : 'bg-stone-100 text-stone-700'}`}
              >
                {isDarkMode ? <Sun size={18}/> : <Moon size={18}/>} Theme
              </button>
              <button onClick={() => { setIsLocationModalOpen(true); setIsMenuOpen(false); }} className={`flex-2 flex-grow block text-left px-4 py-3 font-bold rounded-2xl flex items-center ${isDarkMode ? 'text-stone-300 hover:bg-stone-900' : 'text-stone-700 hover:bg-orange-50'}`}>
                <MapPin size={18} className="mr-3 text-orange-500"/> {locationData.address || "Set Location"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const LocationModal = ({ isOpen, onClose, onSetLocation }) => {
  const [manualZip, setManualZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleGeoLocation = () => {
    setLoading(true);
    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onSetLocation({
          type: 'geo',
          lat: latitude,
          lng: longitude,
          address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
          pincode: null
        });
        setLoading(false);
        onClose();
      },
      () => {
        setError("Unable to retrieve location.");
        setLoading(false);
      }
    );
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualZip.length < 6) {
      setError("Please enter a valid 6-digit Pincode");
      return;
    }
    const mockLat = SHOP_LOCATION.lat + (Math.random() * 0.05 - 0.025); 
    const mockLng = SHOP_LOCATION.lng + (Math.random() * 0.05 - 0.025);

    onSetLocation({
      type: 'manual',
      lat: mockLat,
      lng: mockLng,
      address: `Pincode: ${manualZip}`,
      pincode: manualZip
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-extrabold text-stone-900">Where are we delivering?</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X size={24} className="text-stone-400" /></button>
        </div>
        <div className="space-y-6">
          <button onClick={handleGeoLocation} disabled={loading} className="w-full flex items-center justify-center space-x-3 bg-orange-600 hover:bg-orange-700 text-white p-5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-orange-200 active:scale-95">
            {loading ? <span>Locating...</span> : <><Navigation size={20} /><span>Use My Current Location</span></>}
          </button>
          <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-stone-200" /></div><div className="relative flex justify-center text-xs uppercase font-bold tracking-widest"><span className="bg-white px-4 text-stone-400">Or enter pincode</span></div></div>
          <form onSubmit={handleManualSubmit}>
            <div className="space-y-4">
              <div>
                <input type="text" value={manualZip} onChange={(e) => setManualZip(e.target.value)} placeholder="e.g. 560067" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none font-medium transition-all" />
              </div>
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              <button type="submit" className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold p-4 rounded-2xl transition-colors">Set Location</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ isDarkMode }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('pending');
  const [dateRange, setDateRange] = useState('all');
  const [actionOrder, setActionOrder] = useState(null); // Order being accepted/rejected
  const [actionMessage, setActionMessage] = useState('');
  const [actionType, setActionType] = useState(null); // 'accepted' or 'rejected'

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = `${BACKEND_API_URL}/orders?status=${filterStatus}`;
      
      if (dateRange === '7days') query += `&relativeDays=7`;
      else if (dateRange === '30days') query += `&relativeDays=30`;
      
      // Note: In a real app you might handle specific date ranges here
      
      const res = await fetch(query);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, dateRange]);

  const handleStatusChange = async () => {
    if (!actionOrder || !actionType) return;

    try {
      const res = await fetch(`${BACKEND_API_URL}/orders/${actionOrder.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: actionType,
          message: actionMessage
        })
      });
      
      if (res.ok) {
        // Refresh orders
        fetchOrders();
        setActionOrder(null);
        setActionMessage('');
        setActionType(null);
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <h1 className={`text-4xl font-extrabold font-serif ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Order Dashboard</h1>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`appearance-none border py-3 px-5 pr-10 rounded-2xl font-bold focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm ${isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-700'}`}
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="all">All Orders</option>
            </select>
            <Filter className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`} size={18} />
          </div>

          <div className="relative">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className={`appearance-none border py-3 px-5 pr-10 rounded-2xl font-bold focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm ${isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-700'}`}
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
            <Calendar className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`} size={18} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-stone-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className={`text-center py-20 rounded-[2.5rem] border ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-100'}`}>
          <div className={`p-4 rounded-full inline-block mb-4 shadow-sm ${isDarkMode ? 'bg-stone-800' : 'bg-white'}`}><FileText size={40} className="text-stone-300" /></div>
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>No orders found</h3>
          <p className="text-stone-500">Adjust filters to see results.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map(order => (
            <div key={order.id} className={`p-6 md:p-8 rounded-[2rem] shadow-sm border hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-6 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-sm text-stone-400">#{order.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-medium text-stone-500">{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{order.customer_name}</h3>
                <p className="text-stone-500 text-sm mb-4">{order.delivery_address}</p>
                
                {order.items && (
                  <div className={`p-4 rounded-2xl mb-4 text-sm space-y-1 ${isDarkMode ? 'bg-stone-800 text-stone-300' : 'bg-stone-50 text-stone-700'}`}>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-bold">₹{item.total}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2 text-stone-500 text-xs">
                  {order.order_notes && <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-lg">Note: {order.order_notes}</span>}
                </div>
              </div>

              <div className="flex flex-col items-end justify-between min-w-[150px]">
                <div className="text-right">
                  <span className="block text-xs text-stone-400 font-bold uppercase">Total</span>
                  <span className={`text-2xl font-black ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>₹{order.total_amount}</span>
                </div>

                {order.status === 'pending' && (
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <button 
                      onClick={() => { setActionOrder(order); setActionType('rejected'); }}
                      className={`p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-stone-800 hover:bg-red-900 text-stone-400 hover:text-red-400' : 'bg-stone-100 hover:bg-red-100 text-stone-400 hover:text-red-600'}`}
                      title="Reject"
                    >
                      <XCircle size={24} />
                    </button>
                    <button 
                      onClick={() => { setActionOrder(order); setActionType('accepted'); }}
                      className={`p-3 text-white rounded-xl transition-colors shadow-lg ${isDarkMode ? 'bg-stone-800 hover:bg-green-600' : 'bg-stone-900 hover:bg-green-600 hover:shadow-green-200'}`}
                      title="Accept"
                    >
                      <CheckCircle size={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Modal */}
      {actionOrder && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              {actionType === 'accepted' ? 'Accept Order' : 'Reject Order'}
            </h3>
            <p className="text-stone-600 mb-6">
              You are about to {actionType} order #{actionOrder.id} from {actionOrder.customer_name}.
            </p>
            
            <textarea 
              value={actionMessage}
              onChange={(e) => setActionMessage(e.target.value)}
              placeholder="Optional message to customer..."
              className="w-full p-4 bg-stone-50 border rounded-2xl mb-6 focus:ring-2 focus:ring-orange-500 outline-none resize-none h-32 ${isDarkMode ? 'bg-stone-800 border-stone-700 text-stone-100 focus:bg-stone-900' : 'bg-white border-stone-200 text-stone-700 focus:bg-white'}"
            />

            <div className="flex gap-4">
              <button 
                onClick={() => { setActionOrder(null); setActionMessage(''); setActionType(null); }}
                className="flex-1 py-4 font-bold text-stone-500 hover:bg-stone-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleStatusChange}
                className={`flex-1 py-4 font-bold text-white rounded-xl shadow-lg transition-transform active:scale-95 ${
                  actionType === 'accepted' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm {actionType === 'accepted' ? 'Accept' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, cart, addToCart, updateQuantity, removeFromCart, isDarkMode }) => {
  const displayPrice = product.isDeal ? product.discountPrice : product.price;
  
  // Find if item is in cart
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Image Source Logic
  const imgSrc = (product.image && product.image.startsWith('/')) ? `${process.env.PUBLIC_URL}${product.image}` : product.image;

  return (
    <div className={`group rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 border flex flex-col h-full relative ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
      <div className={`relative h-72 overflow-hidden ${isDarkMode ? 'bg-stone-950' : 'bg-stone-100'}`}>
        {product.isDeal && (
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-orange-600 text-xs font-black px-4 py-1.5 rounded-full shadow-sm">HOT DEAL</div>
        )}
        <img src={imgSrc} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className={`text-xs font-bold text-orange-600 uppercase tracking-widest px-3 py-1 rounded-full ${isDarkMode ? 'bg-stone-800' : 'bg-orange-50'}`}>{product.category}</div>
          <div className="flex flex-col items-end">
             {product.isDeal && <span className="text-sm text-stone-400 line-through font-medium">₹{product.price}</span>}
             <span className={`text-xl font-extrabold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>₹{displayPrice}</span>
          </div>
        </div>
        <h3 className={`text-2xl font-bold mb-3 leading-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{product.name}</h3>
        <p className={`text-sm mb-6 line-clamp-2 flex-grow leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>{product.description}</p>
        {quantity > 0 ? (
          <div className={`mt-auto rounded-full p-1.5 flex items-center justify-between animate-in zoom-in duration-200 shadow-xl ${isDarkMode ? 'bg-stone-800' : 'bg-stone-900'}`}>
             <button onClick={() => quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, -1)} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isDarkMode ? 'bg-stone-900 text-white hover:bg-stone-700' : 'bg-stone-800 text-white hover:bg-stone-700'}`}>{quantity === 1 ? <Trash2 size={16} className="text-red-400"/> : <Minus size={16}/>}</button>
             <span className="font-bold text-white text-lg w-8 text-center">{quantity}</span>
             <button onClick={() => updateQuantity(product.id, 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-stone-900 hover:bg-orange-500 hover:text-white transition-colors"><Plus size={16}/></button>
          </div>
        ) : (
          <button onClick={() => addToCart(product)} className={`w-full flex items-center justify-center gap-2 py-4 rounded-full transition-all font-bold mt-auto group-hover:shadow-lg group-hover:scale-[1.02] ${isDarkMode ? 'bg-stone-800 text-stone-100 hover:bg-orange-600 hover:text-white' : 'bg-stone-100 hover:bg-orange-600 text-stone-900 hover:text-white'}`}><Plus size={18} /> Add to Cart</button>
        )}
      </div>
    </div>
  );
};

const DealsSection = ({ cart, addToCart, updateQuantity, removeFromCart, isDarkMode }) => {
  const deals = PRODUCTS.filter(p => p.isDeal);
  if (deals.length === 0) return null;

  return (
    <div className={`py-24 ${isDarkMode ? 'bg-stone-900/50' : 'bg-orange-50/50'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
           <div><span className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-2 block">Limited Time Offers</span><h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Fresh Drops & Deals</h2></div>
           <button className={`hidden md:flex items-center gap-2 font-bold hover:text-orange-600 transition-colors ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>View All Offers <ArrowLeft className="rotate-180" size={20} /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{deals.map(product => <ProductCard key={product.id} product={product} cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} isDarkMode={isDarkMode} />)}</div>
      </div>
    </div>
  );
};

const Products = ({ cart, addToCart, updateQuantity, removeFromCart, isDarkMode }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filteredProducts = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  return (
    <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16"><span className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-3 block">Our Menu</span><h2 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Baked Fresh Daily.</h2><p className={`max-w-2xl mx-auto text-lg leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Artisanal sourdough, delicate pastries, and wholesome treats crafted with patience and premium ingredients.</p></div>
      <div className="flex flex-wrap justify-center gap-3 mb-16">{categories.map(cat => <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${filter === cat ? 'bg-orange-600 text-white shadow-xl scale-105' : (isDarkMode ? 'bg-stone-900 text-stone-400 hover:bg-stone-800 border border-stone-800' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200')}`}>{cat}</button>)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">{filteredProducts.map(product => <ProductCard key={product.id} product={product} cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} isDarkMode={isDarkMode} />)}</div>
    </div>
  );
};

const Portfolio = ({ isDarkMode }) => {
  return (
    <div className={`py-24 animate-in fade-in duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className={`flex flex-col md:flex-row items-center gap-10 mb-16 p-8 rounded-[2.5rem] ${isDarkMode ? 'bg-stone-900' : 'bg-stone-50'}`}>
           <div className="relative">
             <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-500"><div className="w-full h-full bg-white rounded-full p-1"><img src={`${process.env.PUBLIC_URL}/products/insta_profile.jpg?auto=format&fit=crop&q=80&w=300`} alt="Crumbs A Microbakery" className="w-full h-full object-cover rounded-full" /></div></div>
             <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
           </div>
           <div className="flex-1 text-center md:text-left">
             <div className="flex flex-col md:flex-row items-center gap-4 mb-4"><h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>crumbs.a.microbakery</h2><div className="flex gap-3"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-orange-200 flex items-center gap-2"><Instagram size={18} /> Follow</a><button className={`border px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${isDarkMode ? 'bg-stone-800 text-stone-100 border-stone-700 hover:bg-stone-700' : 'bg-white text-stone-900 border-stone-200 hover:bg-stone-50'}`}>Message</button></div></div>
             <div className={`flex justify-center md:justify-start gap-8 mb-6 font-medium ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}><div><span className={`font-bold text-lg ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>142</span> posts</div><div><span className={`font-bold text-lg ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>2.4k</span> followers</div><div><span className={`font-bold text-lg ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>350</span> following</div></div>
             <div className={`leading-relaxed ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}><p className="font-bold text-lg mb-1">Crumbs A Microbakery 🥖</p><p>Artisan Sourdough & Pastries | Bangalore</p><p className="text-stone-500 mt-2">DM to order or check website 👇</p></div>
           </div>
        </div>
        <div className="flex items-center gap-2 mb-8 text-xs font-black text-stone-400 uppercase tracking-widest"><Grid size={16} /> Latest Posts</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">{PORTFOLIO_POSTS.map(post => {const imgSrc = (post.image && post.image.startsWith('/')) ? `${process.env.PUBLIC_URL}${post.image}` : post.image; return (<div key={post.id} className={`group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${isDarkMode ? 'bg-stone-900' : 'bg-stone-100'}`}><img src={imgSrc} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 text-white font-bold backdrop-blur-sm"><div className="flex items-center gap-2 text-lg"><Heart size={24} fill="white" className="text-red-500" /> {post.likes}</div><div className="flex items-center gap-2 text-lg"><MessageCircle size={24} fill="white" /> {post.comments}</div></div></div>)})}</div>
        <div className="mt-16 text-center"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-3 font-extrabold text-lg transition-colors group ${isDarkMode ? 'text-stone-100 hover:text-orange-500' : 'text-stone-900 hover:text-orange-600'}`}>View full feed on Instagram <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={24} /></a></div>
      </div>
    </div>
  );
};

const AboutUs = ({ isDarkMode }) => {
  return (
    <div className={`py-24 animate-in fade-in duration-500 ${isDarkMode ? 'bg-stone-900' : 'bg-stone-50'}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="w-full lg:w-1/2"><div className="relative group"><div className="absolute inset-0 bg-orange-200 rounded-[2.5rem] transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div><img src="https://images.unsplash.com/photo-1583332130317-de7cb8c0d953?auto=format&fit=crop&q=80&w=800" alt="Siddhi Rane - Baker" className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover aspect-[4/5]"/></div></div>
          <div className="w-full lg:w-1/2"><span className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-2 block">Our Story</span><h1 className={`text-5xl md:text-6xl font-extrabold font-serif mb-6 leading-tight ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Meet <br/>Siddhi Rane</h1><h3 className="text-xl text-stone-500 font-bold mb-8">Founder & Head Baker</h3><div className={`space-y-6 text-lg leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}><p>Welcome to Crumbs A Microbakery! My journey began in a small home kitchen with nothing but flour, water, and a dream. Baking isn't just a profession for me; it's a love language.</p><p>I believe that the secret to a perfect loaf lies in patience and purity. That's why every product that leaves my kitchen is handcrafted with the absolute best quality ingredients—no preservatives, no shortcuts, just pure, wholesome goodness.</p></div><div className="flex gap-6 mt-10"><div className={`flex flex-col items-center justify-center p-6 rounded-3xl shadow-sm w-36 border ${isDarkMode ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-100'}`}><span className="text-4xl font-black text-orange-500 mb-1">5+</span><span className="text-xs text-stone-400 font-bold uppercase tracking-wide">Years Baking</span></div><div className={`flex flex-col items-center justify-center p-6 rounded-3xl shadow-sm w-36 border ${isDarkMode ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-100'}`}><span className="text-4xl font-black text-orange-500 mb-1">100%</span><span className="text-xs text-stone-400 font-bold uppercase tracking-wide">Handmade</span></div></div></div>
        </div>
        <div className="text-center mb-16"><h2 className={`text-4xl font-extrabold mb-4 ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Baked with Passion</h2><p className="text-stone-500 max-w-2xl mx-auto text-lg">A glimpse into the daily magic that happens in our kitchen.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600","https://images.unsplash.com/photo-1621253457002-30cb1943899f?auto=format&fit=crop&q=80&w=600","https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=600"].map((src, index) => <div key={index} className="group overflow-hidden rounded-[2rem] shadow-lg h-80 relative"><img src={src} alt="Process" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/><div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div></div>)}</div>
      </div>
    </div>
  );
};

const GoogleFormCheckout = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-6 bg-stone-900/60 backdrop-blur-md">
      <div className="bg-white md:rounded-[2rem] shadow-2xl w-full h-full md:h-[90vh] md:w-[90vw] max-w-5xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center p-6 bg-stone-900 text-white">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <FileText size={24} className="text-orange-500" /> Checkout Form
          </h3>
          <button onClick={onClose} className="hover:bg-stone-700 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 bg-stone-100 relative">
          <iframe 
            src={GOOGLE_FORM_URL} 
            className="absolute inset-0 w-full h-full border-0" 
            title="Order Form"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </div>
  );
};

const Checkout = ({ cart, total, subtotal, deliveryFee, locationData, onBack, isDarkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', addressLine: locationData.address || '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const payload = { user_id: "dummy", customer_details: formData, cart_items: cart, subtotal: subtotal, delivery_fee: deliveryFee, total: total };
    try {
      const response = await fetch(`${BACKEND_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        console.error("Order failed:", data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center animate-in zoom-in">
        <div className={`rounded-[2.5rem] shadow-2xl p-12 border ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Send size={40} className="text-green-600" /></div>
          <h2 className={`text-4xl font-extrabold mb-4 ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Order Placed!</h2>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Thank you, {formData.name}. We have received your order. <br/>You will receive a confirmation call shortly.</p>
          <button onClick={() => window.location.reload()} className="bg-stone-900 text-white font-bold py-4 px-8 rounded-2xl hover:bg-orange-600 transition-colors">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button onClick={onBack} className="flex items-center text-stone-500 hover:text-orange-600 mb-8 font-bold transition-colors"><ArrowLeft size={20} className="mr-2" /> Back to Cart</button>
      <div className={`rounded-[2.5rem] shadow-2xl overflow-hidden border ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
        <div className="bg-stone-900 p-10 text-white"><h2 className="text-3xl font-extrabold mb-2">Checkout Details</h2><p className="text-stone-400">Enter your details to place the order instantly.</p></div>
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isDarkMode ? 'text-stone-400' : 'text-stone-700'}`}>Full Name</label><input required name="name" type="text" value={formData.name} onChange={handleChange} className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:bg-stone-900' : 'bg-stone-50 border-stone-200 focus:bg-white'}`} placeholder="John Doe" /></div>
            <div><label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isDarkMode ? 'text-stone-400' : 'text-stone-700'}`}>Phone Number</label><input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:bg-stone-900' : 'bg-stone-50 border-stone-200 focus:bg-white'}`} placeholder="+91 98765 43210" /></div>
          </div>
          <div><label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isDarkMode ? 'text-stone-400' : 'text-stone-700'}`}>Email Address</label><input required name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:bg-stone-900' : 'bg-stone-50 border-stone-200 focus:bg-white'}`} placeholder="john@example.com" /></div>
          <div><label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isDarkMode ? 'text-stone-400' : 'text-stone-700'}`}>Delivery Address</label><textarea required name="addressLine" rows="3" value={formData.addressLine} onChange={handleChange} className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:bg-stone-900' : 'bg-stone-50 border-stone-200 focus:bg-white'}`} placeholder="#123, Street Name, Area, Bangalore - 560067"></textarea></div>
          <div><label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isDarkMode ? 'text-stone-400' : 'text-stone-700'}`}>Order Notes (Optional)</label><input name="notes" type="text" value={formData.notes} onChange={handleChange} className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:bg-stone-900' : 'bg-stone-50 border-stone-200 focus:bg-white'}`} placeholder="Leave at gate, less sugar, etc." /></div>
          <div className={`p-6 rounded-2xl border mt-8 ${isDarkMode ? 'bg-stone-800 border-stone-700' : 'bg-orange-50 border-orange-100'}`}><div className={`flex justify-between items-center font-black text-xl ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}><span>Total to Pay</span><span className="text-orange-600">₹{total.toFixed(2)}</span></div><p className="text-sm text-stone-500 mt-2 font-medium">Payment to be made upon confirmation.</p></div>
          {submitStatus === 'error' && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold">Something went wrong. Please try again.</div>}
          <button type="submit" disabled={isSubmitting} className={`w-full bg-stone-900 hover:bg-orange-600 text-white font-black text-lg py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-orange-200 hover:-translate-y-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>{isSubmitting ? <span>Processing...</span> : <><Send size={24} /> Place Order</>}</button>
        </form>
      </div>
    </div>
  );
};

const Cart = ({ cart, updateQuantity, removeFromCart, locationData, onCheckout, isDarkMode }) => {
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + (item.isDeal ? item.discountPrice : item.price) * item.quantity, 0);
  let distance = 0, deliveryFee = 0, deliveryMsg = "Please set location";
  if (locationData.lat && locationData.lng) {
    distance = calculateDistance(locationData.lat, locationData.lng, SHOP_LOCATION.lat, SHOP_LOCATION.lng);
    deliveryFee = calculateDeliveryFee(distance);
    deliveryMsg = `${distance.toFixed(1)} km`;
  }

  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className={`p-8 rounded-full mb-6 animate-in zoom-in ${isDarkMode ? 'bg-stone-900' : 'bg-orange-50'}`}>
	<ShoppingBag size={64} className="text-orange-400" />
	</div>
        <h2 className={`text-3xl font-black mb-2 ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Cart is empty</h2>
        <p className="text-stone-500 mb-8 font-medium">Looks like you haven't added any treats yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <h1 className={`text-4xl font-black mb-12 font-serif ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-2/3 space-y-6">
          {cart.map(item => {
            const price = item.isDeal ? item.discountPrice : item.price;
            // Image Source Logic
            const imgSrc = (item.image && item.image.startsWith('/')) ? `${process.env.PUBLIC_URL}${item.image}` : item.image;
            return (
              <div key={item.id} className={`flex items-center gap-6 p-6 rounded-[2rem] shadow-sm border hover:shadow-md transition-shadow ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
                <img src={imgSrc} alt={item.name} className="w-28 h-28 object-cover rounded-2xl" />
                <div className="flex-1">
                  <h3 className={`font-bold text-xl mb-1 ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{item.name}</h3>
                  <div className="flex items-center gap-3"><p className="text-orange-600 font-extrabold text-lg">₹{price.toFixed(2)}</p>{item.isDeal && <span className="text-sm text-stone-400 line-through font-medium">₹{item.price}</span>}</div>
                </div>
                <div className={`flex items-center gap-4 rounded-2xl p-2 ${isDarkMode ? 'bg-stone-800' : 'bg-stone-50'}`}>
                  <button onClick={() => updateQuantity(item.id, -1)} className={`w-8 h-8 flex items-center justify-center rounded-xl shadow-sm transition ${isDarkMode ? 'bg-stone-900 text-stone-300 hover:bg-stone-700' : 'bg-white text-stone-600 hover:bg-stone-200'}`}><Minus size={16} /></button>
                  <span className={`w-6 text-center font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className={`w-8 h-8 flex items-center justify-center rounded-xl shadow-sm transition ${isDarkMode ? 'bg-stone-900 text-stone-300 hover:bg-stone-700' : 'bg-white text-stone-600 hover:bg-stone-200'}`}><Plus size={16} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
              </div>
            );
          })}
        </div>
        <div className="lg:w-1/3">
          <div className={`p-8 rounded-[2.5rem] shadow-xl border sticky top-32 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
            <h3 className={`text-2xl font-black mb-8 ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className={`flex justify-between font-medium ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className={`flex justify-between font-medium ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}><span className="flex items-center gap-2">Delivery ({deliveryMsg})</span><span>₹{deliveryFee.toFixed(2)}</span></div>
              {!locationData.address && <p className="text-xs text-red-500 text-right mt-1 font-bold">*Set location header to calculate</p>}
              <div className={`border-t pt-6 flex justify-between items-center ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}><span className={`font-bold text-xl ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Total</span><span className="font-black text-3xl text-orange-600">₹{total.toFixed(2)}</span></div>
            </div>
            
            <div className="space-y-4">
              <button onClick={() => onCheckout({ subtotal, deliveryFee, total })} disabled={!locationData.address} className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${locationData.address ? 'bg-stone-900 text-white hover:bg-orange-600 shadow-xl hover:shadow-orange-200 hover:-translate-y-1' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}>Proceed to Checkout <ChevronRight size={20} /></button>
              <div className="relative flex items-center py-2"><div className={`flex-grow border-t ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}></div><span className="flex-shrink-0 mx-4 text-stone-400 text-sm font-bold">OR</span><div className={`flex-grow border-t ${isDarkMode ? 'border-stone-800' : 'border-stone-200'}`}></div></div>
              <button onClick={() => setShowGoogleForm(true)} className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all border-2 ${isDarkMode ? 'bg-stone-950 text-stone-300 border-stone-800 hover:border-orange-500 hover:text-orange-500' : 'bg-white text-stone-800 border-stone-100 hover:border-orange-500 hover:text-orange-600'}`}><FileText size={20} /> Checkout via Google Form</button>
            </div>
            
            {!locationData.address && <p className="text-center text-sm text-stone-400 mt-4 font-medium">Please set location to proceed.</p>}
          </div>
        </div>
      </div>
      
      <GoogleFormCheckout isOpen={showGoogleForm} onClose={() => setShowGoogleForm(false)} />
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  // Default to Dark Mode (true) as requested
  const [isDarkMode, setIsDarkMode] = useState(true); 
  
  // Initialize cart from sessionStorage to persist across refreshes (session only)
  const [cart, setCart] = useState(() => { try { const savedCart = sessionStorage.getItem('bakery-cart'); return savedCart ? JSON.parse(savedCart) : []; } catch (e) { return []; } });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationData, setLocationData] = useState(() => { try { const savedLoc = sessionStorage.getItem('bakery-location'); return savedLoc ? JSON.parse(savedLoc) : { type: null, lat: null, lng: null, address: null, pincode: null }; } catch (e) { return { type: null, lat: null, lng: null, address: null, pincode: null }; } });
  const [checkoutTotals, setCheckoutTotals] = useState({ subtotal: 0, deliveryFee: 0, total: 0 });

  useEffect(() => { sessionStorage.setItem('bakery-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { sessionStorage.setItem('bakery-location', JSON.stringify(locationData)); }, [locationData]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const addToCart = (product) => setCart(prev => { const existing = prev.find(item => item.id === product.id); if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item); return [...prev, { ...product, quantity: 1 }]; });
  const updateQuantity = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const handleProceedToCheckout = (totals) => { setCheckoutTotals(totals); setCurrentView('checkout'); };
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen font-sans selection:bg-orange-500 selection:text-white transition-colors duration-500 ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-white text-stone-900'}`}>
      {PREVIEW_STYLES && <style>{PREVIEW_STYLES}</style>}
      
      <Header 
        cartCount={cartCount} 
        onViewChange={setCurrentView} 
        currentView={currentView} 
        locationData={locationData} 
        setLocationData={setLocationData} 
        setIsLocationModalOpen={setIsLocationModalOpen}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main>
        {currentView === 'home' && (
          <>
            <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 z-0">
                 <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-stone-950/60' : 'bg-stone-900/30'}`} />
                 <video autoPlay loop muted playsInline className="w-full h-full object-cover"><source src="/crumbs.a.microbakery/products/cover.mov" type="video/mp4" />Your browser does not support the video tag.</video>
               </div>
               <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
                 <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm mb-6 animate-in slide-in-from-bottom-4">EST. 2023 • BANGALORE</div>
                 <h1 className="text-6xl md:text-8xl font-black text-white font-serif mb-8 leading-[0.9] drop-shadow-xl animate-in slide-in-from-bottom-8">Artisan Baking <br /> <span className="text-orange-500">With Soul.</span></h1>
                 <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-2xl leading-relaxed drop-shadow-md">Handcrafted sourdough, delicate pastries, and moments of joy delivered straight to your door.</p>
                 <button onClick={() => setCurrentView('products')} className="bg-orange-600 hover:bg-orange-500 text-white text-lg font-bold px-10 py-5 rounded-full transition-all hover:scale-105 hover:shadow-orange-500/50 shadow-2xl flex items-center gap-3 animate-in zoom-in delay-200">Order Now <ChevronRight size={24} /></button>
               </div>
            </div>
            <DealsSection cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} isDarkMode={isDarkMode} />
            <Products cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} isDarkMode={isDarkMode} />
          </>
        )}
        {currentView === 'products' && (
          <div className="animate-in fade-in duration-500 pt-20">
            <DealsSection cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} isDarkMode={isDarkMode} />
            <Products cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} isDarkMode={isDarkMode} />
          </div>
        )}
        {currentView === 'portfolio' && <div className="animate-in fade-in duration-500 pt-20"><Portfolio isDarkMode={isDarkMode} /></div>}
        {currentView === 'about' && <div className="animate-in fade-in duration-500 pt-20"><AboutUs isDarkMode={isDarkMode} /></div>}
        {currentView === 'admin' && <div className="animate-in fade-in duration-500 pt-20"><AdminDashboard isDarkMode={isDarkMode} /></div>}
        {currentView === 'cart' && <div className="animate-in slide-in-from-right-8 duration-500 pt-20"><Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} locationData={locationData} onCheckout={handleProceedToCheckout} isDarkMode={isDarkMode} /></div>}
        {currentView === 'checkout' && <div className="animate-in zoom-in-95 duration-300 pt-20"><Checkout cart={cart} total={checkoutTotals.total} subtotal={checkoutTotals.subtotal} deliveryFee={checkoutTotals.deliveryFee} locationData={locationData} onBack={() => setCurrentView('cart')} isDarkMode={isDarkMode} /></div>}
      </main>
      <footer className={`py-16 text-center border-t ${isDarkMode ? 'bg-stone-950 text-stone-400 border-stone-900' : 'bg-stone-900 text-stone-400 border-stone-800'}`}>
        <div className="mb-8">
          <span className="text-3xl font-extrabold tracking-tight text-white">Crumbs<span className="text-orange-500">.</span></span>
        </div>
        <p className="font-medium">© 2024 Crumbs A Microbakery (560067). All rights reserved.</p>
      </footer>
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} onSetLocation={setLocationData} />
    </div>
  );
};
export default App;
