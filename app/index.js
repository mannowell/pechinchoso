// app/index.js
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import DailyContent from './components/DailyContent';
import PromotionsGrid from './components/PromotionsGrid';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B35', '#FF9F1C']}
        style={styles.gradient}
      >
        <Header />
        <DailyContent />
        <MainMenu />
        <PromotionsGrid />
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
});