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
              if (value >= 1 && value <= 10) {
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
        var updatedQuantity = 0;
        var totalCost = res[idArrayIndex].price * answer.itemQuantity;
        var product_name = res[idArrayIndex].product_name;
        if (res[idArrayIndex].stock_quantity < answer.itemQuantity) {
          console.log(
            "Sorry, there are only " +
              res[idArrayIndex].stock_quantity +
              " " +
              res[idArrayIndex].product_name
          );
          endConnection();
        } else if (res[idArrayIndex].stock_quantity >= answer.itemQuantity) {
          updatedQuantity =
            res[idArrayIndex].stock_quantity - answer.itemQuantity;
          updateProduct(
            product_name,
            updatedQuantity,
            totalCost,
            answer.itemQuantity
          );
        }
      });
  });
}

function updateProduct(
  product_name,
  updatedQuantity,
  totalCost,
  customerQuantity
) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: updatedQuantity
      },
      {
        product_name: product_name
      }
    ],
    function(err, res) {
      console.log(
        "Your order of " +
          customerQuantity +
          " " +
          product_name +
          " brings your total to: \n$" +
          totalCost
      );
      endConnection();
    }
  );
}

function endConnection() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "continue",
        message: "Would you like to make another order?"
      }
    ])
    .then(function(answer) {
      if (answer.continue) {
        afterConnection();
      } else {
        connection.end();
      }
    });
}
