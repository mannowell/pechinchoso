// components/VoucherScanner.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function VoucherScanner() {
  const [text, setText] = useState('');
  const [parsing, setParsing] = useState(false);

  const handleScan = () => {
    if (!text.trim()) return;
    
    setParsing(true);
    
    // Simulating an AI/Regex parser
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let detectedStore = "Loja Desconhecida";
      let discount = "Desconto";
      
      if (lowerText.includes('pingo doce')) detectedStore = "Pingo Doce";
      else if (lowerText.includes('continente')) detectedStore = "Continente";
      else if (lowerText.includes('zara')) detectedStore = "Zara";
      
      const discountMatch = text.match(/(\d+%)|(\d+€)/);
      if (discountMatch) discount = discountMatch[0];

      Alert.alert(
        "Promoção Detectada! 🎉",
        `Loja: ${detectedStore}\nDesconto: ${discount}\n\nO motor Pechinchoso agora vai monitorar esta oferta para você!`,
        [{ text: "Excelente!", onPress: () => { setText(''); setParsing(false); } }]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F9F9F9']}
        style={styles.card}
      >
        <Text style={styles.title}>Recebeu um SMS de Promoção? 📱</Text>
        <Text style={styles.subtitle}>Cole o texto abaixo e nossa IA extrai a oferta para a comunidade!</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Ex: Pingo Doce: ganhe 20% de desconto em toda a loja..."
          multiline
          numberOfLines={3}
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
          <Text style={styles.buttonText}>
            {parsing ? 'Processando Inteligência...' : 'Analisar Pechincha ✨'}
          </Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    lineHeight: 18,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
