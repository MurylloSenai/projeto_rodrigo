
//Função para carregar usuários do localStorage na tabela
async function loadusers() {
    const userList = document.getElementById("userlist")
    userList.innerHTML = "";

    try{
        let resposta = await fetch("http://localhost:3000/usuario/")
        let users = await resposta.json();
        console.log(users)
        users.array.forEach(user => addUserToTable(user));
    } catch (error) {
        console.error("erro ao carregar usuarios", error)
    }
}

// Adiciona um evento de "submit" ao formulário  
const form = document.getElementById("form");  
form.addEventListener("submit", async function(event){
    event.preventDefault(); // Impede o envio do formulário
    const id = document.getElementById("userId").value;
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value; 

    if (id) 
    {
        updateUser(id, name, email); // Se o ID existir, chama a função para atualizar o usuário  

    } else 
    {  
        createUser(name, email); // Se não houver ID, cria um novo usuário 
    }  

    form.reset(); // Limpa os campos do formulário após a submissão  
});  


async function createUser(name, email) {

    try {
        const response = await fetch("http://localhost:3000/usuario/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email,}),
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!", "success");
            document.querySelector("#cadastrarContaModal form").reset();
        } else {
            const data = await response.json();
            alert(data.error || "Erro ao realizar cadastro.", "danger");
        }
    } catch (error) {
        console.error("Erro ao fazer cadastro:", error);
        alert("Erro ao tentar cadastrar. Tente novamente mais tarde.", "danger");
    }
    
}


// Função para inserir usuário na tabela: PRONTO
function addUserToTable(user) {
    let row = document.createElement("tr");

    let celula_nome = document.createElement("th");
    celula_nome.innerText = `${user.name}`;

    let celula_email = document.createElement("th");
    celula_email.innerText = `${user.email}`;

    let celula_botoes = document.createElement("th");

    let botao_editar = document.createElement("button");
    botao_editar.innerText = "Editar";
    botao_editar.addEventListener("click",  editUser(user.id));

    let botao_excluir = document.createElement("button");
    botao_excluir.innerText = "Excluir";
    botao_excluir.addEventListener("click",  deleteUser(user.id));

    celula_botoes.append(botao_editar, botao_excluir);
    row.append(celula_nome, celula_email, celula_botoes);

    // Adiciona a linha na tabela
    userList.appendChild(row);
}

//funcao excluir usuario: 
document.querySelector("button")
.addEventListener("click",()=>{
    fetch(`http://localhost:3000/usuario/email/${id_usuario}`,{
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            "usuario" : document.querySelector("#usuario").value,
            "email" : document.querySelector("#email").value
           
        })
    }).then((resposta)=>{
        if(resposta.status != 200){
            console.log(resposta.json())
        }
    })
})

// Função para editar
document.querySelector("button")
.addEventListener("click",()=>{
    fetch(`http://localhost:3000/usuario/email/${id_usuario}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            "usuario" : document.querySelector("#usuario").value,
            "email" : document.querySelector("#email").value
           
        })
    }).then((resposta)=>{
        if(resposta.status != 200){
            console.log(resposta.json())
        }
    })
})
