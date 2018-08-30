# MySQL-Online-Storefront

## Requirements

Prior to running this program in Terminal/Git Bash you will need a MySQL Server that will store our information. I used MySQL Workbench and stored the database at localhost. You will also need to download Node.js. Below are the links to download MySQL Workbench and Node.JS

https://dev.mysql.com/downloads/windows/installer/8.0.html
https://nodejs.org/en/download/

## Instructions

Once you have the folder opened in your VSCode Workspace take a look at the bamazon.sql file, copy and paste the content into your MySQL query tab, and execute the code by hitting the lightning symbol.

Hopefully with no errors you should have a database called 'bamazonDB' and a table called 'products' filled with 10 items.

Now we will go to VSCode and open our terminal window. Navigate to the root folder of all our files, this folder will be called MySQL-Online-Storefront. From here we will initiate our package.json file for our NPM requirements.

Type:

`npm init`

This should create our package.json file. Next we will type:

`npm install`

This will install all of the dependencies that are stated in our package.json file into a folder called 'node_modules'.

Now you are ready to execute the program by typing:

`node bamazonCustomer.js`

Have fun!
