import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { trackingConfig } from '../config/tracking';
import { calculateDistance } from '../utils/distance';

const LOCATION_TASK_NAME = 'background-location-task';

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
      return { granted: false, message: 'Foreground location permission denied' };
    }

    // Request background permissions (needed for tracking while app is backgrounded)
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== 'granted') {
      return { granted: false, message: 'Background location permission denied' };
    }

    return { granted: true };
  } catch (error) {
    console.error('Error requesting permissions:', error);
    return { granted: false, message: error.message };
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
