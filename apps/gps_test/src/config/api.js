// Google Maps API Configuration
// TODO: Add your Google Maps API key
export const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';

// Alternative: Mapbox
// export const MAPBOX_API_KEY = 'YOUR_MAPBOX_KEY_HERE';

// API endpoints
export const API_ENDPOINTS = {
  distanceMatrix: 'https://maps.googleapis.com/maps/api/distancematrix/json',
  geocoding: 'https://maps.googleapis.com/maps/api/geocode/json',
};

// For development/testing without API
export const USE_MOCK_DATA = true; // Set to false when you have API key
