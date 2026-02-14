import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { trackingConfig } from '../config/tracking';
import { calculateDistance } from '../utils/distance';
import { saveLocationUpdate } from './storageService';

const LOCATION_TASK_NAME = 'background-location-task';

// CRITICAL: Define background task at module load time (top of file)
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Background location error:', error);
    return;
  }

  if (data) {
    const { locations } = data;
    const location = locations[0];

    // Cannot update React state - use AsyncStorage instead
    await saveLocationUpdate({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      speed: location.coords.speed,
      timestamp: location.timestamp,
    });
  }
});

let locationSubscription = null;
let isTracking = false;

/**
 * Request location permissions
 */
export async function requestLocationPermissions() {
  try {
    // Request foreground permissions
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== 'granted') {
      return { granted: false, message: 'Lokation adgang nødvendig. Check iOS Settings → Expo Go → Lokation' };
    }

    // Skip background permissions in Expo Go (not supported)
    // Will request in production build only
    console.log('Foreground location permission granted');

    return { granted: true };
  } catch (error) {
    console.error('Error requesting permissions:', error);
    return { granted: false, message: 'Kunne ikke få lokation adgang: ' + error.message };
  }
}

/**
 * Start location tracking
 */
export async function startLocationTracking(onLocationUpdate) {
  try {
    // Check if already tracking
    if (isTracking) {
      console.log('Already tracking');
      return;
    }

    // Request permissions
    const permissionResult = await requestLocationPermissions();
    if (!permissionResult.granted) {
      throw new Error(permissionResult.message);
    }

    // Start foreground tracking
    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: trackingConfig.accuracy,
        timeInterval: trackingConfig.timeInterval,
        distanceInterval: trackingConfig.distanceInterval,
      },
      (location) => {
        if (onLocationUpdate) {
          onLocationUpdate({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            altitude: location.coords.altitude,
            accuracy: location.coords.accuracy,
            speed: location.coords.speed,
            heading: location.coords.heading,
            timestamp: location.timestamp,
          });
        }
      }
    );

    isTracking = true;
    console.log('Location tracking started');
  } catch (error) {
    console.error('Error starting location tracking:', error);
    throw error;
  }
}

/**
 * Stop location tracking
 */
export async function stopLocationTracking() {
  try {
    if (locationSubscription) {
      locationSubscription.remove();
      locationSubscription = null;
    }

    isTracking = false;
    console.log('Location tracking stopped');
  } catch (error) {
    console.error('Error stopping location tracking:', error);
  }
}

/**
 * Check if currently tracking
 */
export function isCurrentlyTracking() {
  return isTracking;
}

/**
 * Get current location (one-time)
 */
export async function getCurrentLocation() {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    throw error;
  }
}

/**
 * Check if within geofence radius of destination
 */
export function isWithinGeofence(currentLat, currentLon, destinationLat, destinationLon) {
  const distance = calculateDistance(currentLat, currentLon, destinationLat, destinationLon);
  return distance <= trackingConfig.geofenceRadius;
}

/**
 * Start background location tracking (continues when screen locked)
 * NOTE: Does not work in Expo Go - only in development/production builds
 */
export async function startBackgroundTracking() {
  try {
    // Check if running in Expo Go (background location not supported)
    const { status } = await Location.getBackgroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Background location not available (Expo Go limitation)');
      return; // Gracefully skip - foreground tracking will still work
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 10000, // 10 seconds
      distanceInterval: 50, // 50 meters
      foregroundService: {
        notificationTitle: 'GPS Tracking Aktiv',
        notificationBody: 'Din kørsel bliver tracket',
        notificationColor: '#007AFF',
      },
      pausesUpdatesAutomatically: false,
      activityType: Location.ActivityType.AutomotiveNavigation,
      showsBackgroundLocationIndicator: true, // iOS
    });
    console.log('Background tracking started');
  } catch (error) {
    console.log('Background tracking not available:', error.message);
    // Don't throw - let foreground tracking work
  }
}

/**
 * Stop background location tracking
 */
export async function stopBackgroundTracking() {
  try {
    const isStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (isStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log('Background tracking stopped');
    }
  } catch (error) {
    console.error('Error stopping background tracking:', error);
  }
}
