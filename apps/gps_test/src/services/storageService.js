import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@colas_gps_test:sessions';
const ACTIVE_TRACKING_KEY = '@colas_gps_test:active_tracking';

/**
 * Save a tracking session
 */
export async function saveSession(session) {
  try {
    const sessions = await getAllSessions();
    sessions.push(session);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    return true;
  } catch (error) {
    console.error('Error saving session:', error);
    return false;
  }
}

/**
 * Get all tracking sessions
 */
export async function getAllSessions() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting sessions:', error);
    return [];
  }
}

/**
 * Get session by ID
 */
export async function getSessionById(id) {
  try {
    const sessions = await getAllSessions();
    return sessions.find(s => s.id === id);
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Delete a session
 */
export async function deleteSession(id) {
  try {
    const sessions = await getAllSessions();
    const filtered = sessions.filter(s => s.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting session:', error);
    return false;
  }
}

/**
 * Clear all sessions (for testing)
 */
export async function clearAllSessions() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing sessions:', error);
    return false;
  }
}

/**
 * Save location update from background task
 */
export async function saveLocationUpdate(location) {
  try {
    const existing = await AsyncStorage.getItem(ACTIVE_TRACKING_KEY);
    const data = existing ? JSON.parse(existing) : { points: [] };

    data.points.push({
      ...location,
      timestamp: location.timestamp || Date.now(),
    });
    data.lastUpdate = Date.now();

    await AsyncStorage.setItem(ACTIVE_TRACKING_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving location update:', error);
  }
}

/**
 * Get active tracking data (for polling from TrackingScreen)
 */
export async function getActiveTrackingData() {
  try {
    const data = await AsyncStorage.getItem(ACTIVE_TRACKING_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting active tracking data:', error);
    return null;
  }
}

/**
 * Clear active tracking data
 */
export async function clearActiveTracking() {
  try {
    await AsyncStorage.removeItem(ACTIVE_TRACKING_KEY);
  } catch (error) {
    console.error('Error clearing active tracking:', error);
  }
}
