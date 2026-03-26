// Configurações de Ambiente do Pechinchoso
// Copie este arquivo para environment.js e configure com seus valores

export const environment = {
  // Configurações da Marca
  brand: {
    name: 'Pechinchoso',
    website: 'https://pechinchoso.pt',
    instagram: 'https://instagram.com/pechinchoso.pt',
    email: 'contato@pechinchoso.pt'
  },

  // Links de Afiliados
  affiliate: {
    amazon: 'https://amazon.pt/ref=pechinchoso',
    temu: 'https://temu.com/pechinchoso',
    thefork: 'https://thefork.pt/pechinchoso'
  },

  // Links de Referência Bancária
  referral: {
    revolut: 'https://revolut.com/referral/pechinchoso',
    wise: 'https://wise.com/invite/pechinchoso'
  },

  // Outros Serviços
  services: {
    homeexchange: 'https://homeexchange.com/pechinchoso'
  },

  // Comunidade
  community: {
    telegram: 'https://t.me/pechinchoso',
    whatsapp: 'https://wa.me/351900000000'
  },

  // Configurações do App
  app: {
    environment: 'development', // development, staging, production
    debugMode: true,
    version: '1.0.0'
  },

  // APIs (para futuras integrações)
  api: {
    baseUrl: 'https://api.pechinchoso.pt',
    key: 'your_api_key_here',
    timeout: 30000
  },

  // Notificações
  notifications: {
    pushEnabled: true,
    pushServerKey: 'your_push_server_key'
  },

  // Analytics
  analytics: {
    enabled: true,
    key: 'your_analytics_key'
  },

  // Configurações de Pagamento
  payment: {
    stripePublicKey: 'your_stripe_public_key',
    currency: 'EUR',
    country: 'PT'
  }
};

// Configurações específicas por ambiente
export const getEnvironmentConfig = () => {
  const env = environment.app.environment;
  
  switch (env) {
    case 'production':
      return {
        ...environment,
        app: {
          ...environment.app,
          debugMode: false
        },
        api: {
          ...environment.api,
          baseUrl: 'https://api.pechinchoso.pt'
        }
      };
    
    case 'staging':
      return {
        ...environment,
        api: {
          ...environment.api,
          baseUrl: 'https://staging-api.pechinchoso.pt'
        }
      };
    
    default: // development
      return environment;
  }
};
