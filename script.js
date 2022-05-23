const Maincolors = [
    
    ["red",1],["blue",2],["green",3],["orange",4],["black",5],["white",6],
    ["red",1],["blue",2],["green",3],["orange",4],["black",5],["white",6]
];

const colors = [
    
    ["red",1],["blue",2],["green",3],["orange",4],["black",5],["white",6],
    ["red",1],["blue",2],["green",3],["orange",4],["black",5],["white",6]
];

let doubleFlip = 0;
//creating random color stack
let colorStack = [];
for(let i = 0; i < colors.length ; i = Math.floor(Math.random() * colors.length)){
    colorStack.push(colors[i]);
    colors.splice(i,1);
}
//selecting items and giving themm background color and a comparison code. only two items will have same code
let items = document.querySelectorAll('.item-style');
for(let item of items){
    let colorElement = colorStack.pop();
    // item.setAttribute('style',`background-color: ${colorElement[0]}`);
    item.style.backgroundColor = colorElement[0];
    item.ComparisonCode__c = colorElement[1];
    item.isActive = true;
    item.addEventListener('click',checker);
    setTimeout(()=>{
        for(let item of items){
            if(item.isActive === true){
                item.style.backgroundColor = 'grey';
            }
        }
        doubleFlip = 0;
    },3000);
}
// this will hide all the active color tiles
function imageHider(){
setTimeout(()=>{
    for(let item of items){
        if(item.isActive === true){
            item.style.backgroundColor = 'grey';
        }
    }
    doubleFlip = 0;
},700);
}

// this will show the color of the clicked item
function flipper(element){
    if(element.isActive === false){
        doubleFlip = -1;
    }
    element.style.backgroundColor = Maincolors[element.ComparisonCode__c-1][0];

}

function matcher(eStack){
    let element1 = eStack.pop();
    let element2 = eStack.pop();
    if(element1.ComparisonCode__c === element2.ComparisonCode__c){
        element1.isActive = false;
        element2.isActive = false;
        doubleFlip = 0;
    }
    else{
        setTimeout(() =>{
            if(element1.isActive === true){
                element1.style.backgroundColor ='grey';
            }
            if(element2.isActive === true){
                element2.style.backgroundColor ='grey';
            }
        },700);
        doubleFlip = 0;
    }

}

let elementCheckStack =[];
//checker function that will check the colors
function checker(e){
    console.log(doubleFlip);
    let element = e.target;
    if(doubleFlip > 1){
        imageHider();
    }
    else{
        if(doubleFlip === 0){
            flipper(element);
            elementCheckStack.push(element);
            doubleFlip++;
        }
        else{
            flipper(element);
            setTimeout(()=>{
                elementCheckStack.push(element);
                doubleFlip++;
                matcher(elementCheckStack);
            },200);
        }
    }
}











