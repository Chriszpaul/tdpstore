# Project changelog

## 2026-10-17

- Created a monorepo layout under the existing project root.
- Moved the working Expo customer app into apps/customer-app/ without changing its app code.
- Added placeholders for the shop portal, admin portal, delivery app, API, shared packages, and database work.
- Added this project-level map and updated ignore rules for nested app builds.
- Built the first shop-owner and staff frontend in apps/shop-portal/ with Expo Router tabs for dashboard, orders, products, inventory, team, and store settings.
- Added local demo interactions for advancing order statuses, creating products, changing stock, adding staff, and pausing or reopening the store.
- Added SDK-compatible Expo Router dependencies, app configuration, setup instructions, and sample data for the shop portal.

- Changed shop portal sample prices and sales to Indian rupees (₹), matching the customer app.
- Added a Deliveries tab with order and customer details, delivery windows, driver labels, status progress, and demo status updates.
- Expanded Stock status with in-stock, low-stock, and out-of-stock filters, counts, shelf locations, reorder levels, and quantities.
- Added stock editing for product details with validation for required fields, unique SKUs, rupee price, quantity, and reorder level.
- Added a confirmation step before deleting a stock item; stock counts and filters recalculate from the current product list.

