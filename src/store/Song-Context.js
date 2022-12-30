import React from 'react';
import {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SongContext = createContext({
  BookMarkSongs: () => {},
  removeSong: () => {},
  markSongs: [],
  isVisible: false,
  addToFavorite: false,
  removedToFavorite: false,
  AddedModal: () => {},
  removedModal: () => {},
});

export const SongProvider = ({children}) => {
  const [markSongs, setMarkSongs] = useState([]);
  const [addToFavorite, setAddToFavorite] = useState(false);
  const [removedToFavorite, removedAddToFavorite] = useState(false);

  const AddedModal = () => {
    setAddToFavorite(true);
    setTimeout(() => {
      setAddToFavorite(false);
    }, 2000);
  };

  const removedModal = () => {
    removedAddToFavorite(true);
    setTimeout(() => {
      removedAddToFavorite(false);
    }, 2000);
  };

  const BookMarkSongs = async (
    artist,
    track,
    image,
    lyrics,
    youtubeId,
    id,
    date,
  ) => {
    setMarkSongs(prevState => [
      ...prevState,
      {artist, track, image, lyrics, youtubeId, id, date},
    ]);
    await AsyncStorage.setItem('Songs', JSON.stringify(markSongs));
  };

  const removeSong = async id => {
    try {
      const index = markSongs.indexOf(id);
      markSongs.splice(index, 1);
      await AsyncStorage.setItem('Songs', JSON.stringify(markSongs));
      setMarkSongs(JSON.parse(await AsyncStorage.getItem('Songs')));
    } catch (error) {
      console.log(error);
    }
  };

  const loadSong = async () => {
    try {
      let song = await AsyncStorage.getItem('Songs');
      if (song !== null) {
        let storedSong = JSON.parse(song);
        setMarkSongs(storedSong);
      }
    } catch (err) {
      console.log('error from Async' + err);
    }
  };

  useEffect(() => {
    loadSong();
  }, []);

  const value = {
    BookMarkSongs: BookMarkSongs,
    markSongs: markSongs,
    removeSong: removeSong,
    addToFavorite: addToFavorite,
    removedToFavorite: removedToFavorite,
    AddedModal: AddedModal,
    removedModal: removedModal,
  };

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};
