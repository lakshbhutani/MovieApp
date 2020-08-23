import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet, Dimensions} from 'react-native';
import {COLOR_CODES} from '../utility/Theme';

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
    backgroundColor: COLOR_CODES.WHITE,
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
});

export default SearchBar;
