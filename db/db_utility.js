const db = require('./db-connections');

exports.checkConnection = () => {
  return new Promise((resolve, reject) => {
    db.getConnection((err,connection) => {
      if(err){
          if(connection) connection.release();
        reject(err);
      }else{
        resolve('success');
      }
    });
  });
}

exports.releaseConnection = () => {
  db.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
  });
}