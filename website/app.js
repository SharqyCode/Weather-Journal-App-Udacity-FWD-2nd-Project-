/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = "&appid=f7a42129e6feed92592884362cd2ade7&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();



// Button event
const button = document.getElementById('generate');
button.addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();

    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getWeatherData(baseUrl, zipCode, apiKey)
        .then(function(data) {
            postData('/add', { temp: data.main.temp, date: newDate, content: content });
        }).then(function() {
            updateUI()
        }).catch(function(error) {
            console.log(error);
            alert('enter correct zipcode');

        });
}

// GET API Data
const getWeatherData = async(baseUrl, zipCode, apiKey) => {
    const res = await fetch(baseUrl+zipCode+apiKey);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

//POST data
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp + ' degrees';
            document.getElementById('content').innerHTML = allData.content;

    } catch (error) {
        console.log('error', error);
    }
};
