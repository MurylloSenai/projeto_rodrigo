document.addEventListener("DOMContentLoaded", loadusers());  
// Quando a página é carregada, chama a função `loadusers` para exibir os usuários na tabela.

// Função para carregar usuários do servidor e exibir na tabela: PRONTO
async function loadusers() {
    const userList = document.getElementById("userlist"); // Obtém a referência do elemento HTML onde os usuários serão listados
    userList.innerHTML = ""; // Limpa a tabela antes de carregar novos usuários

    try {
        let resposta = await fetch("http://localhost:3000/busca"); // Faz uma requisição GET para buscar os usuários no backend
        let users = await resposta.json(); // Converte a resposta para JSON
        console.log(users); // Exibe os usuários no console (para depuração)
        users.map((user) => addUserToTable(user)); // Adiciona cada usuário à tabela
    } catch (error) {
        console.error("Erro ao carregar usuários", error); // Exibe um erro no console caso a requisição falhe
    }
}

// Adiciona um evento de "click" ao botão salvar do formulário: PRONTO  
const botao_salvar = document.querySelector("#Salvar"); // Obtém o botão "Salvar"
botao_salvar.addEventListener("click", async function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário (evita recarregar a página)

    const id = document.getElementById("userId").value; // Obtém o ID do usuário (se existir)
    const name = document.getElementById("name").value; // Obtém o nome do usuário do formulário
    const email = document.getElementById("email").value; // Obtém o email do usuário do formulário

    if (id) {  
        updateUser(id, name, email); // Se o ID existir, chama a função para atualizar o usuário  
    } else {  
        await createUser(name, email); // Se não houver ID, chama a função para criar um novo usuário
    }  

    
});  

// Função para criar um novo usuário: PRONTO
async function createUser(usuario, email) {
    try {
        const response = await fetch("http://localhost:3000/usuario/email", {
            method: "POST", // Método HTTP para criar um novo usuário
            headers: {
                "Content-Type": "application/json", // Define o cabeçalho para enviar JSON
            },
            body: JSON.stringify({ usuario, email }), // Envia os dados do novo usuário no corpo da requisição
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!", "success"); 
            return;
        } else {
            const data = await response.json(); // Obtém a resposta do servidor
            alert(data.error || "Erro ao realizar cadastro.", "danger"); 
        }
    } catch (error) {
        console.error("Erro ao fazer cadastro:", error); 
        alert("Erro ao tentar cadastrar. Tente novamente mais tarde.", "danger"); 
    }
}

// Função para inserir um usuário na tabela: PRONTO
function addUserToTable(user) {
    const userList = document.getElementById("userlist"); // Obtém a referência da tabela

    let row = document.createElement("tr"); // Cria uma nova linha na tabela

    let celula_nome = document.createElement("th"); // Cria a célula para o nome do usuário
    celula_nome.innerText = `${user.usuario}`; // Insere o nome do usuário na célula

    let celula_email = document.createElement("th"); 
    celula_email.innerText = `${user.email}`; // Insere o email do usuário na célula

    let celula_botoes = document.createElement("th"); 

    let botao_editar = document.createElement("button"); 
    botao_editar.innerText = "Editar";
    botao_editar.addEventListener("click", () => editUser(user.usuario, user.email)); // Adiciona o evento de clique para chamar `editUser`

    let botao_excluir = document.createElement("button"); 
    botao_excluir.innerText = "Excluir"; 
    botao_excluir.addEventListener("click", () => deleteUser(user.id_usuario)); // Adiciona o evento de clique para chamar `deleteUser`

    celula_botoes.append(botao_editar, botao_excluir); // Adiciona os botões à célula de botões
    row.append(celula_nome, celula_email, celula_botoes); // Adiciona as células à linha

    userList.appendChild(row); // Adiciona a linha completa à tabela
}

// Função para excluir um usuário: PRONTO
async function deleteUser(id_usuario) {
    try {
        const res = await fetch(`http://localhost:3000/delete/${id_usuario}`, {
            method: "DELETE", // Método HTTP para excluir um usuário
        });

        if (res.ok) {
            alert("Usuário excluído com sucesso!"); 
            loadusers(); 
        } else {
            alert("Erro ao excluir usuário.");
        }
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Falha ao excluir usuário.");
    }
}

// Função para editar um usuário: PRONTO
async function editUser(usuario, email) {
    try {
        const res = await fetch(`http://localhost:3000/email/${usuario}`, {
            method: "PUT", // Método HTTP para atualizar um usuário
            headers: {
                "Content-Type": "application/json", // Define o cabeçalho para enviar JSON
            },
            body: JSON.stringify({ usuario, email }), // Envia os dados editados no corpo da requisição
        });

        if (res.ok) {
            alert("Usuário editado com sucesso!");
            loadusers(); 
        } else {
            alert("Erro ao editar o usuário."); 
        }
    } catch (error) {
        console.error("Erro ao editar usuário:", error); 
        alert("Falha na edição do usuário."); 
    }
}   