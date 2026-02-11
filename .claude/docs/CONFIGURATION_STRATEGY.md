# Configuration Strategy - Avoid Hardcoded Values

## Problem Statement

**Lesson Learned**: Hardcoding values like colors, currencies, and data fields creates maintenance nightmares when:
- Customers have different requirements
- Branding needs to change
- Business logic varies by region/customer
- Multiple apps share similar but slightly different configs

## Solution: Configuration-First Architecture

### 1. Theme Configuration

**DON'T:**
```javascript
// ❌ Hardcoded colors everywhere
<View style={{ backgroundColor: '#007AFF' }}>
  <Text style={{ color: '#FFFFFF' }}>Save</Text>
</View>
```

**DO:**
```javascript
// ✅ Centralized theme
import { theme } from '@/shared/styles/theme';

<View style={{ backgroundColor: theme.colors.primary }}>
  <Text style={{ color: theme.colors.onPrimary }}>Save</Text>
</View>
```

**Theme File Structure:**
```javascript
// shared/styles/theme.js
export const theme = {
  colors: {
    // Brand colors
    primary: '#007AFF',
    primaryDark: '#0051D5',
    secondary: '#FF9500',

    // Semantic colors
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',

    // Neutral colors
    background: '#FFFFFF',
    surface: '#F2F2F7',
    onBackground: '#000000',
    onSurface: '#3C3C43',
    onPrimary: '#FFFFFF',

    // Text
    textPrimary: '#000000',
    textSecondary: '#3C3C43',
    textDisabled: '#C7C7CC',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },

  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' },
    h2: { fontSize: 24, fontWeight: 'bold' },
    body: { fontSize: 16, fontWeight: 'normal' },
    caption: { fontSize: 12, fontWeight: 'normal' },
  }
};
```

### 2. Business Configuration

**DON'T:**
```javascript
// ❌ Hardcoded business logic
const currency = 'DKK';
const vatRate = 0.25;
const allowedFileTypes = ['pdf', 'jpg', 'png'];
```

**DO:**
```javascript
// ✅ Configurable business rules
// shared/config/business.js
export const businessConfig = {
  // Regional settings
  region: {
    currency: 'DKK',
    currencySymbol: 'kr.',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: '24h',
    firstDayOfWeek: 'monday',
  },

  // Financial
  financial: {
    vatRate: 0.25,
    overtimeMultiplier: 1.5,
    nightShiftMultiplier: 1.75,
  },

  // File handling
  files: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['pdf', 'jpg', 'png', 'heic'],
    compressionQuality: 0.8,
  },

  // GPS tracking
  tracking: {
    updateIntervalMs: 30000, // 30 seconds
    distanceThresholdMeters: 50,
    accuracyThreshold: 100,
  },
};
```

### 3. Feature Flags

**Enable/disable features per customer or environment:**

```javascript
// shared/config/features.js
export const featureFlags = {
  // Core features
  enableGPSTracking: true,
  enableCameraCapture: true,
  enableOfflineMode: true,

  // Advanced features
  enableRealTimeSync: true,
  enablePushNotifications: true,
  enableBiometricAuth: false,

  // Customer-specific
  requirePhotoForTaskCompletion: true,
  allowManualTimeEntry: false,
  showCustomerPricing: false,
};
```

### 4. Environment-Based Configuration

```javascript
// shared/config/env.js
const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000',
    supabaseUrl: 'https://dev.supabase.co',
    enableDebugMode: true,
    enableMockData: true,
  },
  staging: {
    apiUrl: 'https://staging-api.colas.dk',
    supabaseUrl: 'https://staging.supabase.co',
    enableDebugMode: true,
    enableMockData: false,
  },
  production: {
    apiUrl: 'https://api.colas.dk',
    supabaseUrl: 'https://prod.supabase.co',
    enableDebugMode: false,
    enableMockData: false,
  },
};

export const config = ENV[process.env.NODE_ENV || 'dev'];
```

### 5. Customer-Specific Overrides

**Support multiple customers with different configs:**

```javascript
// shared/config/customers.js
const customerConfigs = {
  'colas-denmark': {
    theme: { primary: '#007AFF' },
    business: { currency: 'DKK', vatRate: 0.25 },
    features: { enableGPSTracking: true },
  },
  'colas-sweden': {
    theme: { primary: '#FFC107' },
    business: { currency: 'SEK', vatRate: 0.25 },
    features: { enableGPSTracking: true },
  },
};

export function getCustomerConfig(customerId) {
  return customerConfigs[customerId] || customerConfigs['colas-denmark'];
}
```

### 6. Remote Configuration (Advanced)

**Load config from Supabase for dynamic updates:**

```javascript
// shared/services/configService.js
import { supabase } from './supabase';

export async function loadRemoteConfig(appId) {
  const { data, error } = await supabase
    .from('app_configs')
    .select('*')
    .eq('app_id', appId)
    .single();

  if (error) {
    console.error('Failed to load remote config:', error);
    return null;
  }

  return data.config; // JSON config object
}
```

## Implementation Checklist

### Phase 1: Setup (Before any UI work)
- [ ] Create `shared/styles/theme.js`
- [ ] Create `shared/config/business.js`
- [ ] Create `shared/config/features.js`
- [ ] Create `shared/config/env.js`
- [ ] Create `.env.development` and `.env.production`

### Phase 2: Usage (During development)
- [ ] Always import from config files, never hardcode
- [ ] Document any new config values added
- [ ] Test with different configurations
- [ ] Validate config on app startup

### Phase 3: Advanced (Later)
- [ ] Add customer-specific configs
- [ ] Implement remote configuration from Supabase
- [ ] Add config validation schema
- [ ] Create admin UI for config management

## Best Practices

1. **Never hardcode** values used in multiple places
2. **Document** what each config value does
3. **Validate** configs on app startup
4. **Version** config changes in git
5. **Test** with different configs before deploying
6. **Fallback** to sensible defaults if config fails to load

## Example: Currency Formatting

```javascript
// shared/utils/currency.js
import { businessConfig } from '@/shared/config/business';

export function formatCurrency(amount) {
  const { currency, currencySymbol } = businessConfig.region;

  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: currency,
  }).format(amount);

  // Or with custom symbol
  // return `${amount.toFixed(2)} ${currencySymbol}`;
}

// Usage
formatCurrency(1234.56); // "1.234,56 kr."
```

## Example: Date Formatting

```javascript
// shared/utils/date.js
import { businessConfig } from '@/shared/config/business';

export function formatDate(date) {
  const { dateFormat } = businessConfig.region;

  // Use day.js or date-fns with format
  return dayjs(date).format(dateFormat);
}
```

---

**Last Updated**: 2026-02-11
**Priority**: CRITICAL - Implement before building any UI
