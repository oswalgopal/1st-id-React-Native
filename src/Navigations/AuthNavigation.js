import 'react-native-gesture-handler';
import React from 'react';
import LandingPage from '../Pages/LandingPage';
import Notifications from '../Pages/Notifications';
import MyDocument from '../Pages/MyDocument';
import Header from '../Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer' ;
import ProfilePage from '../Pages/ProfilePage';
import DrawerComponent from '../Components/DrawerComponent';
import ScanDocuments from "../Pages/ScanDocuments";
import ScannedImages from "../Pages/ScannedImages";
import {lightTheme} from "../Theme/lightTheme";
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
    <Auth.Screen
                    options={{headerShown: false }}
                    name = "profilePage"
                    component= {ProfilePage}
                />
        <Auth.Screen
                        options={({navigation}) => ({
                            header: () => <Header navigation={navigation} bellShown={false} />
                        })}

                        name="myDocument"
                        component={MyDocument}
                    />
        <Auth.Screen
            options={({navigation}) => ({
                header: () => <Header navigation={navigation} bellShown={true} />
            })}

            name="scan"
            component={ScanDocuments}
        />
        <Auth.Screen
            options={({navigation}) => ({
                headerStyle: {
                    backgroundColor: lightTheme.colors.blue
                },
                headerTitleStyle: {
                    color: lightTheme.colors.white
                },
                headerTitle: 'Scanned Images',
                headerRightContainerStyle: {
                    color: 'white'
                },
            })}
            name="scanImages"
            component={ScannedImages}
        />
    </Auth.Navigator>
);
export default AuthScreen ;
