const BASE = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdown = document.querySelectorAll(".select-country select");
var btn = document.querySelector(".get-started");
var fromCurr = document.querySelector("#from");
var toCurr = document.querySelector("#to");
var msg = document.querySelector(".message");


for (select of dropdown) {
    for (countryCode in countryList) {
        let option = document.createElement("option");
        option.innerText = countryCode;
        option.value = countryCode;
        if (select.id === "from" && countryCode === 'USD') {
            option.selected = "selected";
        }
        else if (select.id === "to" && countryCode === "NPR") {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}


const exchangeRate = async () => {
    let amount = document.querySelector(".amount input").value;
    if (amount === "" || amount < 1) {

        amount = 1;
        amount.value = '1';
    }
    const URL = `${BASE}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];


    let final_amount = (amount * rate).toFixed(2);
    let amountNum = Number(amount);
    let finalAmountNum = Number(final_amount);
    if (amountNum < finalAmountNum) {
        msg.style.color = "green";
        msg.innerText = `${amountNum} ${fromCurr.value} = ${finalAmountNum} ${toCurr.value}`;
    }
    else {
        msg.style.color = "red";
        msg.innerText = `${amountNum} ${fromCurr.value} = ${finalAmountNum} ${toCurr.value}`;
    }
}

const updateflag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    exchangeRate();

})

window.addEventListener("load", () => {
    exchangeRate();
})
