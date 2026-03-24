// services/favoritesService.js
// Guarda as ofertas favoritas do utilizador em AsyncStorage (localStorage no web)
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@pechinchoso:favorites';
const ALERTS_KEY = '@pechinchoso:price_alerts';

// ── Favoritos ────────────────────────────────────────────────────────────────

export const getFavorites = async () => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
};

export const addFavorite = async (item) => {
  try {
    const current = await getFavorites();
    if (current.find(f => f.id === item.id)) return current; // já existe
    const updated = [{ ...item, savedAt: new Date().toISOString() }, ...current];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const removeFavorite = async (itemId) => {
  try {
    const current = await getFavorites();
    const updated = current.filter(f => f.id !== itemId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const isFavorite = async (itemId) => {
  const favs = await getFavorites();
  return favs.some(f => f.id === itemId);
};

// ── Alertas de Preço ─────────────────────────────────────────────────────────

export const getPriceAlerts = async () => {
  try {
    const json = await AsyncStorage.getItem(ALERTS_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
};

export const addPriceAlert = async (item, targetPrice) => {
  try {
    const current = await getPriceAlerts();
    const alert = {
      id: `alert-${item.id}`,
      itemId: item.id,
      title: item.title,
      link: item.link,
      currentPrice: item.price,
      targetPrice,
      createdAt: new Date().toISOString(),
    };
    const updated = [alert, ...current.filter(a => a.itemId !== item.id)];
    await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const removePriceAlert = async (alertId) => {
  try {
    const current = await getPriceAlerts();
    const updated = current.filter(a => a.id !== alertId);
    await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};
