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
      try {
        const {first_name, last_name, role_id, manager_id} = answers;

        const results = await connection.execute(
          'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
          [first_name, last_name, role_id, manager_id]
        );
        update.managers();
        console.log('New employee added!');
        await showLast('employee');
        await main();
      } catch (err) {
        console.error(err);
      }
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

      questions.updatePrompt('addEmployee','manager_id',{choices: results.map(m => ({name: `${m.Name} 💼 ${m.Role}`, value: m.id})).concat([{name:'none',value:null}])})
    }
  )
},

roles() {
  connection.execute(
    'SELECT id, role_name FROM roles',
    (err, results) => {
      if (err) {
        console.error(err,'Could not update roles list');
        return
      }

      questions.updatePrompt('addEmployee','role_id',{choices: results.map(row => ({name: row.role_name, value: row.id }) ).concat([{name:'none',value:null}])})
    }
  )
},

departments() {
  connection.execute(
    'SELECT id, department_name FROM departments',
    (err, results) => {
      if (err) {
        console.error(err,'Could not update departments list');
        return
      }
      
      questions.updatePrompt('addRole','department_name',{choices: results.map(row => ({name: row.department_name, value: row.id}) )})
    }
  )
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