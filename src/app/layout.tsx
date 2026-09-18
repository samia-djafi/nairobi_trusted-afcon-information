import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SafetyBanner from '@/components/layout/SafetyBanner';
import MobileTabBar from '@/components/layout/MobileTabBar';
import FloatingReportButton from '@/components/layout/FloatingReportButton';
import NotificationDrawer from '@/components/layout/NotificationDrawer';
import SourceExplorerModal from '@/components/trust/SourceExplorerModal';

export const metadata: Metadata = {
  title: 'Nairobi — Trusted AFCON 2027 Information | Civic Trust System',
  description: 'The official civic trust information platform for AFCON 2027 in Nairobi. Find, understand, verify, and act on official transport, stadium, and safety notices.',
  keywords: ['AFCON 2027', 'Nairobi', 'Kenya', 'Talanta Sports City', 'Kasarani', 'Transport', 'Safety', 'KeNHA', 'CAF', 'NPS'],
  authors: [{ name: 'OSF × Andela Hackathon 2026' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#C84B31',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-savannah-mesh text-obsidian antialiased selection:bg-sun-200 selection:text-earth-900">
        <AppProvider>
          {/* Top critical safety announcement */}
          <SafetyBanner />

          {/* Sticky global navigation */}
          <Navbar />

          {/* Main page content */}
          <main className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>

          {/* Civic platform footer */}
          <Footer />

          {/* Mobile Bottom Tab Bar */}
          <MobileTabBar />

          {/* Floating 'Report an Issue' Action Button */}
          <FloatingReportButton />

          {/* Slide-over Notification & Alert Feed */}
          <NotificationDrawer />

          {/* Universal Civic Source Explorer Modal */}
          <SourceExplorerModal />
        </AppProvider>
      </body>
    </html>
  );
}
