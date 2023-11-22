import { useState, useEffect, createContext, useCallback } from 'react';
import request from './lib/request';
import { API_URL } from './consts/consts';
import Player from './components/Player/Player';
import MusicList from './components/MusicList/MusicList';

type Music = {
  id: string;
  name: string;
  path: string;
  type: string;
};

const MusicContext = createContext(null);

const App = () => {
  const [musicList, setMusicList]: [Music[], any] = useState([]);
  const [musicSelected, setMusicSelected]: any = useState('');

  const requestMusicList = async () => {
    const musicListAPI = await request(`${API_URL}/getSongs`);
    setMusicList(musicListAPI);
  };

  const getMusicListMemoized = useCallback(() => {
    requestMusicList();
  }, [musicList]);

  const selectMusic = async (event: any) => {
    const musicPath = event.target.id;
    setMusicSelected(musicPath);
  };

  const selectFolder = async (event: any) => {
    const musicPath = event.target.id;
    const musicLocation = musicList.find(
      (music) => music.path === `${musicPath}`
    );

    if (musicLocation) {
      const musicListFolder = await request(
        `${API_URL}/getSongsFromDir?dir=Music/${musicLocation.name}`
      );
      setMusicList(musicListFolder);
    }
  };

  const goBack = () => {
    getMusicListMemoized();
  };

  useEffect(() => {
    requestMusicList();
  }, []);

  return (
    <main>
      <MusicContext.Provider value={musicSelected}>
        <MusicList
          list={musicList}
          selectMusic={selectMusic}
          selectFolder={selectFolder}
          goBack={goBack}
        />
        <Player context={MusicContext} />
      </MusicContext.Provider>
    </main>
  );
};

export default App;
