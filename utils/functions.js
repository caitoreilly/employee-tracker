const db = require("../config/connection");

const viewAllDepartments = async () => {
  const department = await db.promise().query("SELECT * FROM department");

  return department[0];
}



const addDpt = async (name) => {
await db.promise().query("INSERT INTO department SET ?", name);
}

module.exports = { viewAllDepartments, addDpt };

