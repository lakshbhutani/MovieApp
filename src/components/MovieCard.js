import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR_CODES} from '../utility/Theme';

const MovieCard = ({item, showWishlist, onPressWishList, onPressRemoveWishlist}) => {
  console.log(item);
  return (
    <View style={styles.movieItem}>
      <Image
        resizeMode="cover"
        style={styles.thumbnail}
        source={{uri: item.Poster}}
      />
      <Text style={styles.movieDesc} numberOfLines={1}>
        {item.Title}
      </Text>
      <Text style={styles.movieDesc}>{`Year - ${item.Year}`}</Text>
      {showWishlist ? (
        <TouchableOpacity
          onPress={onPressRemoveWishlist}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Remove</Text>
          <Ionicons name="heart-outline" style={styles.heartIcon} size={15} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={item.isWishlist}
          onPress={onPressWishList}
          style={[
            styles.buttonContainer,
            {
              backgroundColor: item.isWishlist
                ? COLOR_CODES.LIGHT_PRIMARY
                : COLOR_CODES.PRIMARY,
            },
          ]}>
          <Text style={styles.buttonText}>Shortlist</Text>
          <Ionicons name="heart-outline" style={styles.heartIcon} size={15} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: COLOR_CODES.WHITE,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 2,
  },
  thumbnail: {
    width: 150,
    height: 150,
    marginBottom: 5,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  movieDesc: {
    textAlign: 'center',
    color: COLOR_CODES.PRIMARY,
    fontSize: 15,
    paddingHorizontal: 4,
    backgroundColor: COLOR_CODES.WHITE,
  },
  buttonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: COLOR_CODES.PRIMARY,
  },
  buttonText: {
    color: COLOR_CODES.WHITE,
    fontSize: 16,
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
  heartIcon: {
    marginLeft: 5,
    color: COLOR_CODES.WHITE,
  },
});

export default MovieCard;
