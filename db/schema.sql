DROP DATABASE IF EXISTS personnel_db;
CREATE DATABASE personnel_db;

USE personnel_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(255) NOT NULL,
  salary DECIMAL,
  department_id INT,
  is_manager BOOLEAN,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL, 
  role_id INT,
  manager_id INT,
  entry_date DATE DEFAULT (CURRENT_DATE),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL
);

CREATE VIEW full_employees_table AS
  SELECT
    e.first_name AS "First Name",
    e.last_name AS "Last Name",
    r.role_name AS "Role",
    CONCAT(m.first_name, ' ', m.last_name) AS Manager,
    mr.role_name AS "Manager Role"
  FROM
    employees AS e
    LEFT JOIN roles AS r ON e.role_id = r.id
    LEFT JOIN employees AS m ON e.manager_id = m.id
    LEFT JOIN roles AS mr ON m.role_id = mr.id
  ORDER BY r.id, mr.id;

CREATE VIEW full_roles_table AS
  SELECT
    r.role_name AS "Role",
    d.department_name AS "Department",
    COUNT(e.role_id) AS "Number of Employees"
  FROM
    roles AS r
    LEFT JOIN departments AS d ON r.department_id = d.id
    LEFT JOIN employees AS e ON r.id = e.role_id
  GROUP BY r.id;

CREATE VIEW full_departments_table AS
  SELECT
    d.department_name AS "Department",
    COUNT(e.role_id) AS "Number of Employees"
  FROM
    departments AS d
    LEFT JOIN roles AS r ON r.department_id = d.id
    LEFT JOIN employees AS e ON r.id = e.role_id
  GROUP BY d.department_name;

CREATE VIEW managers AS
  SELECT
    CONCAT(e.first_name, ' ', e.last_name) AS Name,
    r.role_name AS Role
  FROM
    employees AS e
    LEFT JOIN roles AS r ON r.id = e.role_id
  WHERE
    r.is_manager = true;

CREATE VIEW last_employee_updated AS
  SELECT
    e.first_name AS "First Name",
    e.last_name AS "Last Name",
    r.role_name AS "Role",
    CONCAT(m.first_name, ' ', m.last_name) AS Manager,
    mr.role_name AS "Manager Role"
  FROM
    employees AS e
    LEFT JOIN roles AS r ON e.role_id = r.id
    LEFT JOIN employees AS m ON e.manager_id = m.id
    LEFT JOIN roles AS mr ON m.role_id = mr.id
  ORDER BY e.updated_at DESC, e.id DESC LIMIT 1;

CREATE VIEW last_department_updated AS
  SELECT
    d.department_name AS "Department",
    COUNT(e.role_id) AS "Number of Employees"
  FROM
    departments AS d
    LEFT JOIN roles AS r ON r.department_id = d.id
    LEFT JOIN employees AS e ON r.id = e.role_id
  GROUP BY d.id
  ORDER BY d.updated_at DESC, d.id DESC LIMIT 1;
    
CREATE VIEW last_role_updated AS
  SELECT
    r.role_name AS "Role",
    d.department_name AS "Department",
    COUNT(e.role_id) AS "Number of Employees"
  FROM
    roles AS r
    LEFT JOIN departments AS d ON r.department_id = d.id
    LEFT JOIN employees AS e ON r.id = e.role_id
  GROUP BY r.id
  ORDER BY r.updated_at DESC, r.id DESC LIMIT 1;

