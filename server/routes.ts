import express from 'express';
import { getSongs } from './utils/getSongs';
import { getFolderContent } from './utils/getFolderContent';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Hello, World!');
});

router.get('/getSongs', async (_req, res) => {
  try {
    const allSongs = await getSongs();
    res.send(allSongs);
  } catch (err) {
    res.status(500).send('Error reading songs');
  }
});

router.get('/getSongsFromDir', async (req, res) => {
  try {
    const allSongs = await getSongs();
    const dir = req.query.dir;

    const path = allSongs?.find((song) => song.path === dir);

    if (path) {
      const folderContent = await getFolderContent(path);
      res.send(folderContent);
    }
  } catch (err) {
    res.status(500).send('Error reading songs from directory');
  }
});

export default router;
