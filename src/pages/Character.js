import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Character = () => {
  const params = useParams();
  const [characterMovies, setCharacterMovies] = useState([]);
  const [characterSpaceships, setCharacterSpaceships] = useState([]);
  const [characterSpecies, setCharacterSpecies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [characterInfo, setCharacterInfo] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const characterResponse = await fetch(
        `https://swapi.dev/api/people/${params.id}`,
        { cache: 'force-cache' }
      );

      const character = await characterResponse.json();
      //   console.log('Single Character: ', character);
      setCharacterInfo(character);

      if (character?.films.length > 0) {
        const films = await Promise.all(
          character?.films?.map(async (film) => {
            const filmResponse = await fetch(film);
            const filmData = await filmResponse.json();
            // console.log('Film inside map: ', filmData);
            //   filmData.name;
            return filmData.title;
          })
        );
        setCharacterMovies([...films]);
      }

      if (character?.starships.length > 0) {
        // let starships = [];

        const starships = await Promise.all(
          character?.starships?.map(async (starship) => {
            const starshipResponse = await fetch(starship);
            const starshipData = await starshipResponse.json();
            // console.log('Starship inside map: ', starshipData);
            //   starshipData.name;
            return starshipData.name;
          })
        );
        setCharacterSpaceships([...starships]);
        // console.log('Starships: ', starships);
      }

      if (character?.species.length > 0) {
        // let starships = [];

        const species = await Promise.all(
          character?.species?.map(async (starship) => {
            const speciesResponse = await fetch(starship);
            const speciesData = await speciesResponse.json();
            // console.log('Species inside map: ', speciesData);
            //   speciesData.name;
            return speciesData.name;
          })
        );
        setCharacterSpecies([...species]);
        // console.log('Starships: ', starships);
      }
    };
    fetchCharacter();
  }, [params]);
  //   console.log('Movies: ', characterMovies);
  return (
    <main className='container my-16 space-y-6'>
      <div className='flex bg-white gap-4 shadow-[#F3BC01] shadow-md rounded-md p-6'>
        <p className='text-xl font-semibold min-w-[120px]'>Name:</p>
        <p>{characterInfo?.name}</p>
      </div>
      <div className='flex bg-white items-start gap-4 shadow-[#F3BC01] shadow-md rounded-md p-6'>
        <p className='text-xl font-semibold min-w-[120px]'>Movies :</p>
        <div className='flex flex-wrap gap-2'>
          {characterMovies.length > 0 ? (
            characterMovies?.map((title, index) => (
              <span className='min-w-content' key={index}>
                {title},
              </span>
            ))
          ) : (
            <p>No films</p>
          )}
        </div>
      </div>
      <div className='flex bg-white items-start gap-4 shadow-[#F3BC01] shadow-md rounded-md p-6'>
        <p className='text-xl font-semibold min-w-[120px]'>Spaceships :</p>
        <div className='flex flex-wrap gap-2'>
          {characterSpaceships.length > 0 ? (
            characterSpaceships?.map((title, index) => (
              <span className='min-w-fit' key={index}>
                {title},
              </span>
            ))
          ) : (
            <p>No spaceships</p>
          )}
        </div>
      </div>
      <div className='flex bg-white items-start gap-4 shadow-[#F3BC01] shadow-md rounded-md p-6'>
        <p className='text-xl font-semibold min-w-[120px]'>Species :</p>
        <div className='flex flex-wrap gap-2'>
          {characterSpecies.length > 0 ? (
            characterSpecies?.map((title, index) => (
              <span className='min-w-fit' key={index}>
                {title},
              </span>
            ))
          ) : (
            <p>No species</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Character;
