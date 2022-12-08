/*Having set data for me to test*/
USE employeeDatabase;

INSERT INTO department
    (id, deptName)
VALUES
    (1, "Music");

INSERT INTO department
    (id, deptName)
VALUES
    (2, "Nutrition");
INSERT INTO department
    (id, deptName)
VALUES
    (3, "Education");

-- Adding role information. Last value relates to department table. --
INSERT INTO role
    (title, salary, departmentId)
VALUES("Musician", 58000, 1);

INSERT INTO role
    (title, salary, departmentId)
VALUES("Nutritionist", 57000, 2);

INSERT INTO role
    (title, salary, departmentId)
VALUES("Professor", 72000, 3);


-- Adding employee info. Last 2 values relate to role table. All managers have to go first or else the lesser employees don't have a manager.--
INSERT INTO employee
    (firstName, lastName, roleId)
VALUES("Hannah", "Kim", 1);

INSERT INTO employee
    (firstName, lastName, roleId)
VALUES("Trifecta", "Sammons", 2);

INSERT INTO employee
    (firstName, lastName, roleId)
VALUES("Ruby", "Phantom", 3);

/*================================================================*/

INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES("John", "Kim", 1, 1);

INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES("Michelle", "Cho", 2, 2);

INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES("David", "Pringles", 3, 3);

/*================================================================*/

SELECT *
FROM department;
SELECT *
FROM role;
SELECT *
FROM employee;