//import dependencies
const inquirer = require("inquirer");
const conTable = require("console.table");
const { menuQuestion, departmentQuestion } = require("./utils/questions");
const { viewAllDepartments, addDpt } = require("./utils/functions");

//user prompts
const promptUser = () => {
  inquirer.prompt(menuQuestion).then(({ action }) => {
    console.log(action);
    switch (action) {
      case "View All Departments":
        viewAllDepartments().then((departments) => {
          console.table(departments);
          promptUser();
        });
        break;
      case "Add Department":
        inquirer.prompt(departmentQuestion).then((answer) => {
          addDpt(answer);
        });
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

promptUser();
