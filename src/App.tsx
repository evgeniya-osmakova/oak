import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { CompanyInfo } from './components/company/CompanyInfo';
import { Sidebar } from './components/Sidebar/Sidebar';
import { authStore } from './stores/AuthStore';
import './styles/global.scss';
import './App.sass';

const App = observer(() => {
  useEffect(() => {
    authStore.login();
  }, []);

  const renderContent = () => {
    if (authStore.loading) {
      return <div>Authenticating...</div>;
    }

    if (authStore.error) {
      return <div>Authentication Error: {authStore.error}</div>;
    }

    return authStore.isAuthenticated ? (
      <CompanyInfo />
    ) : (
      <div>Please authenticate to view company data</div>
    );
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
});

export default App;
