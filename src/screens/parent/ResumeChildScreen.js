/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PieChart } from 'react-native-chart-kit';


import { Navbar, Block, Text, Card, Button, Progress } from '../../components';
import { theme } from '../../constants';
import { toClp, objExpenses } from '../../utils';
import { services } from '../../services';

const chartConfig = {
  backgroundGradientFrom: theme.colors.primary,
  backgroundGradientTo: theme.colors.endGradient,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};

export default class ResumeChildScreen extends Component {
  state = {
    child: null,
    expenses: null
  }

  async componentWillMount() {
    this.setState({
      child: this.props.navigation.state.params
    });
    // Obtener token y guardarlo en variable del componente
    const token = await AsyncStorage.getItem('@localStorage:token');
    services.getExpensesChild(this.state.child.id, token)
      .then(res => {
        const result = objExpenses(res.data.data.expenses);
        this.setState({
          expenses: result
        });
      })
      .catch(err => console.log(err));
  }

  firstRoute() {
    return (
      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        <Card margin={[0, 18]} shadow height={310}>
          <Block flex={1} padding={20}>
            <Text center semibold black>Resumen de gastos - Agosto 2019</Text>
            {
              this.state.expenses ?
              <PieChart
                data={this.state.expenses}
                width={300}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              /> :
              <ActivityIndicator sieze="large" color={theme.colors.primary} />
            }

            <Button
              style={{ height: 35 }}
              bigShadow
              color={theme.colors.primary}
              onPress={() => this.props.navigation.navigate('detail', this.state.child)}
            >
              <Text white size={13} bold center >Ver todos los movimientos</Text>
            </Button>
          </Block>
        </Card>
        <Card margin={[0, 18]} shadow height={200}>
          <Block padding={20} row space="between">
            <Block middle column space="between" style={{ marginRight: 10 }}>
              <Text black>Mesada</Text>
              <Text size={20} black>{toClp(this.state.child.monthlyPayment)}</Text>
              <Text darkGray>Proxima mesada para el</Text>
              <Text primary>5 de Septiembre</Text>
            </Block>
            <Block flex={false} middle right column>
              <Button
                style={{ borderColor: theme.colors.primary, borderWidth: 2, width: 80 }}
                onPress={() => this.props.navigation.navigate('modifyMesadaFamily')}
              >
                <Text center primary>Modificar</Text>
              </Button>
            </Block>
          </Block>
          <Block padding={20}>
            <Text darkgray caption>{'Gastado'}</Text>
            <Block row margin={[5, 0]}>
              <Text black bold>{toClp(this.state.child.expenses)}</Text>
              <Text darkGray style={{ marginLeft: 10 }}>{parseInt((this.state.child.expenses / this.state.child.monthlyPayment) * 100, 10)} %</Text>
            </Block>
            <Progress
              value={(this.state.child.expenses / this.state.child.monthlyPayment)}
            />
          </Block>
        </Card>
      </ScrollView>
    );
  }
  secondRoute() {
    return (
      <ScrollView style={{ flex: 1, paddingTop: 10 }}>
        <Block padding={[0, 20]} row>
          <Card margin={[0, 10]} shadow height={130}>
            <Block flex={1} column center middle>
              <Text black>Último depósito</Text>
              <Text bold black h3>{'$5.000'}</Text>
              <Text caption gray3>Hace <Text primary>7</Text> días</Text>
            </Block>
          </Card>
          <Card margin={[0, 10]} shadow height={130}>
            <Block flex={1} column center middle>
              <Text black>En: DAP 3</Text>
              <Text bold black h3>{'$155.000'}</Text>
              <Text caption gray3 center>Listo para retirar el: <Text caption primary>08/09/19</Text></Text>
            </Block>
          </Card>
        </Block>
        <Block padding={[0, 20]}>
          <Card margin={[0, 10]} shadow height={100}>
            <Block padding={20} flex={1} column>
              <Block>
                <Text black>Depósito a Plazo 1</Text>
              </Block>
              <Block row space="around">
                <Block>
                  <Text bold black h3>{'$25.234'}</Text>
                </Block>
                <Block>
                  <Text gray3 size={12} right>Listo para retirar el:</Text>
                  <Text primary caption right>21/12/19</Text>
                </Block>
              </Block>
            </Block>
          </Card>
        </Block>
        <Block padding={[0, 20]}>
          <Card margin={[0, 10]} shadow height={100}>
            <Block padding={20} flex={1} column>
              <Block>
                <Text black>Depósito a Plazo 2</Text>
              </Block>
              <Block row space="around">
                <Block>
                  <Text bold black h3>{'$85.250'}</Text>
                </Block>
                <Block>
                  <Text gray3 size={12} right>Listo para retirar el:</Text>
                  <Text primary caption right>18/10/19</Text>
                </Block>
              </Block>
            </Block>
          </Card>
        </Block>
        <Block padding={[0, 20]}>
          <Card margin={[0, 10]} shadow height={100}>
            <Block padding={20} flex={1} column>
              <Block>
                <Text black>Depósito a Plazo 3</Text>
              </Block>
              <Block row space="around">
                <Block>
                  <Text bold black h3>{'$95.000'}</Text>
                </Block>
                <Block>
                  <Text gray3 size={12} right>Listo para retirar el:</Text>
                  <Text primary caption right>11/10/19</Text>
                </Block>
              </Block>
            </Block>
          </Card>
        </Block>
      </ScrollView>
    );
  }
  render() {
    const child = this.state.child;
    return (
      <View style={styles.container}>
        <Navbar style={{ height: 120 }}>
          <Block row flex={1} padding={10}>
            <Block flex={false}>
              <MaterialIcons onPress={() => this.props.navigation.goBack()} name="arrow-back" style={{ fontSize: 20, color: theme.colors.primary }} />
            </Block>
            <Block style={{ marginLeft: 15 }}>
              <Block flex={false}>
                <Text h2 bold black>{child.first_name} {child.last_name}</Text>
              </Block>
              <Block row style={{ marginTop: 8 }}>
                <Block flex={false}>
                  <Text black semibold size={16}>{'Saldo'}</Text>
                  <Text green size={16} bold style={{ marginTop: 8 }} >+{toClp(child.ammount)}</Text>
                </Block>
                <Block flex={false} style={{ marginLeft: 60 }}>
                  <Text black semibold size={16}>{'Gastos'}</Text>
                  <Text primary bold size={16} style={{ marginTop: 8 }}>-{toClp(child.expenses)}</Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Navbar>
        {this.firstRoute()}
        {
          // ESTAS TABS FUERON CUSTOMIZADAS PERO NO USADAS EN ESTE COMPONENTE

          // <Tab
          // firstName={'Resumen'}
          // secondName={'Ahorros'}
          // FirstRoute={this.firstRoute.bind(this)}
          // SecondRoute={this.secondRoute.bind(this)}
          // />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
