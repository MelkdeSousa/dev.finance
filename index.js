'use strict'

const html = document.querySelector('html')
const toggleTheme = document.getElementById('toggle')
const logo = document.getElementById('logo')

const toggleLogo = darkThemeIsActive => {
  darkThemeIsActive
    ? (logo.src = './assets/logo-dark.svg')
    : (logo.src = './assets/logo-light.svg')
}

toggleTheme.addEventListener('change', () => {
  const isActive = html.classList.toggle('dark-theme')

  toggleLogo(isActive)

  setDarkThemeStorage(isActive)
})

const modalOverlay = document.querySelector('.modal-overlay')
const contentTableDataTransaction = document.querySelector(
  '#data-transaction tbody'
)

const incomeDisplay = document.getElementById('income-display')
const expenseDisplay = document.getElementById('expense-display')
const totalDisplay = document.getElementById('total-display')

const toggleModal = () => {
  modalOverlay.classList.toggle('active')
}

const formatCurrency = value => {
  const signal = Number(value) < 0 ? '- ' : ''

  const valueSanitized = String(value).replace(/\D/g, '')

  const valueConveterd = Number(valueSanitized) / 100

  const currency = valueConveterd.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return signal + currency
}

const incomes = () => {
  let income = 0

  transactions.forEach(transaction => {
    if (transaction.amount > 0) {
      income += transaction.amount
    }
  })

  return income
}

const expenses = () => {
  let expense = 0

  transactions.forEach(transaction => {
    if (transaction.amount < 0) {
      expense += transaction.amount
    }
  })

  return expense
}

const total = () => incomes() + expenses()

const updateBalance = () => {
  incomeDisplay['innerHTML'] = formatCurrency(incomes())
  expenseDisplay['innerHTML'] = formatCurrency(expenses())
  totalDisplay['innerHTML'] = formatCurrency(total())
}

const clearTransactions = () => {
  contentTableDataTransaction['innerHTML'] = ''
}

const mounter = (transaction, index) => {
  const tr = document.createElement('tr')

  tr['innerHTML'] = addTransaction(transaction, index)
  tr['dataset']['index'] = index

  contentTableDataTransaction.appendChild(tr)
}

const addTransaction = ({ description, amount, date }, index) => {
  const CSSClass = amount >= 0 ? 'income' : 'expense'

  const amountFormated = formatCurrency(amount)

  return `
    <td class="description">${description}</td>
    <td class="${CSSClass}">${amountFormated}</td>
    <td class="date">${date}</td>
    <td>
      <img onclick="removeTransaction(${index})" src="./assets/minus.svg" alt="Remove transaction" />
    </td>
  `
}

const addNewTransaction = transaction => {
  transactions.push(transaction)

  appReload()
}

const removeTransaction = indexTransaction => {
  transactions.splice(indexTransaction, 1)
  appReload()
}

const getFields = () => {
  const description = document.querySelector('input#description')
  const amount = document.querySelector('input#amount')
  const date = document.querySelector('input#date')

  console.log('-> getFields: ', amount)

  return {
    description,
    amount,
    date,
  }
}

const getValuesFieldsForm = () => {
  const { description, amount, date } = getFields()

  return {
    description: description.value,
    amount: amount.value,
    date: date.value,
  }
}

const validateFieldsForm = () => {
  const { description, amount, date } = getValuesFieldsForm()

  if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
    throw new Error('Preencha todos os campos')
  }
}

const formatAmount = value => {
  const amount = Number(value.replace(/[ ,.]+/g, '.')) * 100

  return Math.round(amount)
}

const formatDate = date => {
  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

const formatValues = () => {
  const { description, amount, date } = getValuesFieldsForm()

  const amountFormated = formatAmount(amount)

  console.log('-> formatValues: ', amountFormated)

  const dateFormated = formatDate(date)

  return {
    description,
    amount: amountFormated,
    date: dateFormated,
  }
}

const saveTransaction = transaction => {
  addNewTransaction(transaction)
}

const clearFields = () => {
  const { description, amount, date } = getFields()
  description.value = ''
  amount.value = ''
  date.value = ''
}

const submitForm = event => {
  event.preventDefault()

  try {
    validateFieldsForm()

    const newTransaction = formatValues()

    saveTransaction(newTransaction)
    clearFields()
    toggleModal()
  } catch (err) {
    alert(err.message)
  }
}

const getTransactionsStorage = () =>
  JSON.parse(localStorage.getItem('dev.finance:transactions')) || []

const setTrasactionsStorage = transactions => {
  localStorage.setItem('dev.finance:transactions', JSON.stringify(transactions))
}

const getDarkThemeStorage = () =>
  JSON.parse(localStorage.getItem('dev.finance:dark_theme_is_active')) || false

const setDarkThemeStorage = isActive =>
  localStorage.setItem('dev.finance:dark_theme_is_active', isActive)

const setDarkTheme = () => {
  getDarkThemeStorage() && html.classList.toggle('dark-theme')
}

const appStart = () => {
  transactions.forEach(mounter)
  updateBalance()

  setTrasactionsStorage(transactions)
}

const appReload = () => {
  clearTransactions()
  appStart()
}

const transactions = getTransactionsStorage()
toggleTheme.checked = getDarkThemeStorage()

document.onload = setDarkTheme()

appStart()
