async function readInputs(){
    const brandInput = document.querySelector("#input-brand");
    const modelInput = document.querySelector("#input-model");
    const ownerInput = document.querySelector("#input-owner");
    const fuelUseInput = document.querySelector("#input-fuel-use");
    const dayOfCommissionInput = document.querySelector("#input-day-of-commission");
    const electricInput = document.querySelector("#input-electric");

    const response = await fetch('https://iit-playground.arondev.hu/api/OY6ICJ/car');
    if(!response.ok){
        const err = await response.json();
        switch(response.status){
        case 400:
            //Generic error response
            alert(`A server error occured: ${err.message}!`);
            return null;
        case 401:
            //Auth error
            alert(`Authorization error: ${err.message}!`);
            return null;
        case 404:
            //No result found
            alert(`No result found!`);
            return null;
        }
    }
    else{
        const result = await response.json();
        const id = await findMax(result) + 1;
        const brand = brandInput.value;
        const model = modelInput.value;
        const owner = ownerInput.value;
        const fuelUse = fuelUseInput.value;
        const dayOfCommission = dayOfCommissionInput.value;
        const electric = electricInput.checked;
        
        return {
            id: id,
            brand: brand,
            model: model,
            owner: owner, 
            fuelUse: fuelUse, 
            dayOfCommission: dayOfCommission, 
            electric: electric
        };
    }
}

async function findMax(cars){
    var max = 0;
    for(car of cars){
        if(car.id > max){
            max = car.id;
        }
    }
    if(max > 9){
        return 9;
    }
    return max;
}



function carValidate(car) {
    const brandValues = [ "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Volkswagen", "Audi", "Hyundai", "Kia", "Subaru", "Lexus", "Mazda", "Tesla", 
        "Jeep", "Porsche", "Volvo", "Jaguar", "Land Rover", "Mitsubishi", "Ferrari", "Lamborghini" ];
    if(!brandValues.includes(car.brand)){
        alert(`Brand ${car.brand} is not a valid brand!`);
        return false;
    }
    if(!(car.model.length > 0)){
        alert("Car model must be atleast 1 character(s) long!");
        return false;
    }
    const ownerRegex = /^.* .+$/;

    if(car.owner.length == 0 || !ownerRegex.test(car.owner)){
        alert("Car owner is not valid! (pattern: ^.* .+$)");
        return false;
    }

    if(car.fuelUse.length == 0 || isNaN(car.fuelUse)){
        alert(`Fuel use ${car.fuelUse} is not a number!`);
        return false;
    }
    if(car.electric){
        if(car.fuelUse != 0){
            alert("Fuel use must be 0!");
            return false;
        }
    }
    else{
        if(car.fuelUse <= 0){
            alert("Fuel use must be > 0!");
            return false;
        }
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if(car.dayOfCommission.length == 0 || car.dayOfCommission.match(dateRegex) == null){
        alert("Day of commission is not a valid date! (YYYY-MM-DD)");
        return false;
    }
    return true;
}


async function addCar(){
    const car = await readInputs();
    if(car != null){
        if(carValidate(car)){
            const response = await fetch("https://iit-playground.arondev.hu/api/OY6ICJ/car", {
                method: 'POST',
                body: JSON.stringify({
                    id: car.id,
                    brand: car.brand,
                    model: car.model,
                    fuelUse: car.fuelUse,
                    owner: car.owner,
                    dayOfCommission: car.dayOfCommission,
                    electric: car.electric
                })
            });
            if(!response.ok){
                const err = await response.json();
                switch(response.status){
                case 400:
                    //Generic error response
                    alert(`A server error occured: ${err.message}!`);
                    break;
                case 401:
                    //Auth error
                    alert(`Authorization error: ${err.message}!`);
                    break;
                }
            }
            else{
                alert("Car created succesfully!");
            }
        }
    }
}


const button = document.querySelector("#button-done");
button.addEventListener('click', () => addCar());