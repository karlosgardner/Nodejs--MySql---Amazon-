// Importing some mysql and inquirer packages
var inquirer = require("inquirer"),
    mysql = require("mysql");



// Making a connection
var connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "mpc@3000",
    database: "Bamazon"
});

var collection;


// Outputing results from Database to the User
var searchItem = function () {
    connection.connect();

    connection.query("SELECT * FROM products", function (err, data) {
        if(err) throw err;

        data.map(function (el) {
            collection = data;
            console.log("Item ID: " + el.item_id + " || " + "Product Name: " + el.product_name + " || " + "Price: $" + el.price);
        });

    });


};
searchItem(); // Invoking that function



// Prompting the user with questions
var questions = [
    {
        type:"input",
        name: "id",
        message:"What's the ID of the product?"
    },
    {
        type:'input',
        name:'product',
        message: "How many would you like to buy?"
    }
];


// Updating the inventory in our database
var updateInventory = function (val, id) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [val, id], function (err, data) {
        if(err) { throw err;}
        console.log("Your order has successfully placed. Thank you for purchasing with us.");

        connection.end();
    });
}

// Wait two 2 seconds until data become global
setTimeout(function () {

    // prompting the user and updating the database
    inquirer.prompt(questions)
        .then(function (data) {
            var msg = {};

            collection.map(function (el) {
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
