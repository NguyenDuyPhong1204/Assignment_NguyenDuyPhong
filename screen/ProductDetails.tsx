import { useState } from "react";
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
export function ProductDetails({ route, navigation }: any) {
    const { coffee } = route.params;



    const [selectedSize, setSelectedSize] = useState(1);
    const handleSizeSelect = (size: any) => {
        setSelectedSize(size);
    };

    const [favorite, setFavorite] = useState(false);
    const apiFavorite = "http://192.168.2.140:3000/favorite";

    const addToFavorite = async () => {
      try {
          // Kiểm tra trạng thái của sản phẩm trong danh sách yêu thích
          const productId = coffee.id;
          const checkResponse = await fetch(`http://192.168.2.140:3000/favorite/?id=${productId}`);
          const checkData = await checkResponse.json();
  
          // Nếu sản phẩm đã tồn tại trong danh sách yêu thích, hiển thị thông báo và không thêm mới
          if (checkResponse.ok && checkData.productId) {
              ToastAndroid.show("Đã có sản phẩm trong yêu thích", ToastAndroid.SHORT);
              return;
          } else {
              // Nếu sản phẩm chưa tồn tại trong danh sách yêu thích, thêm mới
              const response = await fetch(apiFavorite, {
                  method: 'POST',
                  body: JSON.stringify({
                      id: coffee.id,
                      title: coffee.title,
                      description: coffee.description,
                      image: coffee.image,
                      evaluate: coffee.evaluate,
                      price: coffee.price,
                      details: coffee.detail,
                      favorite: true
                  })
              });
  
              // Xử lý kết quả từ yêu cầu thêm mới
              if (response.ok) {
                  ToastAndroid.show("Đã thêm vào yêu thích", ToastAndroid.SHORT);
              } else {
                  ToastAndroid.show("Lỗi thêm", ToastAndroid.SHORT);
              }
          }
  
      } catch (error:any) {
        ToastAndroid.show("Lỗi" + error.message, ToastAndroid.SHORT);
      }

    };




    return (
        <View style={{ flex: 1 }}>


            {/* Image background*/}

            <ImageBackground style={styles.ImageBackgroundStyle} source={{ uri: coffee.image }}>

                <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'}></StatusBar>
                <View style={styles.viewHeader}>
                    <TouchableOpacity style={styles.buttonBack} onPress={() => {
                        navigation.navigate('Tab');
                    }}>
                        <Image source={require('../image/back.png')} style={{ width: 15, height: 15 }}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonFavorite} onPress={addToFavorite}>
                        <Image source={require('../image/favorite.png')} style={{ width: 15, height: 15, tintColor: 'red' }}></Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.styleTitle}>
                    <Text style={styles.textTitle}>{coffee.title}</Text>
                    <Text style={styles.textDes}>{coffee.description}</Text>

                    <View style={styles.viewRate}>
                        <Text style={{ color: 'white', fontSize: 30 }}>⭐</Text>
                        <Text style={styles.textEvaluate}>{coffee.evaluate}</Text>
                    </View>
                </View>
            </ImageBackground>

            {/* Chi tiết sản phẩm*/}

            <View style={styles.styleDetails}>
                <Text style={{ color: 'white', fontSize: 20 }}>Description</Text>
                <Text style={{ color: 'white', fontSize: 17, marginTop: 20 }}>{coffee.detail}</Text>

                <View style={styles.viewSize}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Size</Text>
                    <View style={styles.styleSize}>
                        <TouchableOpacity onPress={() => handleSizeSelect('S')} style={[styles.typeSize, { borderColor: selectedSize === 'S' ? 'orange' : 'black' }]}>
                            <Text style={styles.textSize}>S</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSizeSelect('M')} style={[styles.typeSize, { borderColor: selectedSize === 'M' ? 'orange' : 'black' }]}>
                            <Text style={styles.textSize}>M</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleSizeSelect('L')} style={[styles.typeSize, { borderColor: selectedSize === 'L' ? 'orange' : 'black' }]}>
                            <Text style={styles.textSize}>L</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Giá tiền + Button*/}

                <View style={styles.viewBuy}>

                    <View style={{ width: 150, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.textSize}>
                            Price
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../image/dollar.png')} style={styles.imageIcon}></Image>
                            <Text style={styles.textSize}>{coffee.price}</Text>
                        </View>


                    </View>

                    <TouchableOpacity style={styles.buttonAddToCart}>
                        <Text style={styles.textSize}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    )
}
const screen = Dimensions.get('screen');
const styles = StyleSheet.create({

    buttonBack: {
        width: 30,
        height: 30,
        backgroundColor: '#333333',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 20
    },

    buttonFavorite: {
        width: 30,
        height: 30,
        backgroundColor: '#333333',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -390
    },

    viewHeader: {
        flexDirection: 'row',
        position: 'absolute',
        top: 50,
        justifyContent: 'space-around'

    },

    imageIcon: {
        width: 25,
        height: 25,
        tintColor: 'orange',
        marginRight: 10
    },

    viewBuy: {
        flexDirection: 'row',
        marginTop: 80,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonAddToCart: {
        width: 200,
        height: 50,
        backgroundColor: '#FF9900',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageBackgroundStyle: {
        flex: 5,
        justifyContent: 'flex-end'
    },
    styleDetails: {
        flex: 5,
        backgroundColor: 'black',
        padding: 20
    },
    styleTitle: {
        width: screen.width,
        height: 150,
        backgroundColor: 'rgba(0, 2, 0, 0.5)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20
    },
    textTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textDes: {
        color: 'white',
        marginTop: 10
    },
    viewRate: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center'
    },
    textEvaluate: {
        color: 'white',
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    viewSize: {
        marginTop: 20,
        flexDirection: 'column'
    },
    styleSize: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    typeSize: {
        width: 100,
        height: 40,
        backgroundColor: "#444444",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSize: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold'
    }
});