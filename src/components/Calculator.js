import { useState } from 'react';
import calculatorButtons from '../globals/calculator-button-data';
import Button from './Button';

function Calculator() {

    const [currentNumber, setCurrentNumber] = useState(null);
    const [secondNumber, setSecondNumber] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [display, setDisplay] = useState('0');
    const [result, setResult] = useState(null);
    const [memory, setMemory] = useState(null);

    let total = null;

    function handleData(value) {
        console.log(value)

        if(value >= 0 && value <=9) {

            if(symbol === null) {
                if(display === '0'){
                    setCurrentNumber(value);
                    setDisplay(`${value}`);
                } else if (currentNumber === null) {
                    setCurrentNumber(value);
                    setDisplay(`${value}`);
                    setResult(null);
                } else {
                    setCurrentNumber(`${display}${value}` * 1);
                    setDisplay(`${display}${value}`);
                }  
            } else if (result !== null) {
                setCurrentNumber(result);
                setDisplay(`${value}`);
                setSecondNumber(value);
                return;
            } else {
                if(secondNumber === null) {
                    setDisplay(`${value}`);
                    setSecondNumber(value);
                } else {
                    setSecondNumber(`${display}${value}` * 1);
                    setDisplay(`${display}${value}`); 
                }
            }
            return;
        }

        if(value === "Add" || value === "Subtract" || value === "Divide" || value === "Multiply") {

            if(currentNumber !== null && secondNumber !== null && result === null){
                math(false);
                setSymbol(value);
                return;
            }
            
            if(result !== null) {
                setSymbol(value);
                setCurrentNumber(result);
                setResult(null);
                return;
            }

            if(symbol !== null && currentNumber !== null) {
                setSymbol(value);
                math(false);
                return;
            } 

            setSymbol(value);
            return;
        }

        if(value === 'Equal') {
            math();
            setSecondNumber(null);
            setSymbol(null);
        }

        if(value === "Clear") {
            if(currentNumber !== null && secondNumber === null) {
              setCurrentNumber(null);
            } else {
              setSecondNumber(null);
            }
            setDisplay("0");
          }

        if(value === 'All Clear') {
            setCurrentNumber(null);
            setSecondNumber(null);
            setSymbol(null);
            setResult(null);
            setDisplay("0");
        }

        if(value === 'Memory Save') {
            setMemory(display * 1);

        }

        if(value === 'Memory Clear') {
            setMemory(null);
        }

        if(value === 'Memory Recall') {
            setDisplay(memory);
            setCurrentNumber(memory);

            if(symbol !== null) {
                setSecondNumber(memory);
            }
        }

        if(value === 'Memory Subtract') {
            setMemory(memory - currentNumber);
        }

        if(value === 'Memory Addition') {
            setMemory(memory + currentNumber);
        }
    }

    function math(equalBtnClicked = true) {

        if (symbol === "Add") {
            total = Number(currentNumber) + Number(secondNumber);
            setDisplay(`${total}`);

        } else if (symbol === "Subtract") {
            total = currentNumber - secondNumber;
            setDisplay(`${total}`);

        } else if (symbol === "Divide") {
            total = currentNumber / secondNumber;
            setDisplay(`${total}`);

        } else if (symbol === "Multiply") {
            total = currentNumber * secondNumber;
            setDisplay(`${total}`);
        }

        if(equalBtnClicked) {
            setResult(total);
            setCurrentNumber(null);
            setSecondNumber(null);
        } else {
            setCurrentNumber(total);
            setSecondNumber(null);
        }   
    }

    return (
        <div className="container">
            <section className="display">
             <p>{display}</p>
            </section>
            <section className="keypad">
                {calculatorButtons.map((singleButton, i) => {
                    return (
                        <Button key={i}
                                type={singleButton.type}
                                className={singleButton.className}
                                text={singleButton.text}
                                value={singleButton.value} 
                                handleData={handleData} 
                                />
                    );
                })}
            </section>
        </div>
    )
}

export default Calculator;