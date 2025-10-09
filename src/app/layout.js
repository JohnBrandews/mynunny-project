import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src={`https://embed.tawk.to/${process.env.TAWK_PROPERTY_ID}/${process.env.TAWK_WIDGET_ID}`}
          strategy="lazyOnload" // Loads after page content
          async
          charSet="UTF-8"
          crossOrigin="*"
        />
      </body>
    </html>
  );
}