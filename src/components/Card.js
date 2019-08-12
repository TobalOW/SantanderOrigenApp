import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';
import { theme } from '../constants';

export default class Card extends Component {
  render() {
    const { color, style, children, pressable, onPress, padding, height, ...props } = this.props;
    const cardStyles = [
      styles.card,
      height && { height },
      style,
    ];
    return (
      <Block padding={padding} pressable={pressable} onPress={onPress} color={color || theme.colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    );
  }
}

export const styles = StyleSheet.create({
  //default styles
  card: {
    borderRadius: theme.sizes.radius / 2,
    marginBottom: theme.sizes.base,
    height: theme.window.height * 0.18,
  },
});
