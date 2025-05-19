function addCarDataSheet(car){
    const carDataSheet = document.querySelector("#car-data-sheet");

    const dataSheetHtml = `
        <p class=card><strong>Brand:</strong> ${car.brand}</p>
        <p class=card><strong>Model:</strong> ${car.model}</p>
        <p class=card><strong>Owner:</strong> ${car.owner}</p>
        <p class=card><strong>Fuel use:</strong> ${car.fuelUse}</p>
        <p class=card><strong>Day of commission:</strong> ${car.dayOfCommission}</p>
        <p class=card><strong>Electric:</strong> ${car.electric}</p>
    `;

    carDataSheet.innerHTML += dataSheetHtml;
}

async function loadCar(id){
    const response = await fetch(`https://iit-playground.arondev.hu/api/OY6ICJ/car/${id}`);
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
    else{
        const car = await response.json();
        addCarDataSheet(car);
    }
}


const params = new URLSearchParams(window.location.search);
const id = params.get('id');
loadCar(id);