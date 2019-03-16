 //instatiate environment variables
require('dotenv').config();

module.exports = {
    app:                process.env.APP,
    port:               process.env.PORT,
    db_dialect:         process.env.DB_DIALECT,
    db_host:            process.env.DB_HOST,
    db_ports:           process.env.DB_PORT,
    db_name:            process.env.DB_NAME,
    db_user:            process.env.DB_USER,
    db_password:        process.env.DB_PASSWORD,
    db_conn_limit:      process.env.DB_CONNECTION_LIMIT,
    email_password:     process.env.EMAIL_PASSWORD
};