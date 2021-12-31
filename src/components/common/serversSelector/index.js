/*
* @Author: Volynets Serhii
* @Date: 2018-10-11 15:40:20
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-16 18:37:22
* @flow
*/
import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
  View,
  Alert
} from 'react-native';
import COLORS from '../../../assets/styles/colors';
import FONTS from '../../../assets/styles/fonts';
import type { _t_styles } from '../../../flow.types/reactElements';
import ICON_TYPES from '../icon';
import Text from '../text';

const ServersSelector = ({ onPress, focusServeView, focusServer, server, updateServers }) => {
  const iconType = "ionicons";
  const IconComponent = ICON_TYPES[iconType];
  return (
    <TouchableOpacity
      activeOpacity={Platform.isTV ? 1 : 0.2}
      style={[styles.container, focusServer ? null : styles.containerBackground]}
      onFocus={() => {
        focusServeView(true);
      }}
      onBlur={() => {
        focusServeView(false);
      }}
      onPress={() => {
        if (!updateServers) {
          onPress && onPress()
        }else{
          Alert.alert(
            "Servidores",
            "Aguarde os servidores serem atualizados.",
            [
                { text: "OK", onPress: () => { } }
            ]
        );
        }
      }}
    >
      {updateServers ?
        <View style={[styles.container, focusServer ? null : styles.containerBackground]}>
          <Text
            style={[focusServer ? styles.focusText : styles.text]}
          >
            Atualizando servidores
          </Text>
          <ActivityIndicator size={30} color={focusServer ? "#fff" : '#351044'} />
        </View> :
        <View style={[styles.container, focusServer ? null : styles.containerBackground]}>
          <Image
            style={styles.icon}
            source={server.icon}
          />
          <Text
            style={[focusServer ? styles.focusText : styles.text]}
          >
            {server.title}
          </Text>
          <IconComponent
            size={12}
            name="ios-arrow-down"
            color={focusServer ? "#fff" : "#000"}
          />
        </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: Platform.isTV ? '100%' : "100%",
    height: Platform.isTV ? 50 : 70,
    backgroundColor: '#351044',
    position: 'absolute',
    bottom: 0,
    borderWidth: 0.5,
    borderColor: "#fff"
  },
  containerBackground: {
    backgroundColor: '#fff'
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontFamily: FONTS.SF_Pro_Display_Regular,
    fontSize: 16,
    color: "#000",
    marginRight: 10,
    marginLeft: 20,
  },
  focusText: {
    fontFamily: FONTS.SF_Pro_Display_Regular,
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
    marginLeft: 20,
  },
  borderFocusServer: {
    borderWidth: 2,
    borderColor: '#009dcf'
  },
});

export default ServersSelector;
