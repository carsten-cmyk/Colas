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
              <Text style={styles.resultLabel}>Distance</Text>
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
              <Text style={styles.resultLabel}>Køretid</Text>
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

            {/* GPS Stats */}
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>GPS punkter</Text>
              <Text style={styles.resultValue}>{gpsPoints.length}</Text>
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
    marginTop: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  routeLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  routeFrom: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  routeArrow: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 2,
  },
  routeTo: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  resultsSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  resultStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  resultValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34C759',
  },
  resultValueSmall: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
  },
  resultSubtext: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  resultDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  resultDiff: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  newTripButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  newTripButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
