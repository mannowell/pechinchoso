// app/category/[id].js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, ActivityIndicator, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scrapePromotions } from '../../services/scraperService';
import { getUnifiedDeals } from '../../services/apiService';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryMap = {
    'transportes': { title: 'Transportes e Voos', color: '#3498DB', icon: '✈️' },
    'supermercado': { title: 'Supermercados', color: '#27AE60', icon: '🛒' },
    'moda': { title: 'Moda e Roupas', color: '#9B59B6', icon: '👕' },
    'eletronicos': { title: 'Eletrónicos', color: '#E67E22', icon: '💻' },
    'casa': { title: 'Casa e Decoração', color: '#F1C40F', icon: '🏠' },
    'saude': { title: 'Saúde e Bem-estar', color: '#E74C3C', icon: '💊' },
    'noticias': { title: 'Notícias e Blog', color: '#95A5A6', icon: '📰' },
  };

  const currentCategory = categoryMap[id] || { title: 'Promoções', color: '#FF6B35', icon: '🎁' };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let results = [];
      
      if (id === 'eletronicos' || id === 'noticias') {
          results = await getUnifiedDeals(id);
      } else {
          results = await scrapePromotions(currentCategory.title);
      }
      
      setPromotions(results);
      setLoading(false);
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);

  const openDeal = async (url) => {
    if(url === '#') {
        alert("Esta é uma promoção de teste. No telemóvel verá as ofertas reais!");
        return;
    }
    try {
        await Linking.openURL(url);
    } catch(err) {
        console.error("Failed to open deal", err);
    }
  }

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => openDeal(item.link)}>
      <View style={[styles.cardIconContainer, { backgroundColor: currentCategory.color + '20' }]}>
        <Text style={styles.cardIcon}>{item.image || currentCategory.icon}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.dealTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={[styles.dealPrice, { color: currentCategory.color }]}>{item.price}</Text>
      </View>
      <View style={styles.goButton}>
        <Text style={styles.goText}>➔</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={[currentCategory.color, currentCategory.color + '90']} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </Pressable>
        <View style={styles.headerRow}>
            <Text style={styles.headerIcon}>{currentCategory.icon}</Text>
            <Text style={styles.headerTitle}>{currentCategory.title}</Text>
        </View>
        <Text style={styles.headerSubtitle}>Melhores pechinchas encontradas 🕵️‍♂️</Text>
      </LinearGradient>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={currentCategory.color} />
            <Text style={styles.loadingText}>Sincronizando ofertas de Portugal...</Text>
          </View>
        ) : (
          <FlatList
            data={promotions}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma promoção encontrada para esta categoria.</Text>
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
    backgroundColor: '#F8F9FA'
  },
  header: {
    padding: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    marginBottom: 10,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerIcon: {
    fontSize: 32,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardContent: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goButton: {
    width: 30,
    alignItems: 'flex-end',
  },
  goText: {
    fontSize: 20,
    color: '#CBD5E0',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#999',
    marginTop: 50,
  }
});
