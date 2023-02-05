import './globals.css';
import Footer from '@app/components/Layout/Footer';
import Header from '@app/components/Layout/Header';
import { ClientProvider } from '@app/components/Provider/ClientProvider';
import { SidebarUI } from '@app/components/Sidebar/SidebarUI';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Create Wix Events Site</title>
        <meta
          name="description"
          content="Generated by create next app with Wix Events integration"
        />
        <meta name="viewport" content="viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="text-black bg-site">
        <ClientProvider>
          <Header />
          <main className="bg-site min-h-[600px]">{children}</main>
          <SidebarUI />
        </ClientProvider>
        <div className="mt-20">
          <Footer />
        </div>
      </body>
    </html>
  );
}
