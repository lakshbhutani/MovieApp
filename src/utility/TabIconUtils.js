import * as React from 'react';
import {StyleSheet, View, FlatList, Text, Image} from 'react-native';
import {inject, observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const renderTabBadge = (count) => {
  return count > 0 ? (
    <View style={styles.tabBadge}>
      <Text style={{color: 'white', fontSize: 11}}>{count}</Text>
    </View>
  ) : null;
};

const TabIcon = inject('wishlist')(
  observer((props) => {

    return (
      <View style={styles.tabContainer}>
        {/* <Text>laksh</Text> */}
        <Ionicons name={props.name} size={25} color={props.color} />
        {props.routeName === 'Wishlist' &&
          renderTabBadge(props.wishlist.wishlistData.length)}
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  tabIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  tabBadge: {
    position: 'absolute',
    left: 16,
    top: 6,
    backgroundColor: '#6797d4',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    paddingVertical: 10,
  },
});

export default TabIcon;
