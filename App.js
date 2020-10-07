import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UnAuthScreen from './src/Navigations/unAuthNavigation';
import AuthScreen from './src/Navigations/AuthNavigation';
import {darkTheme} from './src/Theme/darkTheme';
import {lightTheme} from './src/Theme/lightTheme';
import {useEffect} from 'react';
import {AuthContext} from './src/context/authContext';
import {StatusBar, Text, View} from 'react-native';
import {Api} from './src/Providers/api';
const api = new Api();
const App = () => {
  const initialStateLoading = {
    isloading: true,
    isLoggedIn: false, // todo to be changed to false
  };
  const [darkMode, setDarkMode] = React.useState(false);
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          isLoggedIn: true,
          isloading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoggedIn: false,
          isloading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialStateLoading,
  );
  useEffect(() => {
    setTimeout(() => {
      api
        .getAsyncData('loginData')
        .then((res) => {
          if (res) {
            console.log(res);
            dispatch({type: 'LOGIN'});
          } else {
            dispatch({type: 'LOGOUT'});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);
  const authContext = React.useMemo(
    () => ({
      login: () => {
        console.log('login function called');
        dispatch({type: 'LOGIN'});
      },
      logout: () => {
        dispatch({type: 'LOGOUT'});
      },
      toggleTheme: () => {
        setDarkMode((darkMode) => !darkMode); //current state utta tha hai initial nhi
      },
    }),

    [],
  );
  if (loginState.isloading) {
    return (
      <View>
        <Text>Loading Please wait</Text>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar backgroundColor={lightTheme.colors.blue} />
      <NavigationContainer theme={darkMode ? darkTheme : lightTheme}>
        {loginState.isLoggedIn ? <AuthScreen /> : <UnAuthScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
