SOURCE db/schema.sql;
SOURCE db/seeds.sql;


-- SELECT
--   e.id,
--   e.first_name AS "First Name",
--   e.last_name AS "Last Name",
--   r.id,
--   r.role_name AS "Role",
--   CONCAT(m.first_name, ' ', m.last_name) AS Manager,
--   mr.role_name AS "Manager Role"
-- FROM
--   employees AS e
--   CROSS JOIN roles AS r ON e.role_id = r.id
--   LEFT JOIN employees AS m ON e.manager_id = m.id
--   LEFT JOIN roles AS mr ON m.role_id = mr.id
-- ORDER BY r.id, mr.id;

