// installing npm packages
var mysql = require ("mysql");
    inquirer = require ( "inquirer");



var connection = mysql.createConnection({
	    host:"localhost",
	    user:"root",
	    password:"mpc@3000",
	    database:"Bamazon"        
});

  connection.connect();

  connection.query("SELECT * FROM products",function(err,data){
  	if(err) throw err;

//console.log(data);
  });

  var questions = [
  {
      
      type:"input",
      name:"id",
      message:"What is the ID of the product?"

  },

  {
      
      type:"input",
      name:"product",
      message:"How many would you like to buy?"

  },  

  ];


var collection;

var showProduct = function (){
connection.query("SELECT * FROM products",function(err,data){
  	if(err) throw err;
  	collection = data;
  	
data.map(function (el){
console.log("Item ID:", + el.item_id + " || Product Name:" + el.product_name + "|| Price:$"  + el.price);


});
});
};
showProduct();





setTimeout(function (){
  // Chain Promises after inquirer prompt questions
inquirer.prompt (questions)
  .then(function (data){
  	if(Number(data.id) === el.item_id){
                    if(Number(data.product) > el.stock_quantity){
                        msg.message = "Insufficient quantity!";
                    }
                    else{
                        msg.inventory = el.stock_quantity - Number(data.product);
                        msg.price = el.price * Number(data.product);
                        updateInventory(msg.inventory, data.id);
                    }
                }

            });

             return msg;

        }) // Promise data return
        .then(function (data) {
            console.log("We have " + data.inventory + " in our inventory!!!");
            console.log("Your total cost is $" + data.price);

        })
        .catch(function (err) {
            console.log(err)
        });
}, 1000);



  




  











