"use client";

import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is your header component
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #011719 0%, #03292C 100%)",
        minHeight:'100vh'
        
      }}
      className="min-h-[100vh] relative"
    >
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
