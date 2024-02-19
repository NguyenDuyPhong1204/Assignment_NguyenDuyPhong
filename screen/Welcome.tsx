import React, { useEffect } from "react";
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from "react-native";

export function Welcome({ navigation }:any) {

    useEffect(() => {
        const timer = setTimeout(() => {
            // Chuyển màn hình sang màn hình login
            navigation.replace('Login'); 
        }, 3000);

        return () => clearTimeout(timer); // Hủy bỏ timer khi component unmount
    });

    return (
        <View style={styles.viewStart}>
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
            <View style={styles.viewContent}>
                <Image source={require('../image/coffee.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Welcome to</Text>
                <Text style={styles.textStyle}>PhongCoffee</Text>
            </View>
        </View>
    );
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
    viewStart: {
        flex: 1,
        backgroundColor: 'black'
    },
    viewContent: {
        width: screen.width,
        height: screen.height,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -25
    },
    imageStyle: {
        width: 200,
        height: 200
    },
    textStyle: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    }
});
