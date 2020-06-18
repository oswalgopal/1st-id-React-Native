import 'react-native-gesture-handler';
import React from 'react';
import LoginPage from './src/Pages/LoginPage';
import RegisterPage from './src/Pages/RegisterPage';
import ForgotPassword from './src/Pages/ForgotPassword';
import ForgotPassword2 from './src/Pages/ForgotPassword2';
import LandingPage from './src/Pages/LandingPage';
import Notifications from './src/Pages/Notifications';
import Header from './src/Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const App = () => {
    const user = <Icon name="user" size={30} color="#fff" />;
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="login"
                    component={LoginPage}
                />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="register"
                    component={RegisterPage}
                />
                 <Stack.Screen
                    options={({navigation}) => ({
                        header: () => <Header navigation={navigation} bellShown={true} />
                    })}
                    name="landingPage"
                    component={LandingPage}
                />
                <Stack.Screen
                    options={({navigation}) => ({
                        header: () => <Header navigation={navigation} bellShown={false} />
                    })}

                    name="notifications"
                    component={Notifications}
                />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="forgotPassword"
                    component={ForgotPassword}
                />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="forgotPassword2"
                    component={ForgotPassword2}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default App;