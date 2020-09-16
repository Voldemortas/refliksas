import * as React from 'react';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './screens/Main';
import Second from './screens/Second';
import Login from './screens/Login';
import {StatusBar, BackHandler, ToastAndroid} from 'react-native';
import SliderContext, {ToggleAble} from './context/SliderContext';
import UserContext from './context/UserContext';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const MyStack = () => {
  const [state, setState] = React.useState<ToggleAble>({open: false});
  const setContext = (context: ToggleAble) => {
    setState(context);
  };
  const check = () => {
    if (state.open) {
      setState({open: false});
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', check);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', check);
    };
  });
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser: (user) => {
            setUser(user);
          },
        }}>
        <SliderContext.Provider value={{context: {...state}, setContext}}>
          <StatusBar
            hidden={false}
            backgroundColor="#003300"
            barStyle="light-content"
          />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="Second" component={Second} />
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </NavigationContainer>
        </SliderContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default MyStack;
