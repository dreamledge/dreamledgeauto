import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';

export default function ProviderEarningsScreen() {
  const router = useRouter();
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  const [stats] = useState({
    totalEarnings: 1250,
    jobsCompleted: 18,
    avgPerJob: 69,
    pendingPayout: 150,
  });

  const [earnings] = useState([
    { id: '1', date: 'May 9', job: 'Battery Jump', customer: 'John D.', price: 75, status: 'completed' },
    { id: '2', date: 'May 8', job: 'Tire Change', customer: 'Sarah M.', price: 50, status: 'completed' },
    { id: '3', date: 'May 7', job: 'Mobile Mechanic', customer: 'Mike R.', price: 120, status: 'pending' },
    { id: '4', date: 'May 6', job: 'Lockout', customer: 'Lisa K.', price: 60, status: 'completed' },
  ]);

  const renderEarning = ({ item }: { item: typeof earnings[0] }) => (
    <View style={styles.earningCard}>
      <View style={styles.earningInfo}>
        <Text style={styles.earningJob}>{item.job}</Text>
        <Text style={styles.earningCustomer}>{item.customer} • {item.date}</Text>
      </View>
      <View style={styles.earningAmount}>
        <Text style={[styles.amount, item.status === 'pending' && styles.pendingAmount]}>
          ${item.price}
        </Text>
        <Text style={[styles.status, item.status === 'pending' ? styles.pendingStatus : styles.completedStatus]}>
          {item.status === 'pending' ? 'Pending' : 'Paid'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.periodToggle}>
        <TouchableOpacity 
          style={[styles.periodButton, period === 'week' && styles.periodButtonActive]}
          onPress={() => setPeriod('week')}
        >
          <Text style={[styles.periodText, period === 'week' && styles.periodTextActive]}>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.periodButton, period === 'month' && styles.periodButtonActive]}
          onPress={() => setPeriod('month')}
        >
          <Text style={[styles.periodText, period === 'month' && styles.periodTextActive]}>This Month</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.totalLabel}>Total Earnings</Text>
        <Text style={styles.totalAmount}>${stats.totalEarnings}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.jobsCompleted}</Text>
            <Text style={styles.statLabel}>Jobs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${stats.avgPerJob}</Text>
            <Text style={styles.statLabel}>Avg/Job</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.pendingValue]}>${stats.pendingPayout}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>

      <View style={styles.listSection}>
        <Text style={styles.listTitle}>Recent Earnings</Text>
        <FlatList
          data={earnings}
          renderItem={renderEarning}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.payoutInfo}>
        <Text style={styles.payoutIcon}>💳</Text>
        <View style={styles.payoutDetails}>
          <Text style={styles.payoutLabel}>Next Payout</Text>
          <Text style={styles.payoutDate}>May 15, 2026</Text>
        </View>
        <Text style={styles.payoutAmount}>${stats.pendingPayout}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
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
  periodToggle: {
    flexDirection: 'row',
    margin: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
  },
  periodButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
  },
  periodText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  periodTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  statsCard: {
    margin: Spacing.lg,
    marginTop: 0,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
  },
  totalLabel: {
    fontSize: FontSizes.sm,
    color: Colors.gray400,
    marginBottom: Spacing.xs,
  },
  totalAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 2,
  },
  pendingValue: {
    color: Colors.warning,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.gray400,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.gray600,
  },
  listSection: {
    padding: Spacing.lg,
  },
  listTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  earningCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  earningInfo: {
    flex: 1,
  },
  earningJob: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  earningCustomer: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  earningAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  pendingAmount: {
    color: Colors.warning,
  },
  status: {
    fontSize: FontSizes.xs,
    marginTop: 2,
  },
  pendingStatus: {
    color: Colors.warning,
  },
  completedStatus: {
    color: Colors.success,
  },
  payoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.lg,
    marginTop: 0,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  payoutIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  payoutDetails: {
    flex: 1,
  },
  payoutLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  payoutDate: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  payoutAmount: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.success,
  },
});