App = Ember.Application.create({});
App.Item = Ember.Object.extend();
App.Item.reopenClass({
  all: function() {
      return $.getJSON("http://services.odata.org/V2/Northwind/Northwind.svc/Customers?$format=JSON&$expand=Orders,CustomerDemographics").then(function(response) {
        var items = []; 
        response.d.results.forEach( function (item) {
          items.push( App.Item.create(item) );
        });
          return items;
      });
  }
});

var people = App.Item.all();


App.Router.map(function(){
  this.resource('customers', function() {
    this.resource('customer', { path: ':customer_id' });

  });
  
});


App.CustomersRoute = Ember.Route.extend({
	model: function(param){
		return people;
	}  
});

// App.CustomerRoute = Ember.Route.extend({
// 	model:function(params){
// 		return people.findBy('CustomerID', "ALFKI");
// 	}
// });