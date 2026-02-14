import { GOOGLE_MAPS_API_KEY, API_ENDPOINTS } from '../config/api';

let debounceTimer = null;
let currentSessionToken = null;

/**
 * Generate a simple UUID for session tokens
 */
function generateSessionToken() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get or create session token
 */
function getSessionToken() {
  if (!currentSessionToken) {
    currentSessionToken = generateSessionToken();
  }
  return currentSessionToken;
}

/**
 * Clear session token (after selection)
 */
export function clearSessionToken() {
  currentSessionToken = null;
}

/**
 * Fetch autocomplete suggestions from Google Places API
 */
export async function fetchPlaceSuggestions(input) {
  try {
    if (!input || input.length < 3) {
      return [];
    }

    const sessionToken = getSessionToken();
    const url = `${API_ENDPOINTS.placeAutocomplete}?input=${encodeURIComponent(input)}&key=${GOOGLE_MAPS_API_KEY}&language=da&components=country:dk&sessiontoken=${sessionToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.predictions) {
      return data.predictions.map(prediction => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }));
    }

    if (data.status === 'ZERO_RESULTS') {
      return [];
    }

    if (data.status === 'REQUEST_DENIED') {
      console.error('Places API request denied:', data.error_message);
      throw new Error('Places API ikke aktiveret');
    }

    return [];
  } catch (error) {
    console.error('Error fetching place suggestions:', error);
    throw error;
  }
}

/**
 * Debounced version of fetchPlaceSuggestions
 */
export function fetchPlaceSuggestionsDebounced(input, callback) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(async () => {
    try {
      const suggestions = await fetchPlaceSuggestions(input);
      callback(suggestions, null);
    } catch (error) {
      callback([], error);
    }
  }, 300);
}
