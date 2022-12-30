import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const ImgConfig = () => {
  const [allImgs, setAllImgs] = useState([]);

  const onResult = async () => {
    // eslint-disable-next-line no-unused-vars
    const users = await firestore()
      .collection('Img')
      .get()
      .then(querySnapshot => {
        let songsAll = [];
        querySnapshot.forEach(song => {
          songsAll.push({id: song.id, ...song.data()});
        });
        setAllImgs([...songsAll]);
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
  }, [allImgs]);

  return [allImgs];
};
