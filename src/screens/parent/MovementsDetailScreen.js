/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import { Navbar, Block, Text } from '../../components';
import { theme } from '../../constants';
import { toClp } from '../../utils';
import { services } from '../../services';


export default class MovementsDetailScreen extends Component {
  state = {
    child: null,
    details: null
  }

  async componentWillMount() {
    this.setState({
      child: this.props.navigation.state.params
    });
    // Obtener token y guardarlo en variable del componente
    const token = await AsyncStorage.getItem('@localStorage:token');
    services.getDetailsChild(this.state.child.id, token)
      .then(res => {
        this.setState({
          details: res.data.data
        });
      })
      .catch(err => console.log(err));
  }

  keyExtractor = (item, index) => index.toString();

  transparentCard(movement) {
    return (
      <Block style={{ height: 90 }} column padding={[10, 30]} >
        <Block flex={false} row>
          <Block column flex={1}>
            <Text size={14} black>{movement.title.toUpperCase()}</Text>
            <Text size={13} darkGray>
              {
                moment(
                  movement.date
                )
                .utcOffset(-8)
                .format('DD/MM/YYYY [a las] HH:mm')
              }
            </Text>
          </Block>
          <Block column middle style={{ alignItems: 'flex-end', marginTop: 3 }} flex={false}>
            <Text size={13} darkGray>{toClp(movement.ammount)}</Text>
          </Block>
        </Block>
        <Block flex={false} style={{ backgroundColor: '#979797', height: 1 }} margin={[5, 0]} />
        <Block>
          <Text size={11} darkGray>{movement.category}</Text>
        </Block>
      </Block>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar style={{ height: 90 }}>
          <Block row flex={1} padding={10}>
            <Block middle flex={false}>
              <MaterialIcons
                name="arrow-back"
                style={{ fontSize: 20, color: theme.colors.primary }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Block>
            <Block flex={false} style={{ marginLeft: 15, marginTop: 3 }}>
              <Text h2 bold black>Detalle de Movimientos</Text>
              <Text h2 bold black>Cristóbal</Text>
            </Block>
          </Block>
        </Navbar>
        <Block flex={1} style={{ marginTop: 15 }}>
          {
            this.state.details ?
            <FlatList
              data={this.state.details}
              renderItem={({ item }) => this.transparentCard(item)}
              keyExtractor={this.keyExtractor}
            />
            :
            <ActivityIndicator sieze="large" color={theme.colors.primary} />

          }

        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
