console.log("Client side javascript : Loaded");

const weatherForm = document.querySelector('form');
const inputSearch = document.querySelector('input');
const inputButton = document.querySelector('button');

const weatherp = document.querySelector("#para2");
const errorp = document.querySelector("#para1");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(inputSearch.value);
    para1.innerHTML = "Loading..."
    para2.innerHTML = "";
    const url = "http://localhost:3000/weather?address=" + inputSearch.value;
    fetch(url).then((response) => {
        response.json().then(({Place, temperature, Weather, message} = {}) => {
            if(message){
                return para1.textContent = message;
            }

            para1.innerHTML = Place;
            para2.innerHTML = temperature + "&#x2103;,  " +  Weather;
        })      
    })
})

inputButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(inputSearch.value);
    para1.innerHTML = "Loading..."
    para2.innerHTML = "";
    const url = "http://localhost:3000/weather?address=" + inputSearch.value;
    fetch(url).then((response) => {
        response.json().then(({Place, temperature, Weather, message} = {}) => {
            if(message){
                return para1.textContent = message;
            }

            para1.innerHTML = Place;
            para2.innerHTML = temperature + "&#x2103;,  " +  Weather;
        })      
    })
})




