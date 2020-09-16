import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import MainBar from '../components/MenuBar';
import {RootStackParamList, Video} from '../types';
import TopAuthBar from '../components/TopAuthBar';
import VideoList from '../components/VideoList';
import styles from '../styles';
import {ToastAndroid} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {createConfigItem} from '@babel/core';

type propTypes = StackScreenProps<RootStackParamList, 'Main'>;
const Main = ({navigation}: propTypes) => {
  const [state, setState] = useState<Video[]>([]);
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
  const data = [
    {genres: ['Fantasy'], title: 'Popular Fantasy movies'},
    {genres: ['Comedy'], title: 'Popular Comedy movies'},
  ];
  return (
    <>
      <SafeAreaView>
        <MainBar />
        <TopAuthBar />
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          ListHeaderComponentStyle={styles.scrollView}
          ListHeaderComponent={
            <>
              {data.map((item) => (
                <VideoList
                  genres={item.genres}
                  title={item.title}
                  movies={state}
                />
              ))}
            </>
          }
          data={[]}
          renderItem={({item}) => <></>}
        />
      </SafeAreaView>
    </>
  );
};

export default Main;
