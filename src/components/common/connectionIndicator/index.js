/*
* @Author: Volynets Serhii
* @Date: 2018-10-12 16:10:50
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-12 16:37:25
* @flow
*/
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import type { _t_styles } from '../../../flow.types/reactElements';
import COLORS from '../../../assets/styles/colors';
import FONTS from '../../../assets/styles/fonts';
import { INDICATOR_STATUS } from '../../../config/text.constants';
import Text from '../text';

const Button = ({status, style, titleStyle}) => {

  return (
    <View
      style={[styles.container, style]}
    >
      <Text
        style={[styles.text, titleStyle]}
      >
        {status ? INDICATOR_STATUS.CONNECTED : INDICATOR_STATUS.DISCONNECTED}
      </Text>
      <View style={[styles.indicator, status && styles.indicatorConnected]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    borderRadius: 19,
    borderWidth: 1,
    width: 120,
    height: 36,
    backgroundColor: COLORS.whiteDark,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 1,
    flexDirection: "row",
  },
  text: {
    fontFamily: FONTS.SF_Pro_Display_Medium,
    fontSize: 13,
    color: COLORS.osloGray,
  },
  indicator: {
    backgroundColor: COLORS.alto,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
  },
  indicatorConnected: {
    backgroundColor: COLORS.brightGreen,
  },
});

export default Button;
