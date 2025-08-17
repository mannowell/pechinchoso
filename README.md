# 🛍️ Pechinchoso - Ecossistema de Promoções em Portugal

O **Pechinchoso** é um ecossistema completo focado em compartilhar as melhores promoções, ofertas e descontos disponíveis em Portugal, com foco especial em famílias, imigrantes, estudantes e todos que buscam economizar.

## 🎯 Público-Alvo

- **Famílias portuguesas** em busca de economia
- **Imigrantes** (brasileiros, africanos, indianos, ucranianos, etc.)
- **Estudantes** com orçamento limitado
- **Nômades digitais** em Portugal
- **Idosos** que buscam descontos
- **Recém-chegados** ao país

## ✨ Funcionalidades Principais

### 📱 Aplicativo Mobile (React Native + Expo SDK 53)
- **Expo Router**: Sistema de navegação moderno e eficiente
- **Conteúdo Diário**: Temas específicos para cada dia da semana
- **Menu Principal**: Acesso rápido a todas as funcionalidades
- **Grid de Promoções**: Visualização das melhores ofertas
- **Sistema de Posts**: Criação e gerenciamento de promoções

### 🌐 Integrações e Links de Afiliados
- **E-commerce**: Amazon, Temu, TheFork
- **Serviços Bancários**: Revolut, Wise
- **Outros**: HomeExchange e apps úteis
- **Site Oficial**: Curadoria de ofertas e landing pages

### 👑 Clube de Vantagens
- **Planos de Assinatura**: Mensal e Anual
- **Parcerias Reais**: Lojas, clubes, restaurantes
- **Benefícios Exclusivos**: Descontos premium e cashback

### 💬 Comunidade
- **Telegram**: Grupos de discussão e alertas
- **WhatsApp**: Comunicação direta e ofertas exclusivas

## 🎨 Identidade Visual

### Paleta de Cores
- **Primária**: #FF6B35 (Laranja vibrante)
- **Secundária**: #2EC4B6 (Verde-azulado)
- **Acento**: #FF9F1C (Amarelo dourado)
- **Neutro**: #F7F7F7 (Cinza claro)
- **Escuro**: #2C2C2C (Preto suave)

### Logo
O logo combina uma sacola de compras estilizada com o símbolo de desconto (%), representando economia e oportunidades.

## 🚀 Instalação e Configuração

### Pré-requisitos
- **Node.js** versão 18 ou superior
- **npm** ou **yarn**
- **Expo CLI** versão 7.0 ou superior
- **Android Studio** (para desenvolvimento Android)
- **Xcode** (para desenvolvimento iOS - apenas macOS)

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/pechinchoso.git
cd pechinchoso
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp config/environment.example.js config/environment.js
# Edite o arquivo .env com suas configurações
```

4. **Inicie o projeto**
```bash
npm start
# ou
yarn start
```

5. **Execute no dispositivo/emulador**
- Pressione `a` para Android
- Pressione `i` para iOS
- Pressione `w` para web

## 📱 Estrutura do Projeto

```
pechinchoso/
├── app/                    # Expo Router (SDK 53)
│   ├── _layout.js         # Layout principal
│   └── index.js           # Tela inicial
├── assets/                 # Recursos visuais e configurações
│   ├── brand-guidelines.md # Diretrizes de identidade visual
│   └── logo.svg           # Logo vetorial da marca
├── components/            # Componentes React Native
│   ├── Header.js         # Cabeçalho com logo e título
│   ├── DailyContent.js   # Conteúdo diário com temas
│   ├── MainMenu.js       # Menu principal de funcionalidades
│   ├── PromotionsGrid.js # Grid de promoções
│   ├── PostCreator.js    # Criador de novos posts
│   └── ClubBenefits.js   # Sistema do clube de vantagens
├── config/               # Configurações
│   ├── affiliateLinks.js # Links de afiliados e configurações
│   └── environment.example.js # Exemplo de configuração
├── package.json          # Dependências do projeto
├── app.json             # Configuração do Expo
├── metro.config.js      # Configuração do Metro
└── README.md            # Esta documentação
```

## 🔧 Configuração dos Links de Afiliados

Edite o arquivo `config/affiliateLinks.js` para configurar:

- Links do Instagram e site oficial
- URLs de afiliados (Amazon, Temu, TheFork)
- Links de referência bancária (Revolut, Wise)
- Outros serviços e parceiros

## 📊 Sistema de Posts

### Estrutura de um Post
```javascript
{
  id: 1,
  title: 'Título da Promoção',
  description: 'Descrição detalhada',
  category: 'Farmácia',
  discount: '20%',
  image: '💊',
  color: '#E74C3C',
  link: 'https://link-da-oferta.com'
}
```

### Categorias Disponíveis
- Farmácia
- Supermercado
- Moda
- Shopping
- E-commerce
- Amostras
- Restaurantes
- Serviços
- Outros

## 🎭 Temas Diários

- **Segunda**: Segunda das Ofertas
- **Terça**: Terça das Promoções
- **Quarta**: Quarta do Cupom
- **Quinta**: Quinta das Lojas
- **Sexta**: Sexta do Bazar
- **Sábado**: Sábado das Compras
- **Domingo**: Domingo do Descanso

## 💰 Modelo de Negócio

### Monetização por Afiliados
- **Amazon**: Comissão por vendas realizadas
- **Temu**: Programa de afiliados
- **TheFork**: Comissão por reservas
- **Revolut**: Bônus por novos usuários
- **Wise**: Programa de referência
- **HomeExchange**: Comissão por assinaturas

### Clube de Vantagens
- **Plano Mensal**: 9.99€/mês
- **Plano Anual**: 99.99€/ano (2 meses grátis)

## 🌍 Localização e Idioma

O app está configurado para o mercado português, mas pode ser facilmente adaptado para outros países através de:

- Configuração de idiomas
- Adaptação de moedas
- Parceiros locais
- Conteúdo regionalizado

## 🔒 Segurança e Privacidade

- Dados dos usuários protegidos
- Links de afiliados seguros
- Conformidade com GDPR
- Política de privacidade transparente

## 📈 Roadmap

### Fase 1 (Atual - Expo SDK 53)
- ✅ App básico com funcionalidades principais
- ✅ Sistema de posts e promoções
- ✅ Clube de vantagens
- ✅ Links de afiliados
- ✅ Expo Router implementado
- ✅ React Native 0.76

### Fase 2 (Próxima)
- 🔄 Sistema de notificações push
- 🔄 Geolocalização para ofertas próximas
- 🔄 Integração com APIs de parceiros
- 🔄 Sistema de cashback

### Fase 3 (Futuro)
- 📋 Inteligência artificial para recomendações
- 📋 Marketplace interno
- 📋 Sistema de gamificação
- 📋 Expansão para outros países

## 🆕 Novidades do Expo SDK 53

- **Performance**: Melhorias significativas de renderização
- **Compatibilidade**: Suporte a dispositivos mais recentes
- **Expo Router**: Sistema de navegação moderno
- **React Native 0.76**: Versão mais estável e otimizada
- **TypeScript**: Melhor suporte nativo

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Website**: [pechinchoso.pt](https://pechinchoso.pt)
- **Instagram**: [@pechinchoso.pt](https://instagram.com/pechinchoso.pt)
- **Email**: contato@pechinchoso.pt

## 🙏 Agradecimentos

- Comunidade React Native
- Expo Team
- Todos os parceiros e afiliados
- Usuários que fazem o Pechinchoso crescer

---

**Pechinchoso** - Economizando juntos em Portugal! 🇵🇹💰

*Atualizado para Expo SDK 53 com React Native 0.76*
