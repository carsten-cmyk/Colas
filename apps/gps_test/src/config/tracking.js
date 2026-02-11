import * as Location from 'expo-location';

export const trackingConfig = {
  // GPS accuracy settings
  accuracy: Location.Accuracy.High,

  // Update intervals
  distanceInterval: 50, // Update every 50 meters
  timeInterval: 10000,  // Update every 10 seconds (10000ms)

  // Geofence settings
  geofenceRadius: 50, // 50 meters radius for destination arrival

  // Background tracking
  backgroundTracking: {
    activityType: Location.ActivityType.AutomotiveNavigation,
    showsBackgroundLocationIndicator: true,
    pausesUpdatesAutomatically: false,
  }
};
