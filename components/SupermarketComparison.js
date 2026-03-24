// components/SupermarketComparison.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getComparisonData } from '../services/supermarketService';

export default function SupermarketComparison() {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setData(getComparisonData());
    setSelectedProduct(getComparisonData()[0]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Comparador Cabaz Básico 🛒</Text>
      <Text style={styles.sectionSubtitle}>Preços médios reais em Portugal (2026)</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
        {data.map((p) => (
          <Pressable 
            key={p.id} 
            style={[styles.productBtn, selectedProduct?.id === p.id && styles.productBtnActive]}
            onPress={() => setSelectedProduct(p)}
          >
            <Text style={styles.productEmoji}>{p.emoji}</Text>
            <Text style={[styles.productName, selectedProduct?.id === p.id && styles.productNameActive]}>
                {p.name.split(' ')[0]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {selectedProduct && (
        <View style={styles.comparisonCard}>
            <Text style={styles.comparisonTitle}>
                {selectedProduct.emoji} {selectedProduct.name}
            </Text>
            
            {selectedProduct.prices.map((storeData, idx) => (
                <View key={idx} style={styles.priceRow}>
                    <Text style={styles.storeName}>{storeData.store}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[
                            styles.priceValue, 
                            storeData.store === selectedProduct.cheapest.store && styles.cheapestPrice
                        ]}>
                            {storeData.price.toFixed(2)}€
                        </Text>
                        {storeData.store === selectedProduct.cheapest.store && (
                            <View style={styles.cheapestBadge}>
                                <Text style={styles.cheapestText}>PECHINCHA!</Text>
                            </View>
                        )}
                    </View>
                </View>
            ))}
            
            <LinearGradient colors={['#27AE60', '#2ECC71']} style={styles.infoBox}>
                <Text style={styles.infoText}>
                    💡 A poupança total no cabaz hoje é de approx. **4.80€** no **{selectedProduct.cheapest.store}**.
                </Text>
            </LinearGradient>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 30, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 15 },
  productScroll: { marginBottom: 15, gap: 10 },
  productBtn: { 
    backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 15, paddingVertical: 10, 
    borderRadius: 15, alignItems: 'center', minWidth: 80 
  },
  productBtnActive: { backgroundColor: 'white' },
  productEmoji: { fontSize: 24, marginBottom: 4 },
  productName: { color: 'white', fontSize: 12, fontWeight: '600' },
  productNameActive: { color: '#FF6B35' },
  comparisonCard: { 
    backgroundColor: 'white', borderRadius: 20, padding: 20,
    elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8
  },
  comparisonTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  priceRow: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F2F5' 
  },
  storeName: { fontSize: 15, fontWeight: '600', color: '#34495E' },
  priceContainer: { flexDirection: 'row', alignItems: 'center' },
  priceValue: { fontSize: 16, fontWeight: '700', color: '#2C3E50' },
  cheapestPrice: { color: '#27AE60' },
  cheapestBadge: { 
    backgroundColor: '#27AE60', marginLeft: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 
  },
  cheapestText: { color: 'white', fontSize: 9, fontWeight: 'bold' },
  infoBox: { marginTop: 15, padding: 12, borderRadius: 12 },
  infoText: { color: 'white', fontSize: 13, textAlign: 'center', fontWeight: '500' }
});
