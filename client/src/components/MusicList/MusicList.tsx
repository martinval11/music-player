import { MusicIcon, FolderIcon } from '../Icons/Icons';
import styles from './styles.module.css';

type Music = {
  id: string;
  name: string;
  path: string;
  type: string;
};

const MusicList = ({ list, selectMusic, selectFolder, goBack }: any) => {
  const currentDir = list[0]?.path.split('/').slice(0, -1).join('/');
  const rootDir = 'Music';

  return (
    <section className={styles.musicList}>
      <button
        className={currentDir === rootDir ? styles.hidden : styles.musicItem}
        id={currentDir}
        onClick={goBack}
      >
        ..
      </button>
      {list.map((music: Music) => (
        <button
          key={music.id}
          className={styles.musicItem}
          id={music.path}
          onClick={music.type === 'song' ? selectMusic : selectFolder}
        >
          {music.type === 'song' ? <MusicIcon /> : <FolderIcon />}
          {music.name}
        </button>
      ))}
    </section>
  );
};

export default MusicList;
