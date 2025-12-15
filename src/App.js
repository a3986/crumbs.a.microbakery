import React, { useState, useEffect } from 'react';
import {
  ShoppingBag, MapPin, Minus, Plus, Trash2, Menu, X, ChevronRight,
  Instagram, Facebook, Twitter, Send, Navigation, Percent, ArrowLeft,
  Heart, MessageCircle, ExternalLink, Grid, FileText
} from 'lucide-react';

import './bakery_styles.css';
import { SHOP_LOCATION, INSTAGRAM_URL, GOOGLE_FORM_URL } from './bakery_config';
import { PRODUCTS, PORTFOLIO_POSTS } from './bakery_data';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const calculateDeliveryFee = (distance) => {
  if (distance <= 2) return 0;
  if (distance <= 5) return 40;
  if (distance <= 10) return 80;
  return 80 + Math.ceil(distance - 10) * 10;
};

const Header = ({ cartCount, onViewChange, currentView, locationData, setIsLocationModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => onViewChange('home')}>
            <span className="text-xl sm:text-2xl font-bold font-serif text-amber-800">Crumbs A Microbakery</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => onViewChange('home')} className={`text-gray-600 hover:text-amber-600 font-medium ${currentView === 'home' ? 'text-amber-600' : ''}`}>Home</button>
            <button onClick={() => onViewChange('products')} className={`text-gray-600 hover:text-amber-600 font-medium ${currentView === 'products' ? 'text-amber-600' : ''}`}>Menu</button>
            <button onClick={() => onViewChange('portfolio')} className={`text-gray-600 hover:text-amber-600 font-medium ${currentView === 'portfolio' ? 'text-amber-600' : ''}`}>Portfolio</button>
            <button onClick={() => onViewChange('about')} className={`text-gray-600 hover:text-amber-600 font-medium ${currentView === 'about' ? 'text-amber-600' : ''}`}>About Us</button>
            <button onClick={() => setIsLocationModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 rounded-full text-amber-800 transition-colors text-sm">
              <MapPin size={16} />
              <span className="truncate max-w-[150px]">{locationData.address || "Set Location"}</span>
            </button>
            <button onClick={() => onViewChange('cart')} className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => onViewChange('cart')} className="relative p-2 text-gray-600">
              <ShoppingBag size={24} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-amber-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <button onClick={() => { onViewChange('home'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 font-medium text-gray-700 hover:bg-amber-50">Home</button>
            <button onClick={() => { onViewChange('products'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 font-medium text-gray-700 hover:bg-amber-50">Menu</button>
            <button onClick={() => { onViewChange('portfolio'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 font-medium text-gray-700 hover:bg-amber-50">Portfolio</button>
            <button onClick={() => { onViewChange('about'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 font-medium text-gray-700 hover:bg-amber-50">About Us</button>
            <button onClick={() => { setIsLocationModalOpen(true); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 font-medium text-gray-700 hover:bg-amber-50 flex items-center"><MapPin size={16} className="mr-2" /> {locationData.address || "Set Location"}</button>
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
      () => { setError("Unable to retrieve location."); setLoading(false); }
    );
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualZip.length < 6) { setError("Please enter a valid 6-digit Pincode"); return; }
    const mockLat = SHOP_LOCATION.lat + (Math.random() * 0.05 - 0.025);
    const mockLng = SHOP_LOCATION.lng + (Math.random() * 0.05 - 0.025);
    onSetLocation({ type: 'manual', lat: mockLat, lng: mockLng, address: `Pincode: ${manualZip}`, pincode: manualZip });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Delivery Location</h3>
          <button onClick={onClose}><X size={24} className="text-gray-400" /></button>
        </div>
        <div className="space-y-6">
          <button onClick={handleGeoLocation} disabled={loading} className="w-full flex items-center justify-center space-x-3 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-xl font-semibold">
            {loading ? <span>Locating...</span> : <><Navigation size={20} /><span>Use My Current Location</span></>}
          </button>
          <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or enter pincode</span></div></div>
          <form onSubmit={handleManualSubmit}>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Pincode (Bangalore)</label><input type="text" value={manualZip} onChange={(e) => setManualZip(e.target.value)} placeholder="e.g. 560067" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" /></div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold p-3 rounded-lg">Set Location</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const displayPrice = product.isDeal ? product.discountPrice : product.price;
  const imgSrc = (product.image && product.image.startsWith('/')) ? `${process.env.PUBLIC_URL}${product.image}` : product.image;
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        {product.isDeal && <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">DEAL</div>}
        <img src={imgSrc} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-gray-900 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
          {product.isDeal ? <div className="flex items-center gap-2"><span className="text-gray-400 line-through text-xs">₹{product.price}</span><span className="text-red-600">₹{displayPrice}</span></div> : <span>₹{product.price}</span>}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">{product.category}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <button onClick={() => addToCart(product)} className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-amber-600 text-white py-3 rounded-lg transition-colors font-medium mt-auto"><Plus size={18} /> Add to Cart</button>
      </div>
    </div>
  );
};

const DealsSection = ({ addToCart }) => {
  const deals = PRODUCTS.filter(p => p.isDeal);
  if (deals.length === 0) return null;
  return (
    <div className="py-12 bg-red-50 border-y border-red-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8"><div className="bg-red-500 p-2 rounded-lg text-white"><Percent size={24} /></div><h2 className="text-3xl font-bold text-gray-900 font-serif">Today's Hot Deals</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{deals.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div>
      </div>
    </div>
  );
};

const Products = ({ addToCart }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filteredProducts = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto bg-gray-50">
      <div className="text-center mb-12"><h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Our Full Menu</h2><p className="text-gray-600">Fresh from the oven to your doorstep.</p></div>
      <div className="flex flex-wrap justify-center gap-4 mb-12">{categories.map(cat => <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-amber-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}>{cat}</button>)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{filteredProducts.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <div className="py-12 bg-white animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12 border-b border-gray-100 pb-12">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
            <div className="w-full h-full bg-white rounded-full p-1"><img src={`${process.env.PUBLIC_URL}/products/insta_profile.jpg`} alt="Crumbs A Microbakery" className="w-full h-full object-cover rounded-full" /></div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4"><h2 className="text-2xl font-bold text-gray-900">crumbs.a.microbakery</h2><div className="flex gap-2"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"><Instagram size={18} /> Follow</a><button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">Message</button></div></div>
            <div className="flex justify-center sm:justify-start gap-8 mb-4 text-gray-700 text-sm sm:text-base"><div><span className="font-bold text-gray-900">142</span> posts</div><div><span className="font-bold text-gray-900">2.4k</span> followers</div><div><span className="font-bold text-gray-900">350</span> following</div></div>
            <div className="text-sm sm:text-base text-gray-800"><p className="font-bold">Crumbs A Microbakery 🥖</p><p>Artisan Sourdough & Pastries | Bangalore</p><p>DM to order or check website 👇</p></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-6 text-xs font-bold text-gray-500 uppercase tracking-widest border-t border-black pt-4 inline-block"><Grid size={14} /> Posts</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">{PORTFOLIO_POSTS.map(post => {
          const imgSrc = (post.image && post.image.startsWith('/')) ? `${process.env.PUBLIC_URL}${post.image}` : post.image;
          return (
            <div key={post.id} className="group relative aspect-square bg-gray-100 overflow-hidden cursor-pointer">
              <img src={imgSrc} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                <div className="flex items-center gap-2"><Heart size={20} fill="white" /> {post.likes}</div>
                <div className="flex items-center gap-2"><MessageCircle size={20} fill="white" /> {post.comments}</div>
              </div>
            </div>
          );
        })}</div>
        <div className="mt-12 text-center"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-semibold">View full feed on Instagram <ExternalLink size={16} /></a></div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="py-20 bg-amber-50 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="w-full md:w-1/2"><div className="relative"><div className="absolute top-4 left-4 w-full h-full border-4 border-amber-200 rounded-xl z-0 transform translate-x-2 translate-y-2"></div><img src={`${process.env.PUBLIC_URL}/products/insta_profile.jpg?auto=format&fit=crop&q=80&w=800`} alt="Siddhi Rane - Baker" className="relative z-10 w-full rounded-xl shadow-xl" /></div></div>
          <div className="w-full md:w-1/2"><h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6">Meet Siddhi Rane</h1><h3 className="text-xl text-amber-600 font-medium mb-6">Founder & Head Baker</h3><p className="text-gray-600 leading-relaxed mb-6">Welcome to Crumbs A Microbakery! My journey began in a small home kitchen with nothing but flour, water, and a dream. Baking isn't just a profession for me; it's a love language.</p><p className="text-gray-600 leading-relaxed mb-6">I believe that the secret to a perfect loaf lies in patience and purity. That's why every product that leaves my kitchen is handcrafted with the absolute best quality ingredients—no preservatives, no shortcuts, just pure, wholesome goodness.</p><div className="flex gap-4"><div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm w-32"><span className="text-3xl font-bold text-amber-600 mb-1">5+</span><span className="text-xs text-gray-500 uppercase tracking-wide">Years Baking</span></div><div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm w-32"><span className="text-3xl font-bold text-amber-600 mb-1">100%</span><span className="text-xs text-gray-500 uppercase tracking-wide">Handmade</span></div></div></div>
        </div>
        <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">Baked with Passion</h2><p className="text-gray-600 max-w-2xl mx-auto">A glimpse into the daily magic that happens in our kitchen.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><img src={`${process.env.PUBLIC_URL}/products/insta_profile.jpg?auto=format&fit=crop&q=80&w=600`} alt="Kneading Dough" className="w-full h-64 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow" /><img src={`${process.env.PUBLIC_URL}/products/insta_profile.jpg?auto=format&fit=crop&q=80&w=600`} alt="Fresh Ingredients" className="w-full h-64 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow" /><img src={`${process.env.PUBLIC_URL}/products/insta_profile.jpg?auto=format&fit=crop&q=80&w=600`} alt="Finished Product" className="w-full h-64 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow" /></div>
      </div>
    </div>
  );
};

const GoogleFormCheckout = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white md:rounded-2xl shadow-2xl w-full h-full md:h-[90vh] md:w-[90vw] max-w-5xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 bg-amber-600 text-white"><h3 className="text-lg font-bold flex items-center gap-2"><FileText size={20} /> Checkout Form</h3><button onClick={onClose} className="hover:bg-amber-700 p-1 rounded-full transition-colors"><X size={24} /></button></div>
        <div className="flex-1 bg-gray-100 relative"><iframe src={GOOGLE_FORM_URL} className="absolute inset-0 w-full h-full border-0" title="Order Form">Loading...</iframe></div>
      </div>
    </div>
  );
};

const Checkout = ({ cart, total, subtotal, deliveryFee, locationData, onBack }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', addressLine: locationData.address || '', notes: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Order Request - ${formData.name}`;
    const itemsList = cart.map(item => `- ${item.name} x${item.quantity} (₹${(item.isDeal ? item.discountPrice : item.price) * item.quantity})`).join('\n');
    const body = `Hi Crumbs A Microbakery,\n\nI would like to place an order:\n\n${itemsList}\n\n--------------------------------\nSubtotal: ₹${subtotal.toFixed(2)}\nDelivery: ₹${deliveryFee.toFixed(2)}\nTotal Payable: ₹${total.toFixed(2)}\n--------------------------------\n\nCUSTOMER DETAILS:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.addressLine}\nNotes: ${formData.notes}\n\nPlease confirm my order and send payment link.`;
    window.location.href = `mailto:orders@crumbsamicrobakery.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-amber-600 mb-6"><ArrowLeft size={20} className="mr-2" /> Back to Cart</button>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-amber-600 p-6 text-white"><h2 className="text-2xl font-bold font-serif">Checkout Details</h2><p className="text-amber-100 text-sm">Review your details to finalize the order via Email.</p></div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input required name="name" type="text" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="John Doe" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="+91 98765 43210" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="john@example.com" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label><textarea required name="addressLine" rows="3" value={formData.addressLine} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="#123, Street Name, Area, Bangalore - 560067"></textarea></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label><input name="notes" type="text" value={formData.notes} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Leave at gate, less sugar, etc." /></div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6"><div className="flex justify-between items-center font-bold text-gray-900 text-lg"><span>Total to Pay</span><span>₹{total.toFixed(2)}</span></div><p className="text-xs text-gray-500 mt-1">Payment link will be shared via email reply.</p></div>
          <button type="submit" className="w-full bg-gray-900 hover:bg-amber-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"><Send size={20} /> Place Order via Email</button>
        </form>
      </div>
    </div>
  );
};

const Cart = ({ cart, updateQuantity, removeFromCart, locationData, onCheckout }) => {
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
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cart is empty</h2>
        <p className="text-gray-500 mb-8">No goodies added yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-serif text-gray-900 mb-8">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1"><h3 className="font-bold text-gray-900">{item.name}</h3><div className="flex items-center gap-2"><p className="text-amber-600 font-medium">₹{(item.isDeal ? item.discountPrice : item.price).toFixed(2)}</p>{item.isDeal && <span className="text-xs text-gray-400 line-through">₹{item.price}</span>}</div></div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1"><button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded shadow-sm transition"><Minus size={16} /></button><span className="w-8 text-center font-medium">{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded shadow-sm transition"><Plus size={16} /></button></div>
              <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span className="flex items-center gap-2">Delivery ({deliveryMsg})</span><span>₹{deliveryFee.toFixed(2)}</span></div>
              {!locationData.address && <p className="text-xs text-red-500 text-right mt-1">*Set location header to calculate</p>}
              <div className="border-t pt-4 flex justify-between items-center"><span className="font-bold text-lg text-gray-900">Total</span><span className="font-bold text-2xl text-amber-600">₹{total.toFixed(2)}</span></div>
            </div>
            <div className="space-y-3">
              <button onClick={() => onCheckout({ subtotal, deliveryFee, total })} disabled={!locationData.address} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${locationData.address ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Proceed to Checkout <ChevronRight size={20} /></button>
              <div className="relative flex items-center py-2"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span><div className="flex-grow border-t border-gray-300"></div></div>
              <button onClick={() => setShowGoogleForm(true)} className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-600"><FileText size={20} /> Checkout via Google Form</button>
            </div>
            {!locationData.address && <p className="text-center text-sm text-gray-500 mt-3">Please set location to proceed.</p>}
          </div>
        </div>
      </div>
      <GoogleFormCheckout isOpen={showGoogleForm} onClose={() => setShowGoogleForm(false)} />
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationData, setLocationData] = useState({ type: null, lat: null, lng: null, address: null, pincode: null });
  const [checkoutTotals, setCheckoutTotals] = useState({ subtotal: 0, deliveryFee: 0, total: 0 });

  useEffect(() => {
    const savedCart = localStorage.getItem('bakery-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedLoc = localStorage.getItem('bakery-location');
    if (savedLoc) setLocationData(JSON.parse(savedLoc));
  }, []);

  useEffect(() => { localStorage.setItem('bakery-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('bakery-location', JSON.stringify(locationData)); }, [locationData]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const handleProceedToCheckout = (totals) => { setCheckoutTotals(totals); setCurrentView('checkout'); };
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header cartCount={cartCount} onViewChange={setCurrentView} currentView={currentView} locationData={locationData} setLocationData={setLocationData} setIsLocationModalOpen={setIsLocationModalOpen} />
      <main className="pt-20">
        {currentView === 'home' && (
          <>
            <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=2000")', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover' }}><div className="absolute inset-0 bg-black/40" /></div>
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto"><h1 className="text-5xl md:text-7xl font-bold text-white font-serif mb-6 drop-shadow-lg">Artisan Baking <br /> With Soul</h1><button onClick={() => setCurrentView('products')} className="bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 flex items-center mx-auto gap-2">Order Now <ChevronRight size={20} /></button></div>
            </div>
            <DealsSection addToCart={addToCart} />
            <Products addToCart={addToCart} />
          </>
        )}
        {currentView === 'products' && <div className="animate-in fade-in duration-500"><DealsSection addToCart={addToCart} /><Products addToCart={addToCart} /></div>}
        {currentView === 'portfolio' && <div className="animate-in fade-in duration-500"><Portfolio /></div>}
        {currentView === 'about' && <div className="animate-in fade-in duration-500"><AboutUs /></div>}
        {currentView === 'cart' && <div className="animate-in slide-in-from-right-8 duration-500"><Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} locationData={locationData} onCheckout={handleProceedToCheckout} /></div>}
        {currentView === 'checkout' && <div className="animate-in zoom-in-95 duration-300"><Checkout cart={cart} total={checkoutTotals.total} subtotal={checkoutTotals.subtotal} deliveryFee={checkoutTotals.deliveryFee} locationData={locationData} onBack={() => setCurrentView('cart')} /></div>}
      </main>
      <footer className="bg-gray-900 text-white py-12 text-center text-sm border-t border-gray-800"><p>© 2024 Crumbs A Microbakery (560067). All rights reserved.</p></footer>
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} onSetLocation={setLocationData} />
    </div>
  );
};
export default App;
