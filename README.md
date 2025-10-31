# Devera - Portfolio Website

A modern, glass-morphism themed portfolio website for Devera, showcasing stunning website projects with smooth animations and a sleek black aesthetic.

## Features

- ✨ Modern glass morphism design
- 🎨 Black and glassy theme
- 🎬 Smooth animations using Framer Motion
- 📱 Fully responsive design
- 🚀 Built with Next.js 14 and TypeScript
- 🎯 Portfolio showcase for 6 websites with browser mockups
- ⚡ Optimized performance
- 💬 **Working Contact Form** - Submit inquiries directly through the website
- ⭐ **Reviews System** - Users can submit and view reviews with star ratings
- 🎪 **Floating Animated Elements** - Interactive icons floating across the page
- 🖼️ **Visual Mockups** - Portfolio items feature browser-style mockups
- 💾 **Data Persistence** - Reviews are stored in JSON file system

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Portfolio/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts     # Contact form API endpoint
│   │   └── reviews/
│   │       └── route.ts     # Reviews API endpoint (GET/POST)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page with all sections
│   └── globals.css          # Global styles and glass effects
├── components/
│   ├── ContactForm.tsx      # Contact form component
│   └── ReviewsSection.tsx   # Reviews display and submission
├── data/
│   └── reviews.json         # Stored reviews (auto-created)
├── public/                  # Static assets
├── package.json             # Dependencies
└── tailwind.config.js       # Tailwind configuration
```

## Features Explained

### Contact Form
- Located at `#contact` section
- Submits to `/api/contact` endpoint
- Displays success/error messages
- Form validation included
- Logs submissions to console (configure email service in production)

### Reviews System
- Users can submit reviews with 1-5 star ratings
- Reviews are stored in `data/reviews.json`
- Real-time display after submission
- Auto-approved for demo (add moderation in production)
- Includes name, company (optional), rating, and comment fields

### Floating Elements
- 6+ animated icons floating across the screen
- Smooth animations with different delays
- Glass morphism effect on each element
- Hidden on mobile for better performance

## Customization

### Portfolio Projects

Edit the `projects` array in `app/page.tsx` to customize the portfolio items:

```typescript
const projects = [
  {
    title: "Your Project",
    category: "Category",
    description: "Description",
    color: "from-purple-500 to-pink-500",
    tags: ["Tech1", "Tech2"]
  }
]
```

### Colors and Animations

Customize animations and colors in `tailwind.config.js` and `app/globals.css`.

### Email Integration (Production)

To enable email notifications for contact form submissions, update `/app/api/contact/route.ts`:

1. Install an email service (e.g., `npm install resend` or `nodemailer`)
2. Add your email service credentials to `.env.local`
3. Replace the console.log with actual email sending logic

## License

MIT License - feel free to use this for your own projects!
