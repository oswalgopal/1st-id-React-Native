import 'react-native-gesture-handler';
import React from 'react';
import LandingPage from '../Pages/LandingPage';
import Notifications from '../Pages/Notifications';
import Header from '../Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer' ;
import DrawerComponent from '../Components/DrawerComponent';
const Drawer = createDrawerNavigator();
const Auth = createStackNavigator() ;
const AuthScreen = () => {
return (
     <Drawer.Navigator drawerContent={props => <DrawerComponent {...props} />}>
            <Drawer.Screen name='landingPage' component={AuthNav} />            

           
     </Drawer.Navigator>
);
};

const AuthNav = () =>  (
    <Auth.Navigator>
    <Auth.Screen
                    options={({navigation}) => ({
                        header: () => <Header navigation={navigation} bellShown={true} />
                    })}
                    name="landingPage"
                    component={LandingPage}
                />
    <Auth.Screen
                    options={({navigation}) => ({
                        header: () => <Header navigation={navigation} bellShown={false} />
                    })}

                    name="notifications"
                    component={Notifications}
                />
    </Auth.Navigator>
);
export default AuthScreen ;