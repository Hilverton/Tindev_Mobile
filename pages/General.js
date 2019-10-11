import React, { useState, useEffect } from 'react';
import { AsyncStorage, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';

export default function General({ navigation }) {
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const route = navigation.state.key.toLowerCase();
  const buttonActive = route !== 'matchs' ? true : false;

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        setId(user);
      }
    })
  }, []);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get(`/${route}`, {
        headers: {
          user: id,
        }
      })
      
      setUsers(response.data);
    }

    loadUsers();
  }, [route, id, users]);

  async function handleClick(idClick) {
    const response = await api.post(`/devs/${idClick}/remove-${route}`, null, {
      headers: { user: id },
    });
    setUsers(response.data);
  }

  return (
    <ScrollView style={styles.container} >
      <TouchableOpacity>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      {
        users.length === 0 &&  
          <View style={styles.viewEmpty}>
            <Text style={styles.empty}>Acabou :(</Text> 
          </View>
      }

      {
        users.map(user => (
          <>
            <View style={styles.cardsContainer}>
              <View key={user._id} style={styles.card}>
                <Image style={styles.avatar} source={{uri: user.avatar}} />
                <View style={styles.footer}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                </View>
              </View>
            </View>
            {
              buttonActive && (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => handleClick(user._id)}>
                    <Image source={dislike} />
                  </TouchableOpacity>
                </View>
              )
            }
          </>
        ))
      }
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  logo: {
    marginTop: 30,
    alignSelf: 'center',
  },

  viewEmpty: {
    height: 601,
    justifyContent: 'center',
  },

  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bolf',
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  avatar: {
    flex: 1,
    height: 300,
  },

  footer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
  },

})