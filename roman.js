// Convert Roman Numerals to Arabic Numerals
let screen = document.getElementById('screen');
let equals = document.getElementById('equals');
let backspace = document.getElementById('backspace');
let clear = document.getElementById('clear');
let savedOperand = document.getElementById('savedOperand');
let operator = document.getElementById('operator');
let newOperand = document.getElementById('newOperand');
let result = document.getElementById('result');
let isNewValue = true;

screen.innerHTML = '';
const numerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
const keys = [];
numerals.forEach(function(numeral) {
    keys.push(document.getElementById(numeral));
});

const keyPress = key => {
    if (isNewValue) {
        screen.innerHTML = key.target.innerHTML;
        isNewValue = false;
    } else {
        screen.innerHTML += key.target.innerHTML;
    };
};

const keyAssign = key => {
    key.onclick = keyPress;
};

keys.forEach(keyAssign);

const operators = ['plus', 'minus', 'multiply', 'divide'];
const opKeys = [];
operators.forEach(function(operator){
    opKeys.push(document.getElementById(operator));
});

const opKeyPress = opKey => {
    // if screen has value
    if (screen.innerHTML.length > 0) {
        // save screen value to savedOperand
        savedOperand.innerHTML = screen.innerHTML;
        // set operator
        operator.innerHTML = opKey.target.id;
        // configure for new input value
        isNewValue = true;
    };
};

const opKeyAssign = opKey => {
    opKey.onclick = opKeyPress;
};

opKeys.forEach(opKeyAssign);

const delKey = () => {
    screen.innerHTML = screen.innerHTML.slice(0, -1);
};

backspace.onclick = delKey;

const clearKey = () => {
    screen.innerHTML = '';
    savedOperand.innerHTML = '';
    newOperand.innerHTML = '';
    operator.innerHTML = '';
    result.innerHTML = '';
};

clear.onclick = clearKey;

const romanToArabic = string => {
    // single numerals
    const singles = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };
    // paired numerals
    const pairs = {
        IV: 4,
        IX: 9,
        XL: 40,
        XC: 90,
        CD: 400,
        CM: 900
    };
    // add all paired numerals to total
    let total = 0;
    for (let pair in pairs) {
        if (string.includes(pair)) {
            total += pairs[pair];
            // remove from original string
            string = string.replace(pair, '');
        }
    }
    // add all single numerals to total
    for (let char of string) {
        total += singles[char];
    }
    return total;
};

// Convert Arabic Numerals to Roman Numerals
const arabicToRoman = n => {
    // round n to nearest integer
    n = Math.round(n);
    // return error for values over 3999 or less than 1
    if (n > 3999) {
        return '> MMMCMXCIX';
    } else if (n < 1) {
        return '< I';
    };
    // convert to string
    const nString = String(n);
    // reverse digits
    const nArray = nString.split('');
    const nArrayReverse = nArray.reverse();
    // convert each digit to corresponding roman numeral
    let resultChars = [];
    for (i = 0; i < nArrayReverse.length; i++) {
        // select possible values for each digit
        let roms;
        if (i === 0) {
            roms = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
        } else if (i === 1) {
            roms = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
        } else if (i === 2) {
            roms = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
        } else if (i === 3) {
            roms = ['', 'M', 'MM', 'MMM'];
        };
        // assign value at index i to val
        let val = Number(nArrayReverse[i]);
        // assign value at index i to resultChars
        resultChars[i] = roms[val];
    };
    // reverse order of resultChars
    let resultCharsInOrder = resultChars.reverse();
    // join resultCharsInOrder into single string
    let resultLower = resultCharsInOrder.join('');
    // capitalize resultLower
    let result = resultLower.toUpperCase();
    return result;
};

// Execute Calculation

const calculate = () => {
    let operand1 = romanToArabic(savedOperand.innerHTML);
    let operand2 = romanToArabic(newOperand.innerHTML);
    let finalValue;
    if (operator.innerHTML === 'plus') {
        finalValue = operand1 + operand2;
    } else if (operator.innerHTML === 'minus') {
        finalValue = operand1 - operand2;
    } else if (operator.innerHTML === 'multiply') {
        finalValue = operand1 * operand2;
    } else if (operator.innerHTML === 'divide') {
        finalValue = operand1 / operand2;
    };
    savedOperand.innerHTML = arabicToRoman(finalValue);
    screen.innerHTML = arabicToRoman(finalValue);
    newOperand.innerHTML = '';
};

const compute = () => {
    newOperand.innerHTML = screen.innerHTML;
    calculate();
    isNewValue = true;
}

equals.onclick = compute;
