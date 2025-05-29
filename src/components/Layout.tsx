
import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import SearchBar from './SearchBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 w-full max-w-7xl mx-auto">
          <SearchBar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
