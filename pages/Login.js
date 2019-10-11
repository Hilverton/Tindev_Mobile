import React, { useState, useEffect } from 'react';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage, KeyboardAvoidingView, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  //Não dá pra usar isso aqui no snack
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Index', { user: user });
      }
    })
  }, []);

  async function handleLogin() {
    const response = await api.post('/devs', { username: user });

    const { _id, avatar } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('username', user);
    await AsyncStorage.setItem('avatar', avatar);
    
    navigation.navigate('Index', { user: _id });
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttontext}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttontext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})