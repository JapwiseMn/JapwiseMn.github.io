let runningTotal = 0 ;
let buffer = "0";
let previousOperator ;

const screen = document.querySelector('.screen');

// ボタン処理の大枠
function buttonClick(value){
  if(isNaN(value)){
    handleSymbol(value);
  }else{
    handleNumber(value);
  }
  screen.textContent = buffer;
}

// 数字以外のボタンに関する処理
function handleSymbol(symbol){
  switch(symbol){
    case 'C':
        buffer = "0";
        runningTotal = 0;
        break;
    case '=':
        if(previousOperator === null){
          return;
        }
        flushOperation(Math.trunc(buffer)); 
        previousOperator = null;       //「＝」を連続で押した時に計算結果が消えないための処理
        buffer = runningTotal;
        runningTotal = 0;
        break;
    case '←':
        if(buffer.length === 1){
          buffer = "0";
        }else{
          buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
      case '+':
      case '−':
      case '×':
      case '÷':
            handleMath(symbol)
            break;
  }
    
}

function handleMath(symbol){
  if(buffer === '0'){
    return;
  }

  const intBuffer = Math.trunc(buffer);

  if(runningTotal === 0){
    runningTotal = intBuffer;
  }else{
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer){
  if(previousOperator === '+'){
    runningTotal += intBuffer;
  }else if(previousOperator === '−'){
    runningTotal -= intBuffer;
  }else if(previousOperator === '×'){
    runningTotal *= intBuffer;
  }else if(previousOperator === '÷'){
    runningTotal /= intBuffer;
  }
}

// 数字ボタンに関する処理
function handleNumber(numberString){
  if(buffer === "0"){
    buffer = numberString;
  }else{
    buffer += numberString;
  }
}

function init(){
  document.querySelector('.calc-buttons').addEventListener('click', function(event){
      buttonClick(event.target.innerText);
  })
}

init();
