# TDP Store

A customer-facing tech marketplace built with React Native and Expo. It currently runs as a local demo with sample products.

## Features

- Browse products by category, search, and store location.
- View product details and add items to a cart.
- Adjust quantities and see a subtotal and delivery estimate.
- Add a product listing locally from the More tab.
- Navigate between Home, Shop, Stores, Cart, and More.

## Run the app

Install Node.js, then from the project folder run:

```sh
npm install
npx expo start --web
```

Use the Expo terminal shortcuts to run on Android or iOS when those development environments are set up.

## Current limitations

Product listings and cart contents are held in app memory and reset when the app restarts. Product creation is a local demo; no API, database, sign-in, order service, or payment provider is connected. Checkout does not take payment.

## Updating the changelog

For every future feature or fix, add a dated entry to [CHANGELOG.md](CHANGELOG.md) in the same update. Keep entries short and describe the customer-visible change.

## Project files

- `App.js` — app screens, sample catalog, cart, and local product form.
- `app.json` — Expo app configuration.
- `index.js` — app entry point.
- `package.json` / `package-lock.json` — dependencies and scripts.
- `assets/` — app icons and splash screen assets.
