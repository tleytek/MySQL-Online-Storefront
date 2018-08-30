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
          message: "Input the ID # of the item you would like to purchase.",
          validate: function(value) {
            if (isNaN(value) === false) {
              if (value >= 1 && value <= 9) {
                return true;
              }
            }
            console.log("\n Please enter a valid ID number");
            return false;
          }
        },
        {
          type: "input",
          name: "itemQuantity",
          message: "How many would you like?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        var idArrayIndex = answer.itemID - 1;
        if (res[idArrayIndex].stock_quantity < answer.itemQuantity) {
          console.log("Insufficient quantity!");
          endConnection();
        } else {
          updateProduct();
        }
      });
  });
}

function updateProduct() {}

function endConnection() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Would you like to make another order?"
    }
  ]);
}
