# Employee Tracker

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [User Story](#user-story)
3. [Acceptance Criteria](#acceptance-criteria)
4. [Features](#features)
3. [Comments](#comments)
4. [License](#license)

## Description

This is a Content Management System command-line interface, allowing an employer to manage a database of their personnel.  It uses Node.js, Inquirer, and MySQL.

## Demo

[Video Demo Link](https://drive.google.com/file/d/1SmEmhgszYWYP1SzUGL_nzVpMEQAYNZRw/view)

## Installation

1. Download a copy of the repository.
2. In the command line, navigate to the repo and run `npm install`.
3. Make sure you have [MySQL](https://www.mysql.com/) installed and set up.  See [this installation guide](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide) for any help.
4. Log into your MySQL Shell, and run `source db/schema.sql`.
5. For some sample data to start, run `source db/seeds.sql`.
6. Then exit the shell.
7. In the repo folder, create a file called .env containing the following. Replace "root" and "localhost" with your username and host if needed, and insert your own password.
```
DB_DATABASE='personnel_db'
DB_PASSWORD=''
DB_USER='root'
DB_HOST='localhost'
```
8. Now you can run `npm start` to get started!

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Features

In addition to the acceptance criteria, I added a couple columns I thought would be important.  I included the employee's entry date, since seniority is often important.  A command could then be added for showing all the employees in a department or role, ordered by entry date.  I also included in the roles table, whether it is a management role or not.  This way, when asking the user who is the manager of an employee, the list of choices can be filtered to just those employees who have a manager role.

## Comments

1. A particularly useful function was creating "views" in the SQL schema.  This way, I could combine tables and columns from the start, instead of fitting all that in the `connection.execute()` statment.  Since views act just like tables, from the perspective of retrieving data, I could just select all from a previously created view and directly display it.

1. I would really like, when creating a new employee for example, to have the ability start adding a new role if the employee's role wasn't in the database already.  I decided to try to focus on a Minimum Viable Product, however.

2. A similar 'future feature' idea would be to give an option for how to order the employees, and how many to show, since the amount would be so many.  With MySql2, you can't put column names as a parameter, so there would need to be some extra steps added to validate the column name.  Though, I would have the choices list generate from the columns list itself.

2. The biggest hang up with this project was handling asynchronous functions, and how things display in the console.  When I had `await main()` *after* an operation, the intro question and the table shown from the operation will be in the same position.  First, the table would cover up the question, and then if I used the up/down arrow keys, then the intro question would cover up the table.  But when I found each ending point in each operation -- including all the different if/then cases -- then the new question actually appeared below the table.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)