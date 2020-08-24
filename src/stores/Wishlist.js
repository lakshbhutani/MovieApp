import {observable, action, computed} from 'mobx';

export default class Wishlist {
  @observable test = 'test';
  @observable wishlistData = [];

  @action updateWishlist = (item) => {
    console.log(item)
    this.wishlistData.push(item);
  };

  @computed get getwishlistCount() {
    return this.wishlistData.length
  }
}
