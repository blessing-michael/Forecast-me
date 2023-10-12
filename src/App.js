import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ViewLocation from './components/ViewLocation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<ViewLocation />} />
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
