const db = require("../config/connection");

const viewAllDepartments = async () => {
  const department = await db.promise().query("SELECT * FROM department");

  return department[0];
};

const addDpt = async (name) => {
  await db.promise().query("INSERT INTO department SET ?", name);
};

const viewAllRoles = async () => {
  const role = await db.promise().query("SELECT * FROM role");

  return role[0];
};

const addRole = async (roleObject) => {
  const response = await db
    .promise()
    .query("INSERT INTO role SET ?", roleObject);
  return response;
};

const viewAllEmployees = async () => {
  const employee = await db.promise().query("SELECT * FROM employee");

  return employee[0];
};

const insertEmployee = async (employee) => {
  const newEmployee = await db
    .promise()
    .query("INSERT INTO employee SET ?", employee);
  return newEmployee;
};

module.exports = {
  viewAllDepartments,
  addDpt,
  viewAllRoles,
  addRole,
  viewAllEmployees, insertEmployee
};
