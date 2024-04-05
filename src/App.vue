<script setup>
import { ref } from 'vue'

const screen = ref('')
const isNewCalculation = ref(true)
const isNewOperand = ref(true)
const operator = ref('')
const operandOne = ref('')


const numerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M']

const operators = [
  { label: '+', area: 'plus' },
  { label: '−', area: 'minus' },
  { label: '×', area: 'times' },
  { label: '÷', area: 'divide' }
]

const inputNumeral = (numeral) => {
  if (isNewOperand.value) {
    screen.value = numeral
    isNewOperand.value = false
  } else {
    screen.value += numeral
  }
}

const applyOperator = (symbol) => {
  if (isNewCalculation.value) {
    operandOne.value = screen.value
    operator.value = symbol
    isNewCalculation.value = false
  } else {
    operandOne.value = calculate(operandOne.value, screen.value, symbol)
  }
  screen.value = ''
}

const applyEquals = () => {
  screen.value = calculate(operandOne.value, screen.value, operator.value)
  isNewCalculation.value = true
  isNewOperand.value = true
}

const romanToArabic = roman => {
  const romanNumerals = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }

  let arabic = 0
  let previous = 0

  for (let i = roman.length - 1; i >= 0; i--) {
    const current = romanNumerals[roman[i]]
    if (current >= previous) {
      arabic += current
    } else {
      arabic -= current
    }
    previous = current
  }

  return arabic
}

const tooHigh = () => {
  screen.value = "Error: altior"
  isNewCalculation = true
  isNewOperand = true
}

const tooLow = () => {
  screen.value = "Error: brevior"
  isNewCalculation = true
  isNewOperand = true
}

const arabicToRoman = arabic => {
  if (arabic > 3999) {
    tooHigh()
    return
  } else if (arabic < 1) {
    tooLow()
    return
  }
  arabic = Math.round(arabic)
  const arabicString = arabic.toString()
  const arabicReverse = arabicString.split('').reverse()
  for (let i = 0; i < arabicReverse.length; i++) {
    arabicReverse[i] = arabicReverse[i] * Math.pow(10, i)
  }
  let roman = ''
  for (let i = arabicReverse.length - 1; i >= 0; i--) {
    roman += arabicToRomanDigit(arabicReverse[i])
  }
  return roman
}

const arabicToRomanDigit = arabic => {
  const roman = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XX: 20, XXX: 30, XL: 40, L: 50, LX: 60, LXX: 70, LXXX: 80, XC: 90, C: 100, CC: 200, CCC: 300, CD: 400, D: 500, DC: 600, DCC: 700, DCCC: 800, CM: 900, M: 1000, MM: 2000, MMM: 3000 }
  for (let [key, value] of Object.entries(roman)) {
    if (value === arabic) {
      return key
    }
  }
  return ''
}

const calculate = (operandOne, operandTwo, operator) => {
  const x = romanToArabic(operandOne)
  const y = romanToArabic(operandTwo)
  switch (operator) {
    case '+':
      return arabicToRoman(x + y)
    case '−':
      return arabicToRoman(x - y)
    case '×':
      return arabicToRoman(x * y)
    case '÷':
      return arabicToRoman(x / y)
    default:
      return ''
  }
}

const clear = () => {
  screen.value = ''
  isNewCalculation.value = true
  isNewOperand.value = true
}

const del = () => {
  screen.value = screen.value.slice(0, -1)
}

</script>

<template>
  <main>
    <div id="screen">{{ screen }}</div>
    <div id="buttons">
      <button v-for="numeral in numerals" @click="inputNumeral(numeral)" :key="numeral"
        :style="{ gridArea: numeral }">
        {{ numeral }}
      </button>
      <button v-for="operator in operators" @click="applyOperator(operator.label)" :key="operator.label"
        :style="{ gridArea: operator.area }">
        {{ operator.label }}
      </button>
      <button @click="del" id="del">del</button>
      <button @click="clear" id="cl">cl</button>
      <button @click="applyEquals" id="equals">=</button>
    </div>
  </main>
</template>

<style scoped>
@font-face {
	font-family: 'Linux Biolinum';
	font-style: normal;
	font-weight: normal;
	src:  url('assets/LinBiolinum_R.woff') format('woff');
}

* {
  font-family: 'Linux Biolinum', sans-serif;
}

body {
  background-color: black;
}

main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#screen::-webkit-scrollbar {
  display: none;
}

#screen {
  width: 100%;
  height: 20vh;
  border: 2px solid white;
  margin-bottom: 5vh;
  background-color: black;
  color: white;
  border-radius: 2vh;
  font-size: 10vh;
  text-align: right;
  padding: 5vh;
  white-space: nowrap;
  overflow: auto;
}

#buttons {
  width: 100%;
  padding: 0;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: repeat(5, 16%);
  gap: 5%;
  height: 60vh;
  display: grid;
  grid-template-areas:
    "I V plus"
    "X L minus"
    "C D times"
    "M del divide"
    "cl equals equals";
}

button {
  font-size: 30px;
  height: 100%;
  width: 100%;
  border-radius: 500px;
  color: black;
}

#del {
  grid-area: del;
  font-style: italic;
}

#cl {
  grid-area: cl;
  font-style: italic;
}

#equals {
  grid-area: equals;
  width: 100%;
}

@media screen and (min-width: 600px) {
  main {
    width: 500px;
  }
}
  
</style>
