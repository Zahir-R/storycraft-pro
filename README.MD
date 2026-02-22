# StoryCraft Pro – Storytelling Course Landing Page

A responsive landing page for a fictional storytelling course called **StoryCraft Pro**. Built with HTML5, CSS, and JavaScript. The page includes interactive components like a modal enrollment form, coupon validation, FAQ accordion, and scroll-triggered animations.

## Features

- **Scroll Animations** – Sections and cards fade in as you scroll.
- **Enrollment Modal** – Pop-up form with real‑time validation.
- **Formspree Integration** – Submits enrollment data via Formspree (replace with your own endpoint).
- **Coupon Code System** – Apply discount codes (EARLYBIRD, STORY2026, FREETRIAL) and see the total update.
- **FAQ Accordion** – Click questions to reveal answers.
- **Modular JavaScript** – Code split into logical modules under `js/`.
- **CSS Variables** – Easy theming (colors, shadows, etc.).

## Live Demo

You can view a live demo here: [https://storycraft-pro.netlify.app/](https://storycraft-pro.netlify.app/)  

## Customization

### Formspree Endpoint
The form uses Formspree to handle submissions. To make it work for your own email:
1. Go to [Formspree](https://formspree.io/) and create a new form.
2. Copy your form’s endpoint (e.g., `https://formspree.io/f/xxxxxx`).
3. Open `js/utils/helpers.js` and replace the value of `FORMSPREE_ENDPOINT` with your own.

```javascript
// js/utils/helpers.js
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
```

### Coupon Codes
Predefined coupon codes and discounts are in `js/utils/constants.js`. You can add, remove, or change them.

```javascript
export const COUPONS = {
  EARLYBIRD: 0.2,
  STORY2026: 0.1,
  FREETRIAL: 0.15,
};
```

### Colors & Styling
All design tokens (colors, shadows, border radius) are defined as CSS variables in `styles/base.css`. Change them to match your brand.

```css
:root {
  --primary: #6a57ff;
  --secondary: #ff6b6b;
  --accent: #00d4aa;
  /* ... */
}
```

### Content
Replace the placeholder text, images, and testimonials in `index.html` with your own. The hero image is from Unsplash – you may want to use a royalty‑free image or your own.

## Project Structure

```
storycraft-pro/
├── index.html               # Main HTML file
├── styles/
│   ├── main.css             # Imports all CSS files
│   ├── base.css             # Root variables, resets, typography
│   ├── components.css       # Buttons, header, footer, toast
│   ├── modals.css           # Modal & form styles
│   ├── responsive.css       # Media queries
│   └── sections.css         # Styles for each page section
├── js/
│   ├── main.js              # Entry point – initializes all modules
│   ├── components/
│   │   ├── navigation.js    # Hamburger menu, scroll effects
│   │   ├── modal.js         # Modal logic, form validation, toast, coupon
│   │   ├── faq.js           # FAQ accordion
│   │   └── scroll.js        # Intersection Observer animations
│   └── utils/
│       ├── constants.js     # Coupon codes
│       └── helpers.js       # Formspree endpoint, validation functions
└── README.md
```

## License

This project is open source and available under the [MIT License](LICENSE).
