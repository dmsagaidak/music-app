import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    
    try{
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
        await db.dropCollection('trackhistories');
    }catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [thebeatles, acdc, nirvana] = await Artist.create({
        name: 'The Beatles',
        image: "fixtures/thebeatles.jpg",
        info: 'The Beatles were an English rock band formed in Liverpool in 1960',
        isPublished: true,
    }, {
        name: 'AC/DC',
        image: "fixtures/acdc.jpg",
        info: null,
        isPublished: true,
    }, {
        name: 'Nirvana',
        image: 'fixtures/nirvana.jpeg',
        info: 'Nirvana was an American rock band formed in Aberdeen, Washington, in 1987.',
        isPublished: false,
    });

    const [thebeatlesalbum1, thebeatlesalbum2, thebeatlesalbum3,acdcalbum1, acdcalbum2, nirvanaalbum] = await Album.create({
        title: 'Abbey Road',
        artist: thebeatles,
        year: 1969,
        image: "fixtures/abbeyroad.jpg",
        isPublished: true,
    }, {
        title: 'Let it Be',
        artist: thebeatles,
        year: 1970,
        image: "fixtures/letitbe.jpg",
        isPublished: true,
    }, {
        title: 'Help',
        artist: thebeatles,
        year: 1965,
        image: "fixtures/help.jpg",
        isPublished: true,
        }, {
        title: 'Back in Black',
        artist: acdc,
        year: 1980,
        image: "fixtures/bib.jpg",
        isPublished: true,
    }, {
        title: 'Highway to Hell',
        artist: acdc,
        year: 1979,
        image: "fixtures/highway.jpg",
        isPublished: true,
    }, {
        title: 'Nevermind',
        artist: nirvana,
        year: 1991,
        image: 'fixtures/nevermind.jpg',
        isPublished: false,
    });

    await Track.create({
        tracknumber: 1,
        title: 'Hells Bells',
        album: acdcalbum1,
        duration: '5:19',
        video: 'https://www.youtube.com/watch?v=etAIpkdhU9Q',
        isPublished: true,
    }, {
        tracknumber: 2,
        title: 'Shoot to Thrill',
        album: acdcalbum1,
        duration: '5:31',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 3,
        title: "What Do You Do for Money Honey",
        album: acdcalbum1,
        duration: '3:37',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 4,
        title: 'Given the Dog a Bone',
        album: acdcalbum1,
        duration: '3:27',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 5,
        title: "Let Me Put My Love Into You",
        album: acdcalbum1,
        duration: '2:50',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 1,
        title: 'Two of Us',
        album: thebeatlesalbum2,
        duration: '3:30',
        video: 'https://www.youtube.com/watch?v=Ql1cL_y0xes',
        isPublished: true,
    }, {
        tracknumber: 2,
        title: 'Dig a Pony',
        album: thebeatlesalbum2,
        duration: '4:13',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 3,
        title: 'Across the Universe',
        album: thebeatlesalbum2,
        duration: '3:43',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 4,
        title: 'I Me Mine',
        album: thebeatlesalbum2,
        duration: '2:25',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 5,
        title: 'Dig It',
        album: thebeatlesalbum2,
        duration: '4:10',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 1,
        title: 'Come Together',
        album: thebeatlesalbum1,
        duration: '4:16',
        video: 'https://www.youtube.com/watch?v=45cYwDMibGo',
        isPublished: true,
    }, {
        tracknumber: 2,
        title: 'Something',
        album: thebeatlesalbum1,
        duration: '2:57',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 3,
        title: "Maxwell's Silver Hammer",
        album: thebeatlesalbum1,
        duration: '3:27',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 4,
        title: "Oh! Darling",
        album: thebeatlesalbum1,
        duration: '3:27',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 5,
        title: "Octopus's Garden",
        album: thebeatlesalbum1,
        duration: '2:50',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 1,
        title: 'Highway to Hell',
        album: acdcalbum2,
        duration: '3:28',
        video: 'https://www.youtube.com/watch?v=l482T0yNkeo',
        isPublished: true,
    }, {
        tracknumber: 2,
        title: 'Girls Got Rhythm',
        album: acdcalbum2,
        duration: '3:34',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 3,
        title: 'Walk All Over You',
        album: acdcalbum2,
        duration: '4:27',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 4,
        title: 'Touch Too Much',
        album: acdcalbum2,
        duration: '4:30',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 5,
        title: "Beating Around the Bush",
        album: acdcalbum2,
        duration: '2:50',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 1,
        title: 'Help!',
        album: thebeatlesalbum3,
        duration: '2:18',
        video: 'https://www.youtube.com/watch?v=2Q_ZzBGPdqE',
        isPublished: true,
    }, {
        tracknumber: 2,
        title: 'The Night Before',
        album: thebeatlesalbum3,
        duration: '2:34',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 3,
        title: "You've Got to Hide Your Love Away",
        album: thebeatlesalbum3,
        duration: '2:09',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 4,
        title: 'I Need You',
        album: thebeatlesalbum3,
        duration: '2:34',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 7,
        title: 'Ticket to Ride',
        album: thebeatlesalbum3,
        duration: '3:09',
        video: null,
        isPublished: true,
    }, {
        tracknumber: 1,
        title: 'Smells Like Teen Spirit',
        album: nirvanaalbum,
        duration: '5:01',
        video: 'https://youtu.be/hTWKbfoikeg',
        isPublished: false,
    }, {
        tracknumber: 2,
        title: 'In Bloom',
        album: nirvanaalbum,
        duration: '4:14',
        video: null,
        isPublished: false,
    }, {
        tracknumber: 3,
        title: 'Come as You Are',
        album: nirvanaalbum,
        duration: '3:38',
        video: null,
        isPublished: false
    });

    const [user1, user2, admin] = await User.create({
        username: 'user1',
        password: '111',
        token: crypto.randomUUID(),
        role: 'user',
    },{
        username: 'user2',
        password: '222',
        token: crypto.randomUUID(),
        role: 'user',
    }, {
        username: 'admin',
        password: '1234',
        token: crypto.randomUUID(),
        role: 'admin',
    });

    await db.close();
}

void run();