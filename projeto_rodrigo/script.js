
//Função para carregar usuários do localStorage na tabela: PRECISA TESTAR E ANALISAR SE ESTA TUDO FUNCIONANDO
function loadUsersToTable() {  
    userList.innerHTML = ""; // Limpa o conteúdo da tabela antes de recarregar os dados  
    let users = JSON.parse(localStorage.getItem("users")) || []; // Obtém os usuários do localStorage e converte de JSON para array. Se não houver usuários, retorna um array vazio  
    users.forEach(user => addUserToTable(user)); // Percorre o array de usuários e adiciona cada um à tabela  
}


// Adiciona um evento de "submit" ao formulário  
const form = document.getElementById("form");  
form.addEventListener("submit", async function(event){
    event.preventDefault(); // Impede o envio do formulário
    const id = document.getElementById("userId").value;
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value; 

    if (id) {  
        updateUser(id, name, email); // Se o ID existir, chama a função para atualizar o usuário  
    } else {  
        createUser(name, email); // Se não houver ID, cria um novo usuário  
    }  

    form.reset(); // Limpa os campos do formulário após a submissão  
});  

// Função para inserir usuário na tabela: PRONTO
function addUserToTable(user) {
    let row = document.createElement("tr");

    let celula_nome = document.createElement("td");
    celula_nome.innerText = `${user.name}`;

    let celula_email = document.createElement("td");
    celula_email.innerText = `${user.email}`;

    let celula_botoes = document.createElement("td");

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



//funcao excluir usuario: PRECISA TESTAR
function deleteUser(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Converte id para número antes de comparar (caso venha como string)
    users = users.filter(u => u.id !== Number(id));
    
    // Atualiza o localStorage
    localStorage.setItem("users", JSON.stringify(users));
    
    // Atualiza a tabela
    loadUsersToTable(user);
}


// Função para editar um usuário existente
function editUser(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Encontra o usuário pelo ID
    let idUser = users.findIndex(user => user.id === Number(id));
    if (idUser === -1) {
        alert("Usuário não encontrado!");
        return;
    }

    // Pede novos valores ao usuário
    let novo_nome = prompt("Novo nome:", users[userIndex].name);
    let novo_email = prompt("Novo e-mail:", users[userIndex].email);

    // Se o usuário não cancelar, atualiza os valores
    if (novo_nome !== null && novo_nome.trim() !== "") {
        users[userIndex].name = newName;
    }
    if (novo_email !== null && novo_email.trim() !== "") {
        users[idUser].email = novo_email;
    }

    // Salva os dados atualizados no localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Atualiza a tabela para refletir as mudanças
    loadUsersToTable(user);
}
