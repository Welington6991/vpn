/*
* @Author: Volynets Serhii
* @Date: 2018-10-11 15:48:25
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-11 15:53:05
* @flow
*/

import * as React from 'react';

/* MODULES */
import { Text } from 'react-native';

const FCText = ({children, style}) => {
  return (
    <Text
      allowFontScaling={false}
      style={style}
    >
      {children}
    </Text>
  );
};

export default FCText;
