const params = new URLSearchParams(window.location.search);
const mod = params.get("mod");
const del = params.get("del");

function addCarCard(car){
    const carList = document.querySelector('#car-list');
    if(!mod && !del){
        const cardHtml = `
            <div class="card"> 
                <a href="car.html?id=${encodeURIComponent(car.id)}"><h4>${car.brand} ${car.model}</h4></a>
            </div>
        `;
    carList.innerHTML += cardHtml;
    }
    else if(del){
        const cardHtml = `
            <div class="card"> 
                <a href="car-delete.html?id=${encodeURIComponent(car.id)}"><h4>${car.brand} ${car.model}</h4></a>
            </div>
        `;
        carList.innerHTML += cardHtml;
    }
    else{
        const cardHtml = `
            <div class="card"> 
                <a href="car-modify.html?id=${encodeURIComponent(car.id)}"><h4>${car.brand} ${car.model}</h4></a>
            </div>
        `;
        carList.innerHTML += cardHtml;
    }
}



async function loadCars(){
    const response = await fetch('https://iit-playground.arondev.hu/api/OY6ICJ/car');
    if(!response.ok){
        const err = await response.json();
        switch(response.status){
        case 400:
            //Generic error response
            alert(`A server error occured: ${err.message}!`);
            return;
        case 401:
            //Auth error
            alert(`Authorization error: ${err.message}!`);
            return;
        case 404:
            //No result found
            alert(`No result found!`);
            return;
        }
    }
    const cars = await response.json();

    for(car of cars){
        addCarCard(car);
    }
}


loadCars();

