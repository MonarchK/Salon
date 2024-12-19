var container = document.getElementById("container");
var child = [document.querySelector(".images")];
var a = 0, b = 0;
var names = ["braids", "weave", "all-back", "twists", "bun", "rolls", "electric"]; 

async function checkImg(){
    while(a == b){
        if(a > 0){
            child.push(document.querySelector(".images").cloneNode(true));
            container.appendChild(child[a]);
        }
        let imgSet = document.querySelectorAll(".image-box");
        let imgContainer = imgSet[a];
        let imge = imgContainer.children[0];
        let nam = imgContainer.children[1];
        await new Promise((resolve,reject)=>{
            const img = new Image();
            img.src = "../Pictures/Services/" + names[a] + ".jpg";
            img.onload = ()=>{
                imge.src = img.src;
                nam.innerHTML = names[a];
                b++;
                resolve(true);
            }
            img.onerror = ()=>{
                if(names.length - 1 > a){
                    b++;
                }
                child[a].style.display = "none";
                resolve(false);
            }
        })
        a++;
    }
    
}

checkImg().catch(()=>{console.log("end")});