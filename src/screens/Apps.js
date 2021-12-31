import React, { memo, useState, useEffect } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    Dimensions,
    TouchableOpacity,
    Text,
    Alert,
    ActivityIndicator
} from "react-native";
import COLORS from '../assets/styles/colors';
import { HEIGHT } from '../assets/styles/dimensions';
import { TEXTS } from '../config/text.constants';
import Image from '../components/common/image';
import Header from '../components/common/header';
import ServersSelector from '../components/common/serversSelector';
import ConnectionIndicator from '../components/common/connectionIndicator';
import ModalServerList from '../components/modalServerList';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';
import Ping from 'react-native-ping'
import servers from "../config/servers.constants";

const Apps = ({ navigation }) => {
    const [selectedServer, setSelectedServer] = useState([]);
    const [connection, setConnection] = useState('desconectado');
    const [animation, setAnimation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loop, setLoop] = useState(false);
    const [focusConnect, setFocusConnect] = useState(false);
    const [focusServer, setFocusServer] = useState(false);
    const [updateServers, setUpdateServers] = useState(true);
    const [serversList, setServersList] = useState(servers);
    var noMessage;

    useEffect(() => {
        onOffServers();
    }, []);

    useEffect(() => {
        state();
    }, [animation]);

    const focusServeView = (condition) => {
        if (condition) {
            setFocusServer(true);
        } else {
            setFocusServer(false);
        }
    }

    const onOffServers = () => {
        let s = [...serversList];
        setSelectedServer(s[0]);
        s.map(async (r, i) => {
            try {
                await Ping.start(r.ip, { timeout: 1000 });
                s[i].status = true
            } catch (error) {
                s[i].status = false
            }

            if ((i + 1) === s.length) {
                setServersList(s);
                setUpdateServers(false)
            }
        });
    }

    const observeVpn = async () => {
        await addVpnStateListener((e) => {
            if (e.state === 0) {
                setConnection('desconectado');
                setLoop(false);
                animation.play(87, 87);
                AsyncStorage.setItem('state', '0');
                if (noMessage) {
                    Alert.alert(
                        "Conexão",
                        "Não foi possível conectar ao servidor, tente novamente ou escolha outro servidor.",
                        [
                            { text: "OK", onPress: () => { } }
                        ]
                    );
                }
            }
            else if (e.message === 'ASSIGN_IP' && connection !== 'conectado') {
                setConnection('conectado');
                setLoop(false);
                animation.play(150, 150);
                AsyncStorage.setItem('state', '1');
                noMessage = false;
            }
        });
    }

    const state = async () => {
        var value = await AsyncStorage.getItem('state')
        if (value === '1') {
            setConnection('conectado');
            setLoop(false);
            animation.play(150, 150);
        } else {
            setConnection('desconectado');
            setLoop(false);
            animation.play(87, 87);
        }
    }

    const startOvpn = async () => {
        if (selectedServer.status) {
            try {
                observeVpn();
                setLoop(true);
                setConnection('conectando')
                animation.play(0, 87);
                noMessage = true;
                await RNSimpleOpenvpn.connect({
                    remoteAddress: '',
                    ovpnFileName: selectedServer.server,
                    assetsPath: '',
                    providerBundleIdentifier: 'com.vpn',
                    localizedDescription: 'RNSimpleOvpn',
                });
            } catch (error) {
                console.log(error.message)
            }
        } else {
            Alert.alert(
                "Servidor",
                "Este servidor está offline no momento, escolha outro servidor.",
                [
                    { text: "OK", onPress: () => { } }
                ]
            );
        }
    }

    const stopOvpn = async () => {
        try {
            AsyncStorage.setItem('state', '0');
            animation.play(0, 87);
            noMessage = false;
            setConnection('desconectado');
            await RNSimpleOpenvpn.disconnect();
        } catch (error) {
            console.log(error)
        }
    }

    const onServerClick = () => {
        setModalVisible(true);
    }

    const onServerSelect = (selectedServer) => {
        if (connection === 'conectado') {
            stopOvpn();
        }
        setSelectedServer(selectedServer);
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <ModalServerList
                visible={modalVisible}
                selectedServer={selectedServer}
                onServerSelect={onServerSelect}
                servers={servers}
                updateServers={updateServers}
            />
            <Image source={require('../assets/background.jpg')} style={styles.image} />
            <ScrollView
                keyboardShouldPersistTaps="never"
                contentContainerStyle={styles.contentContainer}
            >
                <Header
                    style={styles.header}
                    title={TEXTS.HOME_CONNECTED.HEADER.TITLE}
                />
                <View style={styles.mainLayer}>
                    <ConnectionIndicator
                        status={connection === 'desconectado' || connection === 'conectando' ? false : true}
                    />
                    <LottieView
                        ref={animation => {
                            setAnimation(animation);
                        }}
                        loop={loop}
                        source={require('../assets/lottie/on-off.json')}
                        style={styles.connectedImage}
                    />
                    <TouchableOpacity
                        activeOpacity={Platform.isTV ? 1 : 0.2}
                        style={[focusConnect ? styles.focusConnectedButton : styles.connectedButton]}
                        onFocus={() => {
                            setFocusConnect(true);
                        }}
                        onBlur={() => {
                            setFocusConnect(false);
                        }}
                        onPress={connection === 'conectando' ? null : connection === 'desconectado' ? startOvpn : stopOvpn}
                    >
                        <Text style={focusConnect ? styles.focusConnectedButtonText : styles.connectedButtonText}>{connection === 'conectando' ? 'Conectando...'.toUpperCase() : connection === 'desconectado' ? TEXTS.HOME_DISCONNECTED.SCREEN.CONNECT_BUTTON.toUpperCase() : TEXTS.HOME_CONNECTED.SCREEN.DISCONNECT_BUTTON.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <ServersSelector
                server={selectedServer}
                onPress={onServerClick}
                focusServeView={focusServeView}
                focusServer={focusServer}
                updateServers={updateServers}
            />
            {modalVisible && <View style={styles.modalBG} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    image: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    modalBG: {
        width: '100%',
        height: Platform.OS === 'ios' ? HEIGHT : HEIGHT - 24,
        position: "absolute",
        backgroundColor: COLORS.midnight,
        opacity: 0.1,
    },
    contentContainer: {
        minHeight: Platform.OS === 'ios' ? HEIGHT : HEIGHT - 24,
        maxHeight: Platform.OS === 'ios' ? HEIGHT : HEIGHT - 24,
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 52 : 22,
        backgroundColor: 'transparent',
        color: '#fff'
    },
    mainLayer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectedImage: {
        width: 120,
        height: 120,
        marginTop: 30,
        marginBottom: 90
    },
    connectedButton: {
        backgroundColor: "#fff",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    focusConnectedButton: {
        backgroundColor: "#351044",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: "#fff"
    },
    focusConnectedButtonText: {
        color: '#fff',
    },
    connectedButtonText: {
        color: '#000',
    },
    serverFocus: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#000',
        top: 0,
        zIndex: 10,
        opacity: 0.8,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default memo(Apps);