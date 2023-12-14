
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

    const theme= localStorage.getItem('theme');
    if(theme){
        root.classList.add('dark-mode')
    }
   
   
  
    toggleBtn.addEventListener('click', function () {
        root.classList.toggle('dark-mode');
        if(root.classList.contains('dark-mode')){
        localStorage.setItem('theme','dark-mode');
        }
        else{
            localStorage.removeItem('theme');
        }

    })


