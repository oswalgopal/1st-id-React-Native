import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UnAuthScreen from './src/Navigations/unAuthNavigation';
import AuthScreen from './src/Navigations/AuthNavigation';
import {darkTheme} from './src/Theme/darkTheme';
import {lightTheme} from './src/Theme/lightTheme';
import {useEffect} from 'react';
import {AuthContext} from './src/context/authContext';
const App = () => {
  const initialStateLoading = {
    isloading: true,
    isLoggedIn: false ,
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
          setDarkMode( darkMode => !darkMode ); //current state utta tha hai initial nhi
        }
      }),

      [],
  );
  return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={darkMode ? darkTheme : lightTheme}>
          {loginState.isLoggedIn ? <AuthScreen /> : <UnAuthScreen />}
        </NavigationContainer>
      </AuthContext.Provider>
  );
};
export default App;
