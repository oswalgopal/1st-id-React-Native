import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import ForgotPassword from '../Pages/ForgotPassword';
import ForgotPassword2 from '../Pages/ForgotPassword2';

const UnAuth = createStackNavigator();
const UnAuthScreen = () => (
    <UnAuth.Navigator>
                <UnAuth.Screen
                    options={{
                        headerShown: false
                    }}
                    name="login"
                    component={LoginPage}
                />
                <UnAuth.Screen
                    options={{
                        headerShown: false
                    }}
                    name="register"
                    component={RegisterPage}
                />
                <UnAuth.Screen
                    options={{
                        headerShown: false
                    }}
                    name="forgotPassword"
                    component={ForgotPassword}
                />
                <UnAuth.Screen
                    options={{
                        headerShown: false
                    }}
                    name="forgotPassword2"
                    component={ForgotPassword2}
                />
    </UnAuth.Navigator>
)

export default UnAuthScreen;
