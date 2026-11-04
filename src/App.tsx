import React from 'react';
import { ClinicProvider } from './context/ClinicContext';
import { LuminaApp } from './pages/LuminaApp';

export interface AppProps {
  readonly className?: string;
}

export const App: React.FC<AppProps> = ({ className = '' }) => {
  return (
    <ClinicProvider>
      <LuminaApp className={className} />
    </ClinicProvider>
  );
};

export default App;
