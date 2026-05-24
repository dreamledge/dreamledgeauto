import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { SERVICE_LABELS, SERVICE_ICONS, SERVICE_TYPES } from '../../src/constants/config';

interface LocationData {
  latitude: number;
  longitude: number;
}

export default function CustomerRequestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const serviceType = params.serviceType as string || SERVICE_TYPES.MECHANIC;
  
  const [location, setLocation] = useState<LocationData | null>(null);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }
      
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      
      const [reverseGeocode] = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      
      if (reverseGeocode) {
        const fullAddress = [
          reverseGeocode.street,
          reverseGeocode.city,
          reverseGeocode.region,
          reverseGeocode.postalCode,
        ].filter(Boolean).join(', ');
        setAddress(fullAddress);
      }
    } catch (error) {
      console.error('Location error:', error);
    }
  };

  const handleSubmit = async () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your location');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please describe the issue');
      return;
    }

    setLoading(true);
    try {
      // Job creation would be handled here
      router.push({ 
        pathname: '/customer/offers', 
        params: { 
          serviceType,
          address,
          description,
          vehicleInfo,
          lat: String(location?.latitude || 0),
          lng: String(location?.longitude || 0),
        } 
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to create job request');
    } finally {
      setLoading(false);
    }
  };

  const serviceLabel = SERVICE_LABELS[serviceType] || 'Service';
  const serviceIcon = SERVICE_ICONS[serviceType] || '🔧';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Service</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.serviceInfo}>
          <View style={styles.serviceIconBg}>
            <Text style={styles.serviceIcon}>{serviceIcon}</Text>
          </View>
          <Text style={styles.serviceName}>{serviceLabel}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Location</Text>
            <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
              <Text style={styles.locationIcon}>📍</Text>
              <TextInput
                style={styles.locationInput}
                placeholder="Enter your address"
                placeholderTextColor={Colors.textTertiary}
                value={address}
                onChangeText={setAddress}
              />
              <Text style={styles.refreshIcon}>🔄</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Describe the Issue</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What's wrong with your vehicle?"
              placeholderTextColor={Colors.textTertiary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle Information (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Year, Make, Model"
              placeholderTextColor={Colors.textTertiary}
              value={vehicleInfo}
              onChangeText={setVehicleInfo}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitText}>
              {loading ? 'Finding Providers...' : 'Find Providers'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 24,
    color: Colors.primary,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  serviceInfo: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  serviceIconBg: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  serviceIcon: {
    fontSize: 40,
  },
  serviceName: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.primary,
  },
  form: {
    gap: Spacing.lg,
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.gray600,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
  },
  locationIcon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  locationInput: {
    flex: 1,
    height: 52,
    fontSize: FontSizes.md,
    color: Colors.primary,
  },
  refreshIcon: {
    fontSize: 18,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.primary,
    backgroundColor: Colors.surface,
  },
  textArea: {
    height: 120,
    paddingTop: Spacing.md,
    textAlignVertical: 'top',
  },
  submitButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
  },
});