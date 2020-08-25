import * as React from 'react';
import {Text, View, StyleSheet, Image, FlatList, ToastAndroid, ActivityIndicator, Modal, Dimensions, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';


import Search from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import {COLOR_CODES} from '../utility/Theme';

const guideData = [
  {
    text: 'Please enter something in search query to search for your favourite movies.'
  },
  {
    text: 'You can also shortlist the movies of your choice.'
  },
  {
    text: 'You can view the total number of items shortlisted in bottom tab bar.'
  }
];

const emptyResultsImage = require('../assets/images/magnifying_glass.png');

@inject('wishlist')
@observer
export default class MoviesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      isLoading: false,
      isWarningPopup: false
    };
    this.getMoviesList = _.debounce(this.getMoviesOnChangeText, 1000);
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ isWarningPopup : true })
    }, 200)
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
        moviesList: withWishlistList?.length ? withWishlistList : [],
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
           <Modal 
            animationType="slide" 
            visible={this.state.isWarningPopup} 
            transparent 
            onRequestClose={() => this.setState({ isWarningPopup: false })}
          >
            <View style={styles.mainContainerInfo}>
              <View style={styles.containerInfo}>
                <Text style={styles.infoHeading}>Info!!</Text>
                <FlatList
                  data={guideData}
                  renderItem={({item, index}) => (
                    <Text style={styles.infoText}>{index+1}) {item.text}</Text>
                  )}
                  keyboardShouldPersistTaps={'handled'}
                  keyExtractor={(item, index) => index.toString()}
                />
                <Text style={[styles.infoText, { color: 'black', marginTop: 10, opacity: 0.7}]}>**Test data - Captain america, conjuring, Deadpool, Avengers.....</Text>
                <TouchableOpacity onPress={()=> this.setState({ isWarningPopup: false }) } style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity> 
              </View>
          </View>
        </Modal>
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
  mainContainerInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040',
  },
  containerInfo: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 100,
    // marginTop: isIphoneXorAbove() ? 70 : 40,
    paddingHorizontal: 20,
    // marginBottom: isIphoneXorAbove() ? 110 : 65,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  infoHeading: {
    color: COLOR_CODES.PRIMARY,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    // borderBottomWidth: 1
  },
  infoText: {
    fontSize: 14,
    opacity: 0.8,
    color: COLOR_CODES.GRAY
  },
  buttonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: COLOR_CODES.PRIMARY,
  },
  buttonText: {
    color: COLOR_CODES.WHITE,
    fontSize: 16,
    paddingHorizontal: 12
  }
});
