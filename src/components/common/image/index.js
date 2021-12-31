/*
* @Author: Volynets Serhii
* @Date: 2018-10-11 15:01:34
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-11 15:03:19
* @flow
*/

import * as React from 'react';
import { Image } from 'react-native';

const FCImage = ({children, style, source, resizeMode}) => {
  return (
    <Image style={style} source={source} resizeMode={resizeMode}>
      {children}
    </Image>
  );
};

export default FCImage;
