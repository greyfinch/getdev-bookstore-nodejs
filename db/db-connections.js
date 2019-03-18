const mysql = require('mysql');
const configs = require('../config/config');

module.exports = mysql.createPool({
    connectionLimit :configs.db_connection_limit,
        host         : configs.db_host,
        user        : configs.db_user,
        password    : configs.db_password,
        database    : configs.db_name,
        multipleStatements: true,
})
