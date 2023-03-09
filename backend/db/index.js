const Pool = require('pg').Pool;

let dbURL = {
    connectionString: process.env.DATABASE_URL ||
        'postgres://postgres:postgres@localhost:5432/postgres'
}

const pool = new Pool(dbURL);

pool.connect();

exports.getUsers = (req, res) => {
    pool.query('SELECT * from users limit 3', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
}
exports.getUserById = async (id)=>{
    const results = await
        pool.query('SELECT * from users where id = $1', [id])
    return results.rows[0];
}

exports.getLoginUser = (req, res) =>{
    const user = req.user;
    console.log('sesson user:',user);
    res.json(user)
}
exports.addUser = (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user= {message:'addUser', username: username, password:password}
    console.log('sesson user:',user);
    res.json(user)
}

exports.authUserByName = async (username) => {
    const results = await
        pool.query('SELECT * from users where username = $1', [username])

    return results.rows[0];
}