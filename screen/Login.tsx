import { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export function Login({ navigation }: any) {

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);
    const [errorEmail, setErrorEmail]= useState('');


    const validateEmail = (email: any) => {
        // Biểu thức chính quy để xác thực email \(có thể được cải thiện\)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const apiBaseUrl = "http://192.168.2.140:3000"; // Base URL của API
    const apiLoginEndpoint = "/user"; // Đường dẫn API đăng nhập

    const handleLogin = async () => {
        const email = validateEmail(emailAddress);
        const pass = password.length > 0;

        if (!email || !pass) {
            if (!email) {
                setErrorEmail('Vui lòng nhập lại email');
            } else {
                setErrorEmail("");
            }

            if (!password) {
                setError("Vui lòng nhập mật khẩu");
            } else {
                setError("");
            }
        } else {
            try {
                const response = await fetch(apiBaseUrl + apiLoginEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailAddress,
                        password: password
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    // Đăng nhập thành công, xử lý tiếp theo tại đây
                    console.log("Login successful:", data);
                    navigation.navigate('Tab'); // Ví dụ: Chuyển hướng đến màn hình chính

                } else {
                    // Đăng nhập không thành công, hiển thị thông báo lỗi
                    setError(data.message || "Login failed");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                setError("An error occurred while logging in");
            }
        }


    };

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onPress = () => {
        if (isMounted) {
            navigation.navigate('Register');
        }
    };

    return (
        <View style={styles.styleContainer}>
            <StatusBar translucent backgroundColor={('rgba(0,0,0,0)')} />

            <Image source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/coffee.png')} style={styles.imageStyle} />
            <Text style={styles.textWelcome}>Welcome to PhongCoffee</Text>
            <Text style={styles.textContiue}>Login to Continue</Text>


            <View style={styles.loginStyle}>
                <TextInput style={styles.textInputStyle}
                    placeholder="Email Address"
                    placeholderTextColor={'white'}
                    onChangeText={setEmailAddress}
                    value={emailAddress} />
            <Text style={styles.textError}>{errorEmail}</Text>
                <TextInput style={styles.textInputStyle}
                    placeholder="Password"
                    placeholderTextColor={'white'}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry />

            </View>
            <Text style={styles.textError}>{error}</Text>
            <View style={styles.viewStyleButon}>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
                    <Text style={styles.textWelcome}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyleG}>
                    <Image source={require('/Ki5/React Native/Assignment/Assignment_NguyenDuyPhong_PH36760/image/google-symbol.png')} style={styles.imageGoogleStyle}></Image>
                    <Text style={styles.textGoogle}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewElse}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textElse}>Don't have account? Click
                        <Text style={{ color: 'orange' }} onPress={onPress}> Register</Text></Text>
                </View>
                <Text style={styles.textElse}>Forgot password? Click
                    <Text style={{ color: 'orange' }}> Reset</Text></Text>
            </View>
        </View>
    );
};

const screen = Dimensions.get('screen');


const styles = StyleSheet.create({
    textError: {
        color: 'red',
        textAlign: 'left'
    },
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
        color: 'white'
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
    buttonStyleG: {
        width: screen.width / 1.2,
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
        flexDirection: 'row',
        position: 'relative'

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
        marginTop: 50
    },
    textElse: {
        fontSize: 17,
        color: 'gray',
        fontWeight: 'bold',
        marginTop: 20
    },
});