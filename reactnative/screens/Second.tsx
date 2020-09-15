import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import MainBar from '../components/MenuBar';

type RootStackParamList = {
  Main: undefined;
  Second: undefined;
};

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

const styles = StyleSheet.create({
  SafeAreaView: {
    position: 'absolute',
  },
  scrollView: {
    backgroundColor: 'green',
    zIndex: 2,
    elevation: 2,
    minHeight: '100%',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 48,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Second;
