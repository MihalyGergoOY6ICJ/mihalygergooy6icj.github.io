const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function deleteCar(){
    const confimElem = document.querySelector("#confirm");
    if(confirm("Are you sure you want to delete the car?")){
        const response = await fetch(`https://iit-playground.arondev.hu/api/OY6ICJ/car/${id}`, {
            method: 'DELETE'
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
            case 404:
                //No result found
                alert(`No result found!`);
                break;
            }
            confimElem.textContent = "Delete unsuccessful!"
        }
        else{
            confimElem.textContent = "Delete successful!"
        }
    }
    else{
        confimElem.textContent = "Delete aborted!"
    }
}


deleteCar();

