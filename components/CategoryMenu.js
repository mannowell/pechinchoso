// components/CategoryMenu.js
import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CategoryMenu() {
  const router = useRouter();
  
  const categories = [
    { id: 'transportes', title: 'Transportes', icon: '✈️', color: '#3498DB' },
    { id: 'supermercado', title: 'Mercado', icon: '🛒', color: '#27AE60' },
    { id: 'moda', title: 'Roupas', icon: '👕', color: '#9B59B6' },
    { id: 'eletronicos', title: 'Eletrónicos', icon: '💻', color: '#E67E22' },
    { id: 'casa', title: 'Casa', icon: '🏠', color: '#F1C40F' },
    { id: 'noticias', title: 'Notícias PT', icon: '📰', color: '#95A5A6' },
    { id: 'saude', title: 'Saúde', icon: '💊', color: '#E74C3C' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categorias de Descontos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {categories.map((cat) => (
          <Pressable 
            key={cat.id} 
            style={[styles.categoryCard, { backgroundColor: cat.color + '15', borderColor: cat.color }]}
            onPress={() => router.push(`/category/${cat.id}`)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={[styles.categoryTitle, { color: cat.color }]}>{cat.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 5,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});
