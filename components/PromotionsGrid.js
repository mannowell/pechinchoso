// components/PromotionsGrid.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, Pressable, ScrollView,
  Linking, ActivityIndicator, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { scrapePromotions } from '../services/scraperService';
import { getUnifiedDeals } from '../services/apiService';
import { addFavorite, removeFavorite, isFavorite } from '../services/favoritesService';

export default function PromotionsGrid({ category = 'geral', title = 'Melhores Pechinchas 🔥' }) {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [filter, setFilter] = useState('todos'); // 'todos' | 'desconto' | 'novidade'

  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      const [apiDeals, scraped] = await Promise.all([
        getUnifiedDeals(category),
        scrapePromotions('Portugal promoções saldos 2026'),
      ]);
      const combined = [...apiDeals.slice(0, 6), ...scraped.slice(0, 4)];
      setPromotions(combined);

      // Carrega estado de favoritos para cada item
      const favMap = {};
      await Promise.all(
        combined.map(async (item) => {
          favMap[item.id] = await isFavorite(item.id);
        })
      );
      setFavorites(favMap);
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handlePress = async (item) => {
    if (item.link?.startsWith('http')) {
      try {
        await Linking.openURL(item.link);
      } catch (err) {
        console.error("Couldn't open URL", err);
      }
    }
  };

  const handleFavorite = async (item) => {
    if (favorites[item.id]) {
      await removeFavorite(item.id);
      setFavorites(prev => ({ ...prev, [item.id]: false }));
    } else {
      await addFavorite(item);
      setFavorites(prev => ({ ...prev, [item.id]: true }));
      Alert.alert('💛 Adicionado!', `"${item.title.substring(0, 40)}..." guardado nos favoritos.`);
    }
  };

  const filtered = promotions.filter(p => {
    if (filter === 'desconto') return p.savings > 0;
    if (filter === 'novidade') return p.source === 'Pplware' || p.source === 'Open Food Facts';
    return true;
  });

  const renderCard = (item) => (
    <View key={item.id} style={styles.cardWrapper}>
      <Pressable style={styles.card} onPress={() => handlePress(item)}>
        <LinearGradient
          colors={getSavingsGradient(item.savings)}
          style={styles.cardGradient}
        >
          {/* Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>
              {typeof item.image === 'string' && !item.image.startsWith('http')
                ? item.image
                : '🏷️'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              {item.savings > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>-{item.savings}%</Text>
                </View>
              )}
              <Pressable onPress={() => handleFavorite(item)} hitSlop={8}>
                <Text style={{ fontSize: 20 }}>{favorites[item.id] ? '💛' : '🤍'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Content */}
          <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>

          {/* Footer */}
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.priceText}>{item.price}</Text>
              {item.normalPrice && (
                <Text style={styles.normalPrice}>{item.normalPrice}</Text>
              )}
            </View>
            <Text style={styles.sourceChip}>{item.source || '🌐'}</Text>
          </View>

          <Text style={styles.ctaText}>Aproveitar Agora →</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {/* Filtros */}
      <View style={styles.filters}>
        {['todos', 'desconto', 'novidade'].map(f => (
          <Pressable
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterActiveText]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </Pressable>
        ))}
        <Pressable style={styles.refreshBtn} onPress={fetchDeals}>
          <Text style={styles.refreshText}>↻</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="white" size="large" />
          <Text style={styles.loadingText}>A buscar as melhores pechinchas...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma oferta encontrada para este filtro.</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {filtered.map(renderCard)}
        </ScrollView>
      )}
    </View>
  );
}

// Gradiente muda com base no desconto
const getSavingsGradient = (savings) => {
  if (savings >= 50) return ['#c0392b', '#e74c3c'];
  if (savings >= 20) return ['#FF6B35', '#FF9F1C'];
  return ['#2980b9', '#3498db'];
};

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 20, fontWeight: 'bold', color: 'white',
    marginLeft: 20, marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3,
  },
  filters: {
    flexDirection: 'row', paddingHorizontal: 20, marginBottom: 12, gap: 8, alignItems: 'center',
  },
  filterBtn: {
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  filterActive: { backgroundColor: 'white' },
  filterText: { color: 'white', fontSize: 13, fontWeight: '500' },
  filterActiveText: { color: '#FF6B35', fontWeight: 'bold' },
  refreshBtn: {
    marginLeft: 'auto', backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  refreshText: { color: 'white', fontSize: 16 },
  loadingContainer: { padding: 30, alignItems: 'center' },
  loadingText: { color: 'white', marginTop: 10, fontSize: 14 },
  emptyText: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', padding: 20 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 5 },
  cardWrapper: { marginRight: 15 },
  card: { width: 270, borderRadius: 20, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
  cardGradient: { padding: 18, minHeight: 200 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardIcon: { fontSize: 30 },
  badge: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  cardTitle: { color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 6, lineHeight: 20 },
  cardDescription: { color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 16, marginBottom: 10, flex: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  priceText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  normalPrice: { color: 'rgba(255,255,255,0.6)', fontSize: 11, textDecorationLine: 'line-through' },
  sourceChip: { backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  ctaText: { color: 'white', fontWeight: 'bold', fontSize: 13, textAlign: 'right' },
});
