import { useState } from "react";
import { Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export function Register({navigation}:any) {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);


    const validateEmail = (email: any) => {
        // Biểu thức chính quy để xác thực email \(có thể được cải thiện\)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const apiBaseUrl = "http://192.168.2.140:3000"; // Base URL của API
    const apiLoginEndpoint = "/user"; // Đường dẫn API đăng nhập

    const handleLogin = async () => {
        try {
            const response = await fetch(apiBaseUrl + apiLoginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: fullName,
                    email: emailAddress,
                    password: password
                }),
            });
            const data = await response.json();
            if (response.ok) {
                // Đăng nhập thành công, xử lý tiếp theo tại đây
                console.log("Đăng kí thành công:", data);
                navigation.navigate('Login'); // Ví dụ: Chuyển hướng đến màn hình chính
            } else {
                // Đăng nhập không thành công, hiển thị thông báo lỗi
                setError(data.message || "Register failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("An error occurred while logging in");
        }
    };

    return (
        <View style={styles.styleContainer}>
            <StatusBar translucent backgroundColor={('rgba(0,0,0,0)')} />

            <Image source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/coffee.png')} style={styles.imageStyle} />
            <Text style={styles.textWelcome}>Welcome to PhongCoffee</Text>
            <Text style={styles.textContiue}>Login to Continue</Text>


            <View style={styles.loginStyle}>
            <TextInput style={styles.textInputStyle} placeholder="Name" placeholderTextColor={'white'} />
                <TextInput style={styles.textInputStyle} placeholder="Email Address" placeholderTextColor={'white'} />
                <TextInput style={styles.textInputStyle} placeholder="Password" placeholderTextColor={'white'} />
                <TextInput style={styles.textInputStyle} placeholder="Enter the password" placeholderTextColor={'white'} />
            </View>

            <View style={styles.viewStyleButon}>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.textWelcome}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewElse}>
                <Text style={styles.textElse}>You have an account? Click
                    <Text style={{ color: 'orange' }} onPress={() => { navigation.navigate('Login') }}> Sign in</Text></Text>
            </View>
        </View>
    );
};

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    styleContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: "center"
    },
    imageStyle: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    textWelcome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    textContiue: {
        fontSize: 20,
        color: 'gray',
    },
    loginStyle: {
        width: screen.width / 1.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputStyle: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
        color:'white'
    },
    textGoogle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    viewStyleButon: {
        width: screen.width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    buttonStyle: {
        width: screen.width / 1.2,
        height: 60,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20
    },

    imageGoogleStyle: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 20
    },

    viewElse: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    textElse: {
        fontSize: 17,
        color: 'gray',
        fontWeight: 'bold',
        marginTop: 20
    },
});
