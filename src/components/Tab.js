import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { Text } from './Text';
import { theme } from '../constants';

export default class Tab extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: this.props.firstName },
      { key: 'second', title: this.props.secondName },
    ],
  };

  handleIndexChange = index => this.setState({ index });

  renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = this.state.index === i ? 'white' : 'black';
          const bold = this.state.index === i;
          const backgroundColor = this.state.index === i ? theme.colors.primary : 'transparent';
          const borderRadius = this.state.index === i ? 25 : null;
          const flex = this.state.index === i ? 0.55 : 0.45;
          return (
            <TouchableOpacity
              style={[styles.tabItem, { backgroundColor, borderRadius, flex }]}
              onPress={() => this.setState({ index: i })}
            >
              <Text bold={bold} color={color}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderScene = SceneMap({
    first: this.props.FirstRoute,
    second: this.props.SecondRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}

Tab.defaultProps = {
  firstName: 'Primero',
  secondName: 'Segundo',
  FirstRoute: () => (
    <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
  ),
  SecondRoute: () => (
    <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 25,
    backgroundColor: theme.colors.gray4,
    height: 45
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
