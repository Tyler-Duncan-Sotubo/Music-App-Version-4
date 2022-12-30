import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  Event,
  RepeatMode,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../helpers/color';
import Slider from '@react-native-community/slider';

const {width, height} = Dimensions.get('window');

const tracks = [
  {
    id: 1,
    url: require('../tracks/01.mp3'),
    title: 'Track 1',
    artwork: require('../img/SarkodieJamz.jpg'),
  },
  {
    id: 2,
    url: require('../tracks/01.mp3'),
    title: 'Track 2',
    artwork: require('../img/ZuluMan.png'),
  },
  {
    id: 3,
    url: require('../tracks/01.mp3'),
    title: 'Track 3',
    artwork: require('../img/BlackSherif.webp'),
  },
  {
    id: 4,
    url: require('../tracks/01.mp3'),
    title: 'Track 4',
    artwork: require('../img/Chris.jpg'),
  },
];

const renderSongs = ({item, index}) => {
  return (
    <Animated.View style={styles.imageContainer}>
      <View style={styles.ImageWrapper}>
        <Image source={item.artwork} style={styles.featuredImg} />
      </View>
    </Animated.View>
  );
};

const setUpTrackPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(tracks);
    console.log('Tracks added');
  } catch (e) {
    console.log(e);
  }
};

const togglePlayback = async playBackState => {
  const state = await TrackPlayer.getState();
  if (state === State.Playing) {
    await TrackPlayer.pause();
  } else {
    await TrackPlayer.play();
  }
};

const PlayerScreen = ({navigation}) => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
    }
  });

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setUpTrackPlayer();
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
    });
  }, []);

  const SkipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const SkipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Navigation */}
        <View style={styles.naviArea}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="chevron-down-sharp"
              size={30}
              color={GlobalStyles.colors.primaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="ellipsis-horizontal"
              size={30}
              color={GlobalStyles.colors.primaryText}
            />
          </TouchableOpacity>
        </View>
        {/* Image */}
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          data={tracks}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        {/* Song Content */}
        <View style={styles.songDetailsWrapper}>
          <View>
            <Text style={styles.songTitle}>{tracks[songIndex].title}</Text>
            <Text style={styles.artristName}>{tracks[songIndex].artist}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Icon
                name="heart-outline"
                size={25}
                color={GlobalStyles.colors.primaryText}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Slider */}
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          value={progress.position}
          maximumValue={progress.duration}
          minimumTrackTintColor={GlobalStyles.colors.accentPrimary}
          maximumTrackTintColor="#000000"
          thumbTintColor={GlobalStyles.colors.accentPrimary}
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />

        {/* progressDuration */}
        <View style={styles.progressDuration}>
          <Text style={styles.durationText}>
            {new Date(progress.position * 1000)
              .toLocaleTimeString('en-IT', {hour12: false})
              .substring(3)}
          </Text>
          <Text style={styles.durationText}>
            {new Date((progress.duration - progress.position) * 1000)
              .toLocaleTimeString('en-IT', {hour12: false})
              .substring(3)}
          </Text>
        </View>
      </View>
      <View style={styles.playerControllContainer}>
        <View style={styles.playerButtons}>
          <TouchableOpacity>
            <Icon
              name="md-shuffle"
              size={30}
              color={GlobalStyles.colors.secondaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              TrackPlayer.skipToPrevious();
              SkipToPrevious();
            }}>
            <Icon
              name="play-skip-back"
              size={20}
              color={GlobalStyles.colors.primaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayback(playBackState)}>
            <Icon
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={60}
              color={GlobalStyles.colors.accentPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              TrackPlayer.skipToNext();
              SkipToNext();
            }}>
            <Icon
              name="play-skip-forward"
              size={20}
              color={GlobalStyles.colors.primaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="md-repeat-outline"
              size={30}
              color={GlobalStyles.colors.secondaryText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryBg,
  },
  container: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  naviArea: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  playerControllContainer: {
    width: width,
    alignItems: 'center',
  },
  playerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageWrapper: {
    width: 330,
    height: 330,
    marginVertical: 25,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  featuredImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  songDetailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 320,
    marginVertical: 25,
  },
  songTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: GlobalStyles.colors.primaryText,
    fontSize: 15,
  },
  artristName: {
    fontFamily: 'Poppins-Regular',
    color: GlobalStyles.colors.secondaryText,
    fontSize: 13,
  },
  progressBar: {
    width: 350,
    height: 40,
    flexDirection: 'row',
  },
  progressDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  durationText: {
    fontFamily: 'Poppins-Medium',
    color: GlobalStyles.colors.secondaryText,
    fontSize: 13,
  },
});
