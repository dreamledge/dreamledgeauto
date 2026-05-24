import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../src/constants/theme';

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🚗</Text>
        <Text style={styles.title}>Dreamledge Auto</Text>
        <Text style={styles.subtitle}>Get back on the road fast</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/customer-signup')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚙</Text>
          </View>
          <Text style={styles.cardTitle}>I Need Help</Text>
          <Text style={styles.cardSubtitle}>
            Request roadside assistance or a mobile mechanic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/provider-signup')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔧</Text>
          </View>
          <Text style={styles.cardTitle}>I'm a Mechanic</Text>
          <Text style={styles.cardSubtitle}>
            Offer mobile repair services and earn money
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginLink}> Sign In</Text>
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
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: Spacing.lg,
  },
  footerText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.primary,
  },
});