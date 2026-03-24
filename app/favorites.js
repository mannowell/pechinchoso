// app/favorites.js
// Ecrã de favoritos — mostra as ofertas guardadas pelo utilizador
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, Pressable,
  Linking, SafeAreaView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { getFavorites, removeFavorite } from '../services/favoritesService';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    const data = await getFavorites();
    setFavorites(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemove = async (id, title) => {
    Alert.alert(
      '🗑️ Remover Favorito',
      `Remover "${title.substring(0, 40)}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover', style: 'destructive',
          onPress: async () => {
            const updated = await removeFavorite(id);
            setFavorites(updated);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => item.link?.startsWith('http') && Linking.openURL(item.link)}>
      <LinearGradient colors={['#FF6B35', '#FF9F1C']} style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.icon}>
            {typeof item.image === 'string' && !item.image.startsWith('http')
              ? item.image : '🏷️'}
          </Text>
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.source}>{item.source || 'Pechinchoso'}</Text>
          </View>
          <Pressable onPress={() => handleRemove(item.id, item.title)} hitSlop={10}>
            <Text style={styles.removeBtn}>🗑️</Text>
          </Pressable>
        </View>
        <Text style={styles.savedAt}>
          Guardado: {new Date(item.savedAt).toLocaleDateString('pt-PT')}
        </Text>
        <Text style={styles.openLink}>Abrir Oferta →</Text>
      </LinearGradient>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FF6B35', '#FF9F1C']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Text style={styles.backBtn}>← Voltar</Text>
          </Pressable>
          <Text style={styles.headerTitle}>💛 Os Meus Favoritos</Text>
          <Text style={styles.count}>{favorites.length} {favorites.length === 1 ? 'item' : 'items'}</Text>
        </View>

        {loading ? (
          <Text style={styles.empty}>A carregar...</Text>
        ) : favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.empty}>Ainda não tem favoritos guardados.</Text>
            <Text style={styles.emptySub}>
              Toque em 🤍 em qualquer oferta para guardá-la aqui.
            </Text>
            <Pressable style={styles.goBackBtn} onPress={() => router.back()}>
              <Text style={styles.goBackText}>Ver Ofertas</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  backBtn: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  count: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  list: { paddingHorizontal: 16, paddingBottom: 30 },
  card: { borderRadius: 16, padding: 16, marginBottom: 12, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  icon: { fontSize: 30 },
  info: { flex: 1 },
  title: { color: 'white', fontWeight: 'bold', fontSize: 14, lineHeight: 20 },
  price: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: '600', marginTop: 2 },
  source: { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 },
  removeBtn: { fontSize: 20, paddingLeft: 4 },
  savedAt: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 8 },
  openLink: { color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'right', marginTop: 4 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  empty: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  emptySub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 20 },
  goBackBtn: { marginTop: 20, backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25 },
  goBackText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
});
