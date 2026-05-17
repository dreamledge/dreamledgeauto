import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>D</Text>
        <Text style={styles.title}>Dreamledge <Text style={{color: '#FF3B30'}}>Auto</Text></Text>
        <Text style={styles.subtitle}>Get back on the road fast</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/customer-signup')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>→</Text>
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
            <Text style={styles.icon}>⚙</Text>
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
    backgroundColor: Colors.canvas,
  },
  header: {
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.body,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.xl,
    padding: Spacing['2xl'],
    ...Shadows['level-1'],
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors['canvas-soft'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 32,
    color: Colors.ink,
  },
  cardTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.body,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: Spacing.lg,
  },
  footerText: {
    fontSize: FontSizes.md,
    color: Colors.body,
  },
  loginLink: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
  },
});
