const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const budgetItems = [];
const expenseItems = [];
const transactions = [];

app.post('/api/budget', (req, res) => {
    const { category, amount } = req.body;
    const id = Date.now();
    const transaction = { id, category, amount, type: 'income' };
    budgetItems.push(transaction);
    transactions.push(transaction);
    res.json(transaction);
});

app.post('/api/expenses', (req, res) => {
    const { category, amount } = req.body;
    const id = Date.now();
    const transaction = { id, category, amount, type: 'expense' };
    expenseItems.push(transaction);
    transactions.push(transaction);
    res.json(transaction);
});

app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
