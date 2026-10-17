# TDP Store Ecommerce Project

This is the main project folder for the TDP Store marketplace. Apps live under apps/, shared code under packages/, and database work under database/.

## Project structure

- apps/customer-app/ — customer-facing React Native + Expo app.
- apps/shop-portal/ — shop-owner and staff React Native + Expo frontend.
- apps/admin-portal/ — planned platform administration app.
- apps/delivery-app/ — planned delivery-agent app.
- apps/api/ — planned backend API; backend code has not been added yet.
- packages/types/ — planned shared types.
- packages/validation/ — planned shared validation.
- database/migrations/ and database/seed/ — planned schema changes and starter data.

The customer app and shop portal are frontend previews. Their sample data is local and resets when the apps restart. The admin, delivery, and API folders remain placeholders.

## Run the customer app

From the project root:

```powershell
cd apps/customer-app
npm install
npx expo start --web
```

## Run the shop portal

From the project root:

```powershell
cd apps/shop-portal
npm install
npx expo start --web
```

See each app's README for its screens and current limitations.
