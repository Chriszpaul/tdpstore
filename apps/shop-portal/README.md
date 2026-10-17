# TDP Store Partner

The shop-owner and staff frontend for TDP Store. Built as a separate React Native + Expo app, using Indian rupees (₹) in its sample data.

## Run locally

```powershell
npm install
npx expo start --web
```

## Screens

- Home: sales in rupees (₹), new orders, and low-stock reminders.
- Orders: review customer orders and advance their preparation status.
- Deliveries: see order and address details, driver, delivery window, and update delivery progress.
- Products: search the catalogue and add a demo product priced in ₹.
- Stock status: filter in-stock, low-stock, and out-of-stock items; inspect SKU, category, shelf location, reorder level, rupee price, and quantity.
- Team: review staff roles and add a demo team member.
- Store: pause or reopen the shop and review store details.

## Demo limitations

Screens use local sample data that resets when the app restarts. There is no sign-in, role enforcement, API connection, database persistence, or driver assignment yet. Delivery updates and staff invitations are examples only.
