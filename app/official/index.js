// app/official/index.js
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OfficialPage() {
  const router = useRouter();

  const handleExternalLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#FF6B35', '#F7C59F']}
          style={styles.hero}
        >
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Voltar</Text>
          </Pressable>
          
          <View style={styles.logoContainer}>
             <Text style={styles.logoEmoji}>🛍️</Text>
             <Text style={styles.heroTitle}>Pechinchoso</Text>
             <Text style={styles.heroSubtitle}>Sua Janela para o Melhor de Portugal</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Nossa Missão</Text>
          <Text style={styles.description}>
            O Pechinchoso nasceu para ajudar os portugueses e residentes a poupar tempo e dinheiro. 
            Nós vasculhamos a internet em tempo real para encontrar as promoções mais quentes dos 
            maiores supermercados, lojas de moda e eletrônicos.
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Gratuito</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>PT</Text>
              <Text style={styles.statLabel}>Focado em Portugal</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>AUTO</Text>
              <Text style={styles.statLabel}>Busca Automática</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Como Funciona?</Text>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>🔍</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Web Scraping Inteligente</Text>
              <Text style={styles.featureDesc}>Nosso motor lê sites oficiais e buscadores para extrair preços baixos sem que você precise sair do app.</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>📱</Text>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Experiência Nativa</Text>
              <Text style={styles.featureDesc}>Tudo desenhado para ser rápido no seu telemóvel Android ou iOS.</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Siga-nos</Text>
          <View style={styles.socialButtons}>
            <Pressable 
              style={[styles.socialButton, { backgroundColor: '#E1306C' }]} 
              onPress={() => handleExternalLink('https://instagram.com/pechinchoso.pt')}
            >
              <Text style={styles.socialButtonText}>Instagram</Text>
            </Pressable>
            <Pressable 
              style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
              onPress={() => handleExternalLink('https://facebook.com/pechinchoso')}
            >
              <Text style={styles.socialButtonText}>Facebook</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Pechinchoso.pt - Todos os direitos reservados.</Text>
            <Text style={styles.footerSubtext}>Desenvolvido com ❤️ em Portugal.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    padding: 30,
    paddingTop: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
    textAlign: 'center',
  },
  content: {
    padding: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  featureIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  featureDesc: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  socialButton: {
    flex: 0.48,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  socialButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 11,
    color: '#BBB',
  }
});
