'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  isAccessibilityMode: boolean;
  toggleAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

  useEffect(() => {
    // Load saved preference from localStorage
    const saved = localStorage.getItem('accessibilityMode');
    if (saved === 'true') {
      setIsAccessibilityMode(true);
      document.body.classList.add('accessibility-mode');
    }
  }, []);

  const toggleAccessibility = () => {
    setIsAccessibilityMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('accessibilityMode', String(newValue));
      
      if (newValue) {
        document.body.classList.add('accessibility-mode');
      } else {
        document.body.classList.remove('accessibility-mode');
      }
      
      return newValue;
    });
  };

  return (
    <AccessibilityContext.Provider value={{ isAccessibilityMode, toggleAccessibility }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
