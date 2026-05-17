import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

interface Provider {
  id: string;
  name: string;
  phone: string;
  services: string[];
  state: 'pending' | 'under_review' | 'approved' | 'rejected';
  createdAt: string;
}

interface Job {
  id: string;
  customer: string;
  service: string;
  status: string;
  price: number;
  date: string;
}

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'providers' | 'jobs' | 'stats'>('providers');

  const [providers] = useState<Provider[]>([
    { id: '1', name: 'Mike Smith', phone: '(937) 555-0123', services: ['mechanic'], state: 'pending', createdAt: 'May 9, 2026' },
    { id: '2', name: 'Jane Doe', phone: '(937) 555-0456', services: ['battery_jump', 'tow'], state: 'approved', createdAt: 'May 8, 2026' },
  ]);

  const [jobs] = useState<Job[]>([
    { id: '1', customer: 'John D.', service: 'Battery Jump', status: 'completed', price: 75, date: 'May 9, 2026' },
    { id: '2', customer: 'Sarah M.', service: 'Tire Change', status: 'in_progress', price: 50, date: 'May 9, 2026' },
  ]);

  const handleApprove = (providerId: string) => {
    Alert.alert('Approve Provider', 'This provider will now be able to receive jobs.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Approve', onPress: () => {} },
    ]);
  };

  const handleReject = (providerId: string) => {
    Alert.alert('Reject Provider', 'Please provide a reason:', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reject', style: 'destructive', onPress: () => {} },
    ]);
  };

  const renderProvider = ({ item }: { item: Provider }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.phone}</Text>
        </View>
        <View style={[
          styles.badge,
          item.state === 'approved' && styles.badgeApproved,
          item.state === 'pending' && styles.badgePending,
          item.state === 'rejected' && styles.badgeRejected,
        ]}>
          <Text style={[
            styles.badgeText,
            item.state === 'approved' && styles.badgeTextApproved,
            item.state === 'pending' && styles.badgeTextPending,
            item.state === 'rejected' && styles.badgeTextRejected,
          ]}>
            {item.state}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardDetails}>
        <Text style={styles.detailText}>{item.services.join(', ')}</Text>
        <Text style={styles.dateText}>Applied: {item.createdAt}</Text>
      </View>

      {item.state === 'pending' && (
        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleApprove(item.id)}
          >
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleReject(item.id)}
          >
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderJob = ({ item }: { item: Job }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.customer}</Text>
          <Text style={styles.cardSubtitle}>{item.service}</Text>
        </View>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.statusText}>{item.status}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>D</Text>
        <Text style={styles.headerTitle}>Dreamledge <Text style={{color: '#FF3B30'}}>Auto</Text></Text>
        <Text style={styles.adminLabel}>Admin</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, tab === 'providers' && styles.tabActive]}
          onPress={() => setTab('providers')}
        >
          <Text style={[styles.tabText, tab === 'providers' && styles.tabTextActive]}>
            Providers ({providers.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, tab === 'jobs' && styles.tabActive]}
          onPress={() => setTab('jobs')}
        >
          <Text style={[styles.tabText, tab === 'jobs' && styles.tabTextActive]}>
            Jobs ({jobs.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, tab === 'stats' && styles.tabActive]}
          onPress={() => setTab('stats')}
        >
          <Text style={[styles.tabText, tab === 'stats' && styles.tabTextActive]}>
            Stats
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'providers' && (
        <FlatList
          data={providers}
          renderItem={renderProvider}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <TextInput 
              style={styles.searchInput}
              placeholder="Search providers..."
              placeholderTextColor={Colors.mute}
            />
          }
        />
      )}

      {tab === 'jobs' && (
        <FlatList
          data={jobs}
          renderItem={renderJob}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      {tab === 'stats' && (
        <ScrollView style={styles.statsContent}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Active Providers</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>$2,450</Text>
              <Text style={styles.statLabel}>Revenue (MTD)</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>48</Text>
              <Text style={styles.statLabel}>Jobs (MTD)</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['canvas-soft'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.primary,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors['on-dark'],
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors['on-dark'],
  },
  adminLabel: {
    fontSize: FontSizes.sm,
    color: Colors.mute,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.canvas,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.gray200,
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSizes.sm,
    color: Colors.body,
  },
  tabTextActive: {
    color: Colors.ink,
    fontWeight: '600',
  },
  list: {
    padding: Spacing.lg,
  },
  searchInput: {
    height: 44,
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows['level-1'],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors['on-dark'],
  },
  cardInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  cardTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
  },
  cardSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.body,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  badgeApproved: {
    backgroundColor: Colors.success + '20',
  },
  badgePending: {
    backgroundColor: Colors.warning + '20',
  },
  badgeRejected: {
    backgroundColor: Colors.error + '20',
  },
  badgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  badgeTextApproved: {
    color: Colors.success,
  },
  badgeTextPending: {
    color: Colors.warning,
  },
  badgeTextRejected: {
    color: Colors.error,
  },
  priceText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.ink,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  detailText: {
    fontSize: FontSizes.sm,
    color: Colors.body,
    textTransform: 'capitalize',
  },
  dateText: {
    fontSize: FontSizes.sm,
    color: Colors.mute,
  },
  statusText: {
    fontSize: FontSizes.sm,
    color: Colors.success,
    textTransform: 'capitalize',
  },
  cardActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  actionButton: {
    flex: 1,
    height: 40,
    borderRadius: BorderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: Colors.success,
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: Colors.error,
  },
  approveText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.canvas,
  },
  rejectText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.error,
  },
  statsContent: {
    flex: 1,
    padding: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows['level-1'],
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.body,
  },
});
