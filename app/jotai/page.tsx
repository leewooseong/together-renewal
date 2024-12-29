'use client';

import {useAtom} from 'jotai';
import {NextPage} from 'next';
import {animeAtom} from './store/exampleStore';

const JotaiExamplePage: NextPage = () => {
  const [anime, setAnime] = useAtom(animeAtom);

  return (
    <>
      <h1>JotaiExamplePage</h1>

      <ul>
        {anime.map(item => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          setAnime(anime => [
            ...anime,
            {
              title: 'Cowboy Bebop',
              year: 1998,
              watched: false,
            },
          ]);
        }}
      >
        Add Cowboy Bebop
      </button>
    </>
  );
};

export default JotaiExamplePage;
