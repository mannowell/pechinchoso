// app/index.js
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import VoucherScanner from '../components/VoucherScanner';
import CategoryMenu from '../components/CategoryMenu';
import DailyContent from '../components/DailyContent';
import PromotionsGrid from '../components/PromotionsGrid';
import SupermarketComparison from '../components/SupermarketComparison';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B35', '#FF9F1C']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header />
            
            <View style={styles.topSection}>
                <VoucherScanner />
                <SupermarketComparison />
            </View>

            <CategoryMenu />
            
            <View style={styles.mainSection}>
                <DailyContent title="Tendências de Hoje 📈" />
                <PromotionsGrid title="Ofertas Relâmpago em PT 🔥" />
            </View>
            
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  topSection: {
    marginTop: 5,
  },
  mainSection: {
    marginTop: -10,
  }
});