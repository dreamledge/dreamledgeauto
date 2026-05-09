import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

export default function CustomerTrackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const providerId = params.providerId as string;
  
  const [status, setStatus] = useState<'arriving' | 'arrived' | 'working'>('arriving');
  const [eta, setEta] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => {
        if (prev <= 1) {
          setStatus('arrived');
          return 0;
        }
        return prev - 1;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleCall = () => {
    // Would integrate with expo-sms or expo-linking
  };

  const handleMessage = () => {
    router.push('/customer/negotiation');
  };

  const handleComplete = () => {
    router.push('/customer/payment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Your Mechanic</Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapText}>Live tracking map</Text>
        </View>
        
        {status === 'arriving' && (
          <View style={styles.statusCard}>
            <Text style={styles.statusEmoji}>🚗</Text>
            <Text style={styles.statusText}>Your mechanic is on the way</Text>
            <Text style={styles.etaText}>Arriving in {eta} minutes</Text>
          </View>
        )}

        {status === 'arrived' && (
          <View style={styles.statusCard}>
            <Text style={styles.statusEmoji}>✅</Text>
            <Text style={styles.statusText}>Your mechanic has arrived</Text>
            <Text style={styles.etaText}>Look for a white van</Text>
          </View>
        )}
      </View>

      <View style={styles.providerInfo}>
        <View style={styles.providerCard}>
          <View style={styles.providerAvatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={styles.providerDetails}>
            <Text style={styles.providerName}>Mike's Auto Repair</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.rating}>⭐ 4.8</Text>
              <Text style={styles.reviews}>(156 reviews)</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Text style={styles.actionIcon}>📞</Text>
            <Text style={styles.actionLabel}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionLabel}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        {status === 'arrived' ? (
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeText}>Mark as Complete</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel Request</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  mapText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  statusCard: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.md,
  },
  statusEmoji: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  statusText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  etaText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  providerInfo: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  providerAvatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.white,
  },
  providerDetails: {
    marginLeft: Spacing.md,
  },
  providerName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
  reviews: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  completeButton: {
    height: 56,
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
  },
  cancelButton: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.error,
  },
});