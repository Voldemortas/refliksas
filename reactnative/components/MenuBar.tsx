import React from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import SliderContext from '../context/SliderContext';
import UserContext from '../context/UserContext';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const MainBar = () => {
  const user = auth();
  const navigation = useNavigation();
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
              width: !context.open ? 50 : 240,
              height: '100%',
              backgroundColor: !context.open ? 'transparent' : 'green',
            }}>
            <View
              style={{
                top: 15,
                left: !context.open ? 15 : 205,
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
              <UserContext.Consumer>
                {(usercCon) => {
                  const {user, setUser} = usercCon!;
                  return (
                    <>
                      {!user ? (
                        <>
                          <Text
                            onPress={() => {
                              navigation.navigate('Login');
                              setContext({open: false});
                            }}>
                            Log in
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text
                            onPress={() => {
                              auth()
                                .signOut()
                                .then(() => {
                                  navigation.navigate('Main');
                                  setContext({open: false});
                                })
                                .catch((e) => {
                                  console.log(user);
                                });
                            }}>
                            Log out
                          </Text>
                        </>
                      )}
                    </>
                  );
                }}
              </UserContext.Consumer>
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
