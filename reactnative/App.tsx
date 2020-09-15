import * as React from 'react';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './screens/Main';
import Second from './screens/Second';
import {StatusBar, BackHandler, ToastAndroid} from 'react-native';
import SliderContext, {ToggleAble} from './context/SliderContext';

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
  return (
    <>
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
          </Stack.Navigator>
        </NavigationContainer>
      </SliderContext.Provider>
    </>
  );
};

export default MyStack;
