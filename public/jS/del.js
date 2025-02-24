function del(){
    try{
        const btn = document.getElementById('gone');
        if(!btn){return console.log('not for this page');}
        const path = window.location.pathname.split('/');
        const emp = path[2];
        const query = new URLSearchParams(window.location.search);
        let clickTimeout;

        btn.addEventListener('click', ()=>{
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(()=>{
                if(path[1] == 'services'){
                    query.set('page', 'services');
                    window.location.href = '/displayWarning/' + emp + '?' + query.toString();
                }else{
                    window.location.href = '/displayWarning/' + emp;
                }
            },300);
        });

        btn.addEventListener('dblclick', ()=>{
            clearTimeout(clickTimeout);
            if(path[1] == 'services'){window.location.href = '/del/services/' + emp;}
            if(path[1] == 'shop'){window.location.href = '/del/shop/' + emp;}
        });
    }catch(error){
        console.log(error);
        window.location.href = '/';
    }
    
}

del();