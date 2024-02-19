import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Cart } from "./Cart";
import { Favorite } from "./Favorite";
import { useEffect, useState } from "react";
import {typeCoffee } from "../data/ListCoffeeItem";


export function MainActivity() {


    const [selectedCoffee, setSelectedCoffee] = useState(1);

    const [productCoffee, setProductCoffee] = useState([]);
    const [typeCoffee, setTypeCoffee] = useState();
    const [findCoffee, setFindCoffee] = useState('');


    useEffect(()=>{
        fetch('http://192.168.2.140:3000/typeCoffee')
        .then(response => response.json())
        .then(json =>{
            setTypeCoffee(json);
        })
    },[]);

    useEffect(()=>{
        fetch(`http://192.168.2.140:3000/productCoffee`)
        .then(response => response.json())
        .then(json =>{
            setProductCoffee(json)
        })
    },[])
    
    
    return (

        <View style={styles.styleMainView}>
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
            <View style={styles.viewFirst}>
                <TouchableOpacity style={styles.buttonSetting}
                >
                    <Image source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/settings.png')}
                        style={styles.imageSetting} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonUser}>
                    <Image source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/user.png')}
                        style={styles.imageUser} />
                </TouchableOpacity>
            </View>

            <View style={styles.viewText}>
                <Text style={styles.textFind}>Find the best</Text>
                <Text style={styles.textFind}>coffee for you</Text>
            </View>

            <View style={styles.styleFind}>
                <TouchableOpacity style={styles.buttonFind}>
                    <Image style={styles.iconFind} source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/find.png')} />
                </TouchableOpacity>
                <TextInput style={styles.textInputFind} placeholder="Name coffee" placeholderTextColor={'white'} onChangeText={setFindCoffee} value={findCoffee}/>
            </View>

            {/* Type Coffee */}
            <View style={styles.viewTypeCoffee}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={typeCoffee}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {

                        return (
                            <TouchableOpacity style={
                                {
                                    width: 100,
                                    height: 40,
                                    backgroundColor: item.id == selectedCoffee ? 'orange' : '#333333',
                                    marginRight: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20
                                }
                            }
                                onPress={() => setSelectedCoffee(item.id)}
                            >
                                <Text style={styles.titleTypeCoffee}>{item.title}</Text>
                            </TouchableOpacity>
                        );
                    }}
                >

                </FlatList>
            </View>




            {/* Coffee Item*/}

            <View style={styles.viewCoffeeItem}>
                <FlatList
                    numColumns={2}
                    contentContainerStyle={{ justifyContent: 'space-around' }}
                    data={productCoffee.filter((item: any) =>{
                        return item.category === selectedCoffee && item.description.toLowerCase().includes(findCoffee.toLowerCase())
                    })}
                    keyExtractor={item => item.id}
                    renderItem={({ item}: any) => {
                        return (

                            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                <TouchableOpacity style={styles.coffeeItem}>
                                    <View style={{ flex: 6 }}>
                                        <ImageBackground source={{uri: item.image}} imageStyle={styles.imageCoffee}>
                                            <View style={styles.viewStart}>
                                                <Text style={{ color: 'white' }}>⭐ {item.evaluate}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>

                                    <View style={{ flex: 4 }}>
                                        <Text style={styles.textNameCoffee}>{item.title}</Text>
                                        <Text style={styles.textDesc}>{item.description}</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
                                            <Image source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/dollar.png')} style={styles.imageMoney} />
                                            <Text style={styles.textMoney}>{item.price}</Text>

                                            <TouchableOpacity style={styles.buttonAdd}>
                                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>+</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </TouchableOpacity>

                            </View>
                        );
                    }}
                >

                </FlatList>
            </View>
            {/*  */}
        </View>

    );
};




const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
    styleMainView: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20
    },

    viewFirst: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-between'
    },

    buttonSetting: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageSetting: {
        width: 20,
        height: 20,
        tintColor: 'white'
    },

    buttonUser: {
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageUser: {
        width: 30,
        height: 30,
        tintColor: 'white'
    },

    viewText: {
        width: screen.width,
        height: 80,
        marginTop: 10,


    },

    styleFind: {
        width: screen.width / 1.05,
        height: 60,
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: 'gray',
        borderRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textFind: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    textInputFind: {
        width: '80%',
        height: 40,
    },
    buttonFind: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9966',
        borderRadius: 30,
        marginLeft: 0
    },

    iconFind: {
        width: 25,
        height: 25,
        tintColor: 'white'
    },

    scrollCoffee: {
        width: screen.width / 1.05,
        paddingHorizontal: 10,
        marginBottom: 10
    },

    viewTypeCoffee: {
        width: screen.width / 1.05,
        marginTop: 20,
    },

    buttonTypeCoffee: {
        width: 100,
        height: 40,
        backgroundColor: '#333333',
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    titleTypeCoffee: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    viewCoffeeItem: {
        flex: 1,
        width: screen.width / 1.05,
        marginTop: 30,

    },

    coffeeItem: {
        width: 180,
        height: 265,
        backgroundColor: '#333333',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20
    },

    imageCoffee: {
        width: '100%',
        height: 130,
        borderRadius: 20,
    },

    textDesc: {
        color: 'white',
        marginTop: 10
    },

    textMoney: {
        color: 'white',
        fontSize: 17
    },
    textNameCoffee: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 5
    },

    imageMoney: {
        width: 15,
        height: 15,
        tintColor: 'orange'
    },
    buttonAdd: {
        width: 35,
        height: 35,
        backgroundColor: '#FF6600',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },

    viewStart: {
        width: 60,
        height: 25,
        backgroundColor: 'black',
        position: 'absolute',
        right: 0,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }



});

