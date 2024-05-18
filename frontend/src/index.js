import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { AuthContextProvider } from './context/AuthContext';
import { ProblemsContextProvider } from './context/ProblemsContext';
import { SolvedProblemsProvider } from './context/SolvedProblemsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
      <ProblemsContextProvider>
      <SolvedProblemsProvider>
    <App />
    </SolvedProblemsProvider>
    </ProblemsContextProvider>
    </AuthContextProvider>
    </Router>
    
  </React.StrictMode>
);
