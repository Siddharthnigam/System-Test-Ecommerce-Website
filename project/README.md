# 🛒 E-Commerce Store

A fully responsive e-commerce frontend built with **React** and **Tailwind CSS**. No third-party UI libraries — all components are custom built.

---

## 🚀 Tech Stack

- **React** (Vite)
- **Tailwind CSS v4**
- **Custom CSS** (slider)
- **localStorage** (cart & wishlist persistence)
- **DummyJSON API** (product data)

---

## 📁 Project Structure

```
src/
├── assets/
│   ├── banner-1.jpg
│   ├── banner-2.jpg
│   ├── logo.png
│   └── newslatter.jpg
├── Data/
│   └── Api.jsx          # Fetches 10 products from dummyjson.com
├── Pages/
│   ├── navbar.jsx       # Sticky navbar with cart, wishlist, profile dropdown
│   ├── slider.jsx       # Custom autoplay image slider
│   ├── slider.css       # Slider styles
│   ├── cart.jsx         # Reusable ProductCard component
│   ├── products.jsx     # First 5 products section
│   ├── products2.jsx    # Last 5 products section
│   ├── newsLater.jsx    # Newsletter signup section
│   └── footer.jsx       # Site footer
├── App.jsx
├── main.jsx
└── index.css
```

---

## ✨ Features

### 🖼️ Image Slider
- Custom slider with no third-party libraries
- Autoplay every 3 seconds
- Prev / Next navigation buttons
- Dot indicators with active state
- Built with plain JS + custom CSS

### 🛍️ Product Listing
- Fetches 10 products from [DummyJSON API](https://dummyjson.com/products)
- First 5 shown in **Special Products for You**
- Last 5 shown in **Top Picks**
- Responsive grid: 2 → 3 → 4 → 5 columns

### 🛒 Cart
- Add to Cart with green **✓ Added!** feedback
- Remove from cart button appears on the card after adding
- Cart count badge on navbar updates instantly
- Side modal with quantity `+` / `−` controls
- Remove individual items
- Live total price
- Persisted in `localStorage`

### 🤍 Wishlist
- Heart icon on every product card
- Toggle add/remove from wishlist
- Wishlist count badge (red) on navbar
- Side modal with **Move to Cart** option
- Persisted in `localStorage`

### 👤 Profile Dropdown
- User icon with name and arrow
- Dropdown: My Profile, My Orders, Settings, Logout
- Closes on outside click

### 📧 Newsletter
- Full-width background image with dark overlay
- Email input + Subscribe button

### 📱 Responsive Design
- Working search bar 
- Mobile hamburger menu
- Mobile search bar
- Responsive grids at all breakpoints (sm / md / lg)
- Cart & Wishlist modals full-width on mobile

---

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🌐 API

Products are fetched from:
```
https://dummyjson.com/products?limit=10
```

Fields used: `title`, `price`, `thumbnail`, `category`, `rating`, `stock`

---

## 📦 localStorage Keys

| Key         | Description              |
|-------------|--------------------------|
| `cart`      | Array of cart items with qty |
| `wishlist`  | Array of wishlisted products |
