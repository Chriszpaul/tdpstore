# TDP Store Partner

The shop-owner and staff frontend for TDP Store. Built as a separate React Native + Expo app using the same SDK and visual direction as the customer app.

## Run locally

From this folder, run:

```powershell
npm install
npx expo start --web
```

## Screens

- Home: daily sales, open orders, and low-stock reminders.
- Orders: filter orders and move them through new, preparing, ready, and completed.
- Products: search the catalogue and add a demo product.
- Stock: view quantities and adjust inventory.
- Team: review staff roles and add a demo team member.
- Store: pause or reopen the shop and review store details.

## Demo limitations

Screens use local sample data that resets when the app restarts. There is no sign-in, role enforcement, API connection, database persistence, or invitation email yet. Connect those features when the shared backend is ready.
