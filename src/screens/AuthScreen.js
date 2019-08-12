/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import { Button, Input, Block, Text } from '../components';
import { theme } from '../constants';
import { services } from '../services';

export default class AuthScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    email: 'Mizgier@SantanderFamilia.cl',
    password: 'marga123',
    errors: [],
    loading: false,
  }

  handleLogin() {
    // EL LOGIN DE LA APLICACION ESTA HARDCODEADO
    // RUT: '192093227', PASSWORD: '123123'
    const { navigation } = this.props;
    this.setState({
      loading: true,
      errors: []
    });
    services.loginAccount({ rut: '192093227', password: '123123' })
      .then(async(res) => {
        if (res.data.status === 'success') {
          await AsyncStorage.setItem('@localStorage:token', res.data.token);
          this.setState({
            loading: false
          });
          navigation.navigate('parentApp');
        } else {
          this.setState({
            loading: false,
            errors: ['password']
          });
        }
      });
  }
  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;

    // Comprobacion de algun error en el login
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block center middle flex={false} margin={[40, 0]}>
            <Text h1 bold>Santander Familia</Text>
          </Block>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          <Button gradient startColor='#cd2324' endColor='#ff6661' onPress={() => this.handleLogin()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Ingresar</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Olvidaste Contraseña?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
});
