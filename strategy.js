function getSignal(history){

let high = history.filter(
x => x >= 5
).length;

let low = history.filter(
x => x <= 4
).length;

if(high >= 7){

return "UNDER";

}

if(low >= 7){

return "OVER";

}

return null;

}