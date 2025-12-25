import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navItems = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Services',
    path: '/services'
  }, {
    name: 'Dashboard',
    path: '/dashboard'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  const isActive = path => location.pathname === path;
  return <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">AI WaveAgency</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(item => <Link key={item.name} to={item.path} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.path) ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
                  {item.name}
                </Link>)}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -20
    }} className="md:hidden glass-effect">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(item.path) ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
                {item.name}
              </Link>)}
          </div>
        </motion.div>}
    </nav>;
};
export default Navbar;