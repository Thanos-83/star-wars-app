import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { GrFormNextLink } from 'react-icons/gr';
import { CiFilter } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';

import Filters from '../components/Filters';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(' ');
  // console.log('Loading State: ', loading);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    console.log('Iam in useEffect hook...');
    const fetchCharacters = async () => {
      if (page === 1) {
        setInitialLoading(true);
        const response = await fetch(`https://swapi.dev/api/people/`, {
          cache: 'no-store',
        });

        const chars = await response.json();

        setCharacters(chars.results);
        setNextPage(chars.next);
        setInitialLoading(false);
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
        setNextPage(moreChars.next);
      }
      return;
    };

    fetchCharacters();
  }, [page]);
  // console.log('Characters Data: ', characters);
  // console.log('Current Page...:', page);

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
    setOpenFilters(false);
  };

  const resetFetchCharacters = async () => {
    setInitialLoading(true);
    const response = await fetch(`https://swapi.dev/api/people/`, {
      cache: 'no-store',
    });

    const chars = await response.json();

    setCharacters(chars.results);
    setNextPage(chars.next);
    setInitialLoading(false);
  };
  return (
    <div className='min-h-screen'>
      <main className='container'>
        <div className='my-16 sm:flex  items-start'>
          <div
            className={`fixed sm:relative top-0 ${
              openFilters ? 'left-0' : '-left-full'
            } p-4 h-screen overflow-y-auto bottom-0 z-[100] w-[90%] bg-white sm:block sm:w-2/4 sm:overflow-x-hidden sm:bg-inherit sm:left-0 max-w-[300px] border-r-2 sm:z-[1] sm:h-auto`}>
            <div className='mb-6 sm:mb-0 flex items-center justify-between'>
              <h2 className='sm:mb-10 text-xl font-semibold pb-1 border-b-2 inline-block'>
                Filters
              </h2>
              <button>
                <IoCloseSharp
                  className='sm:hidden h-6 w-6'
                  onClick={() => setOpenFilters(false)}
                />
              </button>
            </div>
            <Filters
              filterCharacters={filterCharacters}
              setPage={setPage}
              resetFetchCharacters={resetFetchCharacters}
            />
          </div>
          <button
            onClick={() => setOpenFilters(true)}
            className='fixed top-[6rem] right-[2rem] z-[99] sm:hidden rounded-md bg-slate-200 py-1 px-3 mb-4 flex items-center gap-2 text-lg font-sans font-semibold'>
            <CiFilter className='w-6 h-6' />
            <span>Filters</span>
          </button>
          <div className='pl-2 sm:pl-12 sm:w-2/4'>
            <ul className='space-y-4'>
              {initialLoading ? (
                <div className='space-y-6 max-w-[300px]'>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                  <div className='animate-pulse'>
                    <div class='h-3 bg-slate-200 rounded'></div>
                  </div>
                </div>
              ) : (
                characters?.length > 0 &&
                characters?.map((character) => (
                  <li className='group' key={character.name}>
                    <Link
                      className='flex items-center text-lg'
                      to={`/characters/${character?.url.split('/')[5]}`}>
                      {character.name}
                      <GrFormNextLink className='group-hover:translate-x-2 transition-all w-4 h-4 ml-1' />
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <div className='space-x-4 mt-4 '>
              <button
                disabled={!nextPage}
                className={`${
                  !nextPage && 'bg-slate-500 text-gray-300 cursor-not-allowed'
                } py-[0.75rem] text-center w-[180px] rounded-lg  px-6 font-[600] ring ring-[#F3BC01] ${
                  loading &&
                  'pointer-events-none cursor-not-allowed	 bg-slate-200'
                }`}
                onClick={() => setPage((prev) => prev + 1)}>
                {loading ? (
                  <AiOutlineLoading className='mx-auto h-4 w-4 animate-spin' />
                ) : (
                  <span>{nextPage ? 'Load More' : 'No More Data'}</span>
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
