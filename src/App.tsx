import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Feed from './components/Feed';
import CardProfile from './components/CardProfile'; // Import CardProfile
import Search from './components/Search';

function App() {
  return (
    <div>
      <div className="search-bar-container">
        <Search />
      </div>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/mod/:id" element={<CardProfile />} />
      </Routes>
    </div>
  );
}

export default App;
