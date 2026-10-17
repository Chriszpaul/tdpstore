# TDP Store Ecommerce Project

This is the main project folder for the TDP Store marketplace. Apps live under apps/, shared code under packages/, and database work under database/.

## Project structure

- apps/customer-app/ — working customer-facing React Native + Expo app.
- apps/shop-portal/ — planned shop-owner and staff app.
- apps/admin-portal/ — planned platform administration app.
- apps/delivery-app/ — planned delivery-agent app.
- apps/api/ — planned backend API; no backend code has been added yet.
- packages/types/ — planned shared types.
- packages/validation/ — planned shared validation.
- database/migrations/ and database/seed/ — planned schema changes and starter data.

Only the customer app is implemented so far; the other folders are placeholders to organize upcoming work.

## Run the customer app

Open a terminal in apps/customer-app, then run npm install and npx expo start --web.

See apps/customer-app/README.md for customer-app details.
