import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { formatDistance, formatDuration } from '../utils/distance';

export default function ResultScreen({ navigation, route }) {
  const {
    fromAddress,
    toAddress,
    estimatedDistance,
    estimatedDuration,
    actualDistance,
    actualTime,
    pauseDuration,
    gpsPoints,
  } = route.params;

  const handleNewTrip = () => {
    navigation.navigate('Input');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Success Header */}
          <View style={styles.header}>
            <View style={styles.successIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.title}>Opgave afsluttet</Text>
          </View>

          {/* Route Info */}
          <View style={styles.routeCard}>
            <Text style={styles.routeLabel}>Rute</Text>
            <Text style={styles.routeFrom}>{fromAddress}</Text>
            <Text style={styles.routeArrow}>↓</Text>
            <Text style={styles.routeTo}>{toAddress}</Text>
          </View>

          {/* Results */}
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>Resultat</Text>

            {/* Distance */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultIcon}>📍</Text>
                <Text style={styles.resultLabel}>Distance</Text>
              </View>
              <View style={styles.resultStats}>
                <View>
                  <Text style={styles.resultValue}>
                    {formatDistance(actualDistance)}
                  </Text>
                  <Text style={styles.resultSubtext}>Faktisk</Text>
                </View>
                <View style={styles.resultDivider} />
                <View>
                  <Text style={styles.resultValueSmall}>
                    {formatDistance(estimatedDistance)}
                  </Text>
                  <Text style={styles.resultSubtext}>Estimeret</Text>
                </View>
              </View>
              <Text style={styles.resultDiff}>
                {actualDistance > estimatedDistance
                  ? `+${formatDistance(actualDistance - estimatedDistance)} over estimat`
                  : `${formatDistance(estimatedDistance - actualDistance)} under estimat`}
              </Text>
            </View>

            {/* Time */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultIcon}>⏱️</Text>
                <Text style={styles.resultLabel}>Køretid</Text>
              </View>
              <View style={styles.resultStats}>
                <View>
                  <Text style={styles.resultValue}>
                    {formatDuration(actualTime)}
                  </Text>
                  <Text style={styles.resultSubtext}>Faktisk</Text>
                </View>
                <View style={styles.resultDivider} />
                <View>
                  <Text style={styles.resultValueSmall}>
                    {formatDuration(estimatedDuration)}
                  </Text>
                  <Text style={styles.resultSubtext}>Estimeret</Text>
                </View>
              </View>
            </View>

            {/* Pause */}
            {pauseDuration > 0 && (
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultIcon}>⏸️</Text>
                  <Text style={styles.resultLabel}>Pause</Text>
                </View>
                <Text style={styles.resultValue}>
                  {formatDuration(pauseDuration)}
                </Text>
              </View>
            )}

            {/* Total Time */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultIcon}>⏰</Text>
                <Text style={styles.resultLabel}>Total tid</Text>
              </View>
              <Text style={styles.resultValue}>
                {formatDuration(actualTime + pauseDuration)}
              </Text>
              <Text style={styles.resultSubtext}>
                Inkl. {formatDuration(pauseDuration)} pause
              </Text>
            </View>

            {/* GPS Stats */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultIcon}>🛰️</Text>
                <Text style={styles.resultLabel}>GPS data</Text>
              </View>
              <Text style={styles.resultValue}>{gpsPoints.length}</Text>
              <Text style={styles.resultSubtext}>GPS punkter registreret</Text>
            </View>
          </View>

          {/* New Trip Button */}
          <TouchableOpacity
            style={styles.newTripButton}
            onPress={handleNewTrip}
          >
            <Text style={styles.newTripButtonText}>Start ny opgave</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 48,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  routeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  routeFrom: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  routeArrow: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginVertical: 4,
  },
  routeTo: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  resultsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  resultStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#34C759',
  },
  resultValueSmall: {
    fontSize: 24,
    fontWeight: '600',
    color: '#999',
  },
  resultSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  resultDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  resultDiff: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  newTripButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  newTripButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
