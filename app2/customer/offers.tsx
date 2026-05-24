import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
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
            <Text style={styles.ratingStar}>⭐</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, item.isOnline ? styles.statusOnline : styles.statusOffline]}>
          <Text style={[styles.statusText, item.isOnline ? styles.statusTextOnline : styles.statusTextOffline]}>
            {item.isOnline ? 'Online' : 'Away'}
          </Text>
        </View>
      </View>

      <View style={styles.providerDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>📍</Text>
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>💰</Text>
          <Text style={styles.detailPrice}>${item.price}</Text>
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
  infoBar: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
  },
  infoText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  providerCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadows.md,
  },
  providerCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
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
    backgroundColor: Colors.gray400,
  },
  avatarText: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.white,
  },
  providerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  providerName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 14,
    marginRight: 2,
  },
  ratingText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
  reviewsText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statusOnline: {
    backgroundColor: Colors.success + '20',
  },
  statusOffline: {
    backgroundColor: Colors.gray300,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  statusTextOnline: {
    color: Colors.success,
  },
  statusTextOffline: {
    color: Colors.gray500,
  },
  providerDetails: {
    flexDirection: 'row',
    gap: Spacing.xl,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailIcon: {
    fontSize: 16,
  },
  detailText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  detailPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  selectButton: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
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
    color: Colors.primary,
  },
  selectTextSelected: {
    color: Colors.white,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  confirmButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
  },
});