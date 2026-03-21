// components/PromotionsGrid.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Linking, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { scrapePromotions } from '../services/scraperService';
import { getUnifiedDeals } from '../services/apiService';

export default function PromotionsGrid() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        // Blend search scraper and real-time APIs
        const [scraped, api] = await Promise.all([
            scrapePromotions('Portugal promoções saldos'),
            getUnifiedDeals('geral')
        ]);
        
        // Combine and shuffle slightly to show a mix
        const combined = [...api.slice(0, 5), ...scraped.slice(0, 5)];
        setPromotions(combined);
      } catch (error) {
        console.error("Failed to fetch top promotions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handlePress = async (item) => {
    if (item.link && item.link.startsWith('http')) {
      try {
        await Linking.openURL(item.link);
      } catch (err) {
        console.error("Couldn't open URL", err);
      }
    }
  };

  const renderPromotionCard = (promotion) => (
    <Pressable key={promotion.id} style={styles.promotionCard} onPress={() => handlePress(promotion)}>
      <LinearGradient
        colors={['#FF6B35', '#FF9F1C']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{promotion.image || '🏷️'}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{promotion.price || 'Pechincha'}</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>{promotion.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>{promotion.description}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.seeMoreText}>Aproveitar Agora →</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Promessas de Pechinchas (Real-Time) 🔥</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="white" />
          <Text style={styles.loadingText}>Buscando o melhor de Portugal...</Text>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {promotions.map(renderPromotionCard)}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  loadingContainer: {
    padding: 30,
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 14,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  promotionCard: {
    width: 260,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardGradient: {
    padding: 20,
    minHeight: 180,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardIcon: {
    fontSize: 32,
  },
  discountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardContent: {
    flex: 1,
    marginBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    lineHeight: 20,
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    lineHeight: 16,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  seeMoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
