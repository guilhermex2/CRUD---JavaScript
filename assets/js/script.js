const tempClient = {
    nome: "Guilherme",
    email: "guilherme@mail.com",
    telefone: "734489923",
    cidade: "Ipiaú-BA"
}

//Caso o localstorage esteja vazio, será criado um array vazio para armazenar os obejetos
//Mandando os clientes para o localstorage
const getLocalstorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalstorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient)) 

//Create
const createClient = (client) => {
    //Chamando a função get para verificar o localstorage
    const dbClient = getLocalstorage()
    dbClient.push(client)
    setLocalstorage(dbClient)//Mandando cliente
}

//Read
const readClient = () => getLocalstorage()//Função para buscar cliente

//Update
const updateClient = (index, client) =>{
    const dbClient = readClient() //Irá ler os dados e mandar para variavél
    dbClient[index] = client
    setLocalstorage(dbClient)//Mandando cliente atualizado
}

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalstorage(dbClient)
}
//Limpa os campos
const clearFields = () =>{
    const fields = document.querySelectorAll('.fields')
    fields.forEach(field => field.value = '')
}
//Pegando valores e salvando dados 
const saveClient = () => {
    const client = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cidade: document.getElementById('cidade').value,
        telefone: document.getElementById('telefone').value
    }
    console.log('Cadastrado');
    createClient(client);
    clearFields()
}
//Atualiza clientes
const createRow = (client) =>{
    const newRow = document.createElement('div')
    newRow.innerHTML = `
    Nome: ${client.nome}</br>
    Email: ${client.email}</br>
    Cidade: ${client.cidade}</br>
    Telefone: ${client.telefone}</br>
    `
    document.querySelector('.areaClientes').appendChild(newRow)
}
const updateTable = () => {
    const areaClientes = document.querySelector('.areaClientes');
    areaClientes.innerHTML = ''; // Limpa a área de clientes
    const dbClient = readClient();
    dbClient.forEach(createRow);
}
document.getElementById('btn-salvar').addEventListener('click', saveClient)