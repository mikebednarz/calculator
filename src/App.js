import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [number, setNumber] = useState(JSON.parse(window.localStorage.getItem('NUMBER')));
  const [additionalNumbers, setAdditionalNumbers] = useState(null);
  const [maths, setMaths] = useState(false);
  const [operation, setOperation] = useState(null);
  const [displayNumber, setDisplayNumber] = useState(true);

  useEffect(() => {
    const data = window.localStorage.getItem('NUMBER');
    if (data !== null) setNumber(JSON.parse(data));
  }, [])

  useEffect(() => {
    window.localStorage.setItem('NUMBER', JSON.stringify(number))
  }, [number])

  const handleOperation = (op) => {
    if (maths === true && additionalNumbers) {
      if (operation === '+') {
        setNumber(Math.floor((number + additionalNumbers) * 10000) / 10000);
      } else if (operation === '-') {
        setNumber(Math.floor((number - additionalNumbers) * 10000) / 10000);
      } else if (operation === '*') {
        setNumber(Math.floor((number * additionalNumbers) * 10000) / 10000);
      } else {
        setNumber(Math.floor((number / additionalNumbers) * 10000) / 10000);
      }
      setDisplayNumber(true);
    }
    setAdditionalNumbers(null); 
    setMaths(true);
    setOperation(op);
  };

  const handleEqual = () => {
    if (operation === '+') {
      setNumber(Math.floor((number + additionalNumbers) * 10000) / 10000);
    } else if (operation === '-') {
      setNumber(Math.floor((number - additionalNumbers) * 10000) / 10000);
    } else if (operation === '*') {
      setNumber(Math.floor((number * additionalNumbers) * 10000) / 10000);
    } else {
      setNumber(Math.floor((number / additionalNumbers) * 10000) / 10000);
    } 
    setDisplayNumber(true);
    setOperation(null);
    setAdditionalNumbers(null);
  };

  const handleNumber = (num) => {
    if (maths === false) {
      if (number === 0) {
        setNumber(Number(num));
      } else {
        setNumber(Number(number + num));
      }
    } else {
      if (additionalNumbers === null) {
        setAdditionalNumbers(Number(num));
      } else {
        setAdditionalNumbers(Number(additionalNumbers + num));
      }
      setDisplayNumber(false);
    }
  };

  const handlePlusNeg = () => {
    if (displayNumber === true) {
      setNumber(number * -1);
    } else {
      setAdditionalNumbers(additionalNumbers * -1);
    }
  };

  const handlePercentage = () => {
    if (displayNumber === true) {
      setNumber(number / 100);
    } else {
      setAdditionalNumbers(additionalNumbers / 100);
    }
  };

  const handleDecimal = () => {
    if (displayNumber === true) {
      let numberString = number.toString();
      if (!numberString.includes('.')) {
        setNumber(number + '.');
      }
    } else {
      let numberString = additionalNumbers.toString();
      if (!numberString.includes('.')) {
        setAdditionalNumbers(additionalNumbers + '.');
      }
    }
  };

  const handleClear = () => {
    setNumber(0);
    setAdditionalNumbers(null);
    setMaths(false);
    setOperation(null);
    setDisplayNumber(true);
  };

  return (
    <div className="App">
      <div className='calculator'>
        <p className='number'>{displayNumber === true ? number : additionalNumbers}</p>
      </div>
      <div className='calculator-2'>
        <button className='clear-button' onClick={handleClear}>C</button>
        <button className='plus-neg' onClick={handlePlusNeg}>+/-</button>
        <button className='percentage' onClick={handlePercentage}>%</button>
        <button className='right-side' onClick={() => handleOperation('/')}><span className='symbol'>&#xF7;</span></button>
      </div>
      <div className='calculator-3'>
        <button className='numbers' onClick={() => handleNumber('7')}>7</button>
        <button className='numbers' onClick={() => handleNumber('8')}>8</button>
        <button className='numbers' onClick={() => handleNumber('9')}>9</button>
        <button className='right-side' onClick={() => handleOperation('*')}><span className='symbol'>&#xd7;</span></button>
      </div>
      <div className='calculator-4'>
        <button className='numbers' onClick={() => handleNumber('4')}>4</button>
        <button className='numbers' onClick={() => handleNumber('5')}>5</button>
        <button className='numbers' onClick={() => handleNumber('6')}>6</button>
        <button className='right-side' onClick={() => handleOperation('-')}><span className='symbol'>-</span></button>
      </div>
      <div className='calculator-5'>
        <button className='numbers' onClick={() => handleNumber('1')}>1</button>
        <button className='numbers' onClick={() => handleNumber('2')}>2</button>
        <button className='numbers' onClick={() => handleNumber('3')}>3</button>
        <button className='right-side' onClick={() => handleOperation('+')}><span className='symbol'>+</span></button>
      </div>
      <div className='calculator-6'>
        <button className='zero' onClick={() => handleNumber('0')}>0</button>
        <button className='decimals' onClick={handleDecimal}>.</button>
        <button className='right-side' onClick={handleEqual}><span className='symbol'>=</span></button>
      </div>
    </div>
  );
}

export default App;