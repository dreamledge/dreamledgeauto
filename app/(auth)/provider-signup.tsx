import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { useAuthStore } from '../../src/store/authStore';
import { SERVICE_TYPES, SERVICE_LABELS } from '../../src/constants/config';

export default function ProviderSignupScreen() {
  const router = useRouter();
  const { signUp, loading, error } = useAuthStore();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSignUp = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (selectedServices.length === 0) {
      Alert.alert('Error', 'Please select at least one service');
      return;
    }

    try {
      await signUp(email, password, name, phone, 'provider');
      router.replace('/provider/onboarding');
    } catch (err) {
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <View style={styles.stepIndicator}>
              <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]} />
              <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]} />
              <View style={[styles.stepDot, step >= 3 && styles.stepDotActive]} />
            </View>
            <Text style={styles.title}>
              {step === 1 && 'Your Information'}
              {step === 2 && 'Select Services'}
              {step === 3 && 'Business Details'}
            </Text>
          </View>

          <View style={styles.form}>
            {step === 1 && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="John Smith"
                    placeholderTextColor={Colors.mute}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="(937) 555-0123"
                    placeholderTextColor={Colors.mute}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="john@example.com"
                    placeholderTextColor={Colors.mute}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="********"
                    placeholderTextColor={Colors.mute}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="********"
                    placeholderTextColor={Colors.mute}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>
              </>
            )}

            {step === 2 && (
              <View style={styles.servicesContainer}>
                <Text style={styles.servicesSubtitle}>What services do you offer?</Text>
                {Object.entries(SERVICE_LABELS).map(([key, label]) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.serviceOption,
                      selectedServices.includes(key) && styles.serviceOptionSelected
                    ]}
                    onPress={() => toggleService(key)}
                  >
                    <View style={styles.serviceInfo}>
                      <View style={[styles.serviceIconCircle, selectedServices.includes(key) && styles.serviceIconCircleSelected]}>
                        <Text style={[styles.serviceIconText, selectedServices.includes(key) && styles.serviceIconTextSelected]}>
                          {key === 'tire_change' && '◉'}
                          {key === 'towing' && '⊞'}
                          {key === 'battery_jump' && '⚡'}
                          {key === 'fuel_delivery' && '⛽'}
                          {key === 'lockout' && '⊠'}
                          {key === 'mechanic' && '⚙'}
                        </Text>
                      </View>
                      <Text style={[
                        styles.serviceLabel,
                        selectedServices.includes(key) && styles.serviceLabelSelected
                      ]}>
                        {label}
                      </Text>
                    </View>
                    <View style={[styles.checkbox, selectedServices.includes(key) && styles.checkboxSelected]}>
                      {selectedServices.includes(key) && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {step === 3 && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Business Name (Optional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Smith's Auto Repair"
                    placeholderTextColor={Colors.mute}
                    value={businessName}
                    onChangeText={setBusinessName}
                    autoCapitalize="words"
                  />
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoIcon}>!</Text>
                  <Text style={styles.infoText}>
                    Your account will be reviewed before you can start accepting jobs. 
                    This typically takes 1-2 business days.
                  </Text>
                </View>
              </>
            )}

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Creating Account...' : step < 3 ? 'Continue' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
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
  stepIndicator: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  stepDot: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray200,
  },
  stepDotActive: {
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.ink,
  },
  form: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors['hairline-mid'],
  },
  input: {
    height: 52,
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.ink,
  },
  servicesContainer: {
    gap: Spacing.md,
  },
  servicesSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.body,
    marginBottom: Spacing.sm,
  },
  serviceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.canvas,
  },
  serviceOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors['canvas-soft'],
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  serviceIconCircle: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors['canvas-soft'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceIconCircleSelected: {
    backgroundColor: Colors.primary,
  },
  serviceIconText: {
    fontSize: 18,
    color: Colors.ink,
  },
  serviceIconTextSelected: {
    color: Colors['on-dark'],
  },
  serviceLabel: {
    fontSize: FontSizes.md,
    color: Colors.ink,
  },
  serviceLabelSelected: {
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.canvas,
    fontSize: 14,
    fontWeight: '700',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Colors['canvas-soft'],
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  infoIcon: {
    fontSize: 18,
    color: Colors.ink,
    fontWeight: '700',
  },
  infoText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.body,
    lineHeight: 20,
  },
  button: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors['on-primary'],
  },
});
