import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { SERVICE_LABELS } from '../../src/constants/config';

interface Job {
  id: string;
  serviceType: string;
  providerName: string;
  date: string;
  price: number;
  status: 'completed' | 'cancelled';
}

export default function CustomerHistoryScreen() {
  const router = useRouter();
  
  const [jobs] = React.useState<Job[]>([
    {
      id: '1',
      serviceType: 'mechanic',
      providerName: "Mike's Auto Repair",
      date: 'May 5, 2026',
      price: 75,
      status: 'completed',
    },
    {
      id: '2',
      serviceType: 'battery_jump',
      providerName: 'Quick Fix Mobile',
      date: 'Apr 28, 2026',
      price: 50,
      status: 'completed',
    },
  ]);

  const renderJob = ({ item }: { item: Job }) => (
    <TouchableOpacity style={styles.jobCard} onPress={() => {}}>
      <View style={styles.jobHeader}>
        <View style={styles.serviceIcon}>
          <Text style={styles.serviceEmoji}>⚙</Text>
        </View>
        <View style={styles.jobInfo}>
          <Text style={styles.serviceName}>{SERVICE_LABELS[item.serviceType]}</Text>
          <Text style={styles.providerName}>{item.providerName}</Text>
        </View>
        <View style={[styles.statusBadge, item.status === 'completed' ? styles.completedBadge : styles.cancelledBadge]}>
          <Text style={[styles.statusText, item.status === 'completed' ? styles.completedText : styles.cancelledText]}>
            {item.status === 'completed' ? 'Completed' : 'Cancelled'}
          </Text>
        </View>
      </View>
      
      <View style={styles.jobFooter}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job History</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={jobs}
        renderItem={renderJob}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>—</Text>
            <Text style={styles.emptyText}>No jobs yet</Text>
            <Text style={styles.emptySubtext}>Your completed jobs will appear here</Text>
          </View>
        }
      />
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
  listContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  jobCard: {
    backgroundColor: Colors.canvas,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray200,
    ...Shadows['level-1'],
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors['canvas-soft'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceEmoji: {
    fontSize: 20,
    color: Colors.ink,
  },
  jobInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  serviceName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: 2,
  },
  providerName: {
    fontSize: FontSizes.sm,
    color: Colors.body,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  completedBadge: {
    backgroundColor: Colors.success + '20',
  },
  cancelledBadge: {
    backgroundColor: Colors.error + '20',
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  completedText: {
    color: Colors.success,
  },
  cancelledText: {
    color: Colors.error,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  dateText: {
    fontSize: FontSizes.sm,
    color: Colors.body,
  },
  priceText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.ink,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    color: Colors.mute,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    fontSize: FontSizes.md,
    color: Colors.mute,
  },
});
