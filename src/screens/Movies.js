import * as React from 'react';
import {Text, View, StyleSheet, Image, FlatList, ToastAndroid, ActivityIndicator} from 'react-native';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';


import Search from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import {COLOR_CODES} from '../utility/Theme';

const emptyResultsImage = require('../assets/images/magnifying_glass.png');

@inject('wishlist')
@observer
export default class MoviesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      isLoading: false,
    };
    this.getMoviesList = _.debounce(this.getMoviesOnChangeText, 100);
  }

  getMoviesOnChangeText = async (val) => {
    console.log(val)
    if (val?.trim()) {
      const url = `http://www.omdbapi.com/?type=movie&apikey=a1b5f9ec&s=${val}`;
      this.setState({
        isLoading: true,
      });
      const result = await fetch(url);
      const stringJson = await result.text();
      const json = JSON.parse(stringJson);
      const withWishlistList = json.Search?.map((item) => ({
        ...item,
        isWishlist: false,
      }));
      console.log(json);
      this.setState({
        moviesList: withWishlistList.length ? withWishlistList : [],
        isLoading: false,
      });
    } else {
      this.setState({
        moviesList: [],
      });
    }
  };

  renderEmpty = () => {
    if(this.state.isLoading) {
      return <ActivityIndicator size="large" color={COLOR_CODES.PRIMARY} />
    }
    return (
      <View style={styles.mainView}>
        <Image source={emptyResultsImage} />
        <Text style={styles.text}>No Results</Text>
      </View>
    );
  };

  addToWishList = (index) => {
    const data = this.state.moviesList;
    data[index].isWishlist = true;
    this.props.wishlist.updateWishlist(data[index]);
    ToastAndroid.show("Added To Wishlist!", ToastAndroid.SHORT, ToastAndroid.BOTTOM,25,50);
    this.setState({moviesList: data});
  };

  render() {
    const {moviesList, isLoading} = this.state;

    return (
      <View style={styles.container}>
        <Search getMovies={this.getMoviesList} />
        <View style={{marginTop: 100}}>
          <FlatList
            data={moviesList}
            extraData={moviesList}
            ListEmptyComponent={this.renderEmpty}
            renderItem={({item, index}) => (
              <MovieCard
                item={item}
                onPressWishList={() => this.addToWishList(index)}
              />
            )}
            numColumns={2}
            keyboardShouldPersistTaps={'handled'}
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
    fontSize: 14,
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
