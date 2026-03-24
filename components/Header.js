// components/Header.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getFavorites } from '../services/favoritesService';

export default function Header() {
  const router = useRouter();
  const [favCount, setFavCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Refresh favorites count
    const interval = setInterval(() => {
        getFavorites().then(f => setFavCount(f.length));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { q: searchQuery.trim() }
      });
      setSearchQuery('');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.header}>
      <View style={styles.topRow}>
        {/* Logo + Título */}
        <Pressable style={styles.logoContainer} onPress={() => router.push('/')}>
          <View style={styles.logo}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.title}>Pechinchoso</Text>
            <Text style={styles.subtitle}>Portugal 🇵🇹</Text>
          </View>
        </Pressable>

        {/* Botão Favoritos */}
        <Pressable style={styles.favBtn} onPress={() => router.push('/favorites')}>
          <Text style={styles.favIcon}>💛</Text>
          {favCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Procurar pechinchas (ex: iPhone, PS5, Fraldas)..."
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Pressable style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>🔍</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 6,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: 'transparent',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoImage: { width: 34, height: 34, borderRadius: 6 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    marginTop: -2,
    fontWeight: '600',
  },
  favBtn: {
    position: 'relative',
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
  },
  favIcon: { fontSize: 22 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4757',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  badgeText: { color: 'white', fontSize: 9, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  searchBtn: {
    padding: 5,
  },
  searchBtnText: {
    fontSize: 18,
  }
});