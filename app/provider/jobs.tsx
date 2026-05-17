import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { useAuthStore } from '../../src/store/authStore';

export default function ProviderJobsScreen() {
  const router = useRouter();
  const { providerProfile } = useAuthStore();
  const [isOnline, setIsOnline] = useState(providerProfile?.isOnline || false);
  
  const [jobs] = useState([
    {
      id: '1',
      serviceType: 'mechanic',
      address: '123 Main St, Dayton, OH',
      distance: '2.3 mi',
      price: 75,
      time: '10 min ago',
      description: 'Car won\'t start, may need jump',
      status: 'pending',
    },
    {
      id: '2',
      serviceType: 'tire_change',
      address: '456 Oak Ave, Dayton, OH',
      distance: '3.5 mi',
      price: 50,
      time: '25 min ago',
      description: 'Flat tire - need replacement',
      status: 'pending',
    },
  ]);

  const toggleOnline = (value: boolean) => {
    setIsOnline(value);
  };

  const handleAccept = (jobId: string) => {
    router.push({ pathname: '/provider/negotiation', params: { jobId } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            {isOnline ? 'You\'re online and visible to customers' : 'You\'re offline'}
          </Text>
        </View>
        <View style={styles.statusToggle}>
          <Text style={[styles.statusLabel, isOnline && styles.statusLabelOnline]}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={toggleOnline}
            trackColor={{ false: Colors.mute, true: Colors.success }}
            thumbColor={Colors.canvas}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Available Jobs</Text>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {jobs.map((job) => (
            <TouchableOpacity 
              key={job.id} 
              style={styles.jobCard}
              onPress={() => handleAccept(job.id)}
            >
              <View style={styles.jobHeader}>
                <View style={styles.jobIcon}>
                  <Text style={styles.jobEmoji}>
                    {job.serviceType === 'mechanic' ? '⚙' : '◉'}
                  </Text>
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobServiceType}>
                    {job.serviceType === 'mechanic' ? 'Mobile Mechanic' : 'Tire Change'}
                  </Text>
                  <Text style={styles.jobTime}>{job.time}</Text>
                </View>
                <Text style={styles.jobPrice}>${job.price}</Text>
              </View>
              
              <View style={styles.jobDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>⊡</Text>
                  <Text style={styles.detailText}>{job.address}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>—</Text>
                  <Text style={styles.detailText}>{job.distance}</Text>
                </View>
              </View>
              
              <Text style={styles.jobDescription} numberOfLines={2}>
                {job.description}
              </Text>
              
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={() => handleAccept(job.id)}
              >
                <Text style={styles.acceptText}>View & Accept</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navLabelActive}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/provider/earnings')}>
          <Text style={styles.navIcon}>💰</Text>
          <Text style={styles.navLabel}>Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/provider/settings')}>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
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
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.mute,
  },
  statusLabelOnline: {
    color: Colors.success,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  jobCard: {
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray200,
    marginBottom: Spacing.md,
    ...Shadows['level-1'],
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  jobIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors['canvas-soft'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobEmoji: {
    fontSize: 20,
    color: Colors.ink,
  },
  jobInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  jobServiceType: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: 2,
  },
  jobTime: {
    fontSize: FontSizes.sm,
    color: Colors.body,
  },
  jobPrice: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.ink,
  },
  jobDetails: {
    marginBottom: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  detailIcon: {
    fontSize: 14,
    color: Colors.body,
    marginRight: Spacing.sm,
  },
  detailText: {
    fontSize: FontSizes.sm,
    color: Colors.body,
  },
  jobDescription: {
    fontSize: FontSizes.sm,
    color: Colors.ink,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  acceptButton: {
    height: 44,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors['on-primary'],
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingVertical: Spacing.sm,
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
