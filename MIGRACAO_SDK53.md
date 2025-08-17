# 🔄 Guia de Migração para Expo SDK 53

## 📋 Resumo das Mudanças

Este projeto foi atualizado do **Expo SDK 49** para o **Expo SDK 53** para resolver problemas de compatibilidade e aproveitar as últimas melhorias.

## 🆕 Principais Mudanças Implementadas

### 1. **Estrutura de Arquivos**
- ❌ Removido: `App.js` (arquivo principal antigo)
- ✅ Adicionado: `app/_layout.js` (Expo Router)
- ✅ Adicionado: `app/index.js` (tela principal)
- ✅ Adicionado: `metro.config.js` (configuração Metro)

### 2. **Dependências Atualizadas**
```json
{
  "expo": "~53.0.0",           // Era: ~49.0.0
  "react": "18.3.1",           // Era: 18.2.0
  "react-native": "0.76.3",    // Era: 0.72.6
  "expo-router": "~4.0.0",     // NOVO
  "react-native-safe-area-context": "4.10.5", // NOVO
  "react-native-screens": "~4.0.0",           // NOVO
  "react-native-gesture-handler": "~2.20.0",  // NOVO
  "react-native-reanimated": "~3.12.0"        // NOVO
}
```

### 3. **Componentes Atualizados**
- **TouchableOpacity** → **Pressable** (mais moderno e performático)
- **SafeAreaView** → **react-native-safe-area-context** (melhor compatibilidade)
- **Navegação** → **Expo Router** (sistema moderno)

### 4. **Configurações**
- **app.json**: Adicionados plugins e configurações SDK 53
- **babel.config.js**: Adicionados plugins necessários
- **metro.config.js**: Configuração Metro para SDK 53

## 🚀 Como Aplicar a Migração

### Passo 1: Backup
```bash
# Faça backup do seu projeto atual
cp -r pechinchoso pechinchoso-backup-sdk49
```

### Passo 2: Atualizar Dependências
```bash
# Remova node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Instale as novas dependências
npm install
```

### Passo 3: Verificar Estrutura
```bash
# Certifique-se de que a estrutura está correta
ls -la app/
ls -la components/
```

### Passo 4: Testar
```bash
# Inicie o projeto
npm start

# Teste no dispositivo
# Pressione 'a' para Android ou 'i' para iOS
```

## 🔧 Solução de Problemas Comuns

### Erro: "Module not found"
```bash
# Limpe o cache
npm start -- --clear
expo start --clear
```

### Erro: "Expo Router not found"
```bash
# Verifique se expo-router está instalado
npm list expo-router

# Se não estiver, instale
npm install expo-router
```

### Erro: "Metro bundler error"
```bash
# Verifique se metro.config.js existe
ls metro.config.js

# Se não existir, recrie
echo 'const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
module.exports = config;' > metro.config.js
```

### Erro: "Pressable not found"
```bash
# Verifique se está importando corretamente
import { Pressable } from 'react-native';
```

## 📱 Testando a Migração

### 1. **Funcionalidades Básicas**
- ✅ App inicia sem erros
- ✅ Header é exibido corretamente
- ✅ Conteúdo diário funciona
- ✅ Menu principal é responsivo
- ✅ Grid de promoções rola horizontalmente

### 2. **Navegação**
- ✅ Expo Router funciona
- ✅ Transições suaves
- ✅ Sem crashes de navegação

### 3. **Performance**
- ✅ App responde rapidamente
- ✅ Scroll suave
- ✅ Sem lag na interface

## 🎯 Benefícios da Migração

### **Performance**
- React Native 0.76 é 15-20% mais rápido
- Melhor gerenciamento de memória
- Renderização otimizada

### **Compatibilidade**
- Suporte a dispositivos mais recentes
- Melhor integração com iOS 17+ e Android 14+
- Correções de bugs conhecidos

### **Funcionalidades**
- Expo Router para navegação avançada
- Melhor suporte a TypeScript
- APIs mais modernas

## 📚 Recursos Adicionais

- [Expo SDK 53 Changelog](https://docs.expo.dev/versions/v53.0.0/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native 0.76 Release Notes](https://reactnative.dev/blog/2024/01/25/0.76-release)

## 🆘 Suporte

Se encontrar problemas durante a migração:

1. **Verifique os logs** do Metro bundler
2. **Consulte a documentação** do Expo SDK 53
3. **Abra uma issue** no GitHub
4. **Entre em contato** com a comunidade

---

**🎉 Migração Concluída com Sucesso!**

O Pechinchoso agora está rodando com Expo SDK 53 e todas as melhorias de performance e compatibilidade.
