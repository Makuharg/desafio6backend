const verificarDatosRegister = (req,res,next) => {
    let { email, password, rol, lenguage } = req.body;
    if(email && password && rol && lenguage){
        next()
    } else{
        res.status(500).json({
            msg: "Complete todos los campos"
        });
    }
}

const verificarDatosLogin = (req,res,next) => {
    const { email, password } = req.body;
    if(email && password){
        next()
    } else{
        res.status(500).json({
            msg: "Complete todos los campos"
        });
    }
}

export{
    verificarDatosRegister, verificarDatosLogin
}