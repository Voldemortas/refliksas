import React, {useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Dimensions,
  Button,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import MainBar from '../components/MenuBar';
import TopAuthBar from '../components/TopAuthBar';
import {RootStackParamList} from '../types';
import {TextInput} from 'react-native-gesture-handler';
import styles from '../styles';

type propTypes = StackScreenProps<RootStackParamList, 'Login'>;
const Login = ({navigation}: propTypes) => {
  const {height} = Dimensions.get('window');
  const emailLoginRef = useRef<TextInput>(null);
  const passLoginRef = useRef<TextInput>(null);
  const emailRegisterRef = useRef<TextInput>(null);
  const passRegRef = useRef<TextInput>(null);
  const pass2RegRef = useRef<TextInput>(null);
  let emailLogin = '';
  let emailRegister = '';
  let passLogin = '';
  let passReg = '';
  let pass2Reg = '';
  const login = async () => {
    if (emailLogin === '' || passLogin === '') {
      ToastAndroid.show("Fields can't be empty", 2);
      return;
    }
    ToastAndroid.show('Logging in, please wait', 2);
    try {
      await auth().signInWithEmailAndPassword(emailLogin, passLogin);
      ToastAndroid.show('Successfully logged in', 2);
      navigation.navigate('Main');
    } catch (e) {
      ToastAndroid.show(e.message.split('] ')[1], 2);
    }
  };
  const register = async () => {
    if (emailRegister === '' || passReg === '' || pass2Reg === '') {
      ToastAndroid.show("Fields can't be empty", 2);
      return;
    }
    if (passReg !== pass2Reg) {
      ToastAndroid.show('Passwords do not match', 2);
      return;
    }
    ToastAndroid.show("User's being registered", 2);
    try {
      await auth().createUserWithEmailAndPassword(emailRegister, passReg);
      ToastAndroid.show('Successfully registered', 2);
      navigation.navigate('Main');
    } catch (e) {
      ToastAndroid.show(e.message.split('] ')[1], 2);
    }
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{height: height}}>
            <MainBar />
            <TopAuthBar />
            <View
              style={{
                ...styles.sectionContainer,
                ...styles.sectionDescription,
              }}>
              <Text>Login</Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'green',
                  borderWidth: 1,
                  backgroundColor: 'white',
                }}
                placeholder={'Email'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onChangeText={(text) => (emailLogin = text)}
                //@ts-ignore
                onSubmitEditing={() => passLoginRef.current!.focus()}
                ref={emailLoginRef}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'green',
                  borderWidth: 1,
                  backgroundColor: 'white',
                }}
                placeholder={'Password'}
                textContentType={'password'}
                secureTextEntry={true}
                autoCapitalize={'none'}
                blurOnSubmit={true}
                ref={passLoginRef}
                onChangeText={(text) => (passLogin = text)}
                onSubmitEditing={login}
              />
              <Button
                title="Log in"
                onPress={() => {
                  login();
                }}
              />
              <Text>Register</Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'green',
                  borderWidth: 1,
                  backgroundColor: 'white',
                }}
                placeholder={'Email'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onChangeText={(text) => (emailRegister = text)}
                //@ts-ignore
                onSubmitEditing={() => passRegRef.current!.focus()}
                ref={emailRegisterRef}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'green',
                  borderWidth: 1,
                  backgroundColor: 'white',
                }}
                placeholder={'Password'}
                textContentType={'password'}
                secureTextEntry={true}
                autoCapitalize={'none'}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onChangeText={(text) => (passReg = text)}
                //@ts-ignore
                onSubmitEditing={() => pass2RegRef.current!.focus()}
                ref={passRegRef}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'green',
                  borderWidth: 1,
                  backgroundColor: 'white',
                }}
                placeholder={'Repeat password'}
                textContentType={'password'}
                secureTextEntry={true}
                autoCapitalize={'none'}
                blurOnSubmit={true}
                onChangeText={(text) => (pass2Reg = text)}
                ref={pass2RegRef}
                onSubmitEditing={register}
              />
              <Button title="Register" onPress={register} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;
