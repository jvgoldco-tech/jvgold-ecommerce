import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, Bell, Search, ScanLine, LayoutDashboard, Settings } from 'lucide-react';
import { useStore } from '../../store/useStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const brandConfig = useStore(state => state.siteConfig.brand);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col text-gray-800 font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-[#F8F9FA] px-6 lg:px-10 py-4 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative z-20">
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center w-64">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            {(brandConfig.displayMode === 'LOGO' || brandConfig.displayMode === 'BOTH') && brandConfig.logoUrl && (
              <img src={brandConfig.logoUrl} alt="Logo" className="h-8 object-contain" />
            )}
            {(brandConfig.displayMode === 'TEXT' || brandConfig.displayMode === 'BOTH') && (
              <h1 className="font-display text-2xl tracking-widest text-black uppercase">
                {brandConfig.name}
              </h1>
            )}
          </div>
        </div>

        {/* Center: Pill Switcher */}
        <div className="hidden md:flex items-center bg-white rounded-full p-1 shadow-sm border border-black/5 absolute left-1/2 -translate-x-1/2">
          <NavLink 
            to="/admin" end
            className={({isActive}) => `px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${isActive ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/admin/catalogs"
            className={({isActive}) => `px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${isActive ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={16} />
            <span>Catalogs</span>
          </NavLink>
          <NavLink 
            to="/admin/editor"
            className={({isActive}) => `px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all ${isActive ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
          >
            <Settings size={16} />
            <span>Editor</span>
          </NavLink>
        </div>

        {/* Right: Global Actions & User */}
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm border border-black/5 transition-colors">
            <SettingsIcon size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm border border-black/5 transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-medium shadow-sm transition-transform hover:scale-105"
          >
            A
          </button>
        </div>

      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex flex-col p-6 lg:p-10">
        <Outlet />
      </main>
      
    </div>
  );
};

export default AdminLayout;
