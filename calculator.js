
var inputString = "";
var outputString = "";
var  operatorArray = [];
var  operandArray = [];
var isLastOperator = true;
var isLastAnswer=false;


$("button").click(CallAction);
$(".reset-button").click(clearAll);



function clearAll()
{
    inputString = "";
    outputString = "";
    operatorArray = [];
    operandArray = [];
    isLastOperator = true;
    isLastAnswer=false;
    printInput();
    printOutput();
}
function CallAction()
{

    $(this).css({
        "background-color" : "gray",
        color: "white",
    });
    
    setTimeout(function(button){
        $(button).attr("style","");
    },
    300,
    this
    );
    var value = $(this).text();
    var actionType = $(this).attr("class") === "red-text"? "operator" : "operand" ;
    if(value === "=")
    {
        calculateAnswer();
        printOutput();
    }
    else
    {
        if(addInput(actionType,value))
        {
            inputString = inputString + value;
            printInput();    
        }
    }
    console.log(operandArray,operatorArray);
    
}
function printInput()
{
    $(".input").text(inputString || 0);
}
function printOutput()
{
    $(".output").text(outputString || 0);
}
function addInput(actionType,value)
{
    if(actionType === "operator")
    {
        if(isLastOperator)
            return false;
        operatorArray.push(value);
        isLastOperator=true;
        return true;
    }
    //
    if(isLastAnswer)
    {
        clearAll();   
    }
    if (isLastOperator)
    {
        
        operandArray.push(value);
        isLastOperator=false;
        return true;
    }
    operandArray[operandArray.length-1]+=value;
    return true;
}
function calculateAnswer()
{
    for(var j = 0; j < 2 ; j++)
    {
        for(var i = 0 ; i < operatorArray.length ; i++)
        {
            if(j === 0 && (operatorArray[i] === "*" || operatorArray[i] === "/"))
            {
                performAction(i);
            }
            if(j !== 0)
            {
                performAction(i);
            }
        }
    }
    isLastAnswer=true;
    outputString = operandArray[0];
    inputString =operandArray[0];
    
}
function performAction(index)
{
    var result=0;
    switch(operatorArray[index])
    {
        case "+":
            result = Number(operandArray[index]) + Number(operandArray[index+1]);
            break;
        case "-":
            result = operandArray[index] - operandArray[index+1];
            break;
        case "*":
            result = operandArray[index] * operandArray[index+1];
            break;
        case "/":
            result = operandArray[index] / operandArray[index+1];
            break;
    }
    operandArray[index]=result;
    operandArray.splice(index+1,1);
    operatorArray.splice(index,1);
}