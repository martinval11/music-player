import styles from './styles.module.css';
import { useContext } from 'react';

const Player = ({ context }: { context: any }) => {
  const music = useContext(context);
  const musicUrlServer = import.meta.env.VITE_MUSIC_DIR_SERVER;

  return (
    <footer className={styles.playerContainer}>
      <audio
        controls
        src={musicUrlServer + music}
        autoPlay
        className={styles.player}
      ></audio>
    </footer>
  );
};

export default Player;
