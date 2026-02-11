# GPS Tracking Test - MVP

Test app til at validere GPS tracking funktionalitet før implementation i hovedprojektet.

## Features

✅ **Input Screen**
- Indtast Fra-adresse og Til-adresse (frit tekst)
- Beregn estimeret distance og tid (mock data / Google Maps API)
- Start opgave

✅ **Tracking Screen**
- Real-time GPS tracking
- Live distance beregning
- Elapsed time tracking
- Pause/Resume funktionalitet
- Afslut opgave

✅ **Result Screen**
- Vis faktisk vs estimeret distance
- Vis faktisk vs estimeret tid
- Vis pause duration
- Gem session data lokalt

## Tech Stack

- **expo-location** - GPS tracking
- **expo-task-manager** - Background tracking
- **expo-notifications** - Local notifications
- **@react-native-async-storage/async-storage** - Data persistence
- **React Navigation** - Navigation mellem screens

## Kom i Gang

### 1. Installer dependencies (allerede gjort)
```bash
cd apps/gps_test
npm install
```

### 2. Start Expo Go
```bash
npm start
```

### 3. Test på device
- Scan QR code med Expo Go app
- Giv tilladelser til location

### 4. Test flow
1. Indtast to adresser (f.eks. "Nørrebrogade 1, København" og "Amagerbrogade 1, København")
2. Tryk "Beregn rute" - se estimeret distance/tid
3. Tryk "Start opgave" - GPS tracking starter
4. Gå en tur / kør en rute
5. Tryk "Pause" for at teste pause funktionalitet
6. Tryk "Afslut opgave" når færdig
7. Se resultat med faktisk distance, tid, GPS punkter

## API Configuration

### Google Maps API (Optional)
Hvis du vil teste med rigtig route calculation:

1. Få en Google Maps API key fra Google Cloud Console
2. Enable Distance Matrix API
3. Opdater `src/config/api.js`:
   ```javascript
   export const GOOGLE_MAPS_API_KEY = 'din_api_key';
   export const USE_MOCK_DATA = false;
   ```

### Mock Data (Default)
App'en bruger mock data som standard, så du kan teste uden API key.

## Permissions

### iOS
- NSLocationWhenInUseUsageDescription
- NSLocationAlwaysAndWhenInUseUsageDescription
- UIBackgroundModes: ["location"]

### Android
- ACCESS_COARSE_LOCATION
- ACCESS_FINE_LOCATION
- ACCESS_BACKGROUND_LOCATION
- FOREGROUND_SERVICE
- FOREGROUND_SERVICE_LOCATION

## Test Checklist

- [ ] Test address input (forskellige adresser)
- [ ] Test route calculation (med mock data)
- [ ] Test GPS tracking på device
- [ ] Test pause/resume funktionalitet
- [ ] Test afslut opgave
- [ ] Test resultat screen
- [ ] Test data persistence (gem og hent sessions)
- [ ] Test permissions flow
- [ ] Test background tracking (app i baggrund)
- [ ] Test battery impact (længere tracking session)

## Known Issues / Learnings

_Dokumenter her hvad du lærer under test_

- GPS accuracy: [TBD]
- Battery impact: [TBD]
- Background tracking: [TBD]
- Permission issues: [TBD]

## Næste Skridt

Efter test skal findings bruges til:
1. Main Chauffeur app implementation
2. Optimering af GPS settings
3. Battery optimization strategi
4. UI/UX improvements baseret på real-world test

---

**Test Start**: 2026-02-11
**Status**: Development
