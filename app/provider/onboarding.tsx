import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { useAuthStore } from '../../src/store/authStore';
import { SERVICE_TYPES, SERVICE_LABELS, DEFAULT_SERVICE_RADIUS_MILES } from '../../src/constants/config';

export default function ProviderOnboardingScreen() {
  const router = useRouter();
  const { providerProfile, userProfile } = useAuthStore();
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<string[]>([]);
  const [serviceRadius, setServiceRadius] = useState(DEFAULT_SERVICE_RADIUS_MILES);
  const [basePrice, setBasePrice] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleService = (service: string) => {
    setServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Location is required to receive jobs');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
    } catch (error) {
      console.error('Location error:', error);
    }
  };

  const handleComplete = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (services.length === 0) {
      Alert.alert('Error', 'Select at least one service');
      return;
    }

    setLoading(true);
    try {
      Alert.alert('Success!', 'Your account is pending review.', [
        { text: 'OK', onPress: () => router.replace('/provider/jobs') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
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
        <Text style={styles.headerTitle}>
          {step === 1 && 'Services'}
          {step === 2 && 'Location'}
          {step === 3 && 'Pricing'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressStep, step >= 1 && styles.progressStepActive]} />
        <View style={[styles.progressStep, step >= 2 && styles.progressStepActive]} />
        <View style={[styles.progressStep, step >= 3 && styles.progressStepActive]} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {step === 1 && (
          <>
            <Text style={styles.sectionTitle}>What services do you offer?</Text>
            <Text style={styles.sectionSubtitle}>
              Select all that apply to your business
            </Text>
            
            <View style={styles.servicesList}>
              {Object.entries(SERVICE_LABELS).map(([key, label]) => (
                <TouchableOpacity
                  key={key}
                  style={[styles.serviceOption, services.includes(key) && styles.serviceOptionSelected]}
                  onPress={() => toggleService(key)}
                >
                  <View style={styles.serviceInfo}>
                    <View style={[styles.serviceIconCircle, services.includes(key) && styles.serviceIconCircleSelected]}>
                      <Text style={[styles.serviceEmoji, services.includes(key) && styles.serviceEmojiSelected]}>
                        {key === 'tire_change' && '◉'}
                        {key === 'towing' && '⊞'}
                        {key === 'battery_jump' && '⚡'}
                        {key === 'fuel_delivery' && '⛽'}
                        {key === 'lockout' && '⊠'}
                        {key === 'mechanic' && '⚙'}
                      </Text>
                    </View>
                    <Text style={[styles.serviceLabel, services.includes(key) && styles.serviceLabelSelected]}>
                      {label}
                    </Text>
                  </View>
                  <View style={[styles.checkbox, services.includes(key) && styles.checkboxSelected]}>
                    {services.includes(key) && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.sectionTitle}>Service Area</Text>
            <Text style={styles.sectionSubtitle}>
              Set your operating radius from your base location
            </Text>
            
            <View style={styles.locationCard}>
              <View style={styles.locationHeader}>
                <Text style={styles.locationIcon}>⊡</Text>
                <Text style={styles.locationLabel}>Current Location</Text>
              </View>
              <TouchableOpacity style={styles.refreshButton} onPress={getCurrentLocation}>
                <Text style={styles.refreshText}>Update Location</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.radiusSection}>
              <Text style={styles.radiusLabel}>Service Radius</Text>
              <Text style={styles.radiusValue}>{serviceRadius} miles</Text>
            </View>
            <View style={styles.radiusButtons}>
              {[10, 15, 25, 50].map((radius) => (
                <TouchableOpacity
                  key={radius}
                  style={[styles.radiusButton, serviceRadius === radius && styles.radiusButtonSelected]}
                  onPress={() => setServiceRadius(radius)}
                >
                  <Text style={[styles.radiusButtonText, serviceRadius === radius && styles.radiusButtonTextSelected]}>
                    {radius} mi
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <Text style={styles.sectionSubtitle}>
              Set your base pricing for services
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Base Service Fee</Text>
              <TextInput
                style={styles.input}
                placeholder="75"
                placeholderTextColor={Colors.mute}
                value={basePrice}
                onChangeText={setBasePrice}
                keyboardType="numeric"
              />
              <Text style={styles.inputHint}>
                Starting price for standard jobs
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>!</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>How payments work</Text>
                <Text style={styles.infoText}>
                  Customers pay through the app{'\n'}
                  You receive 80% of each job{'\n'}
                  Platform takes 20% commission{'\n'}
                  Payouts to your bank weekly
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleComplete}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : step < 3 ? 'Continue' : 'Complete Setup'}
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
  progressBar: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.body,
    marginBottom: Spacing['2xl'],
  },
  servicesList: {
    gap: Spacing.md,
  },
  serviceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.xl,
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
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors['canvas-soft'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceIconCircleSelected: {
    backgroundColor: Colors.primary,
  },
  serviceEmoji: {
    fontSize: 20,
    color: Colors.ink,
  },
  serviceEmojiSelected: {
    color: Colors['on-dark'],
  },
  serviceLabel: {
    fontSize: FontSizes.lg,
    color: Colors.ink,
  },
  serviceLabelSelected: {
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.mute,
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
  locationCard: {
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  locationIcon: {
    fontSize: 24,
    color: Colors.ink,
    marginRight: Spacing.sm,
  },
  locationLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.ink,
  },
  refreshButton: {
    alignSelf: 'flex-start',
  },
  refreshText: {
    fontSize: FontSizes.md,
    color: Colors.ink,
    fontWeight: '600',
  },
  radiusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  radiusLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.ink,
  },
  radiusValue: {
    fontSize: FontSizes.lg,
    color: Colors.body,
  },
  radiusButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  radiusButton: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiusButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  radiusButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
  },
  radiusButtonTextSelected: {
    color: Colors['on-dark'],
  },
  inputGroup: {
    marginBottom: Spacing['2xl'],
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  input: {
    height: 56,
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.ink,
  },
  inputHint: {
    fontSize: FontSizes.sm,
    color: Colors.body,
    marginTop: Spacing.sm,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  infoIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.ink,
    marginRight: Spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: FontSizes.sm,
    color: Colors.body,
    lineHeight: 22,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  button: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors['on-primary'],
  },
});
