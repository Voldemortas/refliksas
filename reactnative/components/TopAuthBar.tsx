import React from 'react';
import {View, Text} from 'react-native';
import UserContext from '../context/UserContext';

const TopAuthBar = () => {
  return (
    <UserContext.Consumer>
      {(usercCon) => {
        const {user} = usercCon!;
        return (
          <>
            {!user ? (
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'yellow',
                  alignItems: 'center',
                }}>
                <Text>You're not logged in</Text>
              </View>
            ) : (
              <></>
            )}
          </>
        );
      }}
    </UserContext.Consumer>
  );
};

export default TopAuthBar;
