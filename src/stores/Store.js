import Wishlist from './Wishlist';

class Store {
  wishlist;

  constructor() {
    this.wishlist = new Wishlist(this);
  }
}
export default new Store();
