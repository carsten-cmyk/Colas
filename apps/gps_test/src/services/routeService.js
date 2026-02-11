import { GOOGLE_MAPS_API_KEY, API_ENDPOINTS, USE_MOCK_DATA } from '../config/api';

/**
 * Calculate estimated distance and time between two addresses
 * Uses Google Maps Distance Matrix API
 */
export async function calculateRoute(fromAddress, toAddress) {
  // Mock data for testing without API key
  if (USE_MOCK_DATA) {
    return getMockRouteData(fromAddress, toAddress);
  }

  try {
    const url = `${API_ENDPOINTS.distanceMatrix}?origins=${encodeURIComponent(
      fromAddress
    )}&destinations=${encodeURIComponent(toAddress)}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || data.rows[0].elements[0].status !== 'OK') {
      throw new Error('Could not calculate route');
    }

    const element = data.rows[0].elements[0];

    return {
      distance: element.distance.value / 1000, // Convert to km
      duration: element.duration.value / 60, // Convert to minutes
      distanceText: element.distance.text,
      durationText: element.duration.text,
    };
  } catch (error) {
    console.error('Error calculating route:', error);
    throw error;
  }
}

/**
 * Mock route data for testing
 */
function getMockRouteData(fromAddress, toAddress) {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate somewhat realistic mock data
      const distance = 50 + Math.random() * 100; // 50-150 km
      const duration = distance * 0.8 + Math.random() * 10; // ~0.8 min per km + variation

      resolve({
        distance: Math.round(distance),
        duration: Math.round(duration),
        distanceText: `${Math.round(distance)} km`,
        durationText: `${Math.round(duration)} min`,
      });
    }, 1000); // 1 second delay to simulate API call
  });
}

/**
 * Geocode an address to coordinates (for future use)
 */
export async function geocodeAddress(address) {
  if (USE_MOCK_DATA) {
    // Return mock coordinates
    return {
      latitude: 55.6761 + Math.random() * 0.5,
      longitude: 12.5683 + Math.random() * 0.5,
    };
  }

  try {
    const url = `${API_ENDPOINTS.geocoding}?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error('Could not geocode address');
    }

    const location = data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}
