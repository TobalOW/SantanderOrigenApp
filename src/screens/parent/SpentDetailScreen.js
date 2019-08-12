// COMPONENT NO UTILIZADO

/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CircularProgress } from 'react-native-circular-progress';

import { Navbar, Block, Text, Card, Button } from '../../components';
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

export default class SpentDetailScreen extends Component {
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
    const category = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Navbar style={{ height: 150 }}>
          <Block row flex={1} padding={10}>
            <Block flex={false}>
              <MaterialIcons onPress={() => this.props.navigation.goBack()} name="arrow-back" style={{ fontSize: 20, color: theme.colors.primary }} />
            </Block>
            <Block flex={false} space="between" style={{ marginLeft: 15, marginTop: 3 }}>
              <Block flex={false}>
                <Text h2 bold black>{category}</Text>
              </Block>
              <Block flex={false}>
                <Text caption darkGray>Gastado</Text>
                <Text size={20} semibold black>{'$25.234'}</Text>
              </Block>
            </Block>
            <Block flex={1} style={{ alignItems: 'flex-end' }}>
              <CircularProgress
                size={90}
                fill={25}
                rotation={360}
                lineCap="round"
                width={5}
                tintColor={theme.colors.primary}
                backgroundColor={theme.colors.gray4}
                backgroundWidth={5}
              >
                {() => (
                  <Block center middle>
                    <Text h3 bold medium>25%</Text>
                  </Block>
                )}
              </CircularProgress>
            </Block>
          </Block>
        </Navbar>
        <Card margin={20} shadow height={90} flex={false}>
          <Block padding={20} row space="between">
            <Block middle column space="between" style={{ marginRight: 10 }}>
              <Text size={13} black>Máximo actual</Text>
              <Text size={19} black>{'$100.000'}</Text>
            </Block>
            <Block flex={false} right column>
              <Button
                style={{ borderColor: theme.colors.primary, borderWidth: 2, width: 85 }}
                onPress={() => this.props.navigation.navigate('modifyMax')}
              >
                <Text center primary>Modificar</Text>
              </Button>
            </Block>
          </Block>
        </Card>
        <Block>
          <Block flex={false} center margin={10}>
            <Text semibold black shadow size={16}>Historial de Gastos</Text>
          </Block>
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
