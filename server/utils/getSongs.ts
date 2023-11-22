import { readdir } from 'fs/promises';
import { randomUUID } from 'crypto';

export const getSongs = async () => {
  const musicDir = process.env.MUSIC_DIR ?? '';

  try {
    const files = await readdir(musicDir);

    const allSongs = files.map((file) => ({
      id: randomUUID(),
      name: file,
      path: `Music/${file}`,
      type: file.endsWith('.mp3') ? 'song' : 'folder',
    }));

    return allSongs;
  } catch (err) {
    console.error(err);
  }
};
