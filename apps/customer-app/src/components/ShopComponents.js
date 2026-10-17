import { ScrollView, TouchableOpacity, View } from 'react-native';
import Text from './AppText';

export function ProductCard({ product, styles, favorites, onOpen, onToggleFavorite, onAdd, getStore, money }) {
  const isFavorite = favorites.includes(product.id);
  return (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => onOpen(product)} accessibilityRole="button" accessibilityLabel={`View ${product.name}`}>
        <View style={[styles.productArt, { backgroundColor: product.color || '#EAE8FF' }]}>
          <Text style={styles.productEmoji}>{product.emoji || '📦'}</Text>
          <View style={styles.productTag}><Text style={styles.productTagText}>{product.tag || 'IN STORE'}</Text></View>
          <TouchableOpacity onPress={() => onToggleFavorite(product.id)} style={styles.favoriteButton} accessibilityRole="button" accessibilityLabel={isFavorite ? 'Remove from favourites' : 'Add to favourites'}>
            <Text style={styles.favoriteButtonText}>{isFavorite ? String.fromCharCode(9829) : String.fromCharCode(9825)}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{product.category.toUpperCase()}  ·  ★ {product.rating || 'New'}</Text>
        <TouchableOpacity onPress={() => onOpen(product)}><Text numberOfLines={1} style={styles.productName}>{product.name}</Text></TouchableOpacity>
        <Text style={styles.productPrice}>{money(product.price)}</Text>
        <Text style={styles.stockLine}>Available at {getStore(product.store).name}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => onAdd(product)} accessibilityRole="button">
          <Text style={styles.addButtonText}>+  Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function ProductGrid({ items, ...cardProps }) {
  if (items.length === 0) {
    return <View style={cardProps.styles.emptyState}><Text style={cardProps.styles.emptyEmoji}>🔎</Text><Text style={cardProps.styles.emptyTitle}>No gadgets found</Text><Text style={cardProps.styles.muted}>Try a different search or filter.</Text></View>;
  }
  return <View style={cardProps.styles.productGrid}>{items.map((product) => <ProductCard key={product.id} product={product} {...cardProps} />)}</View>;
}

export function StorePicker({ styles, stores, value, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
      {stores.map((store) => <TouchableOpacity key={store.id} onPress={() => onChange(store.id)} style={[styles.chip, value === store.id && styles.chipActive]} accessibilityRole="button" accessibilityState={{ selected: value === store.id }}><Text style={[styles.chipText, value === store.id && styles.chipTextActive]}>{store.name}</Text></TouchableOpacity>)}
    </ScrollView>
  );
}

export function CategoryPicker({ styles, value, onChange, options }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
      {options.map((name) => <TouchableOpacity key={name} onPress={() => onChange(name)} style={[styles.chip, value === name && styles.chipActive]} accessibilityRole="button" accessibilityState={{ selected: value === name }}><Text style={[styles.chipText, value === name && styles.chipTextActive]}>{name}</Text></TouchableOpacity>)}
    </ScrollView>
  );
}
