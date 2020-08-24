import * as React from 'react';
import createAppContainer from './src/navigation/Nav';
import {Provider} from 'mobx-react';
import store from './src/stores/Store';
import {Platform, View, StatusBar, StyleSheet} from 'react-native';

const AppContainer = createAppContainer;

export default class App extends React.Component {
  render() {
    return (
      <Provider {...store}>
        <View style={styles.container}>
          <StatusBar backgroundColor="blue" />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
});
