// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'arial'],  // ← yeh add karo
  preload: false,                     // ← yeh bhi
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],  // ← yeh add karo
  preload: false,                     // ← yeh bhi
});

export const metadata: Metadata = {
  title: {
    default: 'Advorise - Performance Marketing & Web Development Agency India',
    template: '%s | Advorise',
  },
  icons: {
    icon: [
      { url: '/advorise-logo.jpeg', type: 'image/jpeg' },
      { url: '/favicon.ico',      sizes: 'any' },
    ],
    apple: '/advorise-logo.jpeg',
    shortcut: '/advorise-logo.jpeg',
  },
  description:
    'Advorise is a Meta & Google certified performance marketing agency in India. We specialise in Google Ads, SEO, social media ads, brand bidding, website development and international campaigns that deliver measurable ROI.',
  keywords: [
    'Google Ads agency India',
    'performance marketing agency',
    'PPC management India',
    'SEO services India',
    'Facebook ads agency',
    'brand bidding Google Ads',
    'digital marketing agency Delhi',
    'website development agency India',
    'Meta Google certified partner India',
    'ROI focused digital marketing',
    'Advorise',
  ],
  authors: [{ name: 'Advorise', url: 'https://advorise.com' }],
  creator: 'Advorise',
  publisher: 'Advorise',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://advorise.com',
    siteName: 'Advorise',
    title: 'Advorise — Performance Marketing & Web Development Agency',
    description:
      'Meta & Google certified agency delivering data-driven PPC, SEO, social media, website development and performance marketing campaigns with proven ROI across India and international markets.',
    images: [
      {
        url: 'https://advorise.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Advorise — Performance Marketing Agency India',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@advorise',
    creator: '@advorise',
    title: 'Advorise — Performance Marketing & Web Development Agency',
    description:
      'Meta & Google certified agency delivering data-driven PPC, SEO, web development and performance marketing with proven ROI.',
    images: ['https://advorise.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://advorise.com',
  },
  verification: {
    google: 'your-google-verification-code', // 🔁 replace karo
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#030E1C' },
    { media: '(prefers-color-scheme: light)', color: '#F2F2F7' },
  ],
  category: 'Digital Marketing',
  metadataBase: new URL('https://advorise.com'),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://advorise.com/#organization',
      name: 'Advorise',
      url: 'https://advorise.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://advorise.com/advorise-logo.jpeg',
        width: 200,
        height: 60,
      },
      description:
        'Meta & Google certified performance marketing and web development agency providing PPC, SEO, social media advertising, website development and international campaigns for businesses across India and globally.',
      foundingDate: '2018',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-9999207132',
          contactType: 'customer service',
          email: 'marketing@advorise.com',
          availableLanguage: ['English', 'Hindi'],
          areaServed: ['IN', 'US', 'GB', 'AE'],
        },
      ],
      sameAs: [
        'https://www.facebook.com/advorise',
        'https://www.instagram.com/advorise',
        'https://www.linkedin.com/company/advorise',
        'https://twitter.com/advorise',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://advorise.com/#localbusiness',
      name: 'Advorise',
      url: 'https://advorise.com',
      image: 'https://advorise.com/og-image.jpg',
      priceRange: '₹₹',
      telephone: '+91-9999207132',
      email: 'marketing@advorise.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://advorise.com/#service',
      name: 'Performance Marketing & Web Development',
      provider: { '@id': 'https://advorise.com/#organization' },
      serviceType: 'Digital Marketing & Web Development Agency',
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United Arab Emirates' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Marketing & Development Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads (PPC) Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Search Engine Optimisation (SEO)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facebook & Instagram Advertising' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Bidding Campaigns' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Marketing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'International Campaigns' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://advorise.com/#website',
      url: 'https://advorise.com',
      name: 'Advorise',
      publisher: { '@id': 'https://advorise.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://advorise.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('advorise-theme');
                  var theme = stored || 'dark';
                  if (theme === 'system') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`
          ${inter.variable} font-sans antialiased
          bg-white dark:bg-[#030E1C]
          text-gray-900 dark:text-white
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="advorise-theme"
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            theme="system"
            toastOptions={{
              classNames: {
                toast:
                  "dark:bg-[#071828] dark:border-white/8 dark:text-white bg-white border-black/10 text-gray-900",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
