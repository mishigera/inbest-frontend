import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-xl font-semibold">iNBest</h1>
      </header>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
      <footer className="text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} iNBest Challenge
      </footer>
    </div>
  );
};

export default Layout;
