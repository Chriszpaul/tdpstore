import React, { createContext, useContext, useMemo, useState } from 'react';

const ShopContext = createContext(null);
const initialProducts = [
  { id: 'p1', name: 'Wireless Headphones', category: 'Audio', sku: 'AUD-014', price: 89.99, stock: 12 },
  { id: 'p2', name: 'Mechanical Keyboard', category: 'Computers', sku: 'CMP-022', price: 129, stock: 4 },
  { id: 'p3', name: 'USB-C Hub 8-in-1', category: 'Accessories', sku: 'ACC-008', price: 54.5, stock: 2 },
  { id: 'p4', name: 'Portable SSD 1TB', category: 'Storage', sku: 'STR-031', price: 119.99, stock: 18 },
  { id: 'p5', name: 'Wireless Mouse', category: 'Computers', sku: 'CMP-006', price: 39.99, stock: 7 },
  { id: 'p6', name: 'Webcam 4K', category: 'Accessories', sku: 'ACC-019', price: 149, stock: 0 },
];
const initialOrders = [
  { id: 'TS-1048', customer: 'Maya Perera', items: 2, total: 184.49, status: 'New', time: '9:42 AM' },
  { id: 'TS-1047', customer: 'Dilan Fernando', items: 1, total: 129, status: 'Preparing', time: '9:18 AM' },
  { id: 'TS-1046', customer: 'Anika Silva', items: 3, total: 254.48, status: 'Ready', time: '8:56 AM' },
  { id: 'TS-1045', customer: 'Ravi Jayasuriya', items: 1, total: 54.5, status: 'Completed', time: '8:32 AM' },
];
const initialTeam = [
  { id: 't1', name: 'Chrisz Paul', email: 'chrisz@tdpstore.lk', role: 'Owner', initials: 'CP' },
  { id: 't2', name: 'Amaya Perera', email: 'amaya@tdpstore.lk', role: 'Store manager', initials: 'AP' },
  { id: 't3', name: 'Kavin Silva', email: 'kavin@tdpstore.lk', role: 'Order staff', initials: 'KS' },
];

export function ShopDataProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [team, setTeam] = useState(initialTeam);
  const [isOpen, setIsOpen] = useState(true);
  const addProduct = (product) => setProducts((all) => [{ ...product, id: 'p' + Date.now(), sku: 'NEW-' + String(all.length + 1).padStart(3, '0') }, ...all]);
  const changeStock = (id, amount) => setProducts((all) => all.map((p) => p.id === id ? { ...p, stock: Math.max(0, p.stock + amount) } : p));
  const advanceOrder = (id) => {
    const next = { New: 'Preparing', Preparing: 'Ready', Ready: 'Completed' };
    setOrders((all) => all.map((o) => o.id === id && next[o.status] ? { ...o, status: next[o.status] } : o));
  };
  const addMember = (member) => setTeam((all) => [...all, { ...member, id: 't' + Date.now(), initials: member.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }]);
  const value = useMemo(() => ({ products, orders, team, isOpen, setIsOpen, addProduct, changeStock, advanceOrder, addMember }), [products, orders, team, isOpen]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error('useShop must be inside ShopDataProvider');
  return value;
}
