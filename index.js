const mysql = require('mysql2');
require('dotenv').config();
const questions =require('./lib/questions');
const { default: inquirer } = require('inquirer');

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

main();

function main() {

  intro();
}



function intro() {
  inquirer.prompt(questions.intro)
  .then((answers) => {
    switch (answers.command) {
      case 'Quit':
        console.log('Goodbye');
        connection.end();
        return;
      case 'View All Employees':
        viewAllDepartments();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewAllDepartments;
        break;
      case 'Add Department':
        addDepartment;
        break;
      default:
        main();
    }
  })
}

function viewAllEmployees() {
  connection.execute(
    'SELECT * FROM full_employees_table',
    (err, results) => {
      if (err) {
        console.error(err);
        return
      }
      console.table(results);
    }
  )
}

function addEmployee() {
  connection.execute(
    `SELECT e.first_name, e.last_name FROM employees as e
    WHERE e.role_id IN (
      SELECT role_id
      FROM roles
      WHERE is_manager = true
    )`,
    (err, results) => {
      if (err) {
        console.error(err);
        return
      }
      const managers = results.map(row => `${row.first_name} ${row.last_name}`);
      connection.execute(
        `SELECT role_name FROM roles`,(err, results) => {
          if (err) {
            console.error(err);
            return
          }
          const roles = results.map(row => row.role_name);
          inquirer.prompt([
            {
              name: 'firstName',
              type: 'input',
              message: 'What is the employee\'s first name?',
            },
            {
              name: 'lastName',
              type: 'input',
              message: 'What is the employee\'s last name?',
            },
            {
              name: 'employeeRole',
              type: 'list',
              message: 'What is the employee\'s role?',
              choices: roles,
            },
            {
              name: 'employeeManager',
              type: 'list',
              message: 'Who is the employee\'s manager?',
              choices: managers.concat(['none']),
            },
          ])
        }
      )
    }
  );

}

function updateEmployeeRole() {
  console.log('Command not yet available.')
}

function viewAllRoles() {
  connection.execute(
    'SELECT * FROM full_roles_table',
    (err, results) => {
      if (err) {
        console.error(err);
        return
      }
      console.table(results);
    }
  )
}

function addRole() {
  connection.execute(
    'SELECT * FROM full_departments_table', (err, results) => {
      const departments = results.map(row => row.department_name);
      
      inquirer.prompt([
      {
        name: 'role_name',
        type: 'input',
        message: 'What is the name of the role?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of the role?'
      },
      {
        name: 'is_manager',
        type: 'confirm',
        message: 'Is this a manager position?'
      },
      {
        name: 'department_name',
        type: 'list',
        message: 'Which department does the role belong to?',
        choices: departments
      },
      ])
      .then((answers) => {
          connection.execute('SELECT id FROM departments WHERE department_name = ?', [answers.department_name], (err, results) => {
          if (err) {
            console.error(err);
            return
          } else if (!results.length) {
            console.error(`Error finding ${answers.department_name} in the table`);
            return
          }
          const department_id = results[0].id;
          connection.execute(
            'INSERT INTO roles (role_name, salary, is_manager, department_id) VALUES (?,?,?,?)',[answers.role_name,answers.salary,answers.is_manager,department_id], (err,results) => {
              if (err) {
                console.error(err);
                return
              }
              console.log('New role added!')
              console.table(results);
            }
          )
        })
      })
    }
  )

  
}

function viewAllDepartments() {
  connection.execute(
    'SELECT department_name FROM departments', (err, results) => {
      if (err) {
        console.error(err);
        return
      }
      console.table(results);
    }
  )
}

function addDepartment() {
  inquirer.prompt([
    {
      name: 'department_name',
      type: 'input',
      message: 'What is the name of the department?'
    }
  ])
  .then((answers) => {
    connection.execute(
      'INSERT INTO departments (department_name) VALUES (?)', [answers.department_name], (err, results) => {
        if (err) {
          console.error(err);
          return
        }
        console.log(`New department added!`,results);
      }
    )
  })
}

function updateManagersList() {
  connection.execute(
    'SELECT * FROM managers',
    (err, results) => {
      if (err) {
        console.error(err,'Could not update managers list');
        return
      }
      questions.addEmployee[questions.addEmployee.findIndex((question) => question.name === 'employeeRole')].choices = results.map(m => `${m.Name}, ${m.Role}`)
    }
  )
}

function updateRolesList() {
  connection.execute(
    'SELECT role_name FROM roles',
    (err, results) => {
      if (err) {
        console.error(err,'Could not update roles list');
        return
      }
      console.table(results);
    }
  )
}

function updateDepartmentsList() {
  connection.execute(
    'SELECT department_name FROM departments',
    (err, results) => {
      if (err) {
        console.error(err,'Could not update departments list');
        return
      }
      console.table(results);
    }
  )
}