const menuQuestion = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
    ],
  },
];

const departmentQuestion = [
  {
    type: "input",
    name: "name",
    message: "What is the name of your new department?",
  },
];


module.exports = { menuQuestion, departmentQuestion };
