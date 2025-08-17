# 🚀 Instalação Rápida - Pechinchoso (Expo SDK 53)

## 📋 Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** ou **yarn**
- **Expo CLI** versão 7.0 ou superior
- **Git** para clonar o repositório

## ⚡ Instalação em 5 Passos

### 1. Clone o Projeto
```bash
git clone https://github.com/seu-usuario/pechinchoso.git
cd pechinchoso
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure o Ambiente
```bash
# Copie o arquivo de exemplo
cp config/environment.example.js config/environment.js

# Edite com suas configurações
nano config/environment.js
```

### 4. Inicie o Projeto
```bash
npm start
# ou
yarn start
```

### 5. Execute no Dispositivo
- **Android**: Pressione `a`
- **iOS**: Pressione `i` (apenas macOS)
- **Web**: Pressione `w`

## 🔧 Configurações Importantes

### Links de Afiliados
Edite `config/affiliateLinks.js`:
```javascript
export const affiliateLinks = {
  instagram: 'https://instagram.com/SEU_INSTAGRAM',
  website: 'https://SEU_SITE.com',
  amazon: 'https://amazon.pt/ref=SEU_CODIGO',
  // ... outros links
};
```

### Variáveis de Ambiente
Edite `config/environment.js`:
```javascript
export const environment = {
  brand: {
    name: 'SEU_NOME_MARCA',
    website: 'https://SEU_SITE.com',
    // ... outras configurações
  }
};
```

## 📱 Testando no Dispositivo

### Android
1. Instale o app **Expo Go** na Google Play (versão mais recente)
2. Escaneie o QR code que aparece no terminal
3. O app será carregado automaticamente

### iOS
1. Instale o app **Expo Go** na App Store (versão mais recente)
2. Use a câmera para escanear o QR code
3. O app será carregado automaticamente

## 🆕 Novidades do Expo SDK 53

- **Expo Router**: Sistema de navegação moderno
- **React Native 0.76**: Versão mais recente e estável
- **Melhor Performance**: Otimizações de renderização
- **Compatibilidade**: Suporte a dispositivos mais recentes

## 🎨 Personalização

### Cores da Marca
Edite as cores em `assets/brand-guidelines.md`:
```markdown
- **Primária**: #SUA_COR_PRINCIPAL
- **Secundária**: #SUA_COR_SECUNDARIA
```

### Logo
Substitua `assets/logo.svg` pelo seu logo personalizado

### Conteúdo Diário
Edite os temas em `components/DailyContent.js`:
```javascript
const contentMap = {
  0: { title: 'SEU_TEMA_DOMINGO', subtitle: 'SEU_SUBTITULO' },
  // ... outros dias
};
```

## 🚨 Solução de Problemas

### Erro: "Module not found"
```bash
# Limpe o cache e reinstale
npm start -- --clear
# ou
expo start --clear
```

### Erro: "Metro bundler error"
```bash
# Pare o servidor (Ctrl+C) e reinicie
npm start
```

### App não carrega no dispositivo
1. Verifique se está na mesma rede Wi-Fi
2. Tente usar o modo "Tunnel" no Expo
3. Reinicie o Expo Go no dispositivo
4. **Importante**: Use a versão mais recente do Expo Go

### Erro de compatibilidade SDK
```bash
# Certifique-se de que está usando Expo CLI 7+
npm install -g @expo/cli@latest

# Verifique a versão
expo --version
```

## 📚 Próximos Passos

1. **Teste todas as funcionalidades**
2. **Configure seus links de afiliados**
3. **Personalize a identidade visual**
4. **Teste em diferentes dispositivos**
5. **Configure para produção**

## 🆘 Suporte

- **Documentação**: Leia o `README.md`
- **Issues**: Abra uma issue no GitHub
- **Comunidade**: Entre no nosso Telegram
- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)

---

**🎉 Parabéns! O Pechinchoso está rodando com Expo SDK 53!**

Agora você pode aproveitar todas as melhorias de performance e compatibilidade da versão mais recente do Expo.
