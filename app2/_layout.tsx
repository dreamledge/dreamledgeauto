import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import RoleSelectScreen from '../app/(auth)/role-select';
import CustomerSignupScreen from '../app/(auth)/customer-signup';
import ProviderSignupScreen from '../app/(auth)/provider-signup';
import LoginScreen from '../app/(auth)/login';
import CustomerHomeScreen from '../app/customer/home';
import CustomerRequestScreen from '../app/customer/request';
import CustomerOffersScreen from '../app/customer/offers';
import CustomerTrackScreen from '../app/customer/track';
import CustomerPaymentScreen from '../app/customer/payment';
import CustomerReviewScreen from '../app/customer/review';
import CustomerHistoryScreen from '../app/customer/history';
import ProviderOnboardingScreen from '../app/provider/onboarding';
import ProviderJobsScreen from '../app/provider/jobs';
import ProviderNegotiationScreen from '../app/provider/negotiation';
import ProviderEarningsScreen from '../app/provider/earnings';
import ProviderSettingsScreen from '../app/provider/settings';
import AdminDashboardScreen from '../app/admin/dashboard';
import IndexScreen from '../app/index';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" component={IndexScreen} />
          <Stack.Screen name="role-select" component={RoleSelectScreen} />
          <Stack.Screen name="customer-signup" component={CustomerSignupScreen} />
          <Stack.Screen name="provider-signup" component={ProviderSignupScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="customer-home" component={CustomerHomeScreen} />
          <Stack.Screen name="customer-request" component={CustomerRequestScreen} />
          <Stack.Screen name="customer-offers" component={CustomerOffersScreen} />
          <Stack.Screen name="customer-track" component={CustomerTrackScreen} />
          <Stack.Screen name="customer-payment" component={CustomerPaymentScreen} />
          <Stack.Screen name="customer-review" component={CustomerReviewScreen} />
          <Stack.Screen name="customer-history" component={CustomerHistoryScreen} />
          <Stack.Screen name="provider-onboarding" component={ProviderOnboardingScreen} />
          <Stack.Screen name="provider-jobs" component={ProviderJobsScreen} />
          <Stack.Screen name="provider-negotiation" component={ProviderNegotiationScreen} />
          <Stack.Screen name="provider-earnings" component={ProviderEarningsScreen} />
          <Stack.Screen name="provider-settings" component={ProviderSettingsScreen} />
          <Stack.Screen name="admin-dashboard" component={AdminDashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}