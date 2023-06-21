const mysql = require('mysql2');




/**
 * Get a connection in the pool and execute an operation.
 * @param {import('mysql2').Pool} pool - The database connection pool
 * @param {Function} operation - The operation to execute. This operation must have a connection as its first argument
 * @param {Array} [args] - Any arguments to pass to the operation
 */
function dbOperation(pool,operation,args=[]) {
  pool.getConnection((err,db) => {
    if (err) {
      console.error('Error connecting to the database: ',err);
      return
    }

    operation(db, ...args);

    db.release();
  })
}


function addDepartment(db,departmentName) {
  return db.promise().query('INSERT INTO departments (department_name) VALUES (?)',departmentName,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  })
}

module.exports = {
  addDepartment,

  //several functions
}