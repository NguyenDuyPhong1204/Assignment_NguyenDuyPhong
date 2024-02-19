import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainActivity } from "../../screen/MainActivity";
import { Favorite } from "../../screen/Favorite";
import { Cart } from "../../screen/Cart";
import { PaymentHistory } from "../../screen/PaymentHistory";
import { NavigationContainer } from "@react-navigation/native";
import { Image, StyleSheet } from "react-native";
import React from "react";

export function TabNavigator() {
    const Tab = createBottomTabNavigator();
    return (

        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle
            }}
        
        >
            <Tab.Screen name='Home' component={MainActivity}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/home.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'orange' : 'gray'
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen name='Cart' component={Cart}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/cart.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'orange' : 'gray'
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen name='Favorite' component={Favorite}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/favorite.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'orange' : 'gray'
                            }}
                        />
                    )
                }}
            
            />
            <Tab.Screen name='PayHistory' component={PaymentHistory}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/payment.png')}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? 'orange' : 'gray'
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>

    );
};

const styles = StyleSheet.create({

    tabBarStyle: {
        height: 60,
        backgroundColor: 'black',
        borderTopWidth: 1,
        borderColor: 'white',
    }

});