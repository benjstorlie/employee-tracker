// const inquirer = require('inquirer');

// inquirer.prompt([
//   {
//     name: 'testConfirm',
//     type: 'confirm',
//     message: 'Press [enter] to continue',
//     prefix: '--> ',
//     transformer() {
//       return false
//     },
//   },
//   {
//     name: "testList",
//     type: "list",
//     choices: ['a','b','c'],
//     default: 'd',
//   }
  
// ])
// .then((answers) => {
//   console.log(answers.testConfirm)
// })

const choices = [
  'View All Employees',
  'Add Employee',
  'Update Employee Role',
  'View All Roles',
  'Add Role',
  'View All Departments',
  'Add Department',
  'Quit'
]

function filter(value) {
  return value.replace(/^\w|[A-Z]|\b\w/g, (match, index) => (index === 0 ? match.toLowerCase() : match.toUpperCase()))
  .replace(/\s+/g, '');
}

for (const x of choices) {
  console.log(`{name: '${x}', value: '${filter(x)}'},`)
}