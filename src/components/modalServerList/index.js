/*
* @Author: Volynets Serhii
* @Date: 2018-10-16 15:09:27
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-17 10:42:26
* @flow
*/
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import type { _t_server } from '../../flow.types/servers';
import COLORS from '../../assets/styles/colors';
import FONTS from '../../assets/styles/fonts';
import { TEXTS } from '../../config/text.constants';
import Text from '../common/text';
import ListItem from './listItem';

const ModalServerList = ({ visible, selectedServer, onServerSelect, servers }) => {
  const selectedServerTitle = selectedServer ? selectedServer.title : null;

  const getlist = () => (
    servers.map((r, i) => (
        <ListItem
          server={r}
          key={i}
          selected={(selectedServerTitle === r.title)}
          onServerSelect={() => onServerSelect && onServerSelect(r)}
        />
      ))
  );

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => onServerSelect && selectedServer && onServerSelect(selectedServer)}
    >
      <View style={styles.serversBox}>
        <Text style={styles.headerText}>
          {TEXTS.SERVERS_LIST.HEADER.TITLE}
        </Text>
        <ScrollView style={{ width: '100%' }}>
          {getlist()}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  serversBox: {
    flex: 1,
    backgroundColor: COLORS.whiteDark,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontFamily: FONTS.OpenSans_Bold,
    fontSize: 16,
    fontWeight: 'bold',
    height: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  }
});

export default ModalServerList;
