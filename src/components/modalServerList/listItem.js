/*
* @Author: Volynets Serhii
* @Date: 2018-10-16 19:09:55
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-17 11:39:12
* @flow
*/

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import type { _t_server } from '../../flow.types/servers';
import COLORS from '../../assets/styles/colors';
import FONTS from '../../assets/styles/fonts';
import ICON_TYPES from '../common/icon';
import Text from '../common/text';

const ListItem = ({ server, selected, onServerSelect }) => {
  const iconType = "ionicons";
  const SelectedIconComponents = ICON_TYPES[iconType];
  const [focusServerList, setFocusServerList] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container, focusServerList ? { backgroundColor: '#351044' } : null]}
      onPress={onServerSelect}
      onFocus={() => {
        setFocusServerList(true);
      }}
      onBlur={() => {
        setFocusServerList(false);
      }}
    >
      <View style={styles.serverBox}>
        {server.status ?
          <View style={styles.on}>
            <Text style={styles.onOffText}>ON</Text>
          </View> :
          <View style={styles.off}>
            <Text style={styles.onOffText}>OFF</Text>
          </View>
        }
        <Image
          style={styles.icon}
          source={server.icon}
        />
        <Text style={focusServerList ? styles.focusText : styles.text}>
          {server.title}
        </Text>
      </View>
      {selected
        ? (
          <SelectedIconComponents
            size={24}
            name="ios-checkmark-circle"
            style={styles.selectedCheckIcon}
            color={focusServerList ? "#fff" : "#351044"}
          />
        ) : <View style={styles.checkCircle} />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  serverBox: {
    flexDirection: "row",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 30,
    marginRight: 10,
  },
  text: {
    marginLeft: 20,
    color: "#000",
    fontFamily: FONTS.SF_Pro_Display_Regular,
    fontSize: 16,
  },
  focusText: {
    marginLeft: 20,
    color: "#fff",
    fontFamily: FONTS.SF_Pro_Display_Regular,
    fontSize: 16,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.altoLight,
    backgroundColor: COLORS.white,
    marginRight: 30,
  },
  selectedCheckIcon: {
    marginRight: 28,
  },
  off: {
    width: 35,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'red',
    marginLeft: 25
  },
  on: {
    width: 35,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#77dd77',
    marginLeft: 25
  },
  onOffText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default ListItem;
