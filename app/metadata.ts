import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deveracreative.vercel.app';
const siteTitle = 'Devera - Creative Web Agency';
const siteDescription = 'We design websites, portfolios, and branding for businesses.';

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Devera',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/preview.jpg`,
        width: 1200,
        height: 630,
        alt: 'Devera - Creative Web Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [{
      url: `${siteUrl}/preview.jpg`,
      width: 1200,
      height: 630,
      alt: 'Devera - Creative Web Agency',
    }],
    creator: '@deveracreative',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
