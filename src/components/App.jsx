import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ArticlePage from './ArticlePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:articleId" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
