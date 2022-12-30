import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import React from 'react';
import {AlbumConfig} from '../hooks/AlbumConfig';
import {Description} from '../modules/Description';
import {RenderAlbums} from './RenderAlbums';

export const FeaturedAlbums = () => {
  //Albums From Firebase //
  const [albums, isLoading] = AlbumConfig();
  //filtered Featured Albums/
  const featuredAlbums = albums.filter(album => {
    if (album[0].tag.includes('featured')) {
      return album[0];
    }
  });
  return (
    <View>
      <View style={styles.seeMoreContainer}>
        <Description title="New Albums" size={15} margin={15} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featuredAlbums.map((item, i) => (
          <View key={i}>
            <RenderAlbums
              item={item}
              width={150}
              height={150}
              flex="column"
              bottom={10}
            />
          </View>
        ))}
      </ScrollView>
      <ActivityIndicator size="small" animating={isLoading} color="grey" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 10,
  },
  seeMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
