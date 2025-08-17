import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PostCreator() {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    category: '',
    discount: '',
    image: '🛍️',
    color: '#FF6B35',
    link: ''
  });

  const categories = [
    'Farmácia', 'Supermercado', 'Moda', 'Shopping', 'E-commerce', 
    'Amostras', 'Restaurantes', 'Serviços', 'Outros'
  ];

  const colors = [
    '#FF6B35', '#2EC4B6', '#FF9F1C', '#E74C3C', '#3498DB', 
    '#27AE60', '#9B59B6', '#F39C12', '#1ABC9C'
  ];

  const images = [
    '🛍️', '💊', '🛒', '👕', '🏬', '📦', '🎁', '🍽️', '💳', '🌍', '🏠', '💬'
  ];

  const handleCreatePost = () => {
    if (!postData.title || !postData.description || !postData.category) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    // Aqui você implementaria a lógica para salvar o post
    Alert.alert('Sucesso', 'Post criado com sucesso!');
    
    // Limpar formulário
    setPostData({
      title: '',
      description: '',
      category: '',
      discount: '',
      image: '🛍️',
      color: '#FF6B35',
      link: ''
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Nova Promoção</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Título da Promoção *</Text>
        <TextInput
          style={styles.input}
          value={postData.title}
          onChangeText={(text) => setPostData({...postData, title: text})}
          placeholder="Ex: Farmácia Online - 20% OFF"
        />

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={styles.textArea}
          value={postData.description}
          onChangeText={(text) => setPostData({...postData, description: text})}
          placeholder="Descreva a promoção..."
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Categoria *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.optionsContainer}>
            {categories.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.optionChip,
                  postData.category === cat && styles.selectedChip
                ]}
                onPress={() => setPostData({...postData, category: cat})}
              >
                <Text style={[
                  styles.optionText,
                  postData.category === cat && styles.selectedOptionText
                ]}>
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.label}>Desconto</Text>
        <TextInput
          style={styles.input}
          value={postData.discount}
          onChangeText={(text) => setPostData({...postData, discount: text})}
          placeholder="Ex: 20%, 15€, Grátis"
        />

        <Text style={styles.label}>Ícone</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.optionsContainer}>
            {images.map((img) => (
              <Pressable
                key={img}
                style={[
                  styles.imageOption,
                  postData.image === img && styles.selectedImage
                ]}
                onPress={() => setPostData({...postData, image: img})}
              >
                <Text style={styles.imageText}>{img}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.label}>Cor do Card</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.optionsContainer}>
            {colors.map((color) => (
              <Pressable
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  postData.color === color && styles.selectedColor
                ]}
                onPress={() => setPostData({...postData, color: color})}
              />
            ))}
          </View>
        </ScrollView>

        <Text style={styles.label}>Link da Oferta</Text>
        <TextInput
          style={styles.input}
          value={postData.link}
          onChangeText={(text) => setPostData({...postData, link: text})}
          placeholder="https://..."
          keyboardType="url"
        />

        <Pressable style={styles.createButton} onPress={handleCreatePost}>
          <LinearGradient
            colors={['#FF6B35', '#FF9F1C']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Criar Promoção</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2C2C',
    textAlign: 'center',
    marginVertical: 20,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
    height: 80,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  optionChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: '#FF6B35',
  },
  optionText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: 'white',
  },
  imageOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedImage: {
    backgroundColor: '#FF6B35',
  },
  imageText: {
    fontSize: 24,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#2C2C2C',
  },
  createButton: {
    marginTop: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
