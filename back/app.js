const express = require('express');
const cors = require('cors');
const { obtenerUsuarios, registrarUsuarios, loginUsuarios } = require("./controllers/usuarioControllers");
const { verificarDatosRegister, verificarDatosLogin } = require('./middleware/verificacionDatos');
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//levantamos servidor
app.listen(3000, console.log("Server on"));

app.get("/usuarios", async(req,res)=>{
    obtenerUsuarios(req,res);
});

app.post("/usuarios", verificarDatosRegister, async(req,res)=>{
    registrarUsuarios(req,res);
});

app.post('/login', verificarDatosLogin, async(req,res)=>{ 
    loginUsuarios(req,res);
});


