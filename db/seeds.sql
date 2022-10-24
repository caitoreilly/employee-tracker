USE employee_db;

INSERT INTO department (name)
VALUES ("Accounting"),
("Human Resources"),
("Engineering"),
("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 80000, 1),
("Software Engineer", 90000, 3),
("Full Stack Developer", 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Caitlin", "O'Reilly", 3, NULL),
("Sean", "New", 3, 1),
("John", "Smith", 2, 2),
("Allison", "O'Reilly", 1, NULL),
("Connor", "O'Reilly", 3, 2);