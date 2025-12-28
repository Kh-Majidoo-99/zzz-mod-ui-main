import { useState, useEffect } from 'react';
import type { Character } from '../types';
import '../styles/CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://gamebanana.com/apiv11/Mod/Categories?_idCategoryRow=30305&_sSort=a_to_z&_bShowEmpty=true')
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="character-list-container">
      <h2>Characters</h2>
      {loading ? (
        <p>Loading characters...</p>
      ) : (
        <div className="character-list">
          {characters.map((character) => (
            <div key={character._idRow} className="character-item">
              <img src={character._sIconUrl} alt={character._sName} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
