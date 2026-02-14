import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  startLocationTracking,
  stopLocationTracking,
  requestLocationPermissions,
  startBackgroundTracking,
  stopBackgroundTracking,
} from '../services/locationService';
import { calculateTotalDistance, formatDistance, formatDuration } from '../utils/distance';
import {
  saveSession,
  getActiveTrackingData,
  clearActiveTracking,
} from '../services/storageService';

export default function TrackingScreen({ navigation, route }) {
  const { fromAddress, toAddress, estimatedDistance, estimatedDuration } = route.params;

  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gpsPoints, setGpsPoints] = useState([]);
  const [actualDistance, setActualDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pauseDuration, setPauseDuration] = useState(0);

  const startTimeRef = useRef(null);
  const pauseStartRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const sessionIdRef = useRef(Date.now().toString());

  useEffect(() => {
    initializeTracking();

    return () => {
      cleanup();
    };
  }, []);

  // Poll for background location updates
  useEffect(() => {
    if (!isTracking) return;

    const pollInterval = setInterval(async () => {
      const bgData = await getActiveTrackingData();
      if (bgData && bgData.points.length > 0) {
        // Merge background points into gpsPoints state
        setGpsPoints((prev) => {
          // Deduplicate by timestamp
          const existingTimestamps = new Set(prev.map(p => p.timestamp));
          const newPoints = bgData.points.filter(p => !existingTimestamps.has(p.timestamp));

          if (newPoints.length > 0) {
            const merged = [...prev, ...newPoints];
            const distance = calculateTotalDistance(merged);
            setActualDistance(distance);
            return merged;
          }
          return prev;
        });

        // Clear processed data
        await clearActiveTracking();
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(pollInterval);
  }, [isTracking]);

  const initializeTracking = async () => {
    const permissionResult = await requestLocationPermissions();
    if (!permissionResult.granted) {
      Alert.alert(
        'Adgang nødvendig',
        'GPS tracking kræver lokationstilladelse',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      return;
    }

    handleStartTracking();
  };

  const cleanup = async () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    await stopLocationTracking();
    await stopBackgroundTracking();
    await clearActiveTracking();
  };

  const handleStartTracking = async () => {
    try {
      startTimeRef.current = Date.now();

      // Start timer - use refs to avoid stale closure
      timerIntervalRef.current = setInterval(() => {
        if (pauseStartRef.current === null) {
          // Not paused - calculate elapsed time
          const totalPauseTime = pauseDuration;
          const elapsed = Math.floor((Date.now() - startTimeRef.current - totalPauseTime) / 1000 / 60);
          setElapsedTime(elapsed);
        }
      }, 1000);

      // Start foreground GPS tracking
      await startLocationTracking((location) => {
        if (!isPaused) {
          console.log(`GPS point: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`);
          setGpsPoints((prev) => {
            const newPoints = [...prev, location];
            const distance = calculateTotalDistance(newPoints);
            setActualDistance(distance);
            console.log(`Total distance: ${distance.toFixed(3)} km, Points: ${newPoints.length}`);
            return newPoints;
          });
        }
      });

      // Start background GPS tracking (continues when screen locked)
      // Graceful degradation: if background fails, foreground still works
      try {
        await startBackgroundTracking();
      } catch (bgError) {
        console.log('Background tracking not available:', bgError);
      }

      setIsTracking(true);
    } catch (error) {
      Alert.alert('Fejl', 'Kunne ikke starte GPS tracking');
      console.error(error);
    }
  };

  const handlePause = async () => {
    if (isPaused) {
      // Resume
      const pauseEnd = Date.now();
      const thisPause = pauseEnd - pauseStartRef.current;
      setPauseDuration((prev) => prev + thisPause);
      pauseStartRef.current = null;
      setIsPaused(false);

      // Restart background tracking (optional)
      try {
        await startBackgroundTracking();
      } catch (error) {
        console.log('Background tracking not available');
      }
    } else {
      // Pause
      pauseStartRef.current = Date.now();
      setIsPaused(true);

      // Stop background tracking (optional)
      try {
        await stopBackgroundTracking();
      } catch (error) {
        console.log('Background tracking not available');
      }
    }
  };

  const handleFinish = async () => {
    Alert.alert(
      'Afslut opgave',
      'Er du sikker på at du vil afslutte?',
      [
        { text: 'Annuller', style: 'cancel' },
        {
          text: 'Afslut',
          style: 'destructive',
          onPress: async () => {
            await cleanup();

            // Save session
            const session = {
              id: sessionIdRef.current,
              fromAddress,
              toAddress,
              estimatedDistance,
              estimatedDuration,
              actualDistance,
              actualTime: elapsedTime,
              pauseDuration: Math.floor(pauseDuration / 1000 / 60),
              gpsPoints,
              startTime: startTimeRef.current,
              endTime: Date.now(),
            };

            await saveSession(session);

            // Navigate to result screen
            navigation.navigate('Result', session);
          },
        },
      ]
    );
  };

  const progressPercent = Math.min((actualDistance / estimatedDistance) * 100, 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Status Header */}
        <View style={styles.statusHeader}>
          <View style={[styles.statusBadge, isPaused ? styles.pausedBadge : styles.activeBadge]}>
            <Text style={styles.statusText}>
              {isPaused ? 'PAUSE' : 'KØRER'}
            </Text>
          </View>
        </View>

        {/* Route Info */}
        <View style={styles.routeInfo}>
          <Text style={styles.routeLabel}>Fra</Text>
          <Text style={styles.routeText} numberOfLines={1}>
            {fromAddress}
          </Text>
          <Text style={styles.routeLabel}>Til</Text>
          <Text style={styles.routeText} numberOfLines={1}>
            {toAddress}
          </Text>
        </View>

        {/* Progress Stats */}
        <View style={styles.statsContainer}>
          {/* Distance */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>
              {formatDistance(actualDistance)}
            </Text>
            <Text style={styles.statSubtext}>
              / {formatDistance(estimatedDistance)}
            </Text>
            {/* Progress Bar */}
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>

          {/* Time */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Tid</Text>
            <Text style={styles.statValue}>
              {formatDuration(elapsedTime)}
            </Text>
            <Text style={styles.statSubtext}>
              / ~{formatDuration(estimatedDuration)}
            </Text>
            {pauseDuration > 0 && (
              <Text style={styles.pauseText}>
                Pause: {formatDuration(Math.floor(pauseDuration / 1000 / 60))}
              </Text>
            )}
          </View>

          {/* GPS Points */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>GPS punkter</Text>
            <Text style={styles.statValue}>{gpsPoints.length}</Text>
            <Text style={styles.statSubtext}>Nøjagtighed: God</Text>
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, styles.pauseButton, isPaused && styles.resumeButton]}
            onPress={handlePause}
          >
            <Text style={styles.buttonText}>
              {isPaused ? 'Fortsæt' : 'Pause'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.finishButton]}
            onPress={handleFinish}
          >
            <Text style={styles.buttonText}>Afslut opgave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusHeader: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: '#34C759',
  },
  pausedBadge: {
    backgroundColor: '#FF9500',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routeInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  routeLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  routeText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
    marginBottom: 4,
  },
  statsContainer: {
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  pauseText: {
    fontSize: 11,
    color: '#FF9500',
    marginTop: 4,
    fontWeight: '500',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  controls: {
    marginTop: 0,
  },
  button: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  pauseButton: {
    backgroundColor: '#FF9500',
  },
  resumeButton: {
    backgroundColor: '#34C759',
  },
  finishButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
