import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useShop } from '../context/ShopDataContext';

export const C = { bg: '#071326', panel: '#101F36', raised: '#152944', line: '#223A59', text: '#F3F7FF', muted: '#9BAEC9', blue: '#53A5FF', cyan: '#48D4E3', green: '#54D6A0', amber: '#FFCA71', red: '#FF7A91' };
export const S = {
 page: { flex: 1, backgroundColor: C.bg }, content: { padding: 20, paddingBottom: 32, width: '100%', maxWidth: 1120, alignSelf: 'center' },
 brand: { flexDirection: 'row', alignItems: 'center', marginBottom: 27 }, mark: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#143760', borderWidth: 1, borderColor: '#2F649B', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
 markText: { color: C.blue, fontSize: 17, fontWeight: '800' }, brandTitle: { color: C.text, fontSize: 13, fontWeight: '800', letterSpacing: .5 }, brandSub: { color: C.muted, fontSize: 11, marginTop: 4 },
 online: { marginLeft: 'auto', backgroundColor: '#153A36', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 20 }, onlineText: { color: C.green, fontSize: 10, fontWeight: '800' },
 title: { color: C.text, fontSize: 27, fontWeight: '800', letterSpacing: -.5 }, subtitle: { color: C.muted, fontSize: 13, marginTop: 6, marginBottom: 22, lineHeight: 20 },
 section: { color: C.text, fontWeight: '800', fontSize: 16, marginTop: 24, marginBottom: 12 }, card: { backgroundColor: C.panel, borderWidth: 1, borderColor: C.line, borderRadius: 18, padding: 16 },
 row: { flexDirection: 'row', alignItems: 'center' }, spread: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 11 },
 metric: { flexGrow: 1, flexBasis: 145, backgroundColor: C.panel, borderColor: C.line, borderWidth: 1, borderRadius: 17, padding: 15, minHeight: 112 },
 metricLabel: { color: C.muted, fontSize: 11, fontWeight: '700' }, metricValue: { color: C.text, fontSize: 25, fontWeight: '800', marginTop: 12 }, metricFoot: { color: C.green, fontSize: 10, marginTop: 4 },
 banner: { borderRadius: 20, padding: 20, marginBottom: 17 }, eyebrow: { color: '#C7E3FF', fontSize: 10, fontWeight: '800', letterSpacing: 1 }, bannerTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', marginTop: 8 }, bannerCopy: { color: '#D8E9FF', fontSize: 13, lineHeight: 20, marginTop: 6 },
 btn: { backgroundColor: '#287BCC', paddingVertical: 11, paddingHorizontal: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, btnText: { color: '#FFF', fontSize: 12, fontWeight: '800' }, secondary: { backgroundColor: C.raised, borderWidth: 1, borderColor: C.line, padding: 11, borderRadius: 12, alignItems: 'center' }, secondaryText: { color: C.text, fontWeight: '700', fontSize: 12 },
 dividerRow: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: C.line }, orderId: { color: C.text, fontSize: 13, fontWeight: '800' }, small: { color: C.muted, fontSize: 11, marginTop: 4 }, price: { color: C.text, fontWeight: '800', fontSize: 13 },
 badge: { paddingVertical: 5, paddingHorizontal: 9, borderRadius: 18, alignSelf: 'flex-start' }, badgeText: { fontSize: 10, fontWeight: '800' },
 chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }, chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: C.raised, borderWidth: 1, borderColor: C.line }, chipOn: { backgroundColor: '#1B4E83', borderColor: '#367DC0' }, chipText: { color: C.muted, fontSize: 11, fontWeight: '700' }, chipTextOn: { color: '#FFF' },
 input: { backgroundColor: '#0C192C', borderWidth: 1, borderColor: C.line, color: C.text, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, fontSize: 13, marginTop: 6, marginBottom: 13 }, label: { color: C.muted, fontSize: 10, fontWeight: '800', marginTop: 3 },
 productRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.line, gap: 10 }, glyph: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#183452', alignItems: 'center', justifyContent: 'center' }, glyphText: { color: C.cyan, fontWeight: '800', fontSize: 17 }, name: { color: C.text, fontSize: 12, fontWeight: '800' }, stockNum: { color: C.text, fontSize: 15, minWidth: 25, textAlign: 'center', fontWeight: '800' }, adjust: { backgroundColor: C.raised, width: 31, height: 31, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
 avatar: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#1C4D7D', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#D8EBFF', fontWeight: '800', fontSize: 11 },
 modalShade: { flex: 1, justifyContent: 'center', padding: 18, backgroundColor: 'rgba(1,8,20,.8)' }, modal: { backgroundColor: C.panel, borderWidth: 1, borderColor: C.line, borderRadius: 20, padding: 20, width: '100%', maxWidth: 460, alignSelf: 'center' },
};

export function Page({ title, subtitle, children }) {
 const { isOpen } = useShop();
 return <SafeAreaView style={S.page} edges={['top']}><ScrollView contentContainerStyle={S.content} keyboardShouldPersistTaps="handled">
  <View style={S.brand}><View style={S.mark}><Text style={S.markText}>T</Text></View><View><Text style={S.brandTitle}>TDP STORE PARTNER</Text><Text style={S.brandSub}>Tech Station · Colombo</Text></View><View style={[S.online, !isOpen && { backgroundColor: '#492733' }]}><Text style={[S.onlineText, !isOpen && { color: C.red }]}>{isOpen ? '● OPEN' : '● PAUSED'}</Text></View></View>
  <Text style={S.title}>{title}</Text><Text style={S.subtitle}>{subtitle}</Text>{children}
 </ScrollView></SafeAreaView>;
}
export function Card({ children, style }) { return <View style={[S.card, style]}>{children}</View>; }
export function Section({ children }) { return <Text style={S.section}>{children}</Text>; }
export function Button({ label, onPress, secondary, style }) { return <Pressable onPress={onPress} style={[secondary ? S.secondary : S.btn, style]}><Text style={secondary ? S.secondaryText : S.btnText}>{label}</Text></Pressable>; }
export function Badge({ value }) {
 const palette = {
  New: [C.blue, '#173D64'], Preparing: [C.amber, '#493A24'], Ready: [C.cyan, '#17444D'], Completed: [C.green, '#183F37'],
  'Low stock': [C.red, '#4A2635'], 'Out of stock': [C.red, '#4A2635'], 'In stock': [C.green, '#183F37'], Owner: [C.blue, '#173D64'],
  'Ready for pickup': [C.cyan, '#17444D'], 'Picked up': [C.blue, '#173D64'], 'In transit': [C.amber, '#493A24'], 'Out for delivery': [C.cyan, '#17444D'], Delivered: [C.green, '#183F37'],
 };
 const tone = palette[value] || [C.muted, C.raised];
 return <View style={[S.badge, { backgroundColor: tone[1] }]}><Text style={[S.badgeText, { color: tone[0] }]}>{value}</Text></View>;
}
export function Metric({ label, value, foot }) { return <View style={S.metric}><Text style={S.metricLabel}>{label}</Text><Text style={S.metricValue}>{value}</Text><Text style={S.metricFoot}>{foot}</Text></View>; }
