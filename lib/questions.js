/**
 * @typedef Question
 * @type {Object}
 * @property {String} type - The type of question, 'list' or 'input' for example
 * @property {String} name - Name to identify the question. The property name for this question's answer in the inquirer object 'answers'
 * @property {String} message - The message shown to the user in the console.
 * @property {String[]} [choices] - An array of choices for a question of type 'list' or 'rawlist'
 * @property {Function} [when] - Returns a Boolean for whether to show the question or not.
 * @property {Function} [filter] - A filtering function for the answer. answers.name will show the output of the filter function
 * @property {Function} [validate] - Whether the user's typed input is valid. Returns either the Boolean 'true', or an error, prompting the user to edit their response.
*/

/**
 * @type {Question[]}
 */
const intro = [{
  name: 'command',
  type: 'list',
  message: 'What would you like to do?',
  choices: [
    'View All Employees',
    'Add Employee',
    'Update Employee Role',
    'View All Roles',
    'Add Role',
    'View All Departments',
    'Add Department',
    'Quit'
  ]
}]

/**
 * @type {Question[]}
 */
const addDepartment = [{
  name: 'addDepartment',
  type: 'input',
  message: 'What is the name of the department?'
}]

/**
 * @type {Question[]}
 */
const addRole = [
  {
    name: 'roleName',
    type: 'input',
    message: 'What is the name of the role?',
  },
  {
    name: 'roleSalary',
    type: 'input',
    message: 'What is the salary of the role?'
  },
  {
    name: 'roleDepartment',
    type: 'list',
    message: 'Which department does the role belong to?',
    choices: [],
    when() {this.choices.length > 0;}
  },
]

/**
 * @type {Question[]}
 */
const addEmployee = [
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
    choices: [],
    when() {this.choices.length > 0;}
  },
  {
    name: 'employeeManager',
    type: 'list',
    message: 'Who is the employee\'s manager?',
    choices: [],
    when() {this.choices.length > 1;}
  },
]

/**
 * @type {Question[]}
 */
const updateEmployeeRole =[
  {

  }
]

module.exports = {
  intro,
  addDepartment,
  addEmployee,
  addRole,
  updateEmployeeRole
}
