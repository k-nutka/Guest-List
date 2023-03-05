window.onload = function(){
    console.log("start");
    init();
    
}

let name = document.getElementById("name");
let surname = document.getElementById("surname");
let submit = document.getElementById("submit");
let counter = document.getElementById("counter");
let guestList = document.querySelector(".guest-list");
let allInputs = document.querySelectorAll("input");

guestNumber = 0;


function init(){
    
    let guestsFromLocalStorage = Array.from(JSON.parse(localStorage.getItem("guests")) ?? []);
    console.log(guestsFromLocalStorage);


    if(guestsFromLocalStorage.length > 0 ){
        guestsFromLocalStorage.forEach( guest =>{
        
    let newGuest = document.createElement("div");
    newGuest.classList.add("guest");
    let paragraph = document.createElement("p");
    paragraph.classList.add("dane");
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.dataset.id = guest.id;
    let confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button");
    removeButton.dataset.id = guest.id;



    guestList.appendChild(newGuest);
    newGuest.appendChild(paragraph);
    newGuest.appendChild(removeButton);
    newGuest.appendChild(confirmButton);


    paragraph.innerHTML = guest.name + " " + guest.surname;
    if(guest.confirm){
        newGuest.style.backgroundColor = "pink";
    }

    removeButton.innerHTML= "Usuń";
    confirmButton.innerHTML = "Potwierdź";
    removeButton.addEventListener("click", (e)=> deleteGuest(e));
    confirmButton.addEventListener("click", (e)=>confirmGuest(e));

    guestNumber++;
    counter.innerHTML = "Liczba gości: " + guestNumber;
    
});

}}
    
function deleteGuest(e, i){
    const guestToDelete = e.target.closest(".guest");

    guestList.removeChild(guestToDelete);
    guestNumber--;
    counter.innerHTML = "Liczba gości: " + guestNumber;

    const guestId = Number(e.target.dataset.id);

    deleteFromLocalStorage(guestId);

}


function deleteFromLocalStorage(guestId){
    let guestsFromLocalStorage = Array.from(JSON.parse(localStorage.getItem("guests")) ?? []);

    const guestIndex = guestsFromLocalStorage.findIndex(guest => guest.id == guestId);

    if(guestIndex == -1){
        return;
    }
    
    guestsFromLocalStorage.splice(guestIndex,1);

    localStorage.setItem("guests", JSON.stringify(guestsFromLocalStorage));
}

function confirmGuest(e, i){
    e.preventDefault();
    const guestToConfirm = e.target.closest(".guest");
    guestToConfirm.style.backgroundColor = "pink";

    const guestId = Number(e.target.dataset.id);

    confirmInLocalStorage(guestId);
}



function confirmInLocalStorage(guestId){
    let guestsFromLocalStorage = Array.from(JSON.parse(localStorage.getItem("guests")) ?? []);
    const guestIndex = guestsFromLocalStorage.findIndex(guest => guest.id == guestId);

    if(guestIndex == -1){
        return;
    }

    let confirmGuest= guestsFromLocalStorage[guestIndex]; // wyciągnięty objekt

    confirmGuest.confirm = true; // obiekt plus true

    guestsFromLocalStorage.splice(guestIndex,1);

    guestsFromLocalStorage.push(confirmGuest);

    console.log(guestsFromLocalStorage);
    localStorage.setItem("guests", JSON.stringify(guestsFromLocalStorage))
}
          


    


//potwierdź - do tablicy dodaj potwierdź if(potwierdź in array) {newGuest.style.background = "color"}

function createGuest(e){
    e.preventDefault();
    console.log("Funkcja działa");

    const newGuestId = new Date().valueOf(); 

    let newGuest = document.createElement("div");
    newGuest.classList.add("guest");
    let paragraph = document.createElement("p");
    paragraph.classList.add("dane");
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.dataset.id = newGuestId;
    let confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button");
    confirmButton.dataset.id = newGuestId;



    guestList.appendChild(newGuest);
    newGuest.appendChild(paragraph);
    newGuest.appendChild(removeButton);
    newGuest.appendChild(confirmButton);


    paragraph.innerHTML = name.value + " " + surname.value;

    removeButton.innerHTML= "Usuń";
    confirmButton.innerHTML = "Potwierdź";

    guestNumber++;
    counter.innerHTML = "Liczba gości: " + guestNumber;
    removeButton.addEventListener("click", (e)=> deleteGuest(e));
    confirmButton.addEventListener("click", (e)=>confirmGuest(e));

    
    
    
    //Zapis do local storage

    
    let guestsFromLocalStorage = Array.from(JSON.parse(localStorage.getItem("guests")) ?? []);

    let newGuestObj = {};

    for(let input of allInputs){
        newGuestObj[input.id] = input.value;
    }

    //Przypisujemy id którego wygenerowaliśmy na górze funkcji 
    newGuestObj.id = newGuestId;
    newGuestObj.confirm = false;

    guestsFromLocalStorage.push(newGuestObj)

    localStorage.setItem("guests", JSON.stringify(guestsFromLocalStorage));
    //

    clear();
    
    
    

    
  }








    



submit.addEventListener("click", (e)=> createGuest(e));


function clear(){
    name.value = "";
    surname.value = "";
}




