const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === 'clear') {
            clearCalculator();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.textContent = '0';
}

function appendNumber(value) {
    if (currentInput.includes('.') && value === '.') return;
    currentInput += value;
    display.textContent = currentInput;
}

function setOperator(value) {
    if (currentInput === '') return;
    if (previousInput !== '') calculateResult();
    operator = value;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (previousInput === '' || currentInput === '' || operator === '') return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result;
    if (operator === '+') result = prev + current;
    if (operator === '-') result = prev - current;
    if (operator === '*') result = prev * current;
    if (operator === '/') result = current !== 0 ? prev / current : 'Error';

    display.textContent = result;
    previousInput = result;
    currentInput = '';
    operator = '';
}