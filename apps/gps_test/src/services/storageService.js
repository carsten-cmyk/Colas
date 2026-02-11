import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@colas_gps_test:sessions';

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
