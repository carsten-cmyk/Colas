# Tech Stack - Colas Transport Apps

## Frontend Framework

### React Native + Expo
- **Expo Plan**: Expo Pro (production features enabled)
- **Development**: Expo Go for rapid testing
- **Build Service**: EAS Build
- **Version**: Latest stable

### Native Features
```javascript
// GPS & Location
import * as Location from 'expo-location';

// Camera
import { Camera } from 'expo-camera';

// Permissions
import * as Permissions from 'expo-permissions';
```

**Required permissions:**
- Location (GPS tracking)
- Camera (document/photo capture)
- Storage (file handling)

## Backend & Database

### Supabase
**Primary backend service**

```
Authentication:
- Email/password
- Social login (if needed)
- Session management

Database:
- PostgreSQL
- Row Level Security (RLS)
- Real-time subscriptions

Storage:
- File uploads (photos, documents)
- CDN delivery
```

**Alternative**: Firebase (if Supabase doesn't meet needs)

### Database Integration Strategy

**Two integration modes:**

1. **API Integration** (Primary)
   ```
   Colas App <-> Supabase API <-> Customer Master Data

   - REST API endpoints
   - Real-time sync via webhooks
   - Scheduled sync jobs
   ```

2. **File Transfer** (Fallback/Batch)
   ```
   Colas App <-> Supabase Storage <-> File Transfer <-> Customer System

   - CSV/JSON exports
   - Scheduled imports
   - Manual sync when needed
   ```

## Deployment

### Mobile Apps
- **iOS**: TestFlight (beta testing) → App Store
- **Android**: Internal testing → Play Store
- **Build**: EAS Build (Expo Application Services)

### Web Apps (If needed)
- **Hosting**: Netlify
- **Deploy**: Git-based deployment
- **Environment**: Production + Staging

## Key Technologies Summary

| Technology | Purpose | Version |
|------------|---------|---------|
| React Native | Mobile framework | Latest |
| Expo | Development platform | Pro Plan |
| Supabase | Backend/Database/Auth | Cloud |
| expo-location | GPS tracking | Latest |
| expo-camera | Camera access | Latest |
| TestFlight | iOS beta testing | N/A |
| Netlify | Web hosting | N/A |

## Environment Configuration

### Development
```bash
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxx
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### Production
```bash
EXPO_PUBLIC_SUPABASE_URL=https://prod.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxx
EXPO_PUBLIC_API_URL=https://api.colas.dk
```

## Native Permissions Setup

### iOS (app.json / app.config.js)
```json
{
  "ios": {
    "infoPlist": {
      "NSLocationWhenInUseUsageDescription": "Vi bruger din lokation til at tracke kørsler",
      "NSLocationAlwaysUsageDescription": "Vi bruger din lokation til at tracke kørsler i baggrunden",
      "NSCameraUsageDescription": "Vi bruger kameraet til at tage billeder af dokumenter",
      "NSPhotoLibraryUsageDescription": "Vi skal gemme billeder i dit bibliotek"
    }
  }
}
```

### Android (app.json / app.config.js)
```json
{
  "android": {
    "permissions": [
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE"
    ]
  }
}
```

## Performance Considerations

- **Offline-first**: Use local storage for critical data
- **Background location**: Handle battery optimization
- **Image compression**: Compress before upload
- **Caching**: Cache API responses appropriately

## Security

- **Never hardcode**: API keys, secrets (use env vars)
- **Supabase RLS**: Protect data at database level
- **JWT tokens**: Secure authentication flow
- **HTTPS only**: All API communication

---

**Last Updated**: 2026-02-11
**Maintained by**: Development Team
