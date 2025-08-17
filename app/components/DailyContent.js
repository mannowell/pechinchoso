import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DailyContent() {
  const getDayContent = () => {
    const today = new Date().getDay();
    const contentMap = {
      0: { title: 'Domingo do Descanso', subtitle: 'Ofertas relaxantes', color: '#9B59B6' },
      1: { title: 'Segunda das Ofertas', subtitle: 'Comece a semana economizando', color: '#3498DB' },
      2: { title: 'Terça das Promoções', subtitle: 'Descontos imperdíveis', color: '#E74C3C' },
      3: { title: 'Quarta do Cupom', subtitle: 'Códigos de desconto especiais', color: '#F39C12' },
      4: { title: 'Quinta das Lojas', subtitle: 'Ofertas das melhores marcas', color: '#27AE60' },
      5: { title: 'Sexta do Bazar', subtitle: 'Saldões e liquidações', color: '#E67E22' },
      6: { title: 'Sábado das Compras', subtitle: 'Fim de semana com economia', color: '#8E44AD' }
    };
    return contentMap[today] || contentMap[0];
  };

  const dayContent = getDayContent();

  return (
    <View style={styles.container}>
      <Pressable style={styles.contentCard}>
        <LinearGradient
          colors={[dayContent.color, dayContent.color + '80']}
          style={styles.gradient}
        >
          <Text style={styles.dayTitle}>{dayContent.title}</Text>
          <Text style={styles.daySubtitle}>{dayContent.subtitle}</Text>
          <View style={styles.instagramButton}>
            <Text style={styles.instagramIcon}>📱</Text>
            <Text style={styles.instagramText}>@pechinchoso.pt</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  contentCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
    alignItems: 'center',
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  daySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 15,
  },
  instagramButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  instagramIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  instagramText: {
    color: 'white',
    fontWeight: '600',
  },
});
