const Modal = {
    //abrir modal e adicionar classe active
    open(){
        document.querySelector('.modal-overlay').classList.add('active');
    },
    //fechar o modal e remover a classe active
    close(){
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Criação de Website',
        amount: 500000,
        date: '24/01/2021',
    },
    {
        id: 3,
        description: 'Aluguel',
        amount: -150000,
        date: '26/01/2021',
    },
]

const Transaction = {
    incomes(){
        //somar as entradas
    },
    expenses(){
        //somar as saídas
    },
    total(){
        //entradas - saídas
    }
}

const DOM = {
    //pega o tbody
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction){
        const tr = document.createElement('tr');
        //coloca as informacoes dentro do tr criado
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        //coloca o tr criado dentro do tbody
        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense";
        const amount = Utils.formatCurrency(transaction.amount);
        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
        `;
        return html;
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "";

        //troca todos os caracteres que nao sao numeros ("\D") por "" g - indica que é global, ou seja, para todos os caracteres da expressao
        value = String(value).replace(/\D/g, "");
        
        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value;
    }
}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction);
});
