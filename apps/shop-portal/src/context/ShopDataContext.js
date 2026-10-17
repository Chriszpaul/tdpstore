import React, { createContext, useContext, useMemo, useState } from 'react';

const ShopContext = createContext(null);
const initialProducts = [
  { id: 'p1', name: 'Wireless Headphones', category: 'Audio', sku: 'AUD-014', price: 8999, stock: 12, reorderLevel: 5, location: 'Audio shelf A1' },
  { id: 'p2', name: 'Mechanical Keyboard', category: 'Computers', sku: 'CMP-022', price: 6499, stock: 4, reorderLevel: 6, location: 'Computer shelf B2' },
  { id: 'p3', name: 'USB-C Hub 8-in-1', category: 'Accessories', sku: 'ACC-008', price: 2499, stock: 2, reorderLevel: 5, location: 'Accessories shelf C1' },
  { id: 'p4', name: 'Portable SSD 1TB', category: 'Storage', sku: 'STR-031', price: 8999, stock: 18, reorderLevel: 5, location: 'Storage shelf A3' },
  { id: 'p5', name: 'Wireless Mouse', category: 'Computers', sku: 'CMP-006', price: 1999, stock: 7, reorderLevel: 5, location: 'Computer shelf B2' },
  { id: 'p6', name: 'Webcam 4K', category: 'Accessories', sku: 'ACC-019', price: 12999, stock: 0, reorderLevel: 4, location: 'Accessories shelf C2' },
];
const initialOrders = [
  { id: 'TS-1048', customer: 'Maya Perera', items: 2, total: 10998, status: 'New', time: '9:42 AM' },
  { id: 'TS-1047', customer: 'Dilan Fernando', items: 1, total: 6499, status: 'Preparing', time: '9:18 AM' },
  { id: 'TS-1046', customer: 'Anika Silva', items: 3, total: 17997, status: 'Ready', time: '8:56 AM' },
  { id: 'TS-1045', customer: 'Ravi Jayasuriya', items: 1, total: 2499, status: 'Completed', time: '8:32 AM' },
];
const initialDeliveries = [
  { id: 'DL-7781', orderId: 'TS-1046', customer: 'Anika Silva', address: 'Park Road, Colombo 05', items: 3, total: 17997, status: 'Out for delivery', driver: 'Nimal D.', window: 'Today · 2:00–4:00 PM' },
  { id: 'DL-7780', orderId: 'TS-1045', customer: 'Ravi Jayasuriya', address: 'Duplication Road, Colombo 03', items: 1, total: 2499, status: 'Delivered', driver: 'Kavindu P.', window: 'Delivered today · 10:14 AM' },
  { id: 'DL-7779', orderId: 'TS-1043', customer: 'Hasini Fernando', address: 'Galle Road, Colombo 04', items: 2, total: 10998, status: 'In transit', driver: 'Sahan M.', window: 'Today · 3:00–5:00 PM' },
  { id: 'DL-7778', orderId: 'TS-1042', customer: 'Shavin Perera', address: 'Nawala Road, Rajagiriya', items: 1, total: 8999, status: 'Preparing', driver: 'Assigning driver', window: 'Today · 4:00–6:00 PM' },
];
const initialTeam = [
  { id: 't1', name: 'Chrisz Paul', email: 'chrisz@tdpstore.lk', role: 'Owner', initials: 'CP' },
  { id: 't2', name: 'Amaya Perera', email: 'amaya@tdpstore.lk', role: 'Store manager', initials: 'AP' },
  { id: 't3', name: 'Kavin Silva', email: 'kavin@tdpstore.lk', role: 'Order staff', initials: 'KS' },
];

export function ShopDataProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [team, setTeam] = useState(initialTeam);
  const [isOpen, setIsOpen] = useState(true);
  const addProduct = (product) => setProducts((all) => [{ ...product, id: 'p' + Date.now(), sku: 'NEW-' + String(all.length + 1).padStart(3, '0'), reorderLevel: 5, location: 'Main shelf' }, ...all]);
  const changeStock = (id, amount) => setProducts((all) => all.map((p) => p.id === id ? { ...p, stock: Math.max(0, p.stock + amount) } : p));
  const advanceOrder = (id) => {
    const next = { New: 'Preparing', Preparing: 'Ready', Ready: 'Completed' };
    setOrders((all) => all.map((o) => o.id === id && next[o.status] ? { ...o, status: next[o.status] } : o));
  };
  const advanceDelivery = (id) => {
    const next = { Preparing: 'Ready for pickup', 'Ready for pickup': 'Picked up', 'Picked up': 'In transit', 'In transit': 'Out for delivery', 'Out for delivery': 'Delivered' };
    setDeliveries((all) => all.map((d) => d.id === id && next[d.status] ? { ...d, status: next[d.status] } : d));
  };
  const addMember = (member) => setTeam((all) => [...all, { ...member, id: 't' + Date.now(), initials: member.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }]);
  const value = useMemo(() => ({ products, orders, deliveries, team, isOpen, setIsOpen, addProduct, changeStock, advanceOrder, advanceDelivery, addMember }), [products, orders, deliveries, team, isOpen]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error('useShop must be inside ShopDataProvider');
  return value;
}
