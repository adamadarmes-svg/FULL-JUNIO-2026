import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Calculator.css'

function Calculator() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [display, setDisplay] = useState('0')
  const [firstNum, setFirstNum] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)

  useEffect(() => {
    if (!token) navigate('/')
  }, [])

  const handleNumber = (num) => {
    if (waitingForSecond) {
      setDisplay(String(num))
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForSecond) {
      setDisplay('0.')
      setWaitingForSecond(false)
      return
    }
    if (!display.includes('.')) setDisplay(display + '.')
  }

  const handleOperator = (op) => {
    setFirstNum(parseFloat(display))
    setOperator(op)
    setWaitingForSecond(true)
  }

  const handleEquals = () => {
    if (!operator || firstNum === null) return
    const second = parseFloat(display)
    let result

    switch (operator) {
      case '+': result = firstNum + second; break
      case '-': result = firstNum - second; break
      case '×': result = firstNum * second; break
      case '÷':
        if (second === 0) { setDisplay('Error'); setOperator(null); setFirstNum(null); return }
        result = firstNum / second
        break
      default: return
    }

    setDisplay(String(parseFloat(result.toFixed(10))))
    setOperator(null)
    setFirstNum(null)
    setWaitingForSecond(false)
  }

  const handleClear = () => {
    setDisplay('0')
    setFirstNum(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1))
  }

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100))
  }

  const buttons = [
    { label: 'AC', action: handleClear, type: 'function' },
    { label: '+/-', action: handleToggleSign, type: 'function' },
    { label: '%', action: handlePercent, type: 'function' },
    { label: '÷', action: () => handleOperator('÷'), type: 'operator' },
    { label: '7', action: () => handleNumber('7'), type: 'number' },
    { label: '8', action: () => handleNumber('8'), type: 'number' },
    { label: '9', action: () => handleNumber('9'), type: 'number' },
    { label: '×', action: () => handleOperator('×'), type: 'operator' },
    { label: '4', action: () => handleNumber('4'), type: 'number' },
    { label: '5', action: () => handleNumber('5'), type: 'number' },
    { label: '6', action: () => handleNumber('6'), type: 'number' },
    { label: '-', action: () => handleOperator('-'), type: 'operator' },
    { label: '1', action: () => handleNumber('1'), type: 'number' },
    { label: '2', action: () => handleNumber('2'), type: 'number' },
    { label: '3', action: () => handleNumber('3'), type: 'number' },
    { label: '+', action: () => handleOperator('+'), type: 'operator' },
    { label: '0', action: () => handleNumber('0'), type: 'number zero' },
    { label: '.', action: handleDecimal, type: 'number' },
    { label: '=', action: handleEquals, type: 'equals' },
  ]

  return (
    <div className="calc-wrapper">
      <div className="calculator">
        <div className="display">
          <span className="operator-display">{operator || ''}</span>
          <span className="number-display">{display}</span>
        </div>
        <div className="buttons">
          {buttons.map((btn, i) => (
            <button
              key={i}
              className={`btn btn-${btn.type}`}
              onClick={btn.action}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calculator