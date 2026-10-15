# TDP Store

A customer-facing tech marketplace built with React Native and Expo. This is a frontend demo with sample products.

## Features

- Browse 14 sample gadgets by search, category, and store; sort by price.
- Explore five TDP store locations and save favourite products.
- View product details, manage a cart, and place demo orders.
- Review orders, purchase history, and recently viewed products.
- Edit a temporary profile, use customer-care FAQs, and add local product listings.

## Run the app

From the project folder:

npm install
npx expo start --web

## Demo limitations

Products, favourites, cart, profile, and orders are held in memory and reset when the app restarts. There is no API, database, sign-in, real customer support contact, or payment connection. Checkout creates a demo order only.

## Changelog

Add a dated entry to CHANGELOG.md alongside every feature or fix.
## Appearance

- Switch between a light blue theme and a dark navy theme with translucent surfaces and a blue gradient banner.
- The interface uses a clean system font stack chosen for iOS, Android, and web.


## Home and search

- Home now features a shop promotion and location cards, with no product listings.
- Shop search, store selection, category, and sort controls are grouped in one filter panel.


## Store cards

- Home shows each shop in a two-column grid of rectangular cards with its name, location, and product count.


## Code layout

- App.js keeps app state, actions, and screen selection.
- src/data/catalog.js contains the sample shops, products, and shared theme palettes.
- src/components/AppText.js contains the shared font setup.
- src/components/ShopComponents.js contains reusable product cards, product grids, and filter pickers.
- src/styles/appStyles.js contains the shared light/dark styles.

