import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import HomeSearch from './views/HomeSearch';
import ListStock from './views/ListStock';
import Graph from './views/Graph';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<HomeSearch />} />
        <Route path="/list" element={<ListStock />} />
        <Route path="/stock/graph/:id" element={<Graph />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

export default App;