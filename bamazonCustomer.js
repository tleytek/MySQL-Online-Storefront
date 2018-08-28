var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazondb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log("Item ID " + res[i].id + ":");
      console.log("Department: " + res[i].department_name);
      console.log("Item Name: " + res[i].product_name);
      console.log("Item Price: $" + res[i].price);
      console.log("Stock: " + res[i].stock_quantity);
      console.log("-----------------------------------");
    }

    inquirer
      .prompt([
        {
          type: "input",
          name: "itemID",
          message: "Input the ID # of the item you would like to purchase."
        },
        {
          type: "input",
          name: "itemQuantity",
          message: "How many would you like?"
        }
      ])
      .then(function(answer) {});

    connection.end();
  });
}
