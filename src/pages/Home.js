import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import Filters from '../components/Filters';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // console.log('Loading State: ', loading);

  useEffect(() => {
    console.log('Iam in useEffect hook...');
    const fetchCharacters = async () => {
      if (page === 1) {
        const response = await fetch(`https://swapi.dev/api/people/`, {
          cache: 'no-store',
        });

        const chars = await response.json();

        setCharacters(chars.results);
      }
      if (page >= 2) {
        setLoading(true);
        const response2 = await fetch(
          `https://swapi.dev/api/people/?page=${page}`,
          { cache: 'no-store' }
        );

        const moreChars = await response2.json();

        //   console.log('Characters: ', chars);
        setCharacters((prev) => [...prev, ...moreChars.results]);
        setLoading(false);
      }
      return;
    };

    fetchCharacters();
  }, [page]);
  console.log('Characters Data: ', characters);
  console.log('Current Page...:', page);

  const filterCharacters = (movies, species) => {
    // console.log('Movies: ', movies);
    // console.log('Species: ', species);

    if (movies.length > 0 && species.length === 0) {
      let charsIndex = [];
      characters.forEach((char, index) => {
        let exists = new Array(char.films.length);
        for (let i = 0; i < movies.length; i++) {
          const movieExists = char.films.includes(movies[i]);
          exists.push(movieExists);
          console.log('Movie Exists: ', movieExists);
        }

        if (!exists.includes(false)) {
          charsIndex.push(index);
        }
      });
      console.log('Characters Movies Indexes: ', charsIndex);
      if (charsIndex.length > 0) {
        let updateChars = [];
        charsIndex.forEach((charIndex) => {
          let newUpdateChars = characters.find(
            (character, index) =>
              // console.log(index)
              index === charIndex
          );

          updateChars.push(newUpdateChars);
          console.log('Updated Characters: ', updateChars);
        });
        // console.log('Updated Characters: ', updateChars);
        setCharacters(updateChars);
      } else {
        alert('No results matching the selection criteria!!');
      }
    }

    if (movies.length === 0 && species.length > 0) {
      let charsSpeciesIndex = [];
      console.log('Species to Search: ', species);
      characters.forEach((char, index) => {
        // if (char.species.length > 0) {
        let speciesExistsArray = new Array(char.species.length);
        for (let i = 0; i < species.length; i++) {
          const speciesExists = char.species.includes(species[i]);
          speciesExistsArray.push(speciesExists);
          console.log('Species Exists: ', speciesExists);
        }

        if (!speciesExistsArray.includes(false)) {
          charsSpeciesIndex.push(index);
        }
        // }
      });
      console.log('Characters Species Indexes: ', charsSpeciesIndex);
      if (charsSpeciesIndex.length > 0) {
        let updateChars = [];
        charsSpeciesIndex.forEach((charIndex) => {
          let newUpdateSpeciesChars = characters.find(
            (character, index) =>
              // console.log(index)
              index === charIndex
          );

          updateChars.push(newUpdateSpeciesChars);
          console.log('Updated Characters: ', updateChars);
        });
        // console.log('Updated Characters: ', updateChars);
        setCharacters(updateChars);
      } else {
        alert('No results matching the selection criteria!!');
      }
    }

    if (movies.length > 0 && species.length > 0) {
      let charsIndex = [];
      characters.forEach((char, index) => {
        let exists = [];
        for (let i = 0; i < movies.length; i++) {
          const movieExists = char.films.includes(movies[i]);
          if (movieExists) {
            for (let i = 0; i < species.length; i++) {
              const speciesExists = char.species.includes(species[i]);
              exists.push(speciesExists);
            }
          } else {
            exists.push(movieExists);
          }
          // console.log('Movie Exists: ', movieExists);
        }

        if (!exists.includes(false)) {
          charsIndex.push(index);
        }
      });
      console.log('Characters Movies and Species Indexes: ', charsIndex);
      if (charsIndex.length > 0) {
        let updateChars = [];
        charsIndex.forEach((charIndex) => {
          let newUpdateChars = characters.find(
            (character, index) =>
              // console.log(index)
              index === charIndex
          );

          updateChars.push(newUpdateChars);
          console.log('Updated Characters: ', updateChars);
        });
        // console.log('Updated Characters: ', updateChars);
        setCharacters(updateChars);
      } else {
        alert('No results matching the selection criteria!!');
      }
    }
  };

  const resetFetchCharacters = async () => {
    const response = await fetch(`https://swapi.dev/api/people/`, {
      cache: 'no-store',
    });

    const chars = await response.json();

    setCharacters(chars.results);
  };
  return (
    <div className='min-h-screen'>
      <main className='container'>
        <div className='my-16 flex items-start'>
          <div className='w-2/4'>
            <h2 className='mb-10 text-xl '>Filters</h2>
            <Filters
              filterCharacters={filterCharacters}
              setPage={setPage}
              resetFetchCharacters={resetFetchCharacters}
            />
          </div>
          <div className='w-2/4'>
            <ul>
              {characters?.length > 0 &&
                characters?.map((character) => (
                  <li key={character.name}>
                    <Link to={`/characters/${character?.url.split('/')[5]}`}>
                      {character.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <div className='space-x-4 mt-4 '>
              <button
                className={`py-[0.75rem] text-center w-[140px] rounded-lg  px-6 font-[600] ring ring-[#F3BC01] ${
                  loading &&
                  'pointer-events-none cursor-not-allowed	 bg-slate-200'
                }`}
                onClick={() => setPage((prev) => prev + 1)}>
                {loading ? (
                  <AiOutlineLoading className='mx-auto h-4 w-4 animate-spin' />
                ) : (
                  <span>Load More</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
