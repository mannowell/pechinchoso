// components/VoucherScanner.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStoreVouchers } from '../services/supermarketService';

export default function VoucherScanner() {
  const [text, setText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (!text.trim()) return;
    
    setParsing(true);
    setResult(null);
    
    // Simulate AI parsing + Search in real voucher DB
    setTimeout(async () => {
      const lowerText = text.toLowerCase();
      let store = "";
      
      if (lowerText.includes('pingo') || lowerText.includes('doce')) store = "Pingo Doce";
      else if (lowerText.includes('continente')) store = "Continente";
      else if (lowerText.includes('lidl')) store = "LIDL";
      else if (lowerText.includes('auchan')) store = "Auchan";
      
      const vouchers = await getStoreVouchers(store);
      
      if (vouchers.length > 0) {
          setResult(vouchers[0]);
          Alert.alert(
            "Pechincha Identificada! 🎫",
            `Encontrámos um cupão ativo para ${vouchers[0].store}:\n\n"${vouchers[0].desc}"\n\nCódigo: ${vouchers[0].code}`,
            [{ text: "Guardar", onPress: () => { setText(''); setParsing(false); } }]
          );
      } else {
          Alert.alert(
            "Aviso",
            "Não encontrámos cupões ativos para esta loja no momento, mas a oferta foi enviada para análise!",
            [{ text: "OK", onPress: () => { setText(''); setParsing(false); } }]
          );
      }
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F9F9F9']}
        style={styles.card}
      >
        <Text style={styles.title}>Vouchers & SMS 📱</Text>
        <Text style={styles.subtitle}>Cole aqui o SMS da loja e a nossa IA verifica se o cupão é real e vantajoso!</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Ex: Continente: cupão 5€ em compras acima de..."
          multiline
          numberOfLines={2}
          value={text}
          onChangeText={setText}
        />
        
        <Pressable 
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed || parsing ? 0.7 : 1 }
          ]} 
          onPress={handleScan}
          disabled={parsing}
        >
          {parsing ? (
              <ActivityIndicator color="white" size="small" />
          ) : (
              <Text style={styles.buttonText}>Validar Pechincha ✨</Text>
          )}
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 25 },
  card: { padding: 18, borderRadius: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6 },
  title: { fontSize: 17, fontWeight: 'bold', color: '#FF6B35', marginBottom: 6 },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 15, lineHeight: 16 },
  input: { backgroundColor: '#F2F2F2', borderRadius: 12, padding: 10, fontSize: 13, color: '#333', minHeight: 60, textAlignVertical: 'top', marginBottom: 12 },
  button: { backgroundColor: '#FF6B35', paddingVertical: 12, borderRadius: 12, alignItems: 'center', height: 45, justifyContent: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});
