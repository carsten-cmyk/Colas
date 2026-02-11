# Colas Transport Apps

Monorepo til Colas transport applikationer.

## Apps

- **Chauffeur** - App til chauffører
- **Vognmand** - App til vognmænd (kommer snart)
- **Formand** - App til formænd (kommer snart)

## Struktur

```
Colas/
├── apps/          # Individuelle apps
│   ├── chauffeur/
│   ├── vognmand/
│   └── formand/
├── shared/        # Delte komponenter og utils
│   ├── components/
│   ├── utils/
│   └── styles/
```

## Kom i gang

### Chauffeur App

```bash
npm run chauffeur:start
```

Test med Expo Go ved at scanne QR-koden.

## Development

Hver app er et selvstændigt Expo projekt, men kan dele komponenter fra `shared/` mappen.
