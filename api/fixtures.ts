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

    const [thebeatles, acdc] = await Artist.create({
        name: 'The Beatles',
        image: "fixtures/thebeatles.jpg",
        info: 'The Beatles were an English rock band formed in Liverpool in 1960'
    }, {
        name: 'AC/DC',
        image: "fixtures/acdc.jpg",
        info: null
    });

    const [thebeatlesalbum1, thebeatlesalbum2, thebeatlesalbum3,acdcalbum1, acdcalbum2] = await Album.create({
        title: 'Abbey Road',
        artist: thebeatles,
        year: 1969,
        image: "fixtures/abbeyroad.jpg"
    }, {
        title: 'Let it Be',
        artist: thebeatles,
        year: 1970,
        image: "fixtures/letitbe.jpg"
    }, {
        title: 'Help',
        artist: thebeatles,
        year: 1965,
        image: "fixtures/help.jpg"
        }, {
        title: 'Back in Black',
        artist: acdc,
        year: 1980,
        image: "fixtures/bib.jpg"
    }, {
        title: 'Highway to Hell',
        artist: acdc,
        year: 1979,
        image: "fixtures/highway.jpg"
    });

    await Track.create({
        tracknumber: 1,
        title: 'Hells Bells',
        album: acdcalbum1,
        duration: '5:19'
    }, {
        tracknumber: 2,
        title: 'Shoot to Thrill',
        album: acdcalbum1,
        duration: '5:31'
    }, {
        tracknumber: 3,
        title: "What Do You Do for Money Honey",
        album: acdcalbum1,
        duration: '3:37'
    }, {
        tracknumber: 4,
        title: 'Given the Dog a Bone',
        album: acdcalbum1,
        duration: '3:27'
    }, {
        tracknumber: 5,
        title: "Let Me Put My Love Into You",
        album: acdcalbum1,
        duration: '2:50'
    }, {
        tracknumber: 1,
        title: 'Two of Us',
        album: thebeatlesalbum2,
        duration: '3:30'
    }, {
        tracknumber: 2,
        title: 'Dig a Pony',
        album: thebeatlesalbum2,
        duration: '4:13'
    }, {
        tracknumber: 3,
        title: 'Across the Universe',
        album: thebeatlesalbum2,
        duration: '3:43'
    }, {
        tracknumber: 4,
        title: 'I Me Mine',
        album: thebeatlesalbum2,
        duration: '2:25'
    }, {
        tracknumber: 5,
        title: 'Dig It',
        album: thebeatlesalbum2,
        duration: '4:10'
    }, {
        tracknumber: 1,
        title: 'Come Together',
        album: thebeatlesalbum1,
        duration: '4:16'
    }, {
        tracknumber: 2,
        title: 'Something',
        album: thebeatlesalbum1,
        duration: '2:57'
    }, {
        tracknumber: 3,
        title: "Maxwell's Silver Hammer",
        album: thebeatlesalbum1,
        duration: '3:27'
    }, {
        tracknumber: 4,
        title: "Oh! Darling",
        album: thebeatlesalbum1,
        duration: '3:27'
    }, {
        tracknumber: 5,
        title: "Octopus's Garden",
        album: thebeatlesalbum1,
        duration: '2:50'
    }, {
        tracknumber: 1,
        title: 'Highway to Hell',
        album: acdcalbum2,
        duration: '3:28'
    }, {
        tracknumber: 2,
        title: 'Girls Got Rhythm',
        album: acdcalbum2,
        duration: '3:34'
    }, {
        tracknumber: 3,
        title: 'Walk All Over You',
        album: acdcalbum2,
        duration: '4:27'
    }, {
        tracknumber: 4,
        title: 'Touch Too Much',
        album: acdcalbum2,
        duration: '4:30'
    }, {
        tracknumber: 5,
        title: "Beating Around the Bush",
        album: acdcalbum2,
        duration: '2:50'
    }, {
        tracknumber: 1,
        title: 'Help',
        album: thebeatlesalbum3,
        duration: '2:18'
    }, {
        tracknumber: 2,
        title: 'The Night Before',
        album: thebeatlesalbum3,
        duration: '2:34'
    }, {
        tracknumber: 3,
        title: "You've Got to Hide Your Love Away",
        album: thebeatlesalbum3,
        duration: '2:09'
    }, {
        tracknumber: 4,
        title: 'I Need You',
        album: thebeatlesalbum3,
        duration: '2:34'
    }, {
        tracknumber: 7,
        title: 'Ticket to Ride',
        album: thebeatlesalbum3,
        duration: '3:09'
    });

    const [user1, user2] = await User.create({
        username: 'user1',
        password: '111',
        token: crypto.randomUUID(),
    },{
        username: 'user2',
        password: '222',
        token: crypto.randomUUID()
    });

    await db.close();
}

void run();