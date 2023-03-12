import mongoose, { Types } from 'mongoose';
import Album from './Album';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  tracknumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: 'Album does not exist',
    },
  },
  duration: {
    type: String,
    required: true,
  },
  video: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;
