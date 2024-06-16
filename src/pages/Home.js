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
    const fetchCharacters = async () => {
      if (page === 1) {
        const response = await fetch(`https://swapi.dev/api/people/`);

        const chars = await response.json();

        setCharacters(chars.results);
      }
      if (page >= 2) {
        setLoading(true);
        const response2 = await fetch(
          `https://swapi.dev/api/people/?page=${page}`
        );

        const chars2 = await response2.json();

        //   console.log('Characters: ', chars);
        setCharacters((prev) => [...prev, ...chars2.results]);
        setLoading(false);
      }
      return;
    };

    fetchCharacters();
  }, [page]);
  console.log('Characters Data: ', characters);

  // const handleLoadMore = async () => {
  //   setLoading(true);
  //   const response2 = await fetch(`https://swapi.dev/api/people/?page=${page}`);

  //   const chars2 = await response2.json();
  //   setCharacters((prev) => [...prev, ...chars2.results]);
  //   setLoading(false);
  // };

  return (
    <div className='min-h-screen'>
      <main className='container'>
        <div className='my-16 flex items-start'>
          <div className='w-2/4'>
            <h2>Filters</h2>
            <Filters />
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
