import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {call} from 'react-native-reanimated';
import SliderContext from '../context/SliderContext';

const MainBar = () => {
  return (
    <SliderContext.Consumer>
      {({context, setContext}) => (
        <View
          style={{
            position: 'absolute',
            height: !context.open ? 55 : '100%',
            width: !context.open ? 50 : '100%',
            zIndex: 8,
          }}>
          <View
            style={{
              zIndex: 7,
              width: !context.open ? 50 : 200,
              height: '100%',
              backgroundColor: !context.open ? 'transparent' : 'red',
            }}>
            <View
              style={{
                top: 15,
                left: !context.open ? 15 : 165,
                width: 35,
                backgroundColor: 'transparent',
                zIndex: 6,
              }}>
              <Text
                style={{fontSize: 35}}
                onPress={() => {
                  setContext({...context, open: !context.open});
                }}>
                ≡
              </Text>
            </View>
            <View
              style={{
                top: 20,
                width: !context.open ? 0 : '100%',
                zIndex: 6,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text>aaa</Text>
              <Text>aaa</Text>
              <Text>aaa</Text>
              <Text>aaa</Text>
              <Text>aaa</Text>
              <Text>aaa</Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              width: !context.open ? 0 : '100%',
              left: !context.open ? 0 : 200,
              height: !context.open ? 0 : '100%',
              backgroundColor: !context.open
                ? 'transparent'
                : 'rgba(0, 0, 0, 0.25)',
              zIndex: 6,
            }}>
            <TouchableOpacity
              onPress={() => {
                setContext({open: false});
              }}>
              <View style={{width: '100%', height: '100%'}}></View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SliderContext.Consumer>
  );
};

export default MainBar;
