// app/store/[id].js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, ActivityIndicator, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scrapePromotions } from '../../services/scraperService';
import { categoryColors } from '../../config/affiliateLinks';

export default function StoreScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Capitalize store name
  const storeName = id ? id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ') : 'Loja';
  
  // Choose gradient based on store name
  const getStoreColor = () => {
    const rawId = id || '';
    if (['amazon', 'temu'].includes(rawId)) return categoryColors.ecommerce;
    if (['zara', 'primark', 'sport zone', 'jd sports', 'lifites'].includes(rawId)) return categoryColors.moda;
    if (['continente', 'auchan', 'mercadona', 'aldi', 'intermarche', 'pingo doce'].includes(rawId)) return categoryColors.supermercado;
    if (['colombo', 'campera', 'vasco da gama'].includes(rawId)) return categoryColors.shopping;
    if (['farmaciaonline'].includes(rawId)) return categoryColors.farmacia;
    return '#E74C3C'; // default
  };

  const storeColor = getStoreColor();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results = await scrapePromotions(storeName);
      setPromotions(results);
      setLoading(false);
    };
    
    if (storeName) {
      fetchData();
    }
  }, [storeName]);

  const openDeal = async (url) => {
    if(url === '#') {
        alert("Esta é uma promoção de teste/mock porque o CORS bloqueou o Scraper na Web. Teste no telemóvel para ver as ofertas reais!");
        return;
    }
    try {
        const supported = await Linking.canOpenURL(url);
        if(supported) await Linking.openURL(url);
    } catch(err) {
        console.error("Failed to open deal", err);
    }
  }

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => openDeal(item.link)}>
      <View style={styles.cardIconContainer}>
        <Text style={styles.cardIcon}>{item.image}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.dealTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.dealPrice}>{item.price}</Text>
      </View>
      <View style={styles.goButton}>
        <Text style={styles.goText}>➔</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={[storeColor, storeColor + '90']} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Ofertas: {storeName}</Text>
        <Text style={styles.headerSubtitle}>Extraindo melhores preços da net 🔍</Text>
      </LinearGradient>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={storeColor} />
            <Text style={styles.loadingText}>Buscando promoções com Web Scraping...</Text>
          </View>
        ) : (
          <FlatList
            data={promotions}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma promoção encontrada hoje.</Text>
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
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    marginBottom: 15,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  goButton: {
    width: 40,
    alignItems: 'center',
  },
  goText: {
    fontSize: 24,
    color: '#ccc',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 40,
  }
});
