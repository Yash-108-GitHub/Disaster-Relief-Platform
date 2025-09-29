const Signup_btn_dom = document.getElementsByClassName("Signup_btn_dom")[0];
const Signup_form = document.getElementsByClassName("Signup_form")[0];

const login_btn_dom = document.getElementsByClassName("login_btn_dom")[0];
const login_form = document.getElementsByClassName("login_form")[0];

Signup_btn_dom.addEventListener("click", () => {
    Signup_form.style.display = "block";
    login_form.style.display = "none";
})

login_btn_dom.addEventListener("click", () => {
     login_form.style.display = "block"; 
    Signup_form.style.display = "none";
})

// ------------------------------------------------------------------------------------

const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const roleInput = document.getElementById("roleInput");

dropdownItems.forEach(item =>{  //victum, volunteer,..
    item.addEventListener("click", (e) =>{
        e.preventDefault(); //stops the default browser behavior.
        dropdownBtn.textContent = item.textContent;
        roleInput.value = item.dataset.role; //set the value of roleInput to the role of the clicked dropdown item.
    });
});

// ----------------------------------------------------------------------------------------------
