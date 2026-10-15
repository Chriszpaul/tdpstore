import { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const categories = ['All', 'Phones', 'Laptops', 'Audio', 'Accessories'];
const stores = [
  { id: 'all', name: 'All stores', area: 'Browse every location', icon: '🛍️' },
  { id: 'central', name: 'TDP Central', area: 'MG Road · 10:00 AM – 9:00 PM', icon: '🏬' },
  { id: 'north', name: 'TDP North', area: 'North Avenue · 10:00 AM – 8:00 PM', icon: '🏪' },
  { id: 'campus', name: 'TDP Campus', area: 'University Road · 9:00 AM – 7:00 PM', icon: '🏢' },
];
const starterProducts = [
  { id: 'p1', name: 'Nova X Pro', category: 'Phones', price: 54999, oldPrice: 62999, emoji: '📱', color: '#E8E9FF', rating: '4.8', tag: 'BESTSELLER', store: 'central', description: 'A bright display, a capable camera, and all-day battery life in one everyday phone.' },
  { id: 'p2', name: 'AeroBook 14', category: 'Laptops', price: 74999, oldPrice: 84999, emoji: '💻', color: '#E1F1EE', rating: '4.7', tag: 'NEW', store: 'north', description: 'A lightweight laptop for study, work, and everything in between.' },
  { id: 'p3', name: 'Studio Buds+', category: 'Audio', price: 8999, oldPrice: 11999, emoji: '🎧', color: '#FCE9DE', rating: '4.9', tag: 'SAVE 25%', store: 'campus', description: 'Comfortable wireless sound for your commute, calls, and playlists.' },
  { id: 'p4', name: 'Pulse Watch 3', category: 'Accessories', price: 12999, oldPrice: 15999, emoji: '⌚', color: '#F5E8F4', rating: '4.6', tag: 'POPULAR', store: 'central', description: 'A simple everyday smartwatch with activity and notification features.' },
];
const money = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;
const getStore = (id) => stores.find((store) => store.id === id) || stores[1];

export default function App() {
  const [tab, setTab] = useState('Home');
  const [products, setProducts] = useState(starterProducts);
  const [cart, setCart] = useState({});
  const [storeId, setStoreId] = useState('all');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notice, setNotice] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('Phones');
  const [itemStore, setItemStore] = useState('central');
  const [itemDescription, setItemDescription] = useState('');

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesStore = storeId === 'all' || product.store === storeId;
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesStore && matchesCategory && matchesSearch;
  }), [products, storeId, category, search]);

  const cartItems = products.filter((product) => cart[product.id] > 0);
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const subtotal = cartItems.reduce((total, product) => total + product.price * cart[product.id], 0);

  function addToCart(product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    setNotice(`${product.name} added to your cart`);
    setTimeout(() => setNotice(''), 2200);
  }

  function changeQuantity(productId, difference) {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + difference;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[productId];
      else next[productId] = nextQuantity;
      return next;
    });
  }

  function saveNewProduct() {
    const name = itemName.trim();
    const price = Number(itemPrice);
    if (!name || !Number.isFinite(price) || price <= 0) {
      setNotice('Enter a product name and a price greater than zero.');
      return;
    }
    const newProduct = {
      id: `p${Date.now()}`,
      name,
      category: itemCategory,
      price,
      oldPrice: null,
      emoji: itemCategory === 'Phones' ? '📱' : itemCategory === 'Laptops' ? '💻' : itemCategory === 'Audio' ? '🎧' : '⌚',
      color: '#EAE8FF',
      rating: 'New',
      tag: 'JUST ADDED',
      store: itemStore,
      description: itemDescription.trim() || 'Product details will be added soon.',
    };
    setProducts((current) => [newProduct, ...current]);
    setItemName('');
    setItemPrice('');
    setItemDescription('');
    setCategory('All');
    setSearch('');
    setStoreId('all');
    setTab('Shop');
    setNotice(`${name} is now listed in the shop.`);
    setTimeout(() => setNotice(''), 2600);
  }

  const goToShop = () => { setSelectedProduct(null); setTab('Shop'); };

  function ProductCard({ product }) {
    return (
      <View style={styles.productCard}>
        <TouchableOpacity onPress={() => setSelectedProduct(product)} accessibilityRole="button" accessibilityLabel={`View ${product.name}`}>
          <View style={[styles.productArt, { backgroundColor: product.color || '#EAE8FF' }]}>
            <Text style={styles.productEmoji}>{product.emoji || '📦'}</Text>
            <View style={styles.productTag}><Text style={styles.productTagText}>{product.tag || 'IN STORE'}</Text></View>
          </View>
        </TouchableOpacity>
        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>{product.category.toUpperCase()}  ·  ★ {product.rating || 'New'}</Text>
          <TouchableOpacity onPress={() => setSelectedProduct(product)}><Text numberOfLines={1} style={styles.productName}>{product.name}</Text></TouchableOpacity>
          <Text style={styles.productPrice}>{money(product.price)}</Text>
          <Text style={styles.stockLine}>Available at {getStore(product.store).name}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)} accessibilityRole="button">
            <Text style={styles.addButtonText}>+  Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function ProductGrid({ items }) {
    if (items.length === 0) return <View style={styles.emptyState}><Text style={styles.emptyEmoji}>🔎</Text><Text style={styles.emptyTitle}>No gadgets found</Text><Text style={styles.muted}>Try a different search or filter.</Text></View>;
    return <View style={styles.productGrid}>{items.map((product) => <ProductCard key={product.id} product={product} />)}</View>;
  }

  function StorePicker() {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {stores.map((store) => (
          <TouchableOpacity key={store.id} onPress={() => setStoreId(store.id)} style={[styles.chip, storeId === store.id && styles.chipActive]} accessibilityRole="button" accessibilityState={{ selected: storeId === store.id }}>
            <Text style={[styles.chipText, storeId === store.id && styles.chipTextActive]}>{store.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  function CategoryPicker({ value, onChange }) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {categories.map((name) => (
          <TouchableOpacity key={name} onPress={() => onChange(name)} style={[styles.chip, value === name && styles.chipActive]} accessibilityRole="button" accessibilityState={{ selected: value === name }}>
            <Text style={[styles.chipText, value === name && styles.chipTextActive]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  function renderHome() {
    return <>
      <View style={styles.delivery}><Text style={styles.deliveryText}>📍  Shopping at <Text style={styles.deliveryStrong}>{storeId === 'all' ? 'All stores' : getStore(storeId).name}</Text></Text><TouchableOpacity onPress={() => setTab('Stores')}><Text style={styles.changeLink}>Change</Text></TouchableOpacity></View>
      <View style={styles.hero}>
        <View style={styles.heroCopy}><Text style={styles.eyebrow}>THE TECH EDIT</Text><Text style={styles.heroTitle}>Good tech.{'\n'}Better prices.</Text><Text style={styles.heroSubtitle}>Find your next favourite gadget.</Text><TouchableOpacity style={styles.heroButton} onPress={goToShop}><Text style={styles.heroButtonText}>Explore the shop  →</Text></TouchableOpacity></View>
        <View style={styles.heroArt}><Text style={styles.heroEmoji}>🎧</Text><Text style={styles.heroSparkle}>✦</Text></View>
      </View>
      <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>Shop by category</Text><Text style={styles.sectionHint}>Choose a category below</Text></View>
      <CategoryPicker value={category} onChange={(value) => { setCategory(value); setTab('Shop'); }} />
      <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>Popular right now</Text><TouchableOpacity onPress={goToShop}><Text style={styles.changeLink}>See all  →</Text></TouchableOpacity></View>
      <ProductGrid items={visibleProducts.slice(0, 4)} />
      <View style={styles.promise}><Text style={styles.promiseIcon}>🚚</Text><View><Text style={styles.promiseTitle}>Free delivery on orders over ₹999</Text><Text style={styles.muted}>Easy returns · Secure checkout</Text></View></View>
    </>;
  }

  function renderShop() {
    return <>
      <Text style={styles.pageTitle}>Shop tech</Text><Text style={styles.pageIntro}>Browse products from your favourite TDP store.</Text>
      <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput value={search} onChangeText={setSearch} placeholder="Search products..." placeholderTextColor="#8B8D99" style={styles.searchInput} accessibilityLabel="Search products" returnKeyType="search" /></View>
      <Text style={styles.filterLabel}>STORE</Text><StorePicker />
      <Text style={styles.filterLabel}>CATEGORY</Text><CategoryPicker value={category} onChange={setCategory} />
      <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{visibleProducts.length} products</Text><Text style={styles.sectionHint}>{storeId === 'all' ? 'All stores' : getStore(storeId).name}</Text></View>
      <ProductGrid items={visibleProducts} />
    </>;
  }

  function renderStores() {
    return <>
      <Text style={styles.pageTitle}>Choose a store</Text><Text style={styles.pageIntro}>Pick a location to see what is available nearby.</Text>
      {stores.filter((store) => store.id !== 'all').map((store) => {
        const count = products.filter((product) => product.store === store.id).length;
        return <TouchableOpacity key={store.id} style={[styles.storeCard, storeId === store.id && styles.storeCardSelected]} onPress={() => { setStoreId(store.id); setTab('Shop'); }} accessibilityRole="button">
          <Text style={styles.storeIcon}>{store.icon}</Text><View style={styles.storeCopy}><Text style={styles.storeName}>{store.name}</Text><Text style={styles.muted}>{store.area}</Text><Text style={styles.storeCount}>{count} products available  ·  Select store →</Text></View>
        </TouchableOpacity>;
      })}
      <TouchableOpacity style={styles.secondaryButton} onPress={() => { setStoreId('all'); setTab('Shop'); }}><Text style={styles.secondaryButtonText}>Browse all stores</Text></TouchableOpacity>
    </>;
  }

  function renderCart() {
    return <>
      <Text style={styles.pageTitle}>Your cart</Text><Text style={styles.pageIntro}>{cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag</Text>
      {cartItems.length === 0 ? <View style={styles.emptyState}><Text style={styles.emptyEmoji}>🛒</Text><Text style={styles.emptyTitle}>Your cart is waiting</Text><Text style={styles.muted}>Add something you love from the shop.</Text><TouchableOpacity style={styles.heroButton} onPress={goToShop}><Text style={styles.heroButtonText}>Browse products</Text></TouchableOpacity></View> : <>
        {cartItems.map((product) => <View key={product.id} style={styles.cartRow}><View style={[styles.cartArt, { backgroundColor: product.color || '#EAE8FF' }]}><Text style={styles.cartEmoji}>{product.emoji || '📦'}</Text></View><View style={styles.cartDetails}><Text style={styles.productName}>{product.name}</Text><Text style={styles.muted}>{money(product.price)} each</Text><Text style={styles.stockLine}>{getStore(product.store).name}</Text></View><View style={styles.qtyBox}><TouchableOpacity onPress={() => changeQuantity(product.id, -1)} style={styles.qtyButton} accessibilityRole="button" accessibilityLabel={`Remove one ${product.name}`}><Text style={styles.qtyButtonText}>−</Text></TouchableOpacity><Text style={styles.qtyText}>{cart[product.id]}</Text><TouchableOpacity onPress={() => changeQuantity(product.id, 1)} style={styles.qtyButton} accessibilityRole="button" accessibilityLabel={`Add one ${product.name}`}><Text style={styles.qtyButtonText}>+</Text></TouchableOpacity></View><Text style={styles.lineTotal}>{money(product.price * cart[product.id])}</Text></View>)}
        <View style={styles.summaryCard}><View style={styles.summaryLine}><Text style={styles.muted}>Subtotal</Text><Text style={styles.summaryValue}>{money(subtotal)}</Text></View><View style={styles.summaryLine}><Text style={styles.muted}>Delivery</Text><Text style={styles.freeText}>{subtotal >= 999 ? 'FREE' : money(99)}</Text></View><View style={styles.divider} /><View style={styles.summaryLine}><Text style={styles.summaryTotalLabel}>Total</Text><Text style={styles.summaryTotal}>{money(subtotal + (subtotal >= 999 ? 0 : 99))}</Text></View><TouchableOpacity style={styles.primaryButton} onPress={() => setNotice('Demo checkout only — connect a payment provider to accept orders.')}><Text style={styles.primaryButtonText}>Continue to checkout</Text></TouchableOpacity><Text style={styles.checkoutNote}>Checkout is a demo. No payment will be taken.</Text></View>
      </>}
    </>;
  }

  function renderAddItem() {
    return <>
      <Text style={styles.pageTitle}>Add a product</Text><Text style={styles.pageIntro}>Create a listing for your store. It will appear in the shop on this device.</Text>
      <View style={styles.formCard}>
        <Text style={styles.inputLabel}>PRODUCT NAME *</Text><TextInput value={itemName} onChangeText={setItemName} placeholder="e.g. Nova X Pro" placeholderTextColor="#999AA3" style={styles.formInput} />
        <Text style={styles.inputLabel}>PRICE (₹) *</Text><TextInput value={itemPrice} onChangeText={setItemPrice} placeholder="e.g. 24999" placeholderTextColor="#999AA3" keyboardType="numeric" style={styles.formInput} />
        <Text style={styles.inputLabel}>CATEGORY</Text><View style={styles.formChips}>{categories.filter((name) => name !== 'All').map((name) => <TouchableOpacity key={name} onPress={() => setItemCategory(name)} style={[styles.chip, itemCategory === name && styles.chipActive]}><Text style={[styles.chipText, itemCategory === name && styles.chipTextActive]}>{name}</Text></TouchableOpacity>)}</View>
        <Text style={styles.inputLabel}>STORE</Text><View style={styles.formChips}>{stores.filter((store) => store.id !== 'all').map((store) => <TouchableOpacity key={store.id} onPress={() => setItemStore(store.id)} style={[styles.chip, itemStore === store.id && styles.chipActive]}><Text style={[styles.chipText, itemStore === store.id && styles.chipTextActive]}>{store.name}</Text></TouchableOpacity>)}</View>
        <Text style={styles.inputLabel}>DESCRIPTION</Text><TextInput value={itemDescription} onChangeText={setItemDescription} placeholder="A short description for customers" placeholderTextColor="#999AA3" style={[styles.formInput, styles.descriptionInput]} multiline />
        <TouchableOpacity style={styles.primaryButton} onPress={saveNewProduct}><Text style={styles.primaryButtonText}>Add product to shop</Text></TouchableOpacity>
        <Text style={styles.formNote}>This demo stores listings in app memory only. Connect an API and database to save them for every customer.</Text>
      </View>
    </>;
  }

  function renderMore() {
    return <>
      <Text style={styles.pageTitle}>More</Text><Text style={styles.pageIntro}>Manage your marketplace experience.</Text>
      <TouchableOpacity style={styles.menuCard} onPress={() => setTab('Add Item')}><Text style={styles.menuIcon}>＋</Text><View style={styles.menuCopy}><Text style={styles.storeName}>Add a product</Text><Text style={styles.muted}>Create a listing for the shop</Text></View><Text style={styles.menuArrow}>→</Text></TouchableOpacity>
      <View style={styles.menuCard}><Text style={styles.menuIcon}>👤</Text><View style={styles.menuCopy}><Text style={styles.storeName}>Account</Text><Text style={styles.muted}>Sign-in and profile can be added later</Text></View></View>
      <View style={styles.menuCard}><Text style={styles.menuIcon}>❔</Text><View style={styles.menuCopy}><Text style={styles.storeName}>Help & support</Text><Text style={styles.muted}>Customer help and order support</Text></View></View>
    </>;
  }

  function renderDetails() {
    const product = selectedProduct;
    if (!product) return null;
    return <>
      <TouchableOpacity onPress={() => setSelectedProduct(null)} style={styles.backButton}><Text style={styles.backButtonText}>←  Back to shop</Text></TouchableOpacity>
      <View style={[styles.detailArt, { backgroundColor: product.color || '#EAE8FF' }]}><Text style={styles.detailEmoji}>{product.emoji || '📦'}</Text></View>
      <Text style={styles.productCategory}>{product.category.toUpperCase()}  ·  ★ {product.rating || 'New'}</Text><Text style={styles.detailTitle}>{product.name}</Text><Text style={styles.detailPrice}>{money(product.price)}</Text>
      <Text style={styles.detailDescription}>{product.description || 'Product details will be added soon.'}</Text>
      <View style={styles.storeDetail}><Text style={styles.storeIcon}>{getStore(product.store).icon}</Text><View><Text style={styles.storeName}>{getStore(product.store).name}</Text><Text style={styles.muted}>Available for local store pickup</Text></View></View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => addToCart(product)}><Text style={styles.primaryButtonText}>Add to cart · {money(product.price)}</Text></TouchableOpacity>
    </>;
  }

  const tabItems = [
    { name: 'Home', icon: '⌂' }, { name: 'Shop', icon: '▦' }, { name: 'Stores', icon: '⌖' }, { name: 'Cart', icon: '🛒' }, { name: 'More', icon: '•••' },
  ];
  const pageTitle = selectedProduct ? 'Product details' : tab;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.brandRow} onPress={() => { setSelectedProduct(null); setTab('Home'); }} accessibilityRole="button" accessibilityLabel="TDP Store home">
            <View style={styles.brandMark}><Text style={styles.brandMarkText}>T</Text></View><Text style={styles.brand}>tdp<Text style={styles.brandAccent}>store</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCart} onPress={() => { setSelectedProduct(null); setTab('Cart'); }} accessibilityRole="button" accessibilityLabel={`Open cart, ${cartCount} items`}><Text style={styles.topCartText}>🛒  Cart{cartCount > 0 ? ` (${cartCount})` : ''}</Text></TouchableOpacity>
        </View>
        {notice ? <View style={styles.notice}><Text style={styles.noticeText}>{notice}</Text></View> : null}
        <Text accessibilityLabel={`${pageTitle} page`} style={styles.srOnly}>{pageTitle}</Text>
        {selectedProduct ? renderDetails() : tab === 'Home' ? renderHome() : tab === 'Shop' ? renderShop() : tab === 'Stores' ? renderStores() : tab === 'Cart' ? renderCart() : tab === 'Add Item' ? renderAddItem() : renderMore()}
      </ScrollView>
      <View style={styles.bottomNav}>
        {tabItems.map((item) => {
          const active = item.name === tab || (item.name === 'More' && tab === 'Add Item');
          return <TouchableOpacity key={item.name} onPress={() => { setSelectedProduct(null); setTab(item.name); }} style={styles.navItem} accessibilityRole="button" accessibilityState={{ selected: active }}>
            <View style={styles.navIconWrap}><Text style={[styles.navIcon, active && styles.navIconActive]}>{item.icon}</Text>{item.name === 'Cart' && cartCount > 0 ? <View style={styles.navBadge}><Text style={styles.navBadgeText}>{cartCount}</Text></View> : null}</View>
            <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.name}</Text>
          </TouchableOpacity>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F8F6' },
  page: { width: '100%', maxWidth: 1080, alignSelf: 'center', paddingHorizontal: 20, paddingBottom: 26, flexGrow: 1 },
  topBar: { minHeight: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 }, brandMark: { width: 34, height: 34, borderRadius: 12, backgroundColor: '#6458E8', alignItems: 'center', justifyContent: 'center' }, brandMarkText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  brand: { color: '#20212A', fontSize: 22, fontWeight: '800', letterSpacing: -1 }, brandAccent: { color: '#6458E8' },
  topCart: { paddingHorizontal: 13, paddingVertical: 10, borderRadius: 13, backgroundColor: '#FFFFFF' }, topCartText: { color: '#30313A', fontSize: 12, fontWeight: '700' },
  delivery: { flexDirection: 'row', alignItems: 'center', paddingBottom: 14, gap: 7 }, deliveryText: { color: '#777984', fontSize: 12 }, deliveryStrong: { color: '#353640', fontWeight: '700' }, changeLink: { color: '#6458E8', fontSize: 11, fontWeight: '700' },
  hero: { minHeight: 220, borderRadius: 25, backgroundColor: '#EAE8FF', padding: 23, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }, heroCopy: { flex: 1, zIndex: 1 }, eyebrow: { color: '#6458E8', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  heroTitle: { color: '#20212A', fontSize: 34, fontWeight: '800', lineHeight: 39, letterSpacing: -1.3, marginTop: 8 }, heroSubtitle: { color: '#646575', fontSize: 12, marginTop: 7 }, heroButton: { alignSelf: 'flex-start', backgroundColor: '#6458E8', paddingHorizontal: 14, paddingVertical: 11, borderRadius: 12, marginTop: 15 }, heroButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  heroArt: { width: 88, height: 88, borderRadius: 30, backgroundColor: '#D7D3FF', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '9deg' }] }, heroEmoji: { fontSize: 50 }, heroSparkle: { position: 'absolute', color: '#FFB84D', fontSize: 25, top: -10, right: 0 },
  pageTitle: { color: '#252630', fontSize: 25, fontWeight: '800', letterSpacing: -0.7, marginTop: 12 }, pageIntro: { color: '#777984', fontSize: 12, lineHeight: 18, marginTop: 5, marginBottom: 14 },
  sectionHeading: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 23, marginBottom: 11 }, sectionTitle: { color: '#262730', fontSize: 16, fontWeight: '800', letterSpacing: -0.3 }, sectionHint: { color: '#7B7C87', fontSize: 10, fontWeight: '600' },
  chipRow: { gap: 8, paddingVertical: 2, paddingRight: 5 }, chip: { borderRadius: 20, borderWidth: 1, borderColor: '#E6E6E9', backgroundColor: '#FFFFFF', paddingHorizontal: 13, paddingVertical: 9 }, chipActive: { backgroundColor: '#272832', borderColor: '#272832' }, chipText: { color: '#61626C', fontSize: 11, fontWeight: '600' }, chipTextActive: { color: '#FFFFFF' }, filterLabel: { color: '#858691', fontSize: 9, fontWeight: '800', letterSpacing: 1.2, marginTop: 17, marginBottom: 7 },
  searchBox: { height: 48, borderRadius: 14, backgroundColor: '#FFFFFF', marginTop: 5, marginBottom: 7, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1, borderColor: '#EEEEF0' }, searchIcon: { fontSize: 23, color: '#777984', lineHeight: 27 }, searchInput: { flex: 1, color: '#252630', fontSize: 12 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 11 }, productCard: { width: '48%', flexGrow: 1, flexBasis: '43%', maxWidth: 520, borderRadius: 17, backgroundColor: '#FFFFFF', overflow: 'hidden', borderWidth: 1, borderColor: '#EEEEF0' }, productArt: { height: 130, alignItems: 'center', justifyContent: 'center', position: 'relative' }, productEmoji: { fontSize: 58 }, productTag: { position: 'absolute', top: 9, left: 9, borderRadius: 7, backgroundColor: '#FFFFFF', paddingHorizontal: 7, paddingVertical: 5 }, productTagText: { color: '#4E4F59', fontSize: 7, fontWeight: '800', letterSpacing: 0.4 }, productInfo: { padding: 11 }, productCategory: { color: '#888995', fontSize: 8, fontWeight: '700', letterSpacing: 0.4 }, productName: { color: '#292A33', fontSize: 13, fontWeight: '700', marginTop: 5 }, productPrice: { color: '#252630', fontSize: 14, fontWeight: '800', marginTop: 6 }, stockLine: { color: '#83848F', fontSize: 9, marginTop: 4 }, addButton: { minHeight: 34, borderRadius: 10, backgroundColor: '#F0EEFF', alignItems: 'center', justifyContent: 'center', marginTop: 10 }, addButtonText: { color: '#5D52D1', fontSize: 10, fontWeight: '700' },
  promise: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15, borderRadius: 16, backgroundColor: '#FFFFFF', marginTop: 22 }, promiseIcon: { fontSize: 22 }, promiseTitle: { color: '#30313A', fontSize: 11, fontWeight: '700' }, muted: { color: '#858691', fontSize: 10, marginTop: 4, lineHeight: 15 },
  storeCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEEEF0', marginTop: 10 }, storeCardSelected: { borderColor: '#8176EA' }, storeIcon: { fontSize: 27 }, storeCopy: { flex: 1 }, storeName: { color: '#30313A', fontSize: 13, fontWeight: '700' }, storeCount: { color: '#6458E8', fontSize: 10, fontWeight: '700', marginTop: 7 }, secondaryButton: { borderWidth: 1, borderColor: '#DEDDE7', borderRadius: 12, minHeight: 43, alignItems: 'center', justifyContent: 'center', marginTop: 14 }, secondaryButtonText: { color: '#504A9A', fontSize: 11, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 34 }, emptyEmoji: { fontSize: 34 }, emptyTitle: { color: '#292A33', fontSize: 16, fontWeight: '700', marginTop: 8 },
  cartRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10, padding: 11, borderRadius: 15, backgroundColor: '#FFFFFF', marginTop: 10, borderWidth: 1, borderColor: '#EEEEF0' }, cartArt: { width: 55, height: 55, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, cartEmoji: { fontSize: 28 }, cartDetails: { flex: 1, minWidth: 105 }, qtyBox: { flexDirection: 'row', alignItems: 'center', gap: 8 }, qtyButton: { width: 27, height: 27, borderRadius: 9, backgroundColor: '#F0EEFF', alignItems: 'center', justifyContent: 'center' }, qtyButtonText: { color: '#5D52D1', fontSize: 17, fontWeight: '700', lineHeight: 20 }, qtyText: { color: '#30313A', fontSize: 11, fontWeight: '700' }, lineTotal: { minWidth: 65, textAlign: 'right', color: '#30313A', fontSize: 11, fontWeight: '800' },
  summaryCard: { padding: 16, backgroundColor: '#FFFFFF', borderRadius: 16, marginTop: 15, borderWidth: 1, borderColor: '#EEEEF0' }, summaryLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }, summaryValue: { color: '#383943', fontSize: 11, fontWeight: '600' }, freeText: { color: '#298653', fontSize: 10, fontWeight: '700' }, divider: { height: 1, backgroundColor: '#EEEEF0', marginVertical: 8 }, summaryTotalLabel: { color: '#252630', fontSize: 13, fontWeight: '800' }, summaryTotal: { color: '#252630', fontSize: 16, fontWeight: '800' }, primaryButton: { minHeight: 45, backgroundColor: '#6458E8', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 13 }, primaryButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' }, checkoutNote: { textAlign: 'center', color: '#858691', fontSize: 9, marginTop: 8 },
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 17, padding: 15, borderWidth: 1, borderColor: '#EEEEF0', marginTop: 5 }, inputLabel: { color: '#777984', fontSize: 9, fontWeight: '800', letterSpacing: 0.8, marginTop: 12, marginBottom: 6 }, formInput: { minHeight: 43, borderWidth: 1, borderColor: '#E6E6E9', borderRadius: 10, paddingHorizontal: 11, color: '#252630', fontSize: 12 }, descriptionInput: { minHeight: 74, textAlignVertical: 'top', paddingTop: 10 }, formChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 }, formNote: { color: '#858691', fontSize: 9, lineHeight: 14, marginTop: 10 },
  menuCard: { minHeight: 69, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13, borderRadius: 15, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEEEF0', marginTop: 10 }, menuIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F0EEFF', color: '#6458E8', textAlign: 'center', textAlignVertical: 'center', fontSize: 21, overflow: 'hidden' }, menuCopy: { flex: 1 }, menuArrow: { color: '#858691', fontSize: 18 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 8 }, backButtonText: { color: '#6458E8', fontSize: 12, fontWeight: '700' }, detailArt: { height: 250, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginTop: 7, marginBottom: 18 }, detailEmoji: { fontSize: 100 }, detailTitle: { color: '#252630', fontSize: 25, fontWeight: '800', marginTop: 7 }, detailPrice: { color: '#252630', fontSize: 20, fontWeight: '800', marginTop: 7 }, detailDescription: { color: '#656671', fontSize: 12, lineHeight: 19, marginTop: 12 }, storeDetail: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 13, marginTop: 18 },
  notice: { backgroundColor: '#272832', padding: 10, borderRadius: 10, marginBottom: 10 }, noticeText: { color: '#FFFFFF', fontSize: 11, textAlign: 'center' }, bottomNav: { minHeight: 61, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#EEEEF0', paddingHorizontal: 4, paddingBottom: 4 }, navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 }, navIconWrap: { position: 'relative' }, navIcon: { color: '#858691', fontSize: 17, fontWeight: '700' }, navIconActive: { color: '#6458E8' }, navLabel: { color: '#858691', fontSize: 9, fontWeight: '600' }, navLabelActive: { color: '#6458E8', fontWeight: '800' }, navBadge: { position: 'absolute', top: -5, right: -9, minWidth: 14, height: 14, borderRadius: 7, backgroundColor: '#EF635B', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 }, navBadgeText: { color: '#FFFFFF', fontSize: 8, fontWeight: '800' }, srOnly: { height: 0, overflow: 'hidden' },
});
