import React from 'react';
import { WMSProvider } from './context/WMSContext';
import Layout from './components/layout/Layout';

function App() {
  return (
    <WMSProvider>
      <Layout />
    </WMSProvider>
  );
}

export default App;