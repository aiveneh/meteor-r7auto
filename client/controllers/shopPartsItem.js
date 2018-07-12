import plugins from '../plugins';

Template.shopCarsItem.onCreated(function() {});

Template.shopPartsItem.helpers({
  relatedProducts: () => {
    return SpareParts.find().fetch();
  },
  formatPrice( price){
    let val = price.toLocaleString("en");
    return val;
  }
});

Template.shopPartsItem.events({
  "click #add-to-cart": (event, template) => {
    event.preventDefault();
    let cartItems = Session.get("cartItems") || [];
    let contains = false;
    if ( cartItems.length > 0 ) {
      cartItems.forEach((item, index) => {
        if( template.data._id == item.productId){
          item.quantity = item.quantity + 1;
          contains =true;
        }
      });
      if( contains == false){
        let data = { productId: template.data._id, product: template.data, quantity: 1 };
        cartItems.push(data);  
      }
    } else {
      let data = { productId: template.data._id, product: template.data, quantity: 1 };
      cartItems.push(data);
    } 
    alert('Item added to cart');
    Session.setPersistent("cartItems", cartItems);
   }   

});

Template.shopPartsItem.onRendered(function() {
  plugins();
});

