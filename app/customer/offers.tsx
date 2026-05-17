import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

interface Provider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  isOnline: boolean;
  services: string[];
}

export default function CustomerOffersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [providers] = useState<Provider[]>([
    {
      id: '1',
      name: 'Mike\'s Auto Repair',
      rating: 4.8,
      reviews: 156,
      price: 75,
      distance: '2.3 mi',
      isOnline: true,
      services: ['mechanic', 'battery_jump'],
    },
    {
      id: '2',
      name: 'Quick Fix Mobile',
      rating: 4.9,
      reviews: 89,
      price: 65,
      distance: '3.1 mi',
      isOnline: true,
      services: ['mechanic', 'tire_change'],
    },
    {
      id: '3',
      name: 'Roadside Rescue',
      rating: 4.6,
      reviews: 234,
      price: 85,
      distance: '1.5 mi',
      isOnline: false,
      services: ['towing', 'lockout'],
    },
  ]);

  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handleAccept = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleConfirm = () => {
    if (selectedProvider) {
      router.push({ pathname: '/customer/track', params: { providerId: selectedProvider } });
    }
  };

  const renderProvider = ({ item }: { item: Provider }) => (
    <TouchableOpacity
      style={[styles.providerCard, selectedProvider === item.id && styles.providerCardSelected]}
      onPress={() => handleAccept(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.providerHeader}>
        <View style={[styles.providerAvatar, !item.isOnline && styles.providerAvatarOffline]}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
          </View>
        </View>
        <View style={[styles.statusDot, item.isOnline && styles.statusDotOnline]}>
          <View style={[styles.statusInner, item.isOnline ? styles.statusOnline : styles.statusOffline]} />
        </View>
      </View>

      <View style={styles.providerDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>⊡</Text>
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>$</Text>
          <Text style={styles.detailPrice}>{item.price}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.selectButton, selectedProvider === item.id && styles.selectButtonSelected]}
        onPress={() => handleAccept(item.id)}
      >
        <Text style={[styles.selectText, selectedProvider === item.id && styles.selectTextSelected]}>
          {selectedProvider === item.id ? 'Selected' : 'Select'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Providers</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.infoBar}>
        <Text style={styles.infoText}>Found {providers.length} providers near you</Text>
      </View>

      <FlatList
        data={providers}
        renderItem={renderProvider}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.confirmButton, !selectedProvider && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={!selectedProvider}
        >
          <Text style={styles.confirmText}>Confirm Provider</Text>
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
  infoBar: {
    padding: Spacing.md,
    backgroundColor: Colors['canvas-soft'],
  },
  infoText: {
    fontSize: FontSizes.sm,
    color: Colors.body,
    textAlign: 'center',
  },
  listContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  providerCard: {
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray200,
    ...Shadows['level-1'],
  },
  providerCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors['canvas-soft'],
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  providerAvatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerAvatarOffline: {
    backgroundColor: Colors.mute,
  },
  avatarText: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors['on-dark'],
  },
  providerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  providerName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 14,
    color: Colors.ink,
    marginRight: 2,
  },
  ratingText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.ink,
    marginRight: Spacing.xs,
  },
  reviewsText: {
    fontSize: FontSizes.sm,
    color: Colors.body,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDotOnline: {
    backgroundColor: Colors.success + '20',
  },
  statusInner: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
  },
  statusOnline: {
    backgroundColor: Colors.success,
  },
  statusOffline: {
    backgroundColor: Colors.mute,
  },
  providerDetails: {
    flexDirection: 'row',
    gap: Spacing['2xl'],
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailIcon: {
    fontSize: 16,
    color: Colors.body,
  },
  detailText: {
    fontSize: FontSizes.md,
    color: Colors.body,
  },
  detailPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.ink,
  },
  selectButton: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  selectText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
  },
  selectTextSelected: {
    color: Colors['on-dark'],
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  confirmButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors['on-primary'],
  },
});
