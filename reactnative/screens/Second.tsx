import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, ScrollView, View, Text, Dimensions} from 'react-native';
import MainBar from '../components/MenuBar';
import {RootStackParamList} from '../types';
import TopAuthBar from '../components/TopAuthBar';
import styles from '../styles';

type propTypes = StackScreenProps<RootStackParamList, 'Second'>;
const Second = ({navigation}: propTypes) => {
  const {width, height} = Dimensions.get('window');
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{height: height}}>
            <MainBar />
            <TopAuthBar />
            <View style={styles.sectionContainer}>
              <Text
                style={styles.sectionDescription}
                onPress={() => navigation.navigate('Main')}>
                Go to Main
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Second;
