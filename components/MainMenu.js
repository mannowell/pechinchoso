import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { affiliateLinks } from '../config/affiliateLinks';

export default function MainMenu() {
  const menuItems = [
    {
      id: 'website',
      title: 'Site Oficial',
      subtitle: 'Curadoria de ofertas',
      icon: '🌐',
      color: '#2EC4B6',
      action: 'official_site'
    },
    {
      id: 'club',
      title: 'Clube de Vantagens',
      subtitle: 'Assinatura premium',
      icon: '👑',
      color: '#FF9F1C',
      action: 'club'
    },
    {
      id: 'amazon',
      title: 'Amazon',
      subtitle: 'Ofertas selecionadas',
      icon: '📦',
      color: '#FF9900',
      action: 'amazon'
    },
    {
      id: 'temu',
      title: 'Temu',
      subtitle: 'Produtos baratos',
      icon: '🛒',
      color: '#E74C3C',
      action: 'temu'
    },
    {
      id: 'thefork',
      title: 'TheFork',
      subtitle: 'Restaurantes com desconto',
      icon: '🍽️',
      color: '#27AE60',
      action: 'thefork'
    },
    {
      id: 'revolut',
      title: 'Revolut',
      subtitle: 'Conta bancária',
      icon: '💳',
      color: '#3498DB',
      action: 'revolut'
    },
    {
      id: 'wise',
      title: 'Wise',
      subtitle: 'Transferências internacionais',
      icon: '🌍',
      color: '#9B59B6',
      action: 'wise'
    },
    {
      id: 'homeexchange',
      title: 'HomeExchange',
      subtitle: 'Troca de casas',
      icon: '🏠',
      color: '#E67E22',
      action: 'homeexchange'
    },
    {
      id: 'community_telegram',
      title: 'Comunidade',
      subtitle: 'Telegram',
      icon: '💬',
      color: '#1ABC9C',
      action: 'telegram'
    }
  ];

  const router = useRouter();

  const handleMenuAction = async (action) => {
    const internalStores = ['amazon', 'temu', 'thefork', 'revolut', 'wise'];
    
    if (action === 'official_site') {
        router.push('/official');
        return;
    }

    if (internalStores.includes(action)) {
        router.push(`/store/${action}`);
        return;
    }

    try {
      if (affiliateLinks[action]) {
        const url = affiliateLinks[action];
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.log(`Don't know how to open this URL: ${url}`);
        }
      } else {
        console.log(`Action not found in affiliateLinks: ${action}`);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Menu Principal</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuAction(item.action)}
            >
              <LinearGradient
                colors={[item.color, item.color + '80']}
                style={styles.menuGradient}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
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
  menuContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  menuItem: {
    width: 120,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuGradient: {
    padding: 15,
    alignItems: 'center',
    minHeight: 120,
  },
  menuIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 14,
  },
});
