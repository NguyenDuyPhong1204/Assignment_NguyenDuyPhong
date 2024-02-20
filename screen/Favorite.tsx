import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Favorite({ navigation }: any) {
    const [listFavorite, setListFovorite] = useState([]);

    useEffect(() => {
        fetch('http://192.168.2.140:3000/favorite')
            .then(response => response.json())
            .then(json => {
                setListFovorite(json);
            })
    }, []);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const fetchDataFromAPI = async () => {
        try {
            const response = await fetch('http://192.168.2.140:3000/favorite');
            if (!response.ok) {
                throw new Error('Failed to fetch data from API');
            }
            const data = await response.json();
            // Cập nhật dữ liệu trong ứng dụng với dữ liệu mới từ API
            updateData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Hàm để cập nhật dữ liệu trong ứng dụng
    const updateData = (newData: any) => {
        // Thực hiện các thao tác cập nhật dữ liệu trong ứng dụng với newData
        setListFovorite(newData);
    };

    const deleteProduct = (pid: any) => {
        fetch(`http://192.168.2.140:3000/favorite/${pid}`, { method: 'DELETE' })
    };
    fetchDataFromAPI();
    return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'space-around' }}>
            <View style={styles.viewCoffeeItem}>
                <FlatList
                    numColumns={2}
                    contentContainerStyle={{ justifyContent: 'space-around' }}
                    data={listFavorite}
                    keyExtractor={item => item.id}
                    renderItem={({ item }: any) => {
                        return (

                            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                <TouchableOpacity style={styles.coffeeItem} onPress={() => {
                                    if (isMounted) {
                                        // navigation.navigate('ProductDetails', { item }); // Chuyển dữ liệu 'item'
                                        // console.log(item);
                                    }
                                }}>
                                    <View style={{ flex: 6 }}>
                                        <ImageBackground source={{ uri: item.image }} imageStyle={styles.imageCoffee}>
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

                                            <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteProduct(item.id)}>
                                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>x</Text>
                                            </TouchableOpacity>

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

        </View>
    );
}

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
        justifyContent: 'space-around'
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
        right: 40
    },

    buttonDelete: {
        width: 35,
        height: 35,
        backgroundColor: 'red',
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

