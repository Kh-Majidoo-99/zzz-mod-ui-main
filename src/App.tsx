import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Feed from './components/Feed';
import CardProfile from './components/CardProfile'; // Import CardProfile
import Search from './components/Search';
import Author from './components/Author';

function App() {
  const [showNsfw, setShowNsfw] = useState(false);

  return (
    <div>
      <div className="search-bar-container">
        <Search showNsfw={showNsfw} onToggleNsfw={() => setShowNsfw(!showNsfw)} />
      </div>
      <Routes>
        <Route path="/" element={<Feed showNsfw={showNsfw} />} />
        <Route path="/mod/:id" element={<CardProfile />} />
        <Route path="/author/:id" element={<Author />} />
      </Routes>
    </div>
  );
}

export default App;
