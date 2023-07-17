# Employee Tracker

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Comments](#comments)

## Description

## Demo

[video link](https://drive.google.com/file/d/1SmEmhgszYWYP1SzUGL_nzVpMEQAYNZRw/view)

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

## Comments

1. I would really like, when creating a new employee for example, to have the ability start adding a new role if the employee's role wasn't in the database already.  I decided to try to focus on a Minimum Viable Product, however.
2. The biggest hang up with this project was handling asynchronous functions, and how things display in the console.  When I had `await main()` *after* an operation, the intro question and the table shown from the operation will be in the same position.  First, the table would cover up the question, and then if I used the up/down arrow keys, then the intro question would cover up the table.  But when I found each ending point in each operation -- including all the different if/then cases -- then the new question actually appeared below the table.