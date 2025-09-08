function calculate(operator) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    let result;

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("result").value = "ERROR";
        return;
    }
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : "Error (÷0)";
            break;
        default:
            result = "Invalid";
    }

    document.getElementById("result").value = result;
}
