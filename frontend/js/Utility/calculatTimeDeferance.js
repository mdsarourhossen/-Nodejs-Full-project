function timeDiffernce(dateTimeString){

const now =new  Date();
const past = new Date(dateTimeString);
let timeDiff = Math.floor((now-past) /1000);
console.log(timeDiff);

const days = Math.floor(timeDiff /(60*60*24));
console.log(days);

timeDif=timeDif=days*24*60*60;
const hours = Math.floor(timeDiff /(60*60));
timeDif=timeDif=hours*60*60;
const minutes = Math.floor(timeDiff /60);

const seconds = timeDif-minutes*60;

let result = ``;
//string concattenation ""+ 15 days
if(days>0){

result = result + `${days} days`;

}
else if(hours>0) {
result = result + `${hours} hours`;
}
else if (minutes>0){
result = result + `${minutes} minutes`;

}
else {

 result = result + `${seconds} seconds`;   
}
return result;
}
timeDiffernce();
