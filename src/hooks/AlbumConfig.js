/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const AlbumConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState([]);

  const onResult = async () => {
    const users = await firestore()
      .collection('Albums')
      .get()
      .then(querySnapshot => {
        let songsAll = [];
        querySnapshot.forEach(song => {
          songsAll.push({id: song.id, ...song.data()});
        });
        setAlbums([...songsAll]);
      });
  };

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(onResult, onError);
    setIsLoading(false);
    return () => subscriber();
  }, [albums]);

  return [albums, isLoading];
};
