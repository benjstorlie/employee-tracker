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

// Non-working function. I traded it for using {name: name, value: id} as choices, so I don't need to look up the id using the name.
async function getId(answers,item) {
  if (!['manager','department','role'].includes(item)) {
    throw new Error(`You can\'t get the ID for ${item}.`)
  } else if (answers[item+'_name'] === null) {
    return null
  } else {
    console.log(item,[answers[item + '_name']])
    const value = (item === "manager" ? "CONCAT(first_name,' ',last_name)" : item+'_name');
    const table = (item === "manager" ? "employees" : item+'s');
    try {
      const rows = await connection.execute(`SELECT id FROM ${table} WHERE ${value} = ?`, [`'${answers[item + '_name']}'`]);
      if (!rows.length) {
        throw new Error(`Error finding ${item} in the table`);
      } else if (rows[0].id === null){
        throw new Error(`Error finding ${item} in the table`);
      }
      return rows[0].id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
}