let firstpart = document.querySelectorAll('.MainSection .Left .Selection label');
let secondpart = document.querySelectorAll('.MainSection .Right .Selection label');
let inputTo = document.querySelector('.to');
let inputFrom = document.querySelector('.from');
let ParagraphFrom = document.querySelector('.subtitle1');
let ParagraphTo = document.querySelector('.subtitle2');
var currency1 = document.getElementById('RUB1').value;
var currency2 = document.getElementById('USD2').value;

eventListeners();
function eventListeners() {
  inputFrom.addEventListener("keyup", checkDataByFrom);
  inputTo.addEventListener("keyup", checkDataByTo);
}

firstpart.forEach((select) => {
  select.addEventListener('click', (event) => {
    currency1 = event.target.innerText
    console.log(currency1)
    checkDataByTo()
  })
})
secondpart.forEach((select) => {
  select.addEventListener('click', (event) => {
    currency2 = event.target.innerText
    console.log(currency2)
    checkDataByFrom()
  })
})

async function checkDataByFrom() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${currency1}&symbols=${currency2}`)
  .catch(error => 
    {alert('Access Denied')

  });
  const data = await res.json();
  inputTo.value = (Object.values(data.rates)[0] * inputFrom.value).toFixed(2);
  if (currency1 && currency2) {
    ParagraphFrom.innerHTML = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(5)} ${Object.keys(data.rates)}`;
    ParagraphTo.innerHTML = `1 ${Object.keys(data.rates)} = ${(1 / Object.values(data.rates)[0]).toFixed(5)} ${data.base}`;
  }
}
async function checkDataByTo() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${currency1}&symbols=${currency2}`)
  .catch(error => alert('Acess Denied'));
  const data = await res.json();
  inputTo.value = (Object.values(data.rates)[0] * inputFrom.value).toFixed(2);
  if (currency1 && currency2) {
    ParagraphFrom.innerHTML = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(5)} ${Object.keys(data.rates)}`;
    ParagraphTo.innerHTML = `1 ${Object.keys(data.rates)} = ${(1 / Object.values(data.rates)[0]).toFixed(5)} ${data.base}`;
  }
}