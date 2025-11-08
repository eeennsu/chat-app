import '@configs/setup/dayjs';
import ConfigProviders from '@shared/configs/providers';
import { cn } from '@shared/shared-ui/utils';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Template',
  description: 'Next Template',
  // description: ``,
  // keywords: [...KEYWORDS],
  // authors: [{ name: BRAND_TITLE.EN, url: SITE_LINK }],
  // openGraph: {
  //   title: BRAND_TITLE.EN,
  //   description: ``,
  //   url: SITE_LINK,
  //   siteName: BRAND_TITLE.EN,
  //   locale: 'ko_KR',
  //   type: 'website',
  //   images: error ? [] : signaturesImages,
  // },
  // twitter: {
  //   title: BRAND_TITLE.EN,
  //   description: ``,
  //   images: error ? [] : signaturesImages,
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // alternates: {
  //   canonical: SITE_LINK,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' data-scroll-behavior='smooth'>
      <body className={cn('antialiased', geistSans.variable, geistMono.variable)}>
        <ConfigProviders>
          <div className='flex h-dvh w-full flex-col'>
            <main className='grow'>{children}</main>
          </div>
        </ConfigProviders>
      </body>
    </html>
  );
}
