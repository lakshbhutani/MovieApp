import * as React from 'react';
import createAppContainer from './src/navigation/Nav'
import { Text, View, StatusBar, StyleSheet } from 'react-native';

const AppContainer = createAppContainer;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" />
        <AppContainer />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow:Platform.OS == 'android' ? 'hidden' : 'visible'
  }
});