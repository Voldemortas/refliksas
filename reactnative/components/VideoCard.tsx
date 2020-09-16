import React from 'react';
import {View, Text, Image, ImageURISource} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Video = {
  title: string;
  image: string;
};

const TopAuthBar = ({title, image}: Video) => {
  const size = 18;
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          console.log(title);
        }}>
        <View
          style={{
            width: size * 9,
            height: size * 20,
            margin: 10,
          }}>
          <View
            style={{
              width: size * 9,
              height: size * 14,
            }}>
            <Image
              source={{uri: image}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View
            style={{
              width: size * 9,
              height: size * 6,
            }}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default TopAuthBar;
