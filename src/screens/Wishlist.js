import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Image, Text} from 'react-native';
import {inject, observer} from 'mobx-react';
import MovieCard from '../components/MovieCard';
import {COLOR_CODES} from '../utility/Theme';

const emptyResultsImage = require('../assets/images/cart.png');

const WishlistScreen = inject('wishlist')(
  observer((props) => {
    const [wishlistData, setWishlistData] = useState([]);

    useLayoutEffect(() => {
      const navFocusListener = props.navigation.addListener('didFocus', () => {
        const data = [...props.wishlist.wishlistData];
        setWishlistData(data);
      });

      return () => {
        navFocusListener.remove();
      };
    }, []);

    const renderEmpty = () => {
      return (
        <View style={styles.mainView}>
          <Image source={emptyResultsImage} />
          <Text style={styles.text}>No items</Text>
        </View>
      );
    }

    const updateWishlist = (index) => {
      const data = [...wishlistData];
      data.splice(index, 1);
      props.wishlist.wishlistData = data;
      setWishlistData(data);
    };

    console.log(props.wishlist.wishlistData);
    return (
      <View style={styles.container}>
        <View style={styles.flatlistContainer}>
          <FlatList
            extraData={wishlistData}
            data={wishlistData}
            ListEmptyComponent={renderEmpty}
            renderItem={({item, index}) => (
              <MovieCard
                item={item}
                showWishlist
                onPressRemoveWishlist={() => updateWishlist(index)}
              />
            )}
            keyboardShouldPersistTaps={'handled'}
            numColumns={2}
            keyExtractor={(item, index) => 'key' + index}
          />
        </View>
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  flatlistContainer: {
    marginTop: 25,
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
});

export default WishlistScreen;
