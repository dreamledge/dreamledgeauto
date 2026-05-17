import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { SERVICE_LABELS, SERVICE_TYPES, SERVICE_ICONS } from '../../src/constants/config';

export default function CustomerHomeScreen() {
  const router = useRouter();

  const services = Object.entries(SERVICE_LABELS).map(([key, label]) => ({
    key,
    label,
    icon: SERVICE_ICONS[key],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello!</Text>
          <Text style={styles.subtitle}>How can we help you today?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>→</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActions}>
          {services.slice(0, 3).map((service) => (
            <TouchableOpacity
              key={service.key}
              style={styles.quickAction}
              onPress={() => router.push({ pathname: '/customer/request', params: { serviceType: service.key } })}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>{service.icon}</Text>
              </View>
              <Text style={styles.quickActionLabel}>{service.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.key}
                style={styles.serviceCard}
                onPress={() => router.push({ pathname: '/customer/request', params: { serviceType: service.key } })}
              >
                <View style={styles.serviceIconCircle}>
                  <Text style={styles.serviceIcon}>{service.icon}</Text>
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Jobs</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>—</Text>
            <Text style={styles.emptyText}>No recent jobs</Text>
            <Text style={styles.emptySubtext}>Your job history will appear here</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/customer/history')}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navLabel}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navLabel}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>Settings</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing['2xl'],
  },
  greeting: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.body,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors['canvas-soft'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
    color: Colors.ink,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  quickActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing['2xl'],
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.pill,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.canvas,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionEmoji: {
    fontSize: 24,
    color: Colors.ink,
  },
  quickActionLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    color: Colors.ink,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  serviceCard: {
    width: '47%',
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows['level-1'],
  },
  serviceIconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors['canvas-soft'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  serviceIcon: {
    fontSize: 24,
    color: Colors.ink,
  },
  serviceLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.ink,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing['2xl'],
    backgroundColor: Colors['canvas-soft'],
    borderRadius: BorderRadius.xl,
  },
  emptyIcon: {
    fontSize: 40,
    color: Colors.mute,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    fontSize: FontSizes.sm,
    color: Colors.mute,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingVertical: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: FontSizes.xs,
    color: Colors.mute,
  },
  navLabelActive: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.ink,
  },
});
