// app/search.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, ActivityIndicator, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scrapePromotions } from '../services/scraperService';
import { addFavorite, removeFavorite, isFavorite } from '../services/favoritesService';

export default function SearchResultsScreen() {
  const { q } = useLocalSearchParams();
  const router = useRouter();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritesMap, setFavoritesMap] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      if (!q) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const results = await scrapePromotions(q);
      setPromotions(results);

      // Check favorites
      const fMap = {};
      await Promise.all(
        results.map(async (item) => {
          fMap[item.id] = await isFavorite(item.id);
        })
      );
      setFavoritesMap(fMap);

      setLoading(false);
    };

    fetchResults();
  }, [q]);

  const handleFavorite = async (item) => {
    if (favoritesMap[item.id]) {
        await removeFavorite(item.id);
        setFavoritesMap(prev => ({ ...prev, [item.id]: false }));
    } else {
        await addFavorite(item);
        setFavoritesMap(prev => ({ ...prev, [item.id]: true }));
    }
  };

  const openDeal = async (url) => {
    try {
        await Linking.openURL(url);
    } catch(err) {
        console.error("Failed to open deal", err);
    }
  }

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => openDeal(item.link)}>
      <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{item.image || '🔍'}</Text>
          <View style={styles.cardHeaderRight}>
              {item.savings > 0 && (
                 <View style={styles.badge}>
                     <Text style={styles.badgeText}>-{item.savings}%</Text>
                 </View>
              )}
              <Pressable onPress={() => handleFavorite(item)} hitSlop={10} style={styles.favBtn}>
                  <Text style={{ fontSize: 20 }}>{favoritesMap[item.id] ? '💛' : '🤍'}</Text>
              </Pressable>
          </View>
      </View>

      <Text style={styles.dealTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.dealDescription} numberOfLines={2}>{item.description}</Text>
      
      <View style={styles.cardFooter}>
          <Text style={styles.dealPrice}>{item.price}</Text>
          <Text style={styles.sourceChip}>{item.source}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#2980b9', '#3498db']} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Resultados para "{q}"</Text>
        <Text style={styles.headerSubtitle}>Procurando nas lojas de Portugal 🇵🇹</Text>
      </LinearGradient>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={styles.loadingText}>A procurar as melhores ofertas...</Text>
          </View>
        ) : (
          <FlatList
            data={promotions}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                  <Text style={styles.emptyIcon}>🤷‍♂️</Text>
                  <Text style={styles.emptyText}>Não encontrámos pechinchas para "{q}".</Text>
                  <Text style={styles.emptySubText}>Tente procurar por nomes de produtos completos ou lojas específicas.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  header: {
    padding: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  backText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 15,
    color: '#666',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
  },
  cardIcon: {
      fontSize: 28,
  },
  cardHeaderRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
  },
  badge: {
     backgroundColor: '#FF6B35',
     paddingHorizontal: 8,
     paddingVertical: 4,
     borderRadius: 12,
  },
  badgeText: {
      color: 'white',
      fontSize: 11,
      fontWeight: 'bold',
  },
  favBtn: {
      padding: 4,
  },
  dealTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
    lineHeight: 20,
  },
  dealDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 12,
    lineHeight: 18,
  },
  cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
  },
  dealPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  sourceChip: {
      backgroundColor: '#F0F2F5',
      color: '#7F8C8D',
      fontSize: 11,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      fontWeight: '600'
  },
  emptyContainer: {
      alignItems: 'center',
      paddingTop: 50,
      paddingHorizontal: 20,
  },
  emptyIcon: {
      fontSize: 60,
      marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 8,
  },
  emptySubText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  }
});
