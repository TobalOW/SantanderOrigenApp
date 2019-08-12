import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../constants';
import Block from './Block';

const HEIGHT_BAR = 20;

class Progress extends Component {
  render() {
    const { startColor, endColor, value, opacity, style, ...props } = this.props;

    return (
      <Block flex={false} row center color="gray3" style={[styles.background, styles]} {...props}>
        <LinearGradient
          end={{ x: 1, y: 0 }}
          style={[styles.overlay, { flex: value }]}
          colors={[startColor, endColor]}
        />
      </Block>
    );
  }
}

Progress.defaultProps = {
  startColor: theme.colors.primary,
  endColor: theme.colors.endGradient,
  value: 0.75,
};

export default Progress;

const styles = StyleSheet.create({
  background: {
    height: HEIGHT_BAR,
    borderRadius: theme.sizes.radius / 2,
    backgroundColor: '#E7E7EA'
  },
  overlay: {
    height: HEIGHT_BAR,
    borderRadius: theme.sizes.radius / 2,
  },
  active: {
    height: HEIGHT_BAR,
    borderRadius: theme.sizes.radius / 2,
  }
});
