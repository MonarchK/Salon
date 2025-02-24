var lis = document.getElementById("link-list");
var tgl = document.querySelector(".link-toggle");
var nav = document.getElementById("navbar");
var lnk = document.getElementById("links");
var count = 0;

setInterval(()=>{
    if(window.matchMedia("(min-width: 961px)").matches){    
        if(count == 0){
            nav.removeChild(lnk);
            nav.appendChild(lis);
            lis.id = "link-listd";
            count++;
        }
        
    }
    if(window.matchMedia("(max-width: 960px)").matches){
        if(count == 1){
            lis.id = "link-list";
            nav.removeChild(lis);
            nav.appendChild(lnk);
            tgl.appendChild(lis);
            count--;
        }
    }
},10);
/*uses count to see if either code has run before based on the devices 
  current screen width, runs this at an interval of 0.01 secs because ppl 
  can and might change the viewport height, hence it needs to be aware of
  this and re-render immediately*/