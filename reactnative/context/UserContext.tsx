import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import * as React from 'react';

export type userContext = {
  user: FirebaseAuthTypes.User | null;
  setUser: (context: FirebaseAuthTypes.User | null) => void;
};

const UserContext = React.createContext<userContext | null>(null);

export default UserContext;
