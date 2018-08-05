
Template.cart.helpers({
  data: () => {
    let data = Session.get("cartItems");
    if (data) {
      return data;
    } else {
      return 0;
    }
  },
  cartLength: function() {
    if (Session.get("cartItems")) {
      return Session.get("cartItems").length;
    } else {
      return 0;
    }
  },

  totalPrice: () => {
    var item = Session.get("cartItems");
    var totalPrice = 0;
    if (item) {
      item.forEach(item => {
        let price = parseInt(item.product.Price);
        let quant = item.quantity;
        totalPrice += parseInt(price * quant);
      });
    }
    return totalPrice;
  },
  formatPrice(price) {
    let val = price.toLocaleString("en");
    return val;
  }
});

Template.cart.events({
  "click #remove-cart-item": function(event) {
    event.preventDefault();
    console.log("fee");
    let cartItems = Session.get("cartItems");
    let res = cartItems.filter(item => {
      if (item.productId != this.productId) {
        return item;
      }
    });
    Session.update("cartItems", res);
  }
});
