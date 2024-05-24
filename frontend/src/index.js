import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { AuthContextProvider } from './context/AuthContext';
import { ProblemsContextProvider } from './context/ProblemsContext';
import { SolvedProblemsProvider } from './context/SolvedProblemsContext';
import setupInterceptors from './interceptor';

const root = ReactDOM.createRoot(document.getElementById('root'));
setupInterceptors();
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
      <SolvedProblemsProvider>
    <App />
    </SolvedProblemsProvider>
    </AuthContextProvider>
    </Router>
    
  </React.StrictMode>
);
