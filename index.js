//import dependencies
const inquirer = require("inquirer");
const db = require("./config/connection");
const conTable = require("console.table");
const { menuQuestion, departmentQuestion } = require("./utils/questions");
const {
  viewAllDepartments,
  addDpt,
  viewAllRoles,
  addRole,
  viewAllEmployees,
  insertEmployee,
  insertNewRole,
} = require("./utils/functions");

//user prompts
const promptUser = () => {
  inquirer.prompt(menuQuestion).then(({ action }) => {
    console.log(action);
    switch (action) {
      case "View All Departments":
        viewDepartments();
        break;
      case "Add Department":
        inquirer.prompt(departmentQuestion).then((answer) => {
          addDpt(answer);
          viewDepartments();
        });
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "Add Role":
        addNewRole();
        break;
      case "View All Employees":
        viewEmployees();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateEmployee();
        break;
      default:
        console.log("I haven't gotten to this yet.");
        break;
    }
  });
};

// db.promise().query("SELECT * FROM department").then(department => {
//   console.table(department[0])
// })
function viewDepartments() {
  viewAllDepartments().then((departments) => {
    console.table(departments);
    promptUser();
  });
}

function viewRoles() {
  viewAllRoles().then((roles) => {
    console.table(roles);
    promptUser();
  });
}

async function addNewRole() {
  const [departments] = await db.promise().query("SELECT * FROM department");
  const departmentArray = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));
  console.log(departmentArray);
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "list",
        name: "departmentId",
        message: "Please select the department.",
        choices: departmentArray,
      },
    ])
    .then((answer) => {
      let roleObject = {
        title: answer.name,
        salary: answer.salary,
        department_id: answer.departmentId,
      };
      addRole(roleObject);
      viewRoles();
    });
}

function viewEmployees() {
  viewAllEmployees().then((employees) => {
    console.table(employees);
    promptUser();
  });
}

async function addEmployee() {
  const roles = await db.promise().query("SELECT * FROM role");
  const roleArray = roles[0].map((role) => {
    return { name: role.title, value: role.id };
  });
  const employees = await db.promise().query("SELECT * FROM employee");
  const employeeArray = employees[0].map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
  employeeArray.push({ name: "No manager", value: null });
  console.log(employeeArray);
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is your new employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is your new employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the role of your new employee?",
        choices: roleArray,
      },
      {
        type: "list",
        name: "manager_id",
        message: "What is your new employee's manager?",
        choices: employeeArray,
      },
    ])
    .then((answer) => {
      insertEmployee(answer);
      promptUser();
    });
}

async function updateEmployee() {
  const roles = await db.promise().query("SELECT * FROM role");
  const roleArray = roles[0].map((role) => {
    return { name: role.title, value: role.id };
  });
  const employees = await db.promise().query("SELECT * FROM employee");
  const employeeArray = employees[0].map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.role_id,
    };
  });
  console.log(roleArray);
  console.log(employeeArray);

  inquirer
    .prompt([
      {
        type: "list",
        name: "first_name + last_name",
        message: "Which employee's role do you want to update?",
        choices: employeeArray,
      },
      {
        type: "list",
        name: "role_id",
        message: "Which role do you want to assign the selected employee?",
        choices: roleArray,
      },
    ])
    .then((answer) => {
      insertNewRole(answer);
    });
}

promptUser();
