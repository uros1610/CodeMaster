import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { AuthContextProvider } from './context/AuthContext';
import { ProblemsContextProvider } from './context/ProblemsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
      <ProblemsContextProvider>
    <App />
    </ProblemsContextProvider>
    </AuthContextProvider>
    </Router>
    
  </React.StrictMode>
);
