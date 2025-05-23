
import Footer from "../components/Footer";
import FixedCssImport from "../components/FixedCssImport";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen">
      <FixedCssImport />
      {/* Header is handled globally by App.tsx - removing duplicate */}
      <main className="relative">
        {children}
      </main>
      {/* Footer is handled globally by App.tsx - removing duplicate */}
    </div>
  );
};

export default MainLayout;
