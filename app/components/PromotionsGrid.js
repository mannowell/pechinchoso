import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PromotionsGrid() {
  const promotions = [
    {
      id: 1,
      title: 'Farmácia Online - 20% OFF',
      description: 'Medicamentos e produtos de beleza com desconto',
      category: 'Farmácia',
      discount: '20%',
      image: '💊',
      color: '#E74C3C'
    },
    {
      id: 2,
      title: 'Supermercado Continente',
      description: 'Ofertas da semana em produtos essenciais',
      category: 'Supermercado',
      discount: 'Até 50%',
      image: '🛒',
      color: '#27AE60'
    },
    {
      id: 3,
      title: 'Loja de Roupas Zara',
      description: 'Saldão de verão com preços imperdíveis',
      category: 'Moda',
      discount: '70%',
      image: '👕',
      color: '#3498DB'
    },
    {
      id: 4,
      title: 'Shopping Colombo',
      description: 'Promoções em todas as lojas participantes',
      category: 'Shopping',
      discount: 'Variado',
      image: '🏬',
      color: '#9B59B6'
    },
    {
      id: 5,
      title: 'Cupom Amazon',
      description: 'Código exclusivo para novos usuários',
      category: 'E-commerce',
      discount: '15€',
      image: '📦',
      color: '#FF9900'
    },
    {
      id: 6,
      title: 'Amostra Grátis',
      description: 'Produtos de teste sem custo',
      category: 'Amostras',
      discount: 'Grátis',
      image: '🎁',
      color: '#F39C12'
    }
  ];

  const renderPromotionCard = (promotion) => (
    <Pressable key={promotion.id} style={styles.promotionCard}>
      <LinearGradient
        colors={[promotion.color, promotion.color + '80']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardImage}>{promotion.image}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{promotion.discount}</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardCategory}>{promotion.category}</Text>
          <Text style={styles.cardTitle}>{promotion.title}</Text>
          <Text style={styles.cardDescription}>{promotion.description}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.seeMoreText}>Ver Oferta →</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Promoções em Destaque</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {promotions.map(renderPromotionCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
  scrollContainer: {
    paddingHorizontal: 20,
  },
  promotionCard: {
    width: 280,
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
    minHeight: 200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardImage: {
    fontSize: 40,
  },
  discountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardContent: {
    flex: 1,
    marginBottom: 15,
  },
  cardCategory: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 22,
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 18,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  seeMoreText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
