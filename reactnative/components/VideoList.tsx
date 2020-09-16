import React, {useEffect, useState} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import VideoCard from './VideoCard';
import {Video} from '../types';

type propTypes = {
  genres: string[];
  title: string;
  movies: Video[];
};

const VideoList = ({genres, title, movies}: propTypes) => {
  const size = 18;
  return (
    <>
      <View
        style={{
          height: size * 21,
          margin: 10,
        }}>
        <Text style={{textAlign: 'center', fontSize: 20}}>{title}</Text>
        <FlatList
          data={movies.filter((e) =>
            e.genres.reduce<boolean>((a, b) => {
              return genres.includes(b) || a;
            }, false),
          )}
          horizontal={true}
          renderItem={({item}) => {
            return <VideoCard {...item} />;
          }}
        />
      </View>
    </>
  );
};

export default VideoList;
