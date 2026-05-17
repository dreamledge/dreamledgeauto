import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

export default function CustomerPaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [amount] = useState(75);
  const [tip, setTip] = useState(10);
  const [customTip, setCustomTip] = useState('');
  const [loading, setLoading] = useState(false);

  const tipOptions = [5, 10, 15, 20];
  const platformFee = Math.round(amount * 0.2);
  const providerPayout = amount - platformFee;
  const total = amount + (parseInt(customTip) || tip);

  const handleSelectTip = (value: number) => {
    setTip(value);
    setCustomTip('');
  };

  const handleCustomTip = (value: string) => {
    setCustomTip(value);
    setTip(parseInt(value) || 0);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      Alert.alert('Success', 'Payment successful!', [
        { text: 'Continue', onPress: () => router.push('/customer/review') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Service Fee</Text>
            <Text style={styles.value}>${amount}.00</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Platform Fee</Text>
            <Text style={styles.valueSecondary}>${platformFee}.00</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Mechanic Receives</Text>
            <Text style={styles.value}>${providerPayout}.00</Text>
          </View>
        </View>

        <View style={styles.tipSection}>
          <Text style={styles.sectionTitle}>Add a Tip</Text>
          <Text style={styles.sectionSubtitle}>Support great service</Text>
          
          <View style={styles.tipOptions}>
            {tipOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.tipOption, tip === option && styles.tipOptionSelected]}
                onPress={() => handleSelectTip(option)}
              >
                <Text style={[styles.tipText, tip === option && styles.tipTextSelected]}>
                  ${option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TextInput
            style={styles.customTipInput}
            placeholder="Custom amount"
            placeholderTextColor={Colors.mute}
            keyboardType="numeric"
            value={customTip}
            onChangeText={handleCustomTip}
          />
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total}.00</Text>
        </View>

        <TouchableOpacity 
          style={[styles.payButton, loading && styles.buttonDisabled]}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.payText}>
            {loading ? 'Processing...' : `Pay $${total}.00`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 24,
    color: Colors.ink,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.ink,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  summaryCard: {
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.md,
    color: Colors.body,
  },
  value: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
  },
  valueSecondary: {
    fontSize: FontSizes.md,
    color: Colors.mute,
  },
  divider: {
    height: 1,
    backgroundColor: Colors['surface-pressed'],
    marginVertical: Spacing.md,
  },
  tipSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.body,
    marginBottom: Spacing.md,
  },
  tipOptions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  tipOption: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tipText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
  },
  tipTextSelected: {
    color: Colors['on-dark'],
  },
  customTipInput: {
    height: 48,
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.ink,
    textAlign: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.ink,
  },
  totalValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.ink,
  },
  payButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  payText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors['on-primary'],
  },
});
