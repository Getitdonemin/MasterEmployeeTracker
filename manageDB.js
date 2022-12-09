//created all the functions in this manageDB.js file that'll all be exported for index.js to use
var mysql2 = require("mysql2");
require("dotenv").config();
const consoleTable = require('console.table');
const inquirer = require("inquirer");

var connection = mysql2.createConnection({
    host: "localhost",

    // port will be on 3306 if orignal port is not set up
    port: 3306,

    // Username
    user: "root",

    // Password
    password: process.env.DB_PASSWORD,
    database: "employeeDatabase"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // functions will pass through to terminate connection
});
// the setting, updating, and deleting function for SQL

// Oversee the department
overseeDept = (doneViewDeptCallback) => {
    console.log("Departments are loading..\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) {
            console.error(err);
        } else {
            console.table(res);
        }
        doneViewDeptCallback(err, res);
    });
};

// Oversee all roles
overseeRoles = (doneViewRolesCallback) => {
    console.log("Roles are being loaded..\n");
    connection.query(`SELECT * FROM role
    INNER JOIN 
    department ON role.departmentId = department.id`, function (err, res) {
        if (err) {
            console.error(err)
        } else {
            console.table(res);
        }
        doneViewRolesCallback(err, res);
    }
    )
};


// Oversee all employee list
overseeEmployees = (doneViewEmployeeCallback) => {
    console.log("Employees data are being recruited, please wait. It'll take a second..\n");
    connection.query(`SELECT * FROM employee
      INNER JOIN	
    role ON employee.roleId = role.id
    INNER JOIN
    department ON role.departmentId = department.id
    `, function (err, res) {
        if (err) {
            console.error(err);
        } else {
            console.table(res);
        }
        doneViewEmployeeCallback(err, res);
    })
};

//function for creating departments
newDept = (doneCreateDeptCallback) => {
    console.log("Creating a new department...\n")
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the name of your department?"
        }
    ]).then(function (userInput) {
        connection.query("INSERT INTO department SET ?",
            {
                deptName: userInput.departmentName,
            },
            function () {
                console.log(`Department ${userInput.departmentName} has been made!`);
                // Shows a table of the departments
                overseeDept(doneCreateDeptCallback);
            });
    })

};

// function for roles
newRole = (doneCreateRoleCallback) => {
    console.log("Creating a new role..")
    connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What role title would you like to create?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "Salary for this role?"
            },
            {
                name: "deptId",
                type: "number",
                message: "Assign deparment ID for this role",
            }
        ]).then(function (userInput) {
            connection.query("INSERT INTO role SET ?",
                {
                    title: userInput.roleTitle,
                    salary: userInput.roleSalary,
                    departmentId: userInput.deptId
                },
                function () {
                    console.log(`Role ${userInput.roleTitle} has been made!`);
                    overseeRoles(doneCreateRoleCallback);
                });
        })
    })
};

// function for creating employee
newEmployee = (doneCreateEmployeeCallback) => {
    console.log("Employee data currently being made...")
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "First name of the employee?"
            },
            {
                name: "lastName",
                type: "input",
                message: "Last name of the employee?"
            },
            {
                name: "roleId",
                type: "input",
                message: "Assign role to employee"
            },
            {
                name: "managerId",
                type: "input",
                message: " Is he currently overseen by a manager? Yes? Add manager's employee ID. No? Press enter."
            }
        ]).then(function (userInput) {
            var data = {
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                roleId: userInput.roleId
            }
            if (userInput.managerId) {
                data.managerId = userInput.managerId
            }
            connection.query("INSERT INTO employee SET ?",
                data,
                function (err, res) {
                    console.log('error:' + err);
                    console.log(`${userInput.firstName} ${userInput.lastName}'s profle has been made!`);
                    overseeEmployees(doneCreateEmployeeCallback);
                });
        })
    })
};

// function to update employee's info
function updateEmployeeRole(doneUpdateEmployeeRCallback) {
    // Grabs from table
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
        inquirer.prompt(
            [
                { // First pick an employee then select what you desire to change 
                    name: "employeeId",
                    type: "number",
                    message: "Change employee's ID",

                },
                {
                    name: "employeeUpdateRole",
                    type: "number",
                    message: "Change employee's role",
                },

            ]).then((userInput) => {
                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        { roleId: userInput.employeeUpdateRole },
                        { id: userInput.employeeId }
                    ], function (err, res) {
                        console.log('error:' + err);
                        overseeEmployees(doneUpdateEmployeeRCallback)
                    });
            })
    })
};

//function that update's employee's manager
function updateEmployeeManager(doneUpdateEmployeeMCallback) {
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);

        inquirer.prompt(
            [
                {
                    name: "employeeList",
                    type: "number",
                    message: "ID of the employee that you want to change",
                },
                {
                    name: "employeeUpdateManager",
                    type: "number",
                    message: "Enter employee's new manager's ID for it to change",
                }

            ]).then((userInput) => {
                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        { managerId: userInput.employeeUpdateManager },
                        { id: userInput.employeeList }
                    ], function (err, res) {
                        console.log('error:' + err);
                        console.log(`Employee's manager was changed`);
                        overseeEmployees(doneUpdateEmployeeMCallback)
                    }
                );
            })
    })
};

//function for deleting roles
deleteRole = (doneRemoveRoleCallback) => {
    connection.query("SELECT * FROM role", function (err, res) {
        console.table(res);
        inquirer.prompt(
            {
                name: "deleteRole",
                type: "number",
                message: "Input role ID for it to be deleted.\n",
            })
            .then(function (userInput) {
                var newId = Number(userInput.deleteRole);
                connection.query("DELETE FROM role WHERE ?", { id: newId }, function (err, res) {
                    console.log("Role has been deleted");
                    // Displays table of roles.
                    overseeRoles(doneRemoveRoleCallback);
                });
            })
    })
};


// function to fire an employee
deleteEmployee = (doneRemoveEmployeeCallback) => {
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
        inquirer.prompt(
            {
                name: "deleteEmployee",
                type: "number",
                message: "Input employee ID to fire them. \n",

            })
            .then(function (userInput) {
                var newId = Number(userInput.deleteEmployee);
                connection.query("DELETE FROM employee WHERE ?", { id: newId }, function (err, res) {
                    console.log("Employee has been terminated");
                    overseeEmployees(doneRemoveEmployeeCallback);
                });
            })
    })

};

afterConnection = (exitCallback) => {
    // must close connection once the query is done
    connection.end();
    exitCallback();
};
//exporting all functions
module.exports = {
    "overseeDept": overseeDept,
    "overseeRoles": overseeRoles,
    "overseeEmployees": overseeEmployees,
    "newDept": newDept,
    "newRole": newRole,
    "newEmployee": newEmployee,
    "updateEmployeeRole": updateEmployeeRole,
    "updateEmployeeManager": updateEmployeeManager,
    "deleteRole": deleteRole,
    "deleteEmployee": deleteEmployee,
    "afterConnection": afterConnection
};