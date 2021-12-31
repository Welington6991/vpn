/*
* @Author: Volynets Serhii
* @Date: 2018-10-11 15:40:20
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-11 17:22:12
* @flow
*/
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import COLORS from '../../../assets/styles/colors';
import FONTS from '../../../assets/styles/fonts';
import type { _t_styles } from '../../../flow.types/reactElements';
import Text from '../text';

const Button = ({onPress, title, style, titleStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress && onPress()}
    >
      <Text
        style={[styles.text, titleStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    borderRadius: 19,
    borderWidth: 1,
    width: 185,
    height: 38,
    backgroundColor: COLORS.azureRadiance,
  },
  text: {
    fontFamily: FONTS.SF_Pro_Display_Bold,
    fontSize: 12,
    color: COLORS.white,
  },
});

export default Button;
