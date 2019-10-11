import React, { useState, useEffect } from 'react';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DrawerComponent({ navigation, activeItemKey }) {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');


  useEffect(() => {
    AsyncStorage.getItem('username').then(user => {
      if (user) {
        setUsername(user);
      }
    });
    AsyncStorage.getItem('avatar').then(avt => {
      if (avt) {
        setAvatar(avt);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.user}>{username}</Text>
      </View>

      <View style={styles.screenContainer}>
        <TouchableOpacity 
          style={[styles.screenStyle , (activeItemKey=='Index') ? { backgroundColor: '#DF4723' } : null]} 
          onPress={() => navigation.navigate('Index')}
        >
          <Text style={[styles.textRoute, (activeItemKey=='Index') ? { color: '#fff' } : { color: '#DF4723' }]}>Index</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.screenStyle , (activeItemKey=='Likes') ? { backgroundColor: '#DF4723' } : null]} 
          onPress={() => navigation.navigate('Likes')} 
        >
          <Text style={[styles.textRoute, (activeItemKey=='Likes') ? { color: '#fff' } : { color: '#DF4723' }]}>Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.screenStyle , (activeItemKey=='Dislikes') ? { backgroundColor: '#DF4723' } : null]} 
          onPress={() => navigation.navigate('Dislikes')}
        >
          <Text style={[styles.textRoute, (activeItemKey=='Dislikes') ? { color: '#fff' } : { color: '#DF4723' }]}>Dislikes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.screenStyle , (activeItemKey=='Matchs') ? { backgroundColor: '#DF4723' } : null]} 
          onPress={() => navigation.navigate('Matchs')}
        >
          <Text style={[styles.textRoute, (activeItemKey=='Matchs') ? { color: '#fff' } : { color: '#DF4723' }]}>Match</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  headerContainer: {
    alignItems: 'center', 
    marginTop: -110,
    marginBottom: 40,
  },

  avatar: {
    height: 125,
    width: 125,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  user: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
  },

  screenContainer: {
    paddingRight: 10,
  },

  screenStyle: {
    height: 40,
    marginTop: 4,
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  textRoute: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DF4723',
    alignSelf: 'center',
    marginLeft: 20,
  },
});