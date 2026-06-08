let running = false;

let history = [];

const logs = document.getElementById("logs");

function log(text){

logs.innerHTML += "<p>"+text+"</p>";

logs.scrollTop = logs.scrollHeight;

}

const socket = new WebSocket(
`wss://ws.binaryws.com/websockets/v3?app_id=${APP_ID}`
);

socket.onopen = ()=>{

socket.send(JSON.stringify({

authorize:TOKEN

}));

socket.send(JSON.stringify({

ticks:"R_100"

}));

log("Conectado na Deriv");

};

socket.onmessage = (msg)=>{

const data = JSON.parse(msg.data);

if(data.tick){

let price = data.tick.quote.toString();

let digit = Number(
price.slice(-1)
);

document.getElementById(
"digit"
).innerText = digit;

history.push(digit);

if(history.length > 10){

history.shift();

}

updateChart();

if(running){

let signal = getSignal(history);

if(signal){

buy(signal);

}

}

}

};

function updateChart(){

for(let i=0;i<10;i++){

let total = history.filter(
x => x == i
).length;

let percent = total * 10;

let bar = document.getElementById(
"bar"+i
);

bar.style.height =
(percent * 2)+"px";

}

}

function buy(type){

let stake = Number(
document.getElementById(
"stake"
).value
);

log("Entrada "+type);

socket.send(JSON.stringify({

buy:1,

price:stake,

parameters:{

amount:stake,

basis:"stake",

contract_type:type,

currency:"USD",

duration:1,

duration_unit:"t",

symbol:"R_100"

}

}));

}

document.getElementById(
"start"
).onclick = ()=>{

running = true;

log("BOT INICIADO");

};

document.getElementById(
"stop"
).onclick = ()=>{

running = false;

log("BOT PARADO");

};