//Master Employee Tracker
const inquirer = require("inquirer");
const manageDB = require("./manageDB");

function masterEmployeeTracker() {

    // This file prompts the user to Attach/delete/update employees/departments
    // from the sql database.

    inquirer
        .prompt([
            {
                message: "Welcome to the Employee Database.",
                type: "list",
                name: "databaseMenu",
                choices: [
                    "Oversee department list",
                    "Oversee roles",
                    "Oversee employee list",
                    "Attach a department",
                    "Attach a role",
                    "Attach an employee",
                    "Update employee role",
                    "Update employee's manager",
                    "Delete role from database",
                    "Delete employee from database",
                    "Exit"]
            },
        ])

};

masterEmployeeTracker();