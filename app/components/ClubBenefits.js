import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ClubBenefits() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: 'Plano Mensal',
      price: '9.99€',
      period: 'mês',
      features: [
        'Acesso a todas as ofertas exclusivas',
        'Cupons de desconto premium',
        'Alertas personalizados',
        'Suporte prioritário',
        'Cashback em compras selecionadas'
      ],
      popular: false
    },
    {
      id: 'yearly',
      name: 'Plano Anual',
      price: '99.99€',
      period: 'ano',
      features: [
        'Todas as vantagens do plano mensal',
        '2 meses grátis',
        'Descontos exclusivos em parceiros',
        'Eventos VIP',
        'Consultoria personalizada'
      ],
      popular: true
    }
  ];

  const partners = [
    { name: 'Restaurantes Premium', discount: '15%', icon: '🍽️' },
    { name: 'Lojas de Moda', discount: '20%', icon: '👕' },
    { name: 'Serviços de Saúde', discount: '25%', icon: '🏥' },
    { name: 'Entretenimento', discount: '30%', icon: '🎬' },
    { name: 'Viagens', discount: '10%', icon: '✈️' },
    { name: 'Educação', discount: '20%', icon: '📚' }
  ];

  const handleSubscribe = (planId) => {
    Alert.alert(
      'Assinatura',
      `Deseja assinar o ${plans.find(p => p.id === planId)?.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Assinar', onPress: () => confirmSubscription(planId) }
      ]
    );
  };

  const confirmSubscription = (planId) => {
    // Aqui você implementaria a integração com sistema de pagamento
    Alert.alert('Sucesso', 'Assinatura ativada com sucesso!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clube de Vantagens</Text>
        <Text style={styles.subtitle}>Desbloqueie ofertas exclusivas e economize ainda mais</Text>
      </View>

      {/* Planos de Assinatura */}
      <View style={styles.plansSection}>
        <Text style={styles.sectionTitle}>Escolha seu Plano</Text>
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <Pressable
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.selectedPlan,
                plan.popular && styles.popularPlan
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Mais Popular</Text>
                </View>
              )}
              
              <LinearGradient
                colors={selectedPlan === plan.id ? ['#FF6B35', '#FF9F1C'] : ['#F7F7F7', '#E0E0E0']}
                style={styles.planGradient}
              >
                <Text style={[
                  styles.planName,
                  selectedPlan === plan.id && styles.selectedPlanText
                ]}>
                  {plan.name}
                </Text>
                
                <View style={styles.priceContainer}>
                  <Text style={[
                    styles.price,
                    selectedPlan === plan.id && styles.selectedPriceText
                  ]}>
                    {plan.price}
                  </Text>
                  <Text style={[
                    styles.period,
                    selectedPlan === plan.id && styles.selectedPeriodText
                  ]}>
                    /{plan.period}
                  </Text>
                </View>

                <View style={styles.featuresList}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Text style={styles.featureIcon}>✓</Text>
                      <Text style={[
                        styles.featureText,
                        selectedPlan === plan.id && styles.selectedFeatureText
                      ]}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.subscribeButton}
          onPress={() => handleSubscribe(selectedPlan)}
        >
          <LinearGradient
            colors={['#FF6B35', '#FF9F1C']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              Assinar {plans.find(p => p.id === selectedPlan)?.name}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>

      {/* Parceiros */}
      <View style={styles.partnersSection}>
        <Text style={styles.sectionTitle}>Nossos Parceiros</Text>
        <View style={styles.partnersGrid}>
          {partners.map((partner, index) => (
            <View key={index} style={styles.partnerCard}>
              <Text style={styles.partnerIcon}>{partner.icon}</Text>
              <Text style={styles.partnerName}>{partner.name}</Text>
              <Text style={styles.partnerDiscount}>{partner.discount} OFF</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Benefícios */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Por que se juntar?</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💰</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Economia Garantida</Text>
              <Text style={styles.benefitDescription}>
                Economize em média 200€ por mês com nossas ofertas exclusivas
              </Text>
            </View>
          </View>
          
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🎯</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Ofertas Personalizadas</Text>
              <Text style={styles.benefitDescription}>
                Receba ofertas baseadas nos seus interesses e localização
              </Text>
            </View>
          </View>
          
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🚀</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Acesso Antecipado</Text>
              <Text style={styles.benefitDescription}>
                Seja o primeiro a saber sobre as melhores promoções
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  plansSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 20,
  },
  plansContainer: {
    marginBottom: 30,
  },
  planCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  selectedPlan: {
    elevation: 8,
    shadowOpacity: 0.25,
  },
  popularPlan: {
    borderWidth: 3,
    borderColor: '#FF9F1C',
  },
  popularBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF9F1C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 1,
  },
  popularText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  planGradient: {
    padding: 25,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 15,
  },
  selectedPlanText: {
    color: 'white',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  selectedPriceText: {
    color: 'white',
  },
  period: {
    fontSize: 18,
    color: '#666',
    marginLeft: 5,
  },
  selectedPeriodText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    color: '#27AE60',
    fontSize: 18,
    marginRight: 10,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
  },
  selectedFeatureText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  subscribeButton: {
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
  partnersSection: {
    padding: 20,
    backgroundColor: 'white',
  },
  partnersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  partnerCard: {
    width: '48%',
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  partnerIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  partnerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 5,
  },
  partnerDiscount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  benefitsSection: {
    padding: 20,
  },
  benefitsList: {
    gap: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 5,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
