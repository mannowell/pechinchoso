// components/DailyContent.js
// Exibe tendências de lojas + câmbio EUR em tempo real
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { fetchExchangeRate } from '../services/apiService';

const TRENDS = [
  { name: 'Pingo Doce', slug: 'pingoDoce', color: '#27AE60', icon: '🛒', label: 'Super' },
  { name: 'Continente', slug: 'continente', color: '#0055A5', icon: '🏪', label: 'Super' },
  { name: 'Amazon PT', slug: 'amazon', color: '#FF9900', icon: '📦', label: 'Online' },
  { name: 'Worten', slug: 'worten', color: '#E74C3C', icon: '💻', label: 'Eletrónica' },
  { name: 'Zara', slug: 'zara', color: '#1a1a1a', icon: '👕', label: 'Moda' },
  { name: 'LIDL', slug: 'lidl', color: '#FFD700', icon: '🟡', label: 'Super' },
];

export default function DailyContent() {
  const router = useRouter();
  const [rates, setRates] = useState(null);
  const [ratesLoading, setRatesLoading] = useState(true);

  useEffect(() => {
    fetchExchangeRate().then(r => {
      setRates(r);
      setRatesLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>

      {/* Câmbio em tempo real */}
      <View style={styles.rateCard}>
        <Text style={styles.rateTitle}>💱 Câmbio EUR em Tempo Real</Text>
        {ratesLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <View style={styles.ratesRow}>
            <RateChip flag="🇧🇷" currency="BRL" value={rates?.eurToBrl} />
            <RateChip flag="🇺🇸" currency="USD" value={rates?.eurToUsd} />
            <RateChip flag="🇬🇧" currency="GBP" value={rates?.eurToGbp} />
          </View>
        )}
        {rates?.updatedAt && (
          <Text style={styles.rateFooter}>Atualizado: {rates.updatedAt}</Text>
        )}
      </View>

      {/* Tendências de lojas */}
      <Text style={styles.sectionTitle}>Tendências de Hoje 📈</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {TRENDS.map((item, index) => (
          <Pressable
            key={index}
            style={styles.trendCard}
            onPress={() => router.push(`/store/${item.slug}`)}
          >
            <LinearGradient
              colors={[item.color, item.color + 'BB']}
              style={styles.gradient}
            >
              <Text style={styles.trendIcon}>{item.icon}</Text>
              <Text style={styles.trendName}>{item.name}</Text>
              <View style={styles.labelPill}>
                <Text style={styles.labelText}>{item.label}</Text>
              </View>
              <Text style={styles.trendAction}>Ver Saldos →</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function RateChip({ flag, currency, value }) {
  return (
    <View style={styles.rateChip}>
      <Text style={styles.rateFlag}>{flag}</Text>
      <Text style={styles.rateCurrency}>{currency}</Text>
      <Text style={styles.rateValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  rateCard: {
    marginHorizontal: 20, marginBottom: 18, backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16, padding: 14,
  },
  rateTitle: { color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 10 },
  ratesRow: { flexDirection: 'row', gap: 10 },
  rateChip: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10, padding: 8, alignItems: 'center',
  },
  rateFlag: { fontSize: 20 },
  rateCurrency: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 2 },
  rateValue: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  rateFooter: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 8, textAlign: 'right' },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: 'white',
    marginLeft: 20, marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2,
  },
  scrollContent: { paddingHorizontal: 15 },
  trendCard: {
    width: 130, height: 125, marginHorizontal: 5,
    borderRadius: 15, overflow: 'hidden', elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 4,
  },
  gradient: { flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' },
  trendIcon: { fontSize: 24, marginBottom: 4 },
  trendName: { color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  labelPill: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10,
    paddingHorizontal: 6, paddingVertical: 2, marginTop: 3,
  },
  labelText: { color: 'white', fontSize: 9 },
  trendAction: { color: 'rgba(255,255,255,0.8)', fontSize: 9, marginTop: 5 },
});
