let expensesArray =[];
let balance = 0;
let expense = 0;
let transactionsection = document.getElementById("trlist");
let description = document.getElementById("descriptionofexpenses");
let radiobutton = document.getElementsByName("expenseType");
let amountgot = document.getElementById("amountgot");
let totalbalance = document.getElementById("totalbalance");
let errortag=document.querySelectorAll(".error")

function showTransaction() {
  expensesArray.forEach((element, index) => {
    if (expensesArray.length - 1 <= index) {
      let newdiv = document.createElement("div");
      newdiv.classList.add("transactiondiv");
      let descriptionptag = document.createElement("p");
      let amounttag = document.createElement("p");
      descriptionptag.innerText = element.description;
      amounttag.innerText = element.amount;
      newdiv.appendChild(descriptionptag);
      newdiv.appendChild(amounttag);
      transactionsection.appendChild(newdiv);
      if (element.typeofExpense == "Positive") {
        newdiv.style.backgroundColor = "rgba(0,255,0,0.4)";
      } else {
        newdiv.style.backgroundColor = "rgba(255,0,0,0.4)";
      }
    }
  });
}

function addTransaction() {
  document.getElementById("formtofillforexpenses").style.display = "block";
}

function save() {
    let expenseObject = {
    description: "",
    typeofExpense: "",
    amount: "",
    };
    
    reset()

    if (description.value.length == 0) {
    let disdescriptionerror = document.getElementById("errordescriptionmsg");
    disdescriptionerror.innerText = "Description Is Empty";
    errortag[0].style.display = "block";
    description.style.border= "solid 2px #E21717";
   }
    else if(radiobutton[0].checked==false && radiobutton[1].checked==false){
        let diserroringainorexpensesmsg=document.getElementById("erroringainorexpensesmsg")
        diserroringainorexpensesmsg.innerText="Please Select Type Of Transaction"
        errortag[1].style.display = "block";
    }
  else if(amountgot.value.length==0){
      let diserrorinamountmsg= document.getElementById("errorinamountmsg")
      diserrorinamountmsg.innerText="Please Enter The Amount"
      errortag[2].style.display = "block";
      amountgot.style.border="solid 2px #E21717"
  }
  else {
    document.getElementById("trlist").style.height = "150px";
    expenseObject.description = description.value;
    radiobutton.forEach((element) => {
      if (element.checked == true) {
        expenseObject.typeofExpense = element.value;
        if (element.value == "Positive") {
          balance += Number(amountgot.value);
          document.getElementById(
            "balanceAmount"
          ).innerHTML = `&#8377 ${balance}`;
          financialHealth(balance);
        } else {
          expense += Number(amountgot.value);
          document.getElementById(
            "expenseAmount"
          ).innerHTML = `&#8377 ${expense}`;
          financialHealth(balance);
        }
      }
    });
    expenseObject.amount = amountgot.value;
    expensesArray.push(expenseObject);
    
    showTransaction();
    
    document.getElementById("formtofillforexpenses").style.display = "none";
  }
}

function financialHealth(balance) {
  let expensePercentage = ((balance - expense) / balance) * 100;
  let newBalance = balance - expense;
  let statustextid = document.getElementById("statustext");
  totalbalance.innerHTML = `Balance &#8377 ${newBalance}`;
  if (expensePercentage > 70) {
    document.querySelector(".financialStatus").style.backgroundColor ="#00D84A";
    statustextid.innerText = "Your Financial Condition Is Excellent";
  }else if (expensePercentage > 40 && expensePercentage <= 70) {
    document.querySelector(".financialStatus").style.backgroundColor ="#F4BE2C";
    statustextid.innerText = "Your Financial Condition Is Modrate";
  } else {
    document.querySelector(".financialStatus").style.backgroundColor ="#BF3325";
    statustextid.innerText = "Your Financial Condition Is Week";
  }
}

function reset(){
    errortag.forEach(element=>{
        element.style.display="none";
    })
    
    description.style.border= "solid 1px #000";
    amountgot.style.border="solid 1px #000"
}


showTransaction();
