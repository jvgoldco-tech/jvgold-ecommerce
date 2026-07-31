import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/client/Home'
import CategoryDetail from './pages/client/CategoryDetail'
import Favorites from './pages/client/Favorites'
import Promotions from './pages/client/Promotions'
import NewArrivals from './pages/client/NewArrivals'
import Cart from './pages/client/Cart'
import AdminLayout from './pages/admin/AdminLayout'
import Login from './pages/admin/Login'
import Inventory from './pages/admin/Inventory'
import SiteEditor from './pages/admin/SiteEditor'
import Settings from './pages/admin/Settings'
import Catalogs from './pages/admin/Catalogs'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryId" element={<CategoryDetail />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="new-arrivals" element={<NewArrivals />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Inventory />} />
        <Route path="catalogs" element={<Catalogs />} />
        <Route path="editor" element={<SiteEditor />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
