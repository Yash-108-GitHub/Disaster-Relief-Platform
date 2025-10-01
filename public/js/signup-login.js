
const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const roleInput = document.getElementById("roleInput");

dropdownItems.forEach(item =>{  //victum, volunteer,..
    item.addEventListener("click", (e) =>{
        e.preventDefault(); //stops the default browser behavior.
        dropdownBtn.innerHTML = item.textContent;
        roleInput.value = item.dataset.role; //set the value of roleInput to the role of the clicked dropdown item.
    });
});

// ----------------------------------------------------------------------------------------------
