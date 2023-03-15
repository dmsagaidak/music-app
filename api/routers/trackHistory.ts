import express from 'express';
import mongoose, { now } from 'mongoose';
import { ApiTrack } from '../types';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';
import Track from '../models/Track';
const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    }

    const userId = user._id.toString();

    const track: ApiTrack | null = await Track.findById(req.body.track).populate({ path: 'album', select: 'artist' });

    let artistName = null;

    if (track) {
      artistName = track.album.artist.toString();
    }

    const trackHistory = await TrackHistory.create({
      user: userId,
      track: req.body.track,
      artist: artistName,
      datetime: now().toISOString(),
    });

    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const userId = user._id.toString();

  try {
    const trackHistory = await TrackHistory.find({ user: userId })
      .populate({ path: 'track' })
      .populate({ path: 'artist' })
      .sort({ datetime: -1 });
    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default trackHistoryRouter;
