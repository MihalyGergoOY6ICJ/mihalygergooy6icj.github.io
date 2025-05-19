function loadMenu(){
    fetch('menu.html')
        .then(menu => menu.text())
        .then(navHtml => {
            const body = document.querySelector('body');
            body.insertAdjacentHTML('afterbegin', navHtml);
        })
        .catch(err => console.log(err));
}

loadMenu();
