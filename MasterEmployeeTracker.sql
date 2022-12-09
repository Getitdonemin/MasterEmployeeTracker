/* database of MasterEmployeeTracker */

DROP DATABASE IF EXISTS MasterEmployeeTracker;

CREATE DATABASE MasterEmployeeTracker;

USE MasterEmployeeTracker;

CREATE TABLE department
(
    -- The name and ID of the department --
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR
    (30) NOT NULL
);

    CREATE TABLE role
    (
        -- Roles of the employee --
        id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR
        (30),
        salary DECIMAL
        (10, 2),
        -- Department ID --
        departmentId INT,
        FOREIGN KEY
        (departmentId)
        REFERENCES department
        (id)
        -- deleting department --
        ON
        DELETE CASCADE
        ON
        UPDATE NO ACTION
    );

        CREATE TABLE employee
        (
            id INT
            AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR
            (30),
        lastName VARCHAR
            (30),
        roleId INT,
        FOREIGN KEY
            (roleId)
        REFERENCES role
            (id)
        ON
            DELETE CASCADE
        ON
            UPDATE NO ACTION,

        -- Manager's ID --
        managerId INT,
        FOREIGN KEY
            (managerId)
        REFERENCES employee
            (id)
        ON
            DELETE CASCADE
        ON
            UPDATE NO ACTION
    );