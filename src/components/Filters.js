import React, { useEffect, useState, useRef } from 'react';

const Filters = ({ filterCharacters, setPage, resetFetchCharacters }) => {
  const [movies, setMovies] = useState([]);
  const [species, setSpecies] = useState([]);
  const [searchSpecies, setSearchSpecies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [speciesPage, setSpeciesPage] = useState('');
  const moviesRef = useRef([]);
  const speciesRef = useRef([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesResponse = await fetch('https://swapi.dev/api/films');
      const moviesData = await moviesResponse.json();
      //   console.log('Movies: ', moviesData);
      const x = moviesData.results.map((movie) => {
        return { title: movie.title, url: movie.url };
      });

      //   console.log('Movies Data: ', x);
      setMovies(x);
    };
    const fetchSpecies = async () => {
      const speciesResponse = await fetch('https://swapi.dev/api/species');
      const speciesData = await speciesResponse.json();
      //   console.log('Species: ', speciesData);
      setSpeciesPage(speciesData.next);
      const y = speciesData.results.map((specie) => {
        return { name: specie.name, url: specie.url };
      });

      // console.log('Species Data: ', y);
      setSpecies(y);
    };
    fetchMovies();
    fetchSpecies();
  }, []);

  const handleSpecies = (e) => {
    // console.log('Species checked: ', e.target.checked);
    // console.log('Species: ', e.target.value);
    const specieExists = searchSpecies.find((x) => x === e.target.value);
    if (!specieExists) {
      setSearchSpecies((prev) => [...prev, e.target.value]);
    } else {
      const updateSpecies = searchSpecies.filter((y) => y !== e.target.value);
      setSearchSpecies(updateSpecies);
    }
  };

  const handleMovies = (e = null) => {
    const movieExists = searchMovies.find((x) => x === e.target.value);
    if (!movieExists) {
      setSearchMovies((prev) => [...prev, e.target.value]);
    } else {
      const updateMovies = searchMovies.filter((y) => y !== e.target.value);
      setSearchMovies(updateMovies);
    }
  };

  const handleLoadMoreSpecies = async () => {
    const speciesResponse = await fetch(speciesPage);
    const speciesData = await speciesResponse.json();
    // console.log('Species Data: ', speciesData);
    const y = speciesData.results.map((specie) => {
      return { name: specie.name, url: specie.url };
    });

    // console.log('Species Data: ', y);
    setSpecies((prev) => [...prev, ...y]);

    if (speciesData.next) {
      setSpeciesPage(speciesData.next);
    } else {
      setSpeciesPage(null);
    }
  };

  const handleClearFilters = () => {
    for (let i = 0; i < moviesRef.current.length; i++) {
      console.log('Movies checkbox: ', moviesRef.current[i].checked);

      moviesRef.current[i].checked = false;
    }

    console.log('Species checkbox: ', speciesRef.current.checked);

    for (let j = 0; j < speciesRef.current.length; j++) {
      console.log('Species checkbox: ', speciesRef.current[j].checked);
      speciesRef.current[j].checked = false;
    }

    setSearchMovies([]);
    setSearchSpecies([]);
    filterCharacters([], []);

    // handleMovies();
    setPage(1);
    resetFetchCharacters();
  };

  // console.log('Next Page: ', speciesPage);
  return (
    <div>
      <div className='mb-4'>
        <h2 className='text-lg font-medium mb-3'>Movies</h2>
        <ul className='space-y-2'>
          {movies?.map((movie, index) => {
            return (
              <li key={movie.url} className='flex items-center gap-3'>
                <input
                  ref={(element) => {
                    moviesRef.current[index] = element;
                  }}
                  onChange={(e) => handleMovies(e)}
                  type='checkbox'
                  value={movie.url}
                  name={movie.title}
                  id={movie.title}
                />
                <label htmlFor={movie.title}>{movie.title}</label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className='text-lg font-medium mb-3'>Species</h2>
        <ul className='space-y-2'>
          {species?.map((specie, index) => {
            return (
              <li key={specie.url} className='flex items-center gap-3'>
                <input
                  ref={(element) => {
                    speciesRef.current[index] = element;
                  }}
                  onChange={(e) => handleSpecies(e)}
                  type='checkbox'
                  value={specie.url}
                  name={specie.name}
                  id={specie.name}
                />
                <label htmlFor={specie.name}>{specie.name}</label>
              </li>
            );
          })}
        </ul>
        <button
          className={`${
            speciesPage === null && 'text-gray-400 cursor-not-allowed'
          }  text-medium text-gray-600 font-medium mt-2`}
          onClick={() => handleLoadMoreSpecies()}>
          More
        </button>
      </div>
      <div className='flex items-center gap-6'>
        <button
          onClick={() => filterCharacters(searchMovies, searchSpecies)}
          disabled={speciesPage === null}
          className={`mt-6 ring-1 px-4 py-2 rounded-lg`}>
          Search
        </button>
        <button
          onClick={() => handleClearFilters()}
          className={`mt-6 ring-1 px-4 py-2 rounded-lg`}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
