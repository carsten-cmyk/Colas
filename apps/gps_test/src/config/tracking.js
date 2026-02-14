import * as Location from 'expo-location';

export const trackingConfig = {
  // GPS accuracy settings
  accuracy: Location.Accuracy.High,

  // Update intervals
  distanceInterval: 5, // Update every 5 meters (for testing)
  timeInterval: 5000,  // Update every 5 seconds (5000ms)

  // Geofence settings
  geofenceRadius: 50, // 50 meters radius for destination arrival

  // Background tracking
  backgroundTracking: {
    activityType: Location.ActivityType.AutomotiveNavigation,
    showsBackgroundLocationIndicator: true,
    pausesUpdatesAutomatically: false,
  }
};
