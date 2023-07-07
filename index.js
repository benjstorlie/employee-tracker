const mysql = require('mysql2');
require('dotenv').config();
const questions =require('./lib/questions');
const inquirer = require('inquirer');

// create the connection to database
const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  console.log(`Connected to the database.`)
);



async function init() {
  update.roles();
  update.departments();
  update.managers();
  
  // setTimeout(() => {
  //   const index = questions.addEmployee.findIndex(question => question.name === "manager_name");
  //   if (index !== -1) {
  //     console.log(questions.addEmployee[index].choices)
  //   }
  // }, 300)
  // connection.end();

  await main();
}

async function main() {
  inquirer.prompt(questions.intro)
  .then(async (answers) => {
    if (Object.keys(operations).includes(answers.command)) {
      await operations[answers.command]();
    } else {
      console.log('Invalid command');
      await main();
    }
  })
}

const operations = {
    async viewAllEmployees() {
    connection.execute(
      'SELECT * FROM full_employees_table', async (err, results) => {
        if (err) {
          console.error(err);
        } else {
          table(results);
        }
        await main();
      }
    )
  },

  async quit() {
    console.log('Goodbye');
    connection.end();
  },

  async addEmployee() {
    inquirer.prompt(questions.addEmployee)
    .then(async (answers) => {
      const role_id = await getId(answers,'role');
      const manager_id = await getId(answers,'manager');

      console.log(role_id,manager_id);

      connection.execute(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',[answers.first_name,answers.last_name,role_id,manager_id], async (err,results) => {
          if (err) {
            console.error(err);
          } else {
            update.managers();
            console.log('New employee added!')
            await showLast('employee');
            await main();
          }
        }
      )
    })
    
  },

  async updateEmployeeRole() {
    console.log('Command not yet available.')
  },

  async viewAllRoles() {
    connection.execute(
      'SELECT * FROM full_roles_table',
      (err, results) => {
        if (err) {
          console.error(err);
          return
        }
        table(results);
      }
    )
  },

  async addRole() {
    inquirer.prompt(questions.addRole)
    .then(async (answers) => {
      const department_id = await getId(answers,'department');
      connection.execute(
        'INSERT INTO roles (role_name, salary, is_manager, department_id) VALUES (?,?,?,?)',[answers.role_name,answers.salary,answers.is_manager,department_id], (err,results) => {
          if (err) {
            console.error(err);
            return
          }
          update.roles();
          console.log('New role added!')
          showLast('role');
        }
      )
    })
  },

  async viewAllDepartments() {
    connection.execute(
      'SELECT department_name FROM departments', (err, results) => {
        if (err) {
          console.error(err);
          return
        }
        table(results);
      }
    )
  },

  async addDepartment() {
    inquirer.prompt(questions.addDepartment)
    .then((answers) => {
      connection.execute(
        'INSERT INTO departments (department_name) VALUES (?)', [answers.department_name], (err, results) => {
          if (err) {
            console.error(err);
            return
          }
          update.departments();
          console.log(`New department added!`);
          showLast('department');
        }
      )
    })
  },
}

const update = {
  managers() {
  connection.execute(
    'SELECT * FROM managers',
    (err, results) => {
      if (err) {
        console.error(err,'Could not update managers list');
        return
      }

      questions.updatePrompt('addEmployee','manager_name',{choices: results.map(m => `${m.Name} 💼 ${m.Role}`).concat(['none'])})
    }
  )
},

roles() {
  connection.execute(
    'SELECT role_name FROM roles',
    (err, results) => {
      if (err) {
        console.error(err,'Could not update roles list');
        return
      }

      questions.updatePrompt('addEmployee','role_name',{choices: results.map(row => row.role_name )})
    }
  )
},

departments() {
  connection.execute(
    'SELECT department_name FROM departments',
    (err, results) => {
      if (err) {
        console.error(err,'Could not update departments list');
        return
      }
      
      questions.updatePrompt('addRole','department_name',{choices: results.map(row => row.department_name )})
    }
  )
}
}

async function getId(answers,item) {
  if (!['manager','department','role'].includes(item)) {
    console.error(`You can\'t get the ID for ${item}.`)
    return null
  } else if (answers[item+'_name'] === null) {
    return null
  } else {
    const value = (item === "manager" ? "CONCAT(first_name,' ',last_name)" : item+'_name');
    const table = (item === "manager" ? "employees" : item+'s');
    connection.execute(`SELECT id FROM ${table} WHERE ${value} = ?`, [answers[item+'_name']], (err, results) => {
      if (err) {
        console.error(err);
        return
      } else if (!results.length) {
        console.error(`Error finding ${item} in the table`);
        return
      } else {
        return results[0].id;
      }
    });
  }
  
}

function table(data) {
  console.log('\n');
  console.table(data);
  console.log('Use up or down arrow keys to execute a new command.')
}

async function showLast(item) {
  if (['employee','role','department'].includes(item)) {
    const viewName = `last_${item}_updated`;
    connection.execute(`SELECT * FROM ${viewName}`,(err, results) => {
      if (err) {
        console.error(err);
        return
      }
      table(results);
    })
  } else {
    console.log(`Could not display last ${item} updated.`);
        return
  }
}

init();