/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import Block from './Block';
import { theme } from '../constants';

export default class Navbar extends Component {
  render() {
    const { children, style, ...props } = this.props;
    const cardStyles = [
      styles.card,
      style
    ];
    return (
      <Block style={cardStyles} shadow flex={false} {...props}>
        {children}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    paddingTop: theme.topBar,
    borderBottomLeftRadius: theme.sizes.radius,
    borderBottomRightRadius: theme.sizes.radius,
    paddingLeft: theme.sizes.base,
    paddingRight: theme.sizes.base,
    paddingBottom: theme.sizes.base,
    height: theme.window.height * 0.22,
    backgroundColor: theme.colors.white
  },
});
