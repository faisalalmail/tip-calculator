let bill = document.getElementById("bill");
let custom = document.getElementById("custom");
const selections = document.querySelectorAll("button");
let percentage = 0;
let tipAmount;
let tppshow = document.getElementById('tpp');
let personsCount = 0;
let persons = 0;
let totalpp = document.getElementById("totalpp");
let customTip = document.getElementById("custom");
let inputs = document.querySelectorAll("input");
let reset = document.getElementById("reset");
let errormsg = document.getElementById('error-msg');




function activateReset(){
    reset.classList.add("active");
}


reset.addEventListener('click', (e)=> {
        for (i=0;i < selections.length; i++){
        selections[i].classList.remove("active");
    }
    reset.classList.remove("active");
    inputs.forEach((input) => {
    input.value = '';
})
        clearPersons();
    totalpp.innerText = '$0.00';
    tppshow.innerText = '$0.00';
    personsCount = 0;
    persons = 0;
    percentage = 0;

});

customTip.addEventListener('input', (e) => {

if (personsCount != 0){
calculateTip();
}

// add on change event listener for the number of people


});



const handleClick = (e) => {
    percentage = e.target.id;
    activateReset();
    activeButton = document.getElementById(e.target.id);
    for (i=0;i < selections.length; i++){
        selections[i].classList.remove("active");
    }
    activeButton.classList.add("active");
    custom.value = "";
    if(getPersons()){
        calculateTip();
        
    }


    
    
}

const handleInput = (e) => {
    // so when an input happens

    // 1. it activates a reset button
    activateReset();
    //2. A. if the input is custom tip
    if (e.target.id == 'custom'){
    //2.A.1. apply the entered value to the variable
        percentage = e.target.value;
    //2.A.2. cancel any active selection button
        for (i=0;i < selections.length; i++){
        selections[i].classList.remove("active");
    }

    //2.A.3. If persons and bill are already set, call calculate
        if(persons != 0 && bill.value != 0){
        calculateTip();}
    }
    // caller for the change on persons 
/*     else if(e.target.id == 'persons' && percentage != 0 && bill.value != ''){
        console.log(percentage + 'based on persons change');
        personsCount = e.target.value;
        calculateTip();
    } */
    else if(e.target.id == "persons"){
        getPersons();
        if (getPersons() && bill.value != 0 && percentage !=0){
            calculateTip();
        }

    }


    else if(e.target.id == 'bill'){
            if(persons != 0 && percentage != 0)
            {
                calculateTip();
            } else{
                //do nothing
            }
        }
    
    
    
}

//percentage button click event handler
selections.forEach((button) => {
    button.addEventListener('click',handleClick);
});

//inputs on change even handler
inputs.forEach((input) => {
    input.addEventListener('input',handleInput);
});




function calculateTip() {

    //take the bill value and multply it by the tip percentage
    tipAmount = bill.value * (percentage/100);
    
    //divide the tip amount per number of persons
    let tpp = (tipAmount / personsCount).toFixed(2);
    let bpp = (bill.value / personsCount).toFixed(2);
    let total = (parseFloat(tpp) + parseFloat(bpp)).toFixed(2);
    //update results figures
    tppshow.textContent = '$'+ tpp;
    totalpp.textContent = '$'+ total;

    


}

function getPersons(){
    persons = document.getElementById("persons");
    let value = Number(persons.value);
    if(Number.isInteger(value) && value > 0){
        clearPersons();
        personsCount = persons.value;
        return value;

    }else{
        persons.classList.add('error');
        errormsg.textContent = "Can't be zero";
        return false;
    }



}

function clearPersons(){
    persons.classList.remove('error');
    errormsg.innerText = '';
}