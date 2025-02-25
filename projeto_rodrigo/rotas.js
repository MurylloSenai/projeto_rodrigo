import express from 'express'
import cors from 'cors'
import sql from './bd.js'


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//busca de usuarios 
app.get('/busca/:usuario/:email',async (req, res)=>{
    const { usuario, email } = req.params
    try{
        
        const consulta = await sql`select * from Gerenciador where usuario = ${usuario} and email = ${email};`
        if(consulta != null && consulta != ''){
            return res.status(200).json(consulta)
        }
        else{
            return res.status(401).json('Usuario ou senha incorretos')
        }
    }
    catch(error){   
        console.log(error)
        return res.status(500).json('um erro inesperado ocorreu')
    }
    
    
});

//Busca geral de usuarios
app.get('/busca', async (req, res) => {
    try {
        // Consulta sem condições
        const consulta = await sql`select * from Gerenciador`
        
        if (consulta && consulta.length > 0) {
            return res.status(200).json(consulta)
        } else {
            return res.status(404).json('Nenhum usuário encontrado')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json('Um erro inesperado ocorreu')
    }
});


//cadastro de usuario: Funcional
app.post('/usuario/email', async (req, res)=>{
    try{
        const {usuario, email} = req.body;
    await sql`insert into Gerenciador (usuario, email) values (${usuario}, ${email});`
    return res.status(200).json('ok')
    }
    catch(error){
        console.log(error)
        return res.status(500).json('erro ao cadastrar usuario')
    }
})





    //Editar usuario
    app.put('/email/:usuario', async (req, res)=>{
        try{
            const {email, usuario} = req.body
            await sql`update Gerenciador set usuario =  ${usuario} where email = ${email};`
    
            return res.status(200).json('Ação efetuada')
        }
        catch(error){
            console.log(error)
            return res.status(500).json('Ocorreu um erro ao editar')
        }
    })


// Deletar usuario

app.delete('/delete/:id', async(req, res)=>{
    try{
        const {id}= req.params
        await sql`DELETE FROM Gerenciador WHERE id_usuario = ${id};`

        return res.status(200).json('Ação efetuada')
    }
    catch(error){
        console.log(error)
        return res.status(500).json('ocorreu um erro ao deletar coluna')
    }
})







app.listen(3000,()=>{
    console.log('FUNFO A API')
});