# Zippy Chicken Momos — Landing Page

A premium, responsive, SEO-optimized landing page for **Zippy Chicken Momos**, built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step required.

## 🚀 Getting Started

Just open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## 📁 File Structure

```
zippy-momos/
│── index.html            Main page (all sections + SEO/schema markup)
│── css/
│   ├── style.css         Design tokens, layout, components
│   ├── responsive.css    Tablet/mobile breakpoints
│   └── animation.css     Keyframes, reveal animations
│── js/
│   ├── main.js           Navbar, dark mode, forms, popups, ripple, parallax
│   ├── slider.js         Gallery slider + lightbox
│   ├── countdown.js      Offer countdown timer
│   └── animation.js      Scroll reveal, animated counters, timeline
│── images/
│   ├── product.png       Hero product pack (uploaded artwork)
│   ├── hero-bg.jpg        Ambient hero background
│   ├── ingredients.jpg    "Why Choose Zippy" image
│   └── gallery1-3.jpg     Product gallery images
│── assets/
│   ├── icons/favicon.svg
│   └── fonts/             (using Google Fonts CDN — Fraunces + Manrope)
└── README.md
```

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#D62828` |
| Secondary | `#FFFFFF` |
| Accent | `#FFB703` |
| Dark | `#222222` |
| Light background | `#FFF9F5` |
| Display font | Fraunces (serif, warm & premium) |
| Body font | Manrope (clean, modern sans) |

## ✨ Features Implemented

- Sticky, blurred, transparent navbar with shrink-on-scroll and mobile hamburger menu
- Parallax hero with floating chili/garlic/spring-onion, steam animation, mouse-tilt product image
- 6 animated feature cards, "Why Choose Zippy" split layout, interactive cooking timeline
- Scroll-triggered animated counters, draggable product gallery with lightbox
- Auto-scrolling customer reviews, accordion FAQ, offer banner with live countdown timer
- Order form with client-side validation, floating WhatsApp/back-to-top buttons, sticky mobile buy bar
- Exit-intent popup + rotating "recently purchased" social proof toast
- Dark mode toggle, scroll progress bar, reduced-motion support, keyboard-accessible focus states
- Full SEO: meta title/description, Open Graph, Twitter Card, Product/FAQ/Breadcrumb/LocalBusiness schema, semantic HTML, alt text on every image

## 🖼️ Swapping in Real Photography

The hero product image (`images/product.png`) is the uploaded Zippy Chicken Momos packet artwork. The other images (`hero-bg.jpg`, `ingredients.jpg`, `gallery1-3.jpg`) are placeholder brand-toned gradients — swap them for real photography of the same dimensions for a fully production-ready shoot.

## 📱 Responsive Breakpoints

- Desktop: 1180px+
- Laptop: 960–1180px
- Tablet: 620–960px
- Mobile: below 620px

## ♿ Accessibility

Skip-to-content link, visible focus rings, ARIA labels/expanded states on interactive controls, alt text on all images, and a "prefers-reduced-motion" fallback that disables non-essential animation.
