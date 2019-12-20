console.log('It works')
console.log(document.querySelector('p'));
let element=document.querySelector('.hi');
element.innerText=element.innerText+' ! ! ! !'; // Not preferred
console.log(element);
element.insertAdjacentText('beforeend','  Way to go!') // Preferred for inserting element
console.log(element.innerText);
console.log(element.classList)

let img=document.querySelector('img');
img.classList.add('round');

img.addEventListener('click',function(){
    img.classList.toggle('round');
})

img.setAttribute('data-imagename','Good Morning!')

welcome=document.querySelector('.welcome');

img.addEventListener('click',(_)=>{
  
    welcome.innerText='Welcome!';
    welcome.classList.toggle('welcome');


})

// Adding Element

const newlist=document.createElement('ul') // creating a unordered list
const item=document.createElement('li')
item.innerText='One'
newlist.appendChild(item)  // adding items inside the list


const item2=document.createElement('li');
item2.textContent='Two';
newlist.insertAdjacentElement('beforeend',item2)

const item3=item2.cloneNode();
item3.textContent='Three';
newlist.append(item3);


document.body.appendChild(newlist) //appending to the DOM

window.addEventListener('load',(_)=>{  // Lets the html css to be loaded completely and then performs a callback    
    console.log(img.naturalHeight);
})