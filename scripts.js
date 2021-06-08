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

const Transaction = {
    all: transactions = [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021',
        },
        {
            description: 'Criação de Website',
            amount: 500000,
            date: '24/01/2021',
        },
        {
            description: 'Aluguel',
            amount: -150000,
            date: '26/01/2021',
        },
    ],
    add(transaction){
        Transaction.all.push(transaction);
        
        App.reload();
    },
    remove(index){
        Transaction.all.splice(index, 1);
        
        App.reload();
    },
    incomes(){
        //somar as entradas
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })
        return income;
    },
    expenses(){
        //somar as saídas
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total(){
        //entradas - saídas
        return Transaction.incomes() + Transaction.expenses(); 
    }
}

const DOM = {
    //pega o tbody
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr');
        //coloca as informacoes dentro do tr criado
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index;
        //coloca o tr criado dentro do tbody
        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense";
        const amount = Utils.formatCurrency(transaction.amount);
        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        `;
        return html;
    },

    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {
    formatAmount(value){
        value = Number(value.replace(/\,\./g, "")) * 100;

        return value;
    },

    formatDate(date){
        const splittedDate = date.split("-");

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    },

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

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields(){
        const {description, amount, date} = Form.getValues();

        if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
            throw new Error("Por favor, preencha todos os campos");
        }
    },

    formatValues(){
        let {description, amount, date} = Form.getValues();

        amount = Utils.formatAmount(amount);

        date = Utils.formatDate(date);

        return{
            description,
            date,
            amount
        }
    },

    clearFields(){
        Form.description.value = "";
        Form.amount.value = "";
        Form.date.value = "";
    },

    submit(event){
        //nao executa o comportamento default do form
        event.preventDefault();

        try{
            Form.validateFields();
            const transaction = Form.formatValues();
            Transaction.add(transaction);
            Form.clearFields();
            Modal.close();
        }catch(error){
            alert(error.message);
        }
    }
}

const App = {
    init(){
        //coloca as transacoes que estao armazenadas na tela
        Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index);
        });
        //faz a atualizacao das entradas, saidas e total
        DOM.updateBalance();
    },
    reload(){
        DOM.clearTransactions();
        App.init();
    }
}

App.init();
