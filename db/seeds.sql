-- Inserting departments
INSERT INTO departments (department_name) VALUES
  ('Mathematics'),
  ('Science'),
  ('English'),
  ('History'),
  ('Office'),
  ('Special Services');

-- Inserting roles
INSERT INTO roles (role_name, salary, is_manager, department_id) VALUES
  ('Math Teacher', 50000, 0, 1),
  ('Science Teacher', 55000, 0, 2),
  ('English Teacher', 48000, 0, 3),
  ('Principal', 80000, 1, 5),
  ('Vice Principal', 70000, 1, 5),
  ('History Teacher', 52000, 0, 4),
  ('Paraprofessional', 35000, 0, 6),
  ('1:1 Paraprofessional', 38000, 0, 6),
  ('Secretary', 40000, 0, 5),
  ('Speech Language Pathologist', 60000, 0, 6),
  ('Guidance Counselor', 60000, 0, 6),
  ('Occupational Therapist', 60000, 0, 6),
  ('Physical Therapist', 60000, 0, 6);

-- Inserting employees
INSERT INTO employees (first_name, last_name, role_id, manager_id, entry_date) VALUES
  ('John', 'Smith', 4, NULL, '2022-01-15'),
  ('Alice', 'Johnson', 5, 4, '2022-02-01'),
  ('Bob', 'Williams', 1, 4, '2022-03-10'),
  ('Charlie', 'Davis', 2, 5, '2022-04-03'),
  ('Eva', 'Brown', 3, 4, '2022-05-22'),
  ('Frank', 'Miller', 6, 5, '2022-06-08'),
  ('Grace', 'Anderson', 2, 4, '2022-07-17'),
  ('Henry', 'Taylor', 1, 5, '2022-08-04'),
  ('Isabella', 'Moore', 6, 4, '2022-09-21'),
  ('Jack', 'Clark', 3, 5, '2022-10-11'),
  ('Kate', 'Lee', 2, 4, '2022-11-28'),
  ('Liam', 'Wilson', 1, 5, '2022-12-09'),
  ('Sarah', 'Jones', 7, 1, '2022-01-03'),
  ('Michael', 'Thompson', 7, 1, '2022-01-03'),
  ('Emma', 'Davis', 8, 2, '2022-01-03'),
  ('Olivia', 'Johnson', 8, 3, '2022-01-03'),
  ('Sophia', 'Smith', 9, 5, '2022-01-03'),
  ('Daniel', 'Brown', 9, 5, '2022-01-03'),
  ('Emily', 'Taylor', 10, 5, '2022-01-03'),
  ('William', 'Miller', 11, 5, '2022-01-03'),
  ('Alexander', 'Anderson', 11, 5, '2022-01-03'),
  ('Ava', 'White', 12, 5, '2022-01-03'),
  ('James', 'Robinson', 12, 5, '2022-01-03'),
  ('Abigail', 'Harris', 12, 5, '2022-01-03'),
  ('Natalie', 'Lewis', 12, 5, '2022-01-03'),
  ('Ryan', 'Moore', 12, 5, '2022-01-03');