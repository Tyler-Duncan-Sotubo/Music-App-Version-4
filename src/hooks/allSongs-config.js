/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const AllSongsConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allSongs, setAllSongs] = useState([]);

  const onResult = async () => {
    setIsLoading(true);
    const users = await firestore()
      .collection('Songs')
      .get()
      .then(querySnapshot => {
        let songsAll = [];
        querySnapshot.forEach(song => {
          songsAll.push({id: song.id, ...song.data()});
        });
        setAllSongs([...songsAll]);
        setIsLoading(false);
      });
  };

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(onResult, onError);
    return () => subscriber();
  }, [allSongs]);

  return [allSongs, isLoading, setIsLoading];
};
