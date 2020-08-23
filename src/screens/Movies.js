import * as React from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import _ from 'lodash';

import Search from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import {COLOR_CODES} from '../utility/Theme';

const emptyResultsImage = require('../assets/images/magnifying_glass.png');

export default class MoviesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      isLoading: false,
    };
    this.getMoviesList = _.debounce(this.getMoviesOnChangeText, 2000);
  }

  getMoviesOnChangeText = async (val) => {
    if (val?.trim()) {
      const url = `http://www.omdbapi.com/?type=movie&apikey=a1b5f9ec&s=${val}`;
      this.setState({
        isLoading: true,
      });
      const result = await fetch(url);
      const stringJson = await result.text();
      const json = JSON.parse(stringJson);
      console.log(json);
      this.setState({
        moviesList: json.Search?.length ? json.Search : [],
        isLoading: false,
      });
    } else {
      this.setState({
        moviesList: [],
      });
    }
  };

  renderEmpty = () => {
    return (
      <View style={styles.mainView}>
        <Image source={emptyResultsImage} />
        <Text style={styles.text}>No Results</Text>
      </View>
    );
  };

  render() {
    const {moviesList} = this.state;

    return (
      <View style={styles.container}>
        <Search getMovies={this.getMoviesList} />
        <View style={{marginTop: 100}}>
          <FlatList
            data={moviesList}
            ListEmptyComponent={this.renderEmpty}
            renderItem={({item, index}) => <MovieCard item={item} />}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 150,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    marginTop: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    color: COLOR_CODES.PRIMARY,
  },
  emptyScreenView: {
    flex: 1,
    marginBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    marginLeft: 5,
    color: COLOR_CODES.WHITE,
  },
});
