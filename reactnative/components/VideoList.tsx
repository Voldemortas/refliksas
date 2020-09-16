import React, {useEffect, useState} from 'react';
import {View, Text, Image, ToastAndroid} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import VideoCard from './VideoCard';

type propTypes = {
  genres: string[];
  title: string;
};

type Video = {
  title: string;
  image: string;
  genres: string[];
};

const VideoList = ({genres, title}: propTypes) => {
  const [state, setState] = useState<Video[] | null>(null);
  useEffect(() => {
    fetch('https://pastebin.com/raw/EhFct9AM')
      .then((Response) => {
        return Response.json();
      })
      .then((value) => {
        setState(value.movies);
      })
      .catch((e) => {
        ToastAndroid.show('Failed to to get movies', 2000);
        setState([]);
      });
  });
  const size = 18;
  return state === null ? (
    <></>
  ) : (
    <>
      <View
        style={{
          height: size * 21,
          margin: 10,
        }}>
        <Text style={{textAlign: 'center', fontSize: 20}}>{title}</Text>
        <FlatList
          data={state.filter((e) =>
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
