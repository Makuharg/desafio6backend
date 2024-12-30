const { pool } = require("../config/server.js");
const jwtKey = "Desafio6LATAM";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const obtenerUsuariosBD = async(Authorization) => {
    if(Authorization){
        const token = Authorization.split(' ')[1];
        jwt.verify(token, jwtKey);
        const { email } = jwt.decode(token);

        const consulta = "SELECT * FROM usuarios WHERE email = $1"
        const value = [ email ]
    
        const { rows } = await pool.query(consulta, value)
        return rows;
    }   else {
            const consulta = "SELECT * FROM usuarios";
            const { rows } = await pool.query(consulta);
            return rows;    
        }
}

const registrarUsuariosBD = async(email, password, rol, lenguage)=>{
    const securePassword = bcrypt.hashSync(password);
    password = securePassword;

    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
    const values = [email, securePassword, rol, lenguage];
        
    const { rowCount } = await pool.query(consulta, values);   
    
    return rowCount;
}

const loginUsuariosBD = async(email, password) =>{
    const consulta = 'SELECT * FROM usuarios WHERE email = $1'
        const value = [ email ]

        const { rows: [user], rowCount } = await pool.query(consulta, value);

        // comparamos contraseña con contraseña encriptada
        const { password: securePasword } = user
        const passwordCorrecta = bcrypt.compareSync(password, securePasword);
        
        // generamos token
        const token = jwt.sign({email}, jwtKey);

        if(!rowCount || !passwordCorrecta){
            throw {code: 404, message: "El usuario ingresado no existe"}
            }else {
                return({
                    data: user,
                    token: token
                })
        }
}

module.exports = {
    obtenerUsuariosBD, registrarUsuariosBD, loginUsuariosBD
}