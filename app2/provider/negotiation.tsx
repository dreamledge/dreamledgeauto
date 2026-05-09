import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

export default function ProviderNegotiationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const jobId = params.jobId as string;
  
  const [price, setPrice] = useState('75');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOffer = async () => {
    const priceNum = parseInt(price);
    if (!priceNum || priceNum < 25) {
      Alert.alert('Error', 'Minimum price is $25');
      return;
    }

    setLoading(true);
    try {
      // Would send offer to customer
      Alert.alert('Offer Sent!', 'Waiting for customer response.', [
        { text: 'OK', onPress: () => router.replace('/provider/jobs') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to send offer');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = async () => {
    setLoading(true);
    try {
      router.push('/provider/jobs');
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
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <View style={styles.jobIcon}>
              <Text style={styles.jobEmoji}>🔧</Text>
            </View>
            <View style={styles.jobInfo}>
              <Text style={styles.jobService}>Mobile Mechanic</Text>
              <Text style={styles.jobTime}>Posted 10 min ago</Text>
            </View>
          </View>
          
          <View style={styles.jobDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📍</Text>
              <Text style={styles.detailText}>123 Main St, Dayton, OH 45402</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>🚗</Text>
              <Text style={styles.detailText}>2019 Honda Civic</Text>
            </View>
          </View>
          
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionLabel}>Issue Description</Text>
            <Text style={styles.description}>
              Car won't start this morning. Likely need a battery jump or may have a dead battery. 
              Please help, I'm stuck on the side of the road.
            </Text>
          </View>
        </View>

        <View style={styles.offerSection}>
          <Text style={styles.sectionTitle}>Send Your Offer</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Price</Text>
            <View style={styles.priceInput}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.priceField}
                placeholder="75"
                placeholderTextColor={Colors.textTertiary}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.inputHint}>
              Customer sees this price in your offer
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message (Optional)</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Add a note to your customer..."
              placeholderTextColor={Colors.textTertiary}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.sendButton, loading && styles.buttonDisabled]}
            onPress={handleSendOffer}
            disabled={loading}
          >
            <Text style={styles.sendText}>
              {loading ? 'Sending...' : 'Send Offer'}
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
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  jobIcon: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobEmoji: {
    fontSize: 24,
  },
  jobInfo: {
    marginLeft: Spacing.md,
  },
  jobService: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  jobTime: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  jobDetails: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: Spacing.md,
  },
  detailText: {
    fontSize: FontSizes.md,
    color: Colors.primary,
  },
  descriptionSection: {
    marginTop: Spacing.sm,
  },
  descriptionLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.gray600,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    lineHeight: 22,
  },
  offerSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.gray600,
    marginBottom: Spacing.sm,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
  },
  dollarSign: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
  priceField: {
    flex: 1,
    height: 56,
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.primary,
  },
  inputHint: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  messageInput: {
    height: 100,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.primary,
    backgroundColor: Colors.surface,
    textAlignVertical: 'top',
  },
  sendButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  sendText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
  },
});