//Master Employee Tracker
const inquirer = require("inquirer");
const manageDB = require("./manageDB");

function masterEmployeeTracker() {

    // This file prompts to Attach/delete/update employees/departments from sql database

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
                    "delete role from database",
                    "delete employee from database",
                    "Exit"]
            },
        ])
        .then(function (response) {

            switch (response.databaseMenu) {
                default:
                    text = "Uh oh!";
                    break;
                case "Oversee department list":
                    manageDB.overseeDept(function () {
                        //reasking the questions for all other choices
                        masterEmployeeTracker();
                    });
                    break;
                case "Oversee roles":
                    manageDB.overseeRoles(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "Oversee employee list":
                    manageDB.overseeEmployees(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "Attach a department":
                    manageDB.newDept(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "Attach a role":
                    manageDB.newRole(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "Attach an employee":
                    manageDB.newEmployee(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "Update employee role":
                    manageDB.updateEmployeeRole(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "Update employee's manager":
                    manageDB.updateEmployeeManager(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "delete role from database":
                    manageDB.deleteRole(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "delete employee from database":
                    manageDB.deleteEmployee(function () {
                        masterEmployeeTracker();
                    });
                    break;
                case "Exit":
                    console.log("Quiting database");
                    manageDB.afterConnection(function () {
                        process.exit();
                    });
                    break;
            }
        });
};

masterEmployeeTracker();