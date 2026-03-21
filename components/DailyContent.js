import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function DailyContent() {
  const router = useRouter();
  const [trends, setTrends] = useState([
    { name: 'Pingo Doce', color: '#27AE60', icon: '🛒' },
    { name: 'Amazon', color: '#FF9900', icon: '📦' },
    { name: 'Zara', color: '#333', icon: '👕' },
    { name: 'Worten', color: '#E74C3C', icon: '💻' }
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Tendências de Hoje 📈</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {trends.map((item, index) => (
          <Pressable 
            key={index} 
            style={styles.trendCard}
            onPress={() => router.push(`/store/${item.name.toLowerCase().replace(' ', '')}`)}
          >
            <LinearGradient
              colors={[item.color, item.color + '99']}
              style={styles.gradient}
            >
              <Text style={styles.trendIcon}>{item.icon}</Text>
              <Text style={styles.trendName}>{item.name}</Text>
              <Text style={styles.trendAction}>Ver Saldos →</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
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
  trendCard: {
    width: 130,
    height: 110,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  trendName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  trendAction: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 9,
    marginTop: 3,
  },
});
