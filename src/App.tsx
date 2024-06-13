import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeSearch from './views/HomeSearch';
import ListStock from './views/ListStock';
import Graph from './views/Graph';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomeSearch />} />
      <Route path="/list" element={<ListStock />} />
      <Route path="/stock/graph/:id" element={<Graph />} />
    </Routes>
  </Router>
);

export default App;