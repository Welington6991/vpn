import React, { memo, useState, useEffect, useRef } from 'react';
import {
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    Animated,
    Keyboard,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    Platform,
    Alert,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'react-native-axios';

const Login = ({ navigation }) => {
    var whoInput = "";
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [loadingView, setLoadingView] = useState(false)
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({ x: 300, y: 300 }));
    const [input, setInput] = useState({ user: 0, password: 0, entrar: 0 });

    useEffect(() => {
        logged();
    }, []);

    const keyboardDidShow = () => {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 150,
                duration: 100
            }),

            Animated.timing(logo.y, {
                toValue: 150,
                duration: 100
            })
        ]).start();
    }

    const keyboardDidHide = () => {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 300,
                duration: 100
            }),

            Animated.timing(logo.y, {
                toValue: 300,
                duration: 100
            })
        ]).start();
    }

    const logged = async () => {
        var value = await AsyncStorage.getItem('login')
        if (value) {
            navigation.navigate('Apps');
        } else {
            setLoadingView(true);
            showLogin();
        }
    }

    const showLogin = () => {
        keyboardDidShowListener
            = Keyboard.addListener('keyboardDidShow', keyboardDidShow);

        keyboardDidHideListener
            = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        // Animações em paralelo
        Animated.parallel([
            // Fornece um modelo de física básico (efeito mola/estilingue)
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20
            }),

            // Anima um valor ao longo do tempo
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200
            })
        ]).start();
    }

    const login = async () => {
        setLoading(true);
        let userLogin = user;
        let passwordLogin = password;
        if (userLogin && passwordLogin) {
            axios.get(`https://angels.red/player_api.php?username=${userLogin}&password=${passwordLogin}`)
                .then(async (response) => {
                    await AsyncStorage.setItem('login', JSON.stringify(response.data));
                    setLoading(false);
                    navigation.navigate('Apps');
                }).catch((err) => {
                    axios.get(`http://api.gestor.tv:2082/api-extern.php?action=authP2P&name=${userLogin}&pass=${passwordLogin}`)
                        .then(async (response2) => {
                            if (response2.data) {
                                await AsyncStorage.setItem('login', JSON.stringify(response2.data));
                                setLoading(false);
                                navigation.navigate('Apps');
                            } else {
                                Alert.alert(
                                    "Login",
                                    "Usuário ou senha incorretos",
                                    [
                                        { text: "OK", onPress: () => { } }
                                    ]
                                );
                                allFocus();
                                setLoading(false);
                            }
                        }).catch((err2) => {
                            Alert.alert(
                                "Login",
                                "Usuário ou senha incorretos",
                                [
                                    { text: "OK", onPress: () => { } }
                                ]
                            );
                            allFocus();
                            setLoading(false);
                        })
                })
        } else {
            Alert.alert(
                "Login",
                "Usuário ou senha não preenchidos",
                [
                    { text: "OK", onPress: () => { } }
                ]
            );
            allFocus();
            setLoading(false);
        }
    };

    const allFocus = () => {
        let copyState = { ...input };
        copyState.user = 0;
        copyState.password = 0;
        copyState.entrar = 0;
        setInput(copyState);
        focusUser();
    }

    const focusUser = () => {
        userRef.current.focus();
        let copyState = { ...input };
        copyState.user = 1;
        copyState.password = 0;
        copyState.entrar = 0;
        setInput(copyState);
    };

    const focusPassword = () => {
        passwordRef.current.focus();
        let copyState = { ...input };
        copyState.user = 0;
        copyState.password = 1;
        copyState.entrar = 0;
        setInput(copyState);
    };

    const userRef = useRef();
    const passwordRef = useRef();

    if (loadingView) {
        return (
            <>
                <KeyboardAvoidingView style={styles.container}>
                    <Image source={require('../assets/background.jpg')} style={styles.image} />
                    <View style={styles.containerLogo}>
                        <Animated.Image
                            style={{
                                width: logo.x,
                                height: logo.y
                            }}
                            source={require('../assets/logo.png')}
                        />
                    </View>

                    <Animated.View style={[
                        styles.form,
                        {
                            opacity: opacity,
                            transform: [
                                {
                                    translateY: offset.y
                                }
                            ]
                        }
                    ]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.focus}
                            onFocus={() => {
                                let copyState = { ...input };
                                copyState.user = 1;
                                copyState.password = 0;
                                copyState.entrar = 0;
                                setInput(copyState);
                            }}
                            onPress={() => {
                                focusUser();
                            }}
                        >
                            <TextInput
                                // autoFocus={true}
                                ref={userRef}
                                selectionColor="#6333AF"
                                style={[input.user ? styles.inputFocus : styles.input, input.user ? styles.borderInput : null]}
                                placeholder="Usuário"
                                placeholderTextColor={"#fff"}
                                keyboardType="numeric"
                                autoCorrect={false}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    // userRef.current.blur();
                                    if (user) {
                                        focusPassword();
                                    }
                                }}
                                value={user}
                                onChangeText={(userChange) => {
                                    setUser(userChange)
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.focus}
                            onFocus={() => {
                                let copyState = { ...input };
                                copyState.password = 1;
                                copyState.user = 0;
                                copyState.entrar = 0;
                                setInput(copyState);
                            }}
                            onPress={() => {
                                focusPassword();
                            }}
                        >
                            <TextInput
                                ref={passwordRef}
                                selectionColor="#6333AF"
                                style={[input.password ? styles.inputFocus : styles.input, input.password ? styles.borderInput : null]}
                                placeholder="Senha"
                                placeholderTextColor={"#fff"}
                                keyboardType="numeric"
                                autoCorrect={false}
                                secureTextEntry={true}
                                returnKeyType="done"
                                blurOnSubmit={true}
                                value={password}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss;
                                    let copyState = { ...input };
                                    copyState.entrar = 1;
                                    copyState.password = 0;
                                    setInput(copyState);
                                    login();
                                }}
                                onChangeText={(password) => {
                                    setPassword(password)
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={input.entrar ? styles.buttonSubmitFocus : styles.buttonSubmit}
                            onPress={() => { login() }}
                            onFocus={() => {
                                let copyState = { ...input };
                                copyState.entrar = 1;
                                copyState.user = 0;
                                copyState.password = 0;
                                setInput(copyState);
                            }}>
                            {loading ?
                                <ActivityIndicator size={30} color={input.entrar ? "#fff" : '#351044'} /> :
                                <Text style={input.entrar ? styles.submitTextFocus : styles.submitText}>Entrar</Text>
                            }
                        </TouchableOpacity>
                    </Animated.View>
                </KeyboardAvoidingView>
            </>
        );
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6E6E6'
    },
    image: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center'
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 25
    },
    focus: {
        width: Platform.isTV ? '50%' : '90%',
        borderRadius: 7,
        marginBottom: 15
    },

    input: {
        backgroundColor: '#808080',
        width: '100%',
        color: '#fff',
        fontSize: 22,
        borderRadius: 7,
        padding: 10,
        opacity: 0.5,
        borderWidth: 2,
        borderColor: 'transparent'
    },
    inputFocus: {
        backgroundColor: '#808080',
        width: '100%',
        color: '#fff',
        fontSize: 22,
        borderRadius: 7,
        padding: 10,
        opacity: 0.5,
        borderWidth: 2,
        borderColor: '#fff'
    },
    borderInput: {
        borderWidth: 2,
        borderColor: '#fff'
    },
    buttonSubmit: {
        backgroundColor: '#fff',
        width: Platform.isTV ? '50%' : '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    buttonSubmitFocus: {
        backgroundColor: '#351044',
        width: Platform.isTV ? '50%' : '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor: "#fff"
    },
    submitTextFocus: {
        color: '#fff',
        fontSize: 19
    },
    submitText: {
        color: '#000',
        fontSize: 19
    }
});

export default memo(Login);