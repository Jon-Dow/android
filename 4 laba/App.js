import React, { useState, useEffect } from 'react'
import uuid from 'uuid-random'
import { TouchableOpacity, Text, View, FlatList, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Header from './components/Header'
import Form from './components/Form'
import Contact from './components/Contact'

const initialContacts = [
  {
    id: 0,
    name: 'Григорий',
    surname: 'Иванов',
    phone: '+7-ххх-хх-хх'
  },
  {
    id: 1,
    name: 'Кебаб',
    surname: 'Жаренный',
    phone: '+7-ххх-хх-хх'
  },
];

let App;
App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadContacts()
  }, []);

  useEffect(() => {
    updateContacts()
  }, [contacts]);

  const loadContacts = async () => {
    try {
      const data = await AsyncStorage.getItem('contacts');
      data && setContacts(JSON.parse(data));
      setIsLoaded(true)
    } catch (error) {
      console.error(error)
    }
  };

  const updateContacts = async () => {
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts))
  };

  const onFormChange = () => {
    setIsFormOpened(prevState => !prevState)
  };

  const onContactAdd = (name, surname, phone) => {
    const id = uuid();
    setContacts(prevState => ({
      ...prevState,
      [id]: {id, name, surname, phone}
    }))
  };

  const onContactEdit = (id, name, surname, phone) => {
    setContacts(prevState => ({
      ...prevState,
      [id]: {id, name, surname, phone}
    }))
  };

  const onContactDelete = id => {
    const {[id]: deletedValue, ...newState} = contacts;
    setContacts(newState)
  };

  return (
      <View style={{flex: 1}}>
        <Header/>
        {
          isLoaded && (
              <FlatList
                  data={Object.values(contacts)}
                  renderItem={({item: {id, name, surname, phone}}) => {
                    return (
                        <Contact
                            id={id}
                            name={name}
                            surname={surname}
                            phone={phone}
                            onContactDelete={onContactDelete}
                            onContactEdit={onContactEdit}
                        />
                    )
                  }}
              />
          )
        }
        {
          !isFormOpened
              ? (
                  <TouchableOpacity
                      style={styles.addButton}
                      onPress={onFormChange}
                  >
                    <Text style={{color: '#fff', textAlign: 'center'}}>Добавить контакт</Text>
                  </TouchableOpacity>
              )
              : (
                  <Form
                      onFormChange={onFormChange}
                      onFormSubmit={onContactAdd}
                  />
              )
        }
      </View>
  )
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#545454',
    padding: 15,
  }
});

export default App
