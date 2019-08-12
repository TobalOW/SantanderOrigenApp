// DUMMY COMPONENT, NO ES USADO POR QUE SU SECCION SE RETIRÓ

/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Navbar, Block, Text } from '../../components';
import { theme } from '../../constants';

const data = [
  { id: 1, shopName: 'uber eats', date: '06/07/19 a las 14:00', category: 'Almuerzos', value: '-$8.000' },
  { id: 1, shopName: 'mercadopago cl comp', date: '02/07/19 a las 9:00', category: 'Otros', value: '-$129.000' },
  { id: 1, shopName: 'jumbo costanera center', date: '30/06/19 a las 20:00', category: 'Mercadería', value: '-$80.000' },
  { id: 1, shopName: 'taxibeat', date: '28/06/19 a las 00:00', category: 'Otros', value: '-$12.500' },
  { id: 1, shopName: 'uber eats', date: '28/06/19 a las 14:00', category: 'Almuerzos', value: '-$7.000' },
  { id: 1, shopName: 'rappi', date: '26/06/19 a las 13:00', category: 'Almuerzos', value: '-$5.500' },
  { id: 1, shopName: 'jumbo costanera center', date: '20/06/19 a las 21:30', category: 'Mercadería', value: '-$149.000' },
  { id: 1, shopName: 'Almacen Near', date: '15/06/19 a las 21:30', category: 'Mercadería', value: '-$99.990' },
];

export default class MovementsDetailScreen extends Component {
  transparentCard(movement) {
    return (
      <Block style={{ height: 90 }} column padding={[10, 30]}>
        <Block flex={false} row>
          <Block column flex={1}>
            <Text size={14} black>{movement.shopName.toUpperCase()}</Text>
            <Text size={13} darkGray>{movement.date}</Text>
          </Block>
          <Block column middle style={{ alignItems: 'flex-end', marginTop: 3 }} flex={false}>
            <Text size={13} darkGray>{movement.value}</Text>
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
            </Block>
          </Block>
        </Navbar>
        <Block flex={1} style={{ marginTop: 15 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => this.transparentCard(item)}
          />
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
