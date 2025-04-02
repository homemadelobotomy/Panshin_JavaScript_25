
window.onload = function(){ 
    
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function output(el){
        let maxLen = 10
        el = String(el)
        if (el.length > maxLen ){
            el = el.slice(0,maxLen) + "..." + el.slice(-4)
        }
        outputElement.innerHTML = el
    }
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
           output(a)
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                output(b)     
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        if (b != ''){
            a = (+a) + (+b)
            b = ''
            output(a)
        }
        
        selectedOperation = '+'

    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        if (b != ''){
            a = (+a) - (+b)
            b = ''
            output(a)
        }
        
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    
    }
    document.getElementById("btn_op_percent").onclick = function(){
        if (a === '') return
        selectedOperation = '%'
    
    }    

    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_additional_theme").onclick = function(){
        let element = document.getElementById("result")
        if (element.classList.contains("light-mode")){
            element.classList.remove("light-mode")
            element.classList.add("dark-mode")
        }
        else{
            element.classList.remove("dark-mode")
            element.classList.add("light-mode")
        }
    }
    document.getElementById("btn_additional_degrees").onclick = function(){
        if(!selectedOperation){
            if (a === ''){
                return
            }
            else{
                a = (+a) * Math.PI / 180
                output(a)
            }
        }
        else{
            if (b === ''){
                return
            }
            else{
                b = (+b) * Math.PI / 180
                output(a)
            }
        }
    }

    document.getElementById("btn_op_sign").onclick = function(){
        b = ''
        selectedOperation = ''
        a = -(+outputElement.innerHTML) 
        output(a)
        expressionResult = ''
    }

    document.getElementById("btn_backspace").onclick = function(){
        if(!selectedOperation){
            if (a.length > 0){
                a = a.slice(0,-1)
                outputElement.innerHTML = a.length === 0 ? '0' : a;
            }
        else {
                if (b.length > 0){
                    b = b.slice(0,-1) 
                    outputElement.innerHTML = b.length === 0 ? '0' : b
                }
            }
        }
    }
    document.getElementById("btn_additional_000").onclick = function(){
        if(!selectedOperation && a != ''){
            a = (+a)* 1000
            output(a)
        }
        else if (b != ''){
            b = (+b) * 1000
            output(b)
        }
    }
    function factorial(num){
        if (num < 0){
            return 
        }
        if (num == 0){
            return 1
        }
        else{
            return(num * factorial(num-1))
        }
    }
    document.getElementById("btn_additional_factorial").onclick = function(){
        if(!selectedOperation && a != ''){
            a = factorial(Math.trunc((+a)))
            output(a)
        }
        else if (selectedOperation && b != ''){
            b = factorial(Math.trunc((+b)))
            output(b)
        }
    }

    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a) * (+b) / 100
                break;
        }
        a = expressionResult
        output(a)
        b = ''
        selectedOperation = null
    }
    };

    function toggleAdditionalOperations(){
        let operations = document.getElementById("additional_op")
        operations.style.display = operations.style.display == 'flex' ? 'none' : 'flex' 
    }