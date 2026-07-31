import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Package, Monitor, Settings as SettingsIcon, LogOut, LayoutDashboard, Settings } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-primary">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-black/5 flex flex-col">
        <div className="p-6 bg-primary text-white flex justify-between items-center">
          <div>
            <h1 className="font-display text-xl tracking-widest">JEWELRY PRIME</h1>
            <span className="text-[9px] tracking-[0.2em] text-accent/80 uppercase">· ADMIN</span>
          </div>
          <button onClick={() => navigate('/')} className="md:hidden text-white/60 hover:text-white">
            <LogOut size={16} />
          </button>
        </div>
        
        <nav className="flex-1 py-8 flex flex-col gap-2">
          <NavLink to="/admin" end className={({isActive}) => `flex items-center space-x-3 px-4 py-3 text-xs tracking-widest uppercase transition-colors ${isActive ? 'bg-primary text-white' : 'text-primary/60 hover:bg-black/5 hover:text-primary'}`}>
            <LayoutDashboard size={18} />
            <span>Inventory</span>
          </NavLink>
          <NavLink to="/admin/catalogs" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 text-xs tracking-widest uppercase transition-colors ${isActive ? 'bg-primary text-white' : 'text-primary/60 hover:bg-black/5 hover:text-primary'}`}>
            <LayoutDashboard size={18} />
            <span>Catalogs</span>
          </NavLink>
          <NavLink to="/admin/editor" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 text-xs tracking-widest uppercase transition-colors ${isActive ? 'bg-primary text-white' : 'text-primary/60 hover:bg-black/5 hover:text-primary'}`}>
            <Settings size={18} />
            <span>Site Editor</span>
          </NavLink>

          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => `flex items-center space-x-3 px-8 py-4 text-xs tracking-widest uppercase transition-colors border-l-2 ${isActive ? 'border-accent bg-accent/5 text-primary font-medium' : 'border-transparent text-primary/60 hover:bg-black/5 hover:text-primary'}`}
          >
            <SettingsIcon size={16} />
            <span>Settings</span>
          </NavLink>
        </nav>
        
        <div className="p-6 hidden md:block">
           <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-xs tracking-widest text-primary/40 hover:text-primary transition-colors">
             <LogOut size={14} />
             <span>RETURN TO STORE</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 md:p-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
