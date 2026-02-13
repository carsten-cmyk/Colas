import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { theme } from '../config/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Don't render until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  const handleStart = () => {
    navigation.navigate('Input');
  };

  return (
    <View style={styles.container}>
      {/* Left Side - Worker Image (70%) */}
      <View style={styles.imageSection}>
        <Image
          source={require('../../assets/hero-worker.png')}
          style={styles.workerImage}
          resizeMode="cover"
        />
      </View>

      {/* Right Side - Yellow Strip (30%) */}
      <View style={styles.yellowStrip}>
        {/* COLAS Logo - Vertical */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/colas-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <Text style={styles.greetingText}>Godmorgen Jens</Text>
          <Text style={styles.descriptionText}>
            Du har 3 opgaver{'\n'}aktiveret for Colas
          </Text>
          <Text style={styles.statsText}>• 3 Opgaver</Text>
          <Text style={styles.statsText}>• 2 Aflevering</Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  // Left Side - Image Section (70%)
  imageSection: {
    width: width * 0.7,
    height: height,
  },
  workerImage: {
    width: '100%',
    height: '100%',
  },

  // Right Side - Yellow Strip (30%)
  yellowStrip: {
    width: width * 0.3,
    height: height,
    backgroundColor: theme.colors.colasYellow,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Logo Section
  logoContainer: {
    width: '100%',
    height: height * 0.25,
    alignItems: 'flex-end', // Right align logo
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.md,
    paddingRight: theme.spacing.xs,
  },
  logo: {
    width: '80%',
    height: '100%',
  },

  // Text Content
  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.xs,
  },
  greetingText: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.md,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.sm,
  },
  descriptionText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  statsText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.colasBlack,
    marginBottom: theme.spacing.xs,
  },

  // Start Button
  startButton: {
    width: '90%',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.colasYellow,
    borderWidth: 2,
    borderColor: theme.colors.colasBlack,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  startButtonText: {
    fontFamily: theme.fonts.semibold,
    fontSize: theme.fontSizes.md,
    color: theme.colors.colasBlack,
  },
});
