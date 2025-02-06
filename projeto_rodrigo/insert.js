
carregar o usuario do localStorage

criar usuario
excluir usuario
atualizar usuario existente

// Form.addEventListener("submit", function(event){
//     event.prevenDefault();
//     const id = document.getElementByid("userId").value;
//     const name =  document.getElementByid("name").value;
//     const email = document.getElementByid("email").value;

//     if(id){
//         updateUser(id, name, email)
//     }
//     else {
//         createUser(name, email)
//     }

//     form.reset()
// })

    function createUser(name, email){

    }


// inserir na tabela

function addsertotable(user) {
    
let row  = document.createElement("tr");

let celula_nome = document.createElement("td")
celula_nome.innerText = `$(user.name)`
let celula_email = document.createElement("td")
celula_email.innerText = `$(user.email)`
let celula_botoes = document.createElement("td")
let botao_editar =  document.createElement("button")

botao_editar.addEventListener(`click`, editUser(user.id))
botao_editar.innerText = "editar"

let botao_excluir = document.createElement("button")
botao_excluir.addEventListener(`click`, deleteUser(user.id))
botao_excluir.innerText = "excluir"

celula_botoes.append(botao_editar, botao_excluir)
row.append(celula_nome,celula_email,celula_botoes)
    

}
userList.appendChild(row);
