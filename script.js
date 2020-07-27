let add = (operand1,operand2) => +operand1 + +operand2;
let subtract = (operand1,operand2) => operand1 - operand2;
let multiply = (operand1,operand2) => operand1 * operand2;
let divide = (operand1,operand2) => operand1 / operand2;

let operandKeys = [00,0,1,2,3,4,5,6,7,8,9,"."];
let operatorKeys = ["+","-","/","*"];
let relationKeys = ["Enter","Delete","Backspace"];
let operand1;
let operand2;
let operator;

//these variables are related to situations in which the result of the
//operation may overflow the display
let lastCalcOverflow = 0;
let lastCalc;

let display = document.querySelector('#display')

let checkForDecimal = (e) => { //prevent "rouge decimals"
    let decimalLocation = display.textContent.lastIndexOf(".");
    if(e.target.textContent == "." &&
     decimalLocation > -1 &&
    (!operand1 || decimalLocation > operand1.length)){
        return 1;
    };
};

let addToDisplay = (e) => {
    let charsInDisplay = display.textContent.length;
    if(checkForDecimal(e)){return;}
    if(charsInDisplay > 12){return;}
    display.textContent += e.target.textContent;
};

let clearDisplay = () => display.textContent = "";

let clearOps = () => {
    operand1 = "";
    operand2 = "";
    operator = "";
    lastCalc = "";

};

let addOperator = (e) => {
    if(lastCalcOverflow == 1) {
        display.textContent = +lastCalc.toFixed(2) //shorten operand1 to make
        lastCalcOverflow = 0;                      //room for operand2
    };

    if(operator) { //handles if this is a continouation of a previous output
        operand1 = operate() 
        display.textContent = operand1
    }else {operand1 = display.textContent};
    addToDisplay(e)
    operator = e.target.id;
};

let operate = () => { 
    operand2 = display.textContent.slice(operand1.toString().length+1)
    if(!operand2) {
        return operand1
    };

    if(lastCalc){
        operand1 = lastCalc;
        lastCalc = ""
    };

    switch(operator) {
        case "+":
             return add(operand1,operand2);
        case "-":
            return subtract(operand1,operand2);      
        case "*":
            return multiply(operand1,operand2);  
        case "/":
            return divide(operand1,operand2);
        default:
            console.log("ERROR");
    }
}

let handleOperate = () => {
    if(operator) {
        let operationResult = operate();
        if(operationResult == "Infinity"){
            alert("No Breaking the Universe Allowed! (Can't Divide by 0")
            clearDisplay()
            clearOps()
            return
        }
        if(operationResult.toString().length > 10){
            display.textContent = operationResult.toFixed(10);
            lastCalcOverflow = 1;
            clearOps()
            lastCalc = operationResult;
            return
        }
        if(operationResult > 9999999999999){
            display.textContent = 9999999999999
        };

        display.textContent = operationResult;
        clearOps();
    }
}

let itemInArray = (targetItem,array) => array.find(item => item == targetItem);

let clickKey = id => document.getElementById(id).click();

let addClass = e => e.target.classList.add("buttonClicked");

let remClass = e => e.target.classList.remove("buttonClicked");

let logKey = e => {
    e.preventDefault();//stops firefox from opening a search
    let key = e.key;
    if(itemInArray(key,operandKeys)){clickKey(key)};
    if(itemInArray(key,operatorKeys)){clickKey(key)};
    if(itemInArray(key,relationKeys)){clickKey(key)};
    if(key == 0){clickKey("0")}
};

document.addEventListener("keydown",logKey);

let removeCharFromDisplay = () => {
    if(display.textContent){
        display.textContent = display.textContent.slice(0,-1);
    };
};

let buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener("click",addClass))
buttons.forEach(button => button.addEventListener("transitionend",remClass));
buttons.forEach(button => button.addEventListener("transitioncancel",remClass));

let operands = document.querySelectorAll('.operand');
operands.forEach(operand => operand.addEventListener("click",addToDisplay));

let operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener("click",addOperator));

let equals = document.getElementById("equals");
equals.addEventListener("click",handleOperate)

let backspace  = document.getElementById("Backspace");
backspace.addEventListener("click",removeCharFromDisplay)

let clear = document.querySelector('#CLR');
clear.addEventListener("click", function(){
    clearDisplay()
    clearOps()
})

