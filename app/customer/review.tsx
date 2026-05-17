import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

export default function CustomerReviewScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    Alert.alert('Thank you!', 'Your review helps other customers.', [
      { text: 'Done', onPress: () => router.replace('/customer/home') }
    ]);
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rate Your Experience</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.ratingCard}>
          <View style={styles.providerAvatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.providerName}>Mike's Auto Repair</Text>
          
          <View style={styles.starsContainer}>
            {stars.map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={[styles.star, star <= rating && styles.starActive]}>
                  {star <= rating ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.ratingText}>
            {rating === 5 && 'Excellent'}
            {rating === 4 && 'Great'}
            {rating === 3 && 'Good'}
            {rating === 2 && 'Fair'}
            {rating === 1 && 'Poor'}
          </Text>
        </View>

        <View style={styles.commentSection}>
          <Text style={styles.sectionTitle}>Comments (Optional)</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Tell us about your experience..."
            placeholderTextColor={Colors.mute}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Review</Text>
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
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.ink,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  ratingCard: {
    alignItems: 'center',
    padding: Spacing['2xl'],
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    ...Shadows['level-1'],
  },
  providerAvatar: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors['on-dark'],
  },
  providerName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.lg,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  star: {
    fontSize: 36,
    color: Colors.mute,
  },
  starActive: {
    color: Colors.ink,
  },
  ratingText: {
    fontSize: FontSizes.md,
    color: Colors.body,
  },
  commentSection: {
    flex: 1,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  commentInput: {
    flex: 1,
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.ink,
    textAlignVertical: 'top',
  },
  submitButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors['on-primary'],
  },
});
