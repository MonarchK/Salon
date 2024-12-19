var container = document.getElementById("container");
var child = [document.querySelector(".images")];
var a = 0, b = 0;
var prices = ["20,000-30,000", "50,000-80,000", "50,000-80,000", "50,000-80,000", "50,000-80,000"];
var names = ["braids", "weave", "50,000-80,000", "50,000-80,000", "50,000-80,000"]; 

async function checkImg(src){
    return new Promise((resolve,reject)=>{
        const img = new Image();
        img.src = src;
        img.onload = ()=>{
            resolve(true);
        }
        img.onerror = ()=>{
            reject(false);
        }
    })
}

while(a == b){
    console.log(a, b);
    if(a > 0){
        child.push(document.querySelector(".images").cloneNode(true));
        container.appendChild(child[a]);
    }
    let imgs = document.querySelectorAll(".images");
    let nam = imgs[a].children[1];
    let imgSet = document.querySelectorAll(".image-box");
    let imgContainer = imgSet[a];
    let img = imgContainer.children[0];
    let price = imgContainer.children[1];
    console.log(a);
    checkImg("../Pictures/Services/" + 1 + ".jpg")
        .then(()=>{
            img.src = "../Pictures/Services/" + 1 + ".jpg"; 
            price.innerHTML = prices[a];
            nam.innerHTML = names[a];
            b++;
            console.log(b);
        })
        .catch(()=>{
            if(names.length - 1 > a){
                b++;
            }
        });
    a++;
    console.log(a, b);
}
