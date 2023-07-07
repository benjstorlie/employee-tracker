module.exports = {
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
  intro: [{
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
    ],
    /**
     * Change the user's selection into the name of a function in index.js
     * @param {String} value - One of the items in the array choices 
     * @returns value changed to camelCase
     */
    filter(value) {
      return value.replace(/^\w|[A-Z]|\b\w/g, (match, index) => (index === 0 ? match.toLowerCase() : match.toUpperCase()))
      .replace(/\s+/g, '');
    }
  }],

  /**
   * @type {Question[]}
   */
  addDepartment: [{
    name: 'department_name',
    type: 'input',
    message: 'What is the name of the department?'
  }],

  /**
   * @type {Question[]}
   */
  addRole: [
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
      name: 'department_name',
      type: 'list',
      message: 'Which department does the role belong to?',
      choices: ['none'],
      filter(value) {
        return (value === 'none') ? null : value
      }
    },
  ],

  /**
   * @type {Question[]}
   */
  addEmployee: [
    {
      name: 'first_name',
      type: 'input',
      message: 'What is the employee\'s first name?',
      validate(value) {
        return value.includes('💼') ? '💼 not allowed in names' : true; 
      }
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'What is the employee\'s last name?',
      validate(value) {
        return value.includes('💼') ? '💼 not allowed in names' : true; 
      }
    },
    {
      name: 'role_name',
      type: 'list',
      message: 'What is the employee\'s role?',
      choices: ['none'],
      filter(value) {
        return (value === 'none') ? null : value
      }
    },
    {
      name: 'manager_name',
      type: 'list',
      message: 'Who is the employee\'s manager?',
      choices: ['none'],
      filter(value) {return value === 'none' ? null : value.split(' 💼 ')[0]}
    },
  ],

  /**
   * @type {Question[]}
   */
  updateEmployeeRole: [
    {

    }
  ],

  /**
   * Change the values of a question in a prompt without needing to reference the order they are in.
   * @param {String} prompt - to which prompt does the question to update belong?
   * @param {String} name - the name of the question to update
   * @param {*} newValues - an object with the new values specified by property, such as `{choices: ['choice1','choice2']}`
   */
  updatePrompt: function (prompt, name, updatedValues) {
    const index = this[prompt].findIndex(question => question.name === name);
    if (index !== -1) {
      this[prompt][index] = { ...this[prompt][index], ...updatedValues };
    }
  }
}
