import carsSchema from "./schemas/cars";
import sparePartsSchema from "./schemas/spare-parts";
import postsSchema from "./schemas/posts";
import servicesSchema from "./schemas/services";
import serviceRequestsSchema from "./schemas/serviceRequests";
import inspectionRequestsSchema from "./schemas/inspectionRequests";
import ordersSchema from "./schemas/orders";
import carServicingSchema from "./schemas/car-servicing";

if (Meteor.isServer) {
  const database = new MongoInternals.RemoteCollectionDriver(
    "mongodb://heroku_zjkh19d6:k3nkb1gaite3dq031jdipk333p@ds263759.mlab.com:63759/heroku_zjkh19d6"
  );

  // const database = "";
  Posts = new Mongo.Collection("posts", { _driver: database });
  SpareParts = new Mongo.Collection("spareparts", { _driver: database });
  Cars = new Mongo.Collection("cars", { _driver: database });
  Services = new Mongo.Collection("services", { _driver: database });
  Orders = new Mongo.Collection("orders", {
    _driver: database
  });
  InspectionRequests = new Mongo.Collection("inspection-requests", {
    _driver: database
  });
  ServiceRequests = new Mongo.Collection("service-requests", {
    _driver: database
  });
  CarServicing = new Mongo.Collection("car-servicing", { _driver: database });
  CarMakes = new Mongo.Collection("car-makes", { _driver: database });
  CarCategories = new Mongo.Collection("car-categories", { _driver: database });
} else {
  Cars = new Mongo.Collection("cars");
  Orders = new Mongo.Collection("orders");
  Posts = new Mongo.Collection("posts");
  SpareParts = new Mongo.Collection("spareparts");
  Services = new Mongo.Collection("services");
  InspectionRequests = new Mongo.Collection("inspection-requests");
  ServiceRequests = new Mongo.Collection("service-requests");
  CarServicing = new Mongo.Collection("car-servicing");
  CarMakes = new Mongo.Collection("car-makes");
  CarCategories = new Mongo.Collection("car-categories");
}

CarMakes.attachSchema(
  new SimpleSchema({
    name: {
      type: String
    },
    models: {
      type: Array,
      optional: true
    },
    "models.$": {
      type: String,
      optional: true
    },
    created_at: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        }
      },
      autoform: {
        type: "hidden"
      }
    }
  })
);

CarCategories.attachSchema(
  new SimpleSchema({
    name: {
      type: String
    },
    created_at: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date();
        }
      },
      autoform: {
        type: "hidden"
      }
    }
  })
);

Cars.attachSchema(carsSchema);
Orders.attachSchema(ordersSchema);
Posts.attachSchema(postsSchema);
SpareParts.attachSchema(sparePartsSchema);
Services.attachSchema(servicesSchema);
InspectionRequests.attachSchema(inspectionRequestsSchema);
ServiceRequests.attachSchema(serviceRequestsSchema);
CarServicing.attachSchema(carServicingSchema);

Services.allow({
  insert: () => true,
  update: () => true
});

ServiceRequests.allow({
  insert: () => true,
  update: () => true
});

InspectionRequests.allow({
  insert: () => true,
  update: () => true
});

Orders.allow({
  insert: () => true,
  update: () => true
});

CarMakes.allow({
  insert: () => true,
  update: () => true
});
