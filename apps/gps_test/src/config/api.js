// Google Maps API Configuration
export const GOOGLE_MAPS_API_KEY = 'AIzaSyAU68sitjYN41KqA7YRXhgR3BJKO-noZG4';

// Alternative: Mapbox
// export const MAPBOX_API_KEY = 'YOUR_MAPBOX_KEY_HERE';

// API endpoints
export const API_ENDPOINTS = {
  distanceMatrix: 'https://maps.googleapis.com/maps/api/distancematrix/json',
  geocoding: 'https://maps.googleapis.com/maps/api/geocode/json',
  placeAutocomplete: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
};

// For development/testing without API
// Set to false to use real Google Maps API (API key required)
export const USE_MOCK_DATA = false;
