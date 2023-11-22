import { readdir } from 'fs/promises';
import { randomUUID } from 'crypto';

type Path = {
  path: string;
};

export const getFolderContent = async (folder: Path) => {
  const homeDir = process.env.HOME_DIR ?? ''

  try {
    const files = await readdir(`${homeDir}/${folder.path}`);

    const songsFolder = files.map((musicName) => ({
      id: randomUUID(),
      name: musicName,
      path: `${folder?.path}/${musicName}`,
      type: musicName.endsWith('.mp3') ? 'song' : 'folder',
    }));

    return songsFolder;
  } catch (err) {
    console.error(err);
  }
};
