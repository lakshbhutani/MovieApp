import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const screenWidth = Math.round(Dimensions.get('window').width);

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Movies"
        value={inputValue}
        style={styles.formField}
        onChangeText={(value) => {
          setInputValue(value);
          props.getMovies(value);
        }}
      />
      {inputValue.length ? (
        <TouchableOpacity
          style={styles.clearContainer}
          onPress={() => {
            setInputValue('');
            props.getMovies('');
          }}>
          <Entypo name="cross" style={styles.heartIcon} size={30} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    width: screenWidth - 40,
    left: 20,
    zIndex: 99,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50,
  },
  heartIcon: {
    color: '#888888',
  },
  clearContainer: {
    right: 10,
    top: 10,
    position: 'absolute',
  },
});

export default SearchBar;
