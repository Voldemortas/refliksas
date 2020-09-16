import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import MainBar from '../components/MenuBar';
import {RootStackParamList} from '../types';
import TopAuthBar from '../components/TopAuthBar';
import styles from '../styles';

type propTypes = StackScreenProps<RootStackParamList, 'Main'>;
const Main = ({navigation}: propTypes) => {
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{height: useWindowDimensions().height - 24}}>
            <MainBar />
            <TopAuthBar />
            <View style={styles.sectionContainer}>
              <Text
                style={styles.sectionDescription}
                onPress={() => navigation.navigate('Second')}>
                Go to Second
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Main;
