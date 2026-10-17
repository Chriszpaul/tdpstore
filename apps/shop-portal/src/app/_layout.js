import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShopDataProvider } from '../context/ShopDataContext';

const items = {
 index: ['Home', 'view-dashboard-outline'],
 orders: ['Orders', 'receipt-text-outline'],
 products: ['Products', 'tag-multiple-outline'],
 inventory: ['Stock', 'cube-outline'],
 team: ['Team', 'account-group-outline'],
 store: ['Store', 'storefront-outline'],
};
export default function ShopLayout() {
 return <ShopDataProvider><Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#71B8FF', tabBarInactiveTintColor: '#8196B4', tabBarStyle: { backgroundColor: '#0B172B', borderTopColor: '#203754', height: 68, paddingTop: 7, paddingBottom: 8 }, tabBarLabelStyle: { fontSize: 10, fontWeight: '700' } }}>
  {Object.keys(items).map((route) => <Tabs.Screen key={route} name={route} options={{ title: items[route][0], tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={items[route][1]} color={color} size={size} /> }} />)}
 </Tabs></ShopDataProvider>;
}
