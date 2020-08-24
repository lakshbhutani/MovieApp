import React, {useEffect} from 'react';
import createAppContainer from './src/navigation/Nav';
import {Provider} from 'mobx-react';
import store from './src/stores/Store';
import {Platform, View, StatusBar, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const AppContainer = createAppContainer;

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider {...store}>
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" />
        <AppContainer />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
});
