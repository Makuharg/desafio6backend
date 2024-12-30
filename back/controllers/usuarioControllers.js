const { obtenerUsuariosBD, registrarUsuariosBD, loginUsuariosBD } = require("../models/usuarioModels");


const obtenerUsuarios = async (req,res)=>{
    const Authorization = req.header('Authorization');
    try {
        const rows = await obtenerUsuariosBD(Authorization);
        res.status(200).json(rows)
    } catch (error) {
        res.status(error.code || 500).json({
            code: error.code,
            message: error.message
        })        
    }
}

const registrarUsuarios = async (req,res)=>{
    let { email, password, rol, lenguage } = req.body;

    try {
        const rowCount = await registrarUsuariosBD(email, password, rol, lenguage)

        if(rowCount>0){
            res.status(200).json("Usuario registrado con éxito");
        }else{
            throw Error("La información ingresada no es correcta");
        }
    } catch (error) {
        res.status(error.code || 500).json({
            code: error.code,
            message: error.message
        })          
    }
}

const loginUsuarios = async (req,res)=>{
    const { email, password } = req.body;

    try {
        const { data, token } = await loginUsuariosBD(email, password);
        res.status(200).json({
            data,
            token
        })
    } catch (error) {
        res.status(error.code || 500).json({
            code: error.code,
            message: error.message
        })           
    }
}

module.exports = {
    obtenerUsuarios, registrarUsuarios, loginUsuarios
}