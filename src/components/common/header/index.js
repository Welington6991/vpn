/*
* @Author: Volynets Serhii
* @Date: 2018-10-12 14:46:06
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-12 15:56:29
* @flow
*/
import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import type { _t_styles } from 'src/flow.types/reactElements';
import COLORS from '../../../assets/styles/colors';
import Text from '../text';
import ICON_TYPES from '../icon';
import styles from './styles';

const Header = ({ leftIconName, leftIconType, leftIconColor, leftIconSize, onLeftIconPress, rightIconName, rightIconType, rightIconColor, rightIconSize, onRightIconPress, leftText, onLeftTextPress, title, onTitlePress, rightText, onRightTextPress, style }) => {
  const LeftIconComponent = leftIconName ? ICON_TYPES[leftIconType || "ionicons"] : null;
  const RightIconComponent = rightIconName ? ICON_TYPES[rightIconType || "ionicons"] : null;

  return (
    <View
      style={[styles.container, style]}
    >
      <View style={styles.leftCol}>
        {!!leftIconName && (
          <TouchableOpacity
            onPress={onLeftIconPress}
          >
            {!!LeftIconComponent && (
              <LeftIconComponent
                name={leftIconName}
                color={leftIconColor || COLORS.black}
                size={leftIconSize || 26}
              />
            )}
          </TouchableOpacity>
        )}
        {!!leftText && (
          <TouchableOpacity
            onPress={onLeftTextPress}
          >
            <Text style={styles.leftColText}>
              {leftText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerCol}>
        {!!title && (
          <Text style={styles.centerColText}>
            {title}
          </Text>
        )}
      </View>
      <View style={styles.rightCol}>
        {!!rightText && (
          <TouchableOpacity
            onPress={onRightTextPress}
          >
            <Text style={styles.rightColText}>
              {rightText}
            </Text>
          </TouchableOpacity>
        )}
        {!!rightIconName && (
          <TouchableOpacity
            onPress={onRightIconPress}
          >
            {!!RightIconComponent && (
              <RightIconComponent
                name={rightIconName}
                color={rightIconColor || COLORS.black}
                size={rightIconSize || 26}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>

  );
};

export default Header;
