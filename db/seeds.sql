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
  ('Math Teacher', 50000, 1, 1),
  ('Science Teacher', 55000, 1, 2),
  ('English Teacher', 48000, 1, 3),
  ('Principal', 80000, 1, 5),
  ('Vice Principal', 70000, 1, 5),
  ('History Teacher', 52000, 1, 4),
  ('Paraprofessional', 35000, 0, 6),
  ('1:1 Paraprofessional', 38000, 0, 6),
  ('Secretary', 40000, 0, 5),
  ('Speech Language Pathologist', 60000, 0, 6),
  ('Guidance Counselor', 60000, 0, 6),
  ('Occupational Therapist', 60000, 0, 6),
  ('Physical Therapist', 60000, 0, 6);

-- Inserting employees
INSERT INTO employees (first_name, last_name, role_id, manager_id, entry_date) VALUES
  ("Oliver", "Johnson", 4, NULL, '2022-01-15'),
  ("Emma", "Larson", 5, NULL, '2022-02-01'),
  ("Mateo", "Gonzalez", 8, 2, '2022-01-03'),
  ("Safiya", "Mohamed", 8, 2, '2022-01-03'),
  ("Kou", "Vang", 1, 1, '2022-03-10'),
  ("Evelyn", "Andersen", 2, 1, '2022-04-03'),
  ("Carmen", "Lopez", 3, 1, '2022-05-22'),
  ("Sofia", "Hernandez", 6, 1, '2022-06-08'),
  ('Grace', 'Anderson', 2, 1, '2022-07-17'),
  ("Isaac", "Nelson", 1, 1, '2022-08-04'),
  ("Liam", "Johansson", 6, 1, '2022-09-21'),
  ("Mustafa", "Hassan", 3, 1, '2022-10-11'),
  ("Kate", "Lee", 2, 1, '2022-11-28'),
  ("Anya", "Lund", 1, 1, '2022-12-09'),
  ("Sophia", "Smith", 9, 1, '2022-01-03'),
  ("Daniel", "Brown", 9, 1, '2022-01-03'),
  ('Emily', 'Taylor', 10, 1, '2022-01-03'),
  ('William', 'Miller', 11, 1, '2022-01-03'),
  ("Alexander", "Anderson", 12, 1, '2022-01-03'),
  ('Mohammed', 'Mohammed', 13, 1, '2022-01-03'),
  ("Elena", "Garcia", 7, 5, '2022-01-03'),
  ("Mohamed", "Ali", 7, 6, '2022-01-03'),
  ("Shawnte", "White", 7, 11, '2022-01-03'),
  ("James", "Robinson", 7, 12, '2022-01-03'),
  ("Abigail", "Harris", 7, 9, '2022-01-03'),
  ("Sara", "Xiong", 7, 13, '2022-01-03');