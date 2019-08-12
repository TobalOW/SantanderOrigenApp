// THIS SECTION OF THE APP WOULD BE HIDDEN

/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

import { Navbar, Block, Text, Card, Button, Progress } from '../../components';
import { theme } from '../../constants';

const data = [
  { name: 'Mercaderiaasdasd', population: 10000, color: '#ff0000', legendFontColor: theme.colors.black, legendFontSize: 10 },
  { name: 'Transporte', population: 20000, color: '#FFCC33', legendFontColor: theme.colors.black, legendFontSize: 10 },
  { name: 'Ahorro', population: 30000, color: '#63ba68', legendFontColor: theme.colors.black, legendFontSize: 10 },
  { name: 'Recreacion', population: 25000, color: '#18b4bc', legendFontColor: theme.colors.black, legendFontSize: 10 },
  { name: 'Otros', population: 15000, color: '#3366ff', legendFontColor: theme.colors.black, legendFontSize: 10 },
  { name: 'Otros', population: 15000, color: '#3366ff', legendFontColor: theme.colors.black, legendFontSize: 10 },
  { name: 'Otros', population: 15000, color: '#3366ff', legendFontColor: theme.colors.black, legendFontSize: 10 }
];

const data2 = [
  { id: 1, name: 'Almuerzo', budget: 100000, current: '64.000', value: 0.5 },
  { id: 2, name: 'Transporte', budget: 100000, current: '23.000', value: 0.8 },
  { id: 3, name: 'Mercadería', budget: 150000, current: '90.000', value: 1 },
  { id: 3, name: 'Vestimenta', budget: 180000, current: '45.000', value: 0.3 },
  { id: 4, name: 'Otros', current: '134.000' },
];

const chartConfig = {
  backgroundGradientFrom: theme.colors.primary,
  backgroundGradientTo: theme.colors.endGradient,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};


export default class BagScreen extends Component {
  firstRoute() {
    return (
      <ScrollView style={{ flex: 1, paddingTop: 2 }}>
        <Card margin={[0, 18]} shadow height={310}>
          <Block flex={1} padding={20}>
            <Text center semibold black>Resumen de gastos - Agosto 2019</Text>
            <PieChart
              data={data}
              width={300}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
            <Button
              style={{ height: 35 }}
              bigShadow
              color={theme.colors.primary}
              onPress={() => this.props.navigation.navigate('detailMovements')}
            >
              <Text white size={13} bold center >Ver todos los movimientos</Text>
            </Button>
          </Block>
        </Card>
        {data2.map((k) => this.renderCards(k))}
      </ScrollView>
    );
  }

  renderCards = card => {
    if (!card.value || !card.budget) {
      return (
        <Card height={90} pressable onPress={() => this.props.navigation.navigate('resume')} margin={[2, 18]} shadow key={`card-${card.id}`}>
          <Block padding={20}>
            <Block flex={false} row middle space="between">
              <Text black>{card.name}</Text>
              <MaterialIcons name="chevron-right" style={{ fontSize: 20, color: theme.colors.primary }} />
            </Block>
            <Block flex={false}>
              <Text darkGray size={11}>{'Gastado'}</Text>
            </Block>
            <Block flex={false}>
              <Block row flex={false} space="between" style={{ alignItems: 'flex-end', marginBottom: 5 }}>
                <Block flex={false} row style={{ alignItems: 'flex-end' }}>
                  <Text h3 bold>${card.current}</Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Card>
      );
    }
    return (
      <Card pressable onPress={() => this.props.navigation.navigate('detailSpent', card.name)} margin={[2, 18]} shadow key={`card-${card.id}`}>
        <Block padding={20}>
          <Block flex={false} row middle space="between">
            <Text black>{card.name}</Text>
            <MaterialIcons name="chevron-right" style={{ fontSize: 20, color: theme.colors.primary }} />
          </Block>
          <Block flex={false}>
            <Text darkGray size={11}>{'Gastado'}</Text>
          </Block>
          <Block flex={false}>
            <Block row flex={false} space="between" style={{ alignItems: 'flex-end', marginBottom: 5 }}>
              <Block flex={false} row style={{ alignItems: 'flex-end' }}>
                <Text h3 bold>${card.current}</Text>
                <Text darkGray style={{ marginLeft: 10 }} size={13}>{(card.current * 100000) / card.budget}%</Text>
              </Block>
              <Block flex={false} row>
                <Block flex={false}>
                  <Text darkGray size={11} right>{'Máximo'}</Text>
                  <Text darkGray size={13} right>${card.budget}</Text>
                </Block>
              </Block>
            </Block>
          </Block>
            <Block flex={false}>
              <Progress
                value={(card.current * 1000) / card.budget}
              />
            </Block>
        </Block>
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar style={{ height: 90 }}>
          <Block row flex={1} padding={10}>
            <Block middle flex={false} pressable onPress={() => this.props.navigation.openDrawer()}>
              <MaterialIcons name="menu" style={{ fontSize: 20, color: theme.colors.primary }} />
            </Block>
            <Block flex={false} style={{ marginLeft: 15, marginTop: 3 }}>
              <Text h2 bold black>Nicolás</Text>
              <Text h2 bold black>Perez</Text>
            </Block>
            <Block center bigShadow style={{ alignItems: 'flex-end' }}>
              <LinearGradient
                end={{ x: 1, y: 0.5 }}
                start={{ x: 0, y: 0.5 }}
                style={styles.overlay}
                colors={['#EA1D25', '#FF1E1E']}
              >
                <Block center middle>
                  <Text bold white>{'$1.000.540'}</Text>
                  <Text caption white>{'Saldo Actual'}</Text>
                </Block>
              </LinearGradient>
            </Block>
          </Block>
        </Navbar>
        <Block padding={5}>
          <Block flex={false} center margin={10}>
            <Text semibold black shadow size={16}>Categorización de Gastos - Agosto 2019</Text>
          </Block>
          <Block flex={1}>
            {this.firstRoute()}
          </Block>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  overlay: {
    height: 50,
    width: 130,
    borderRadius: 20,
  },
});
