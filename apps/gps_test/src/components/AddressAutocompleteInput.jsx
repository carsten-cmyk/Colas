import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { fetchPlaceSuggestionsDebounced, clearSessionToken } from '../services/placesService';

export default function AddressAutocompleteInput({
  value,
  onAddressSelect,
  placeholder,
  label,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleInputChange = (text) => {
    onAddressSelect(text);

    if (text.length >= 3) {
      setLoading(true);
      setDropdownVisible(true);

      fetchPlaceSuggestionsDebounced(text, (results, error) => {
        setLoading(false);
        if (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } else {
          setSuggestions(results);
        }
      });
    } else {
      setSuggestions([]);
      setDropdownVisible(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    onAddressSelect(suggestion.description);
    setSuggestions([]);
    setDropdownVisible(false);
    clearSessionToken();
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={handleInputChange}
          autoCapitalize="words"
          autoCorrect={false}
        />

        {loading && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
      </View>

      {dropdownVisible && suggestions.length > 0 && (
        <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
          {suggestions.slice(0, 5).map((item) => (
            <TouchableOpacity
              key={item.placeId}
              style={styles.suggestionItem}
              onPress={() => handleSelectSuggestion(item)}
            >
              <Text style={styles.suggestionText}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {dropdownVisible && suggestions.length === 0 && !loading && value.length >= 3 && (
        <View style={styles.dropdown}>
          <View style={styles.suggestionItem}>
            <Text style={styles.noResultsText}>Ingen resultater fundet</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loadingIndicator: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 8,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  suggestionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  noResultsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
