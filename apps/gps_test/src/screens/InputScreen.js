import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { calculateRoute } from '../services/routeService';
import { formatDistance, formatDuration } from '../utils/distance';

export default function InputScreen({ navigation }) {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [routeData, setRouteData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculateRoute = async () => {
    // Validate inputs
    if (!fromAddress.trim() || !toAddress.trim()) {
      Alert.alert('Fejl', 'Udfyld venligst begge adresser');
      return;
    }

    setIsCalculating(true);
    try {
      const data = await calculateRoute(fromAddress, toAddress);
      setRouteData(data);
    } catch (error) {
      Alert.alert('Fejl', 'Kunne ikke beregne rute. Prøv igen.');
      console.error(error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleStartTracking = () => {
    if (!routeData) {
      Alert.alert('Fejl', 'Beregn ruten først');
      return;
    }

    // Navigate to tracking screen with route data
    navigation.navigate('Tracking', {
      fromAddress,
      toAddress,
      estimatedDistance: routeData.distance,
      estimatedDuration: routeData.duration,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>GPS Tracking Test</Text>
            <Text style={styles.subtitle}>Indtast din rute</Text>
          </View>

          {/* Address Inputs */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Fra-adresse</Text>
            <TextInput
              style={styles.input}
              placeholder="F.eks. Uddannelsescenter Syd, Lolland"
              value={fromAddress}
              onChangeText={setFromAddress}
              autoCapitalize="words"
              autoCorrect={false}
            />

            <Text style={styles.label}>Til-adresse</Text>
            <TextInput
              style={styles.input}
              placeholder="F.eks. Køge Asfaltfabrik"
              value={toAddress}
              onChangeText={setToAddress}
              autoCapitalize="words"
              autoCorrect={false}
            />

            {/* Calculate Button */}
            <TouchableOpacity
              style={[styles.button, styles.calculateButton]}
              onPress={handleCalculateRoute}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Beregn rute</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Route Info */}
          {routeData && (
            <View style={styles.routeInfo}>
              <Text style={styles.routeTitle}>Beregnet rute</Text>
              <View style={styles.routeRow}>
                <View style={styles.routeStat}>
                  <Text style={styles.routeStatLabel}>Distance</Text>
                  <Text style={styles.routeStatValue}>
                    {formatDistance(routeData.distance)}
                  </Text>
                </View>
                <View style={styles.routeStat}>
                  <Text style={styles.routeStatLabel}>Estimeret tid</Text>
                  <Text style={styles.routeStatValue}>
                    {formatDuration(routeData.duration)}
                  </Text>
                </View>
              </View>

              {/* Start Tracking Button */}
              <TouchableOpacity
                style={[styles.button, styles.startButton]}
                onPress={handleStartTracking}
              >
                <Text style={styles.buttonText}>Start opgave</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  calculateButton: {
    backgroundColor: '#007AFF',
  },
  startButton: {
    backgroundColor: '#34C759',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  routeInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  routeStat: {
    alignItems: 'center',
  },
  routeStatLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  routeStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
