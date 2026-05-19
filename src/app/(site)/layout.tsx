import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { LocaleProvider } from "@/app/components/LocaleProvider";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
