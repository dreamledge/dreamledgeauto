import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Switch, FlatList, Animated } from 'react-native';

const Colors = {
  primary: '#000000',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  border: '#E5E5E5',
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  white: '#FFFFFF',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
};

const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
const FontSizes = { xs: 10, sm: 12, md: 14, lg: 16, xl: 18, xxl: 24 };
const BorderRadius = { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 };

const SERVICE_TYPES = [
  { key: 'mechanic', label: 'Mobile Mechanic', icon: '🔧' },
  { key: 'tire_change', label: 'Tire Change', icon: '❕' },
  { key: 'battery_jump', label: 'Battery Jump', icon: '🔋' },
  { key: 'towing', label: 'Towing', icon: '🚗' },
  { key: 'fuel_delivery', label: 'Fuel Delivery', icon: '⛽' },
  { key: 'lockout', label: 'Lockout', icon: '🔐' },
];

export default function App() {
  const [screen, setScreen] = React.useState('splash');
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (screen === 'splash') {
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
      setTimeout(() => setScreen('role-select'), 2000);
    }
  }, [screen]);

  if (screen === 'splash') {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Text style={styles.logo}>🚗</Text>
          <Text style={styles.title}>Dreamledge Auto</Text>
          <Text style={styles.subtitle}>Mobile Mechanic Services</Text>
        </Animated.View>
      </View>
    );
  }

  if (screen === 'role-select') {
    return <RoleSelectScreen onNavigate={setScreen} />;
  }

  if (screen === 'customer-signup') {
    return <CustomerSignupScreen onNavigate={setScreen} />;
  }

  if (screen === 'provider-signup') {
    return <ProviderSignupScreen onNavigate={setScreen} />;
  }

  if (screen === 'login') {
    return <LoginScreen onNavigate={setScreen} />;
  }

  if (screen === 'customer-home') {
    return <CustomerHomeScreen onNavigate={setScreen} />;
  }

  if (screen === 'provider-jobs') {
    return <ProviderJobsScreen onNavigate={setScreen} />;
  }

  return <RoleSelectScreen onNavigate={setScreen} />;
}

function RoleSelectScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🚗</Text>
        <Text style={styles.title}>Dreamledge Auto</Text>
        <Text style={styles.subtitle}>Get back on the road fast</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.card} onPress={() => onNavigate('customer-signup')}>
          <Text style={styles.cardIcon}>🚙</Text>
          <Text style={styles.cardTitle}>I Need Help</Text>
          <Text style={styles.cardSubtitle}>Request roadside assistance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => onNavigate('provider-signup')}>
          <Text style={styles.cardIcon}>🔧</Text>
          <Text style={styles.cardTitle}>I'm a Mechanic</Text>
          <Text style={styles.cardSubtitle}>Offer mobile repair services</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => onNavigate('login')}>
          <Text style={styles.loginLink}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function CustomerSignupScreen({ onNavigate }) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => onNavigate('role-select')}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Create Account</Text>
      <Text style={styles.headerSubtitle}>Get help on the road</Text>
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="John Smith" />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="(937) 555-0123" keyboardType="phone-pad" />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="john@example.com" autoCapitalize="none" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => onNavigate('customer-home')}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProviderSignupScreen({ onNavigate }) {
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedServices, setSelectedServices] = React.useState([]);

  const toggleService = (key) => {
    setSelectedServices(prev => prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => onNavigate('role-select')}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <View style={styles.stepIndicator}>
        <View style={[styles.stepDot, step >= 1]} />
        <View style={[styles.stepDot, step >= 2]} />
        <View style={[styles.stepDot, step >= 3]} />
      </View>
      <Text style={styles.headerTitle}>{step === 1 ? 'Your Information' : step === 2 ? 'Select Services' : 'Business Details'}</Text>
      
      <ScrollView style={styles.form}>
        {step === 1 && (
          <>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="John Smith" />
            <Text style={styles.label}>Phone</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="(937) 555-0123" />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="john@example.com" autoCapitalize="none" />
          </>
        )}
        {step === 2 && (
          <View style={styles.servicesList}>
            {SERVICE_TYPES.map(s => (
              <TouchableOpacity key={s.key} style={[styles.serviceOption, selectedServices.includes(s.key) && styles.serviceOptionSelected]} onPress={() => toggleService(s.key)}>
                <Text style={styles.serviceIcon}>{s.icon}</Text>
                <Text style={styles.serviceLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {step === 3 && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Your account will be reviewed before you can start accepting jobs.</Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={() => step < 3 ? setStep(step + 1) : onNavigate('provider-jobs')}>
          <Text style={styles.buttonText}>{step < 3 ? 'Continue' : 'Create Account'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function LoginScreen({ onNavigate }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => onNavigate('role-select')}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Welcome Back</Text>
      <Text style={styles.headerSubtitle}>Sign in to continue</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="john@example.com" autoCapitalize="none" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => onNavigate('customer-home')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => onNavigate('role-select')}>
          <Text style={styles.loginLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function CustomerHomeScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.subtitle}>How can we help?</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>All Services</Text>
        <View style={styles.servicesGrid}>
          {SERVICE_TYPES.map(s => (
            <TouchableOpacity key={s.key} style={styles.serviceCard} onPress={() => onNavigate('customer-home')}>
              <Text style={styles.serviceIcon}>{s.icon}</Text>
              <Text style={styles.serviceLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🏠</Text><Text style={styles.navLabel}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>📋</Text><Text style={styles.navLabel}>Jobs</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>⚙️</Text><Text style={styles.navLabel}>Settings</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function ProviderJobsScreen({ onNavigate }) {
  const [isOnline, setIsOnline] = React.useState(false);
  const [jobs] = React.useState([
    { id: '1', service: 'mechanic', address: '123 Main St', price: 75, time: '10 min ago' },
    { id: '2', service: 'tire_change', address: '456 Oak Ave', price: 50, time: '25 min ago' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back!</Text>
          <Text style={styles.subtitle}>{isOnline ? "You're online" : "You're offline"}</Text>
        </View>
        <View style={styles.statusToggle}>
          <Switch value={isOnline} onValueChange={setIsOnline} />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Available Jobs</Text>
      <FlatList
        data={jobs}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.jobCard}>
            <Text style={styles.jobPrice}>${item.price}</Text>
            <Text style={styles.jobService}>{SERVICE_TYPES.find(s => s.key === item.service)?.label}</Text>
            <Text style={styles.jobAddress}>{item.address}</Text>
            <Text style={styles.jobTime}>{item.time}</Text>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptText}>View & Accept</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>📋</Text><Text style={styles.navLabel}>Jobs</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>💰</Text><Text style={styles.navLabel}>Earnings</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>⚙️</Text><Text style={styles.navLabel}>Settings</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flex: 1, padding: Spacing.lg },
  header: { padding: Spacing.lg, paddingTop: Spacing.xl },
  headerTitle: { fontSize: FontSizes.xxl, fontWeight: '700', color: Colors.primary, marginBottom: Spacing.xs },
  headerSubtitle: { fontSize: FontSizes.md, color: Colors.textSecondary },
  greeting: { fontSize: FontSizes.xxl, fontWeight: '700', color: Colors.primary, marginBottom: Spacing.xs },
  subtitle: { fontSize: FontSizes.md, color: Colors.textSecondary },
  logo: { fontSize: 60, textAlign: 'center', marginBottom: Spacing.md },
  title: { fontSize: FontSizes.xxl, fontWeight: '700', color: Colors.primary, textAlign: 'center', marginBottom: Spacing.sm },
  subtitle: { fontSize: FontSizes.md, color: Colors.textSecondary, textAlign: 'center' },
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing.xl, marginBottom: Spacing.md },
  cardIcon: { fontSize: 32, marginBottom: Spacing.sm },
  cardTitle: { fontSize: FontSizes.lg, fontWeight: '600', color: Colors.primary, marginBottom: Spacing.xs },
  cardSubtitle: { fontSize: FontSizes.md, color: Colors.textSecondary },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingBottom: Spacing.lg },
  footerText: { fontSize: FontSizes.md, color: Colors.textSecondary },
  loginLink: { fontSize: FontSizes.md, fontWeight: '600', color: Colors.primary },
  backButton: { padding: Spacing.lg },
  backText: { fontSize: 24, color: Colors.primary },
  form: { padding: Spacing.lg },
  label: { fontSize: FontSizes.sm, fontWeight: '600', color: Colors.textSecondary, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: { height: 52, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, fontSize: FontSizes.md, backgroundColor: Colors.surface },
  button: { height: 52, backgroundColor: Colors.primary, borderRadius: BorderRadius.md, justifyContent: 'center', alignItems: 'center', marginTop: Spacing.lg },
  buttonText: { fontSize: FontSizes.md, fontWeight: '600', color: Colors.white },
  stepIndicator: { flexDirection: 'row', padding: Spacing.lg, gap: Spacing.sm },
  stepDot: { flex: 1, height: 4, backgroundColor: Colors.border, borderRadius: 2 },
  servicesList: { gap: Spacing.md, marginTop: Spacing.md },
  serviceOption: { flexDirection: 'row', alignItems: 'center', padding: Spacing.lg, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.md, gap: Spacing.md },
  serviceOptionSelected: { backgroundColor: Colors.surface, borderColor: Colors.primary },
  serviceIcon: { fontSize: 24 },
  serviceLabel: { fontSize: FontSizes.md, color: Colors.primary },
  infoBox: { backgroundColor: Colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.md, marginTop: Spacing.lg },
  infoText: { fontSize: FontSizes.sm, color: Colors.textSecondary },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  serviceCard: { width: '47%', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, alignItems: 'center' },
  serviceIcon: { fontSize: 32, marginBottom: Spacing.sm },
  serviceLabel: { fontSize: FontSizes.sm, fontWeight: '500', color: Colors.primary, textAlign: 'center' },
  bottomNav: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: Colors.border, paddingVertical: Spacing.sm },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: Spacing.xs },
  navIcon: { fontSize: 20, marginBottom: 2 },
  navLabel: { fontSize: FontSizes.xs, color: Colors.textTertiary },
  statusToggle: { alignSelf: 'flex-start' },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '600', color: Colors.primary, marginBottom: Spacing.md, paddingHorizontal: Spacing.lg },
  jobCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginHorizontal: Spacing.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  jobPrice: { fontSize: FontSizes.xl, fontWeight: '700', color: Colors.primary, position: 'absolute', right: Spacing.lg, top: Spacing.lg },
  jobService: { fontSize: FontSizes.md, fontWeight: '600', color: Colors.primary, marginBottom: Spacing.xs },
  jobAddress: { fontSize: FontSizes.sm, color: Colors.textSecondary },
  jobTime: { fontSize: FontSizes.sm, color: Colors.textTertiary, marginTop: Spacing.xs },
  acceptButton: { height: 44, backgroundColor: Colors.primary, borderRadius: BorderRadius.md, justifyContent: 'center', alignItems: 'center', marginTop: Spacing.md },
  acceptText: { fontSize: FontSizes.md, fontWeight: '600', color: Colors.white },
});