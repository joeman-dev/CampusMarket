
// ======================================
// CAMPUSMARKET - AUTHENTICATION
// ======================================


// GET HTML ELEMENTS

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const authMessage = document.getElementById("authMessage");


// SWITCH BETWEEN LOGIN AND SIGNUP

showSignup.addEventListener("click", function(event) {
    event.preventDefault();

    loginSection.style.display = "none";
    signupSection.style.display = "block";

    authMessage.textContent = "";
});

showLogin.addEventListener("click", function(event) {
    event.preventDefault();

    signupSection.style.display = "none";
    loginSection.style.display = "block";

    authMessage.textContent = "";
});


// DISPLAY MESSAGES

function displayMessage(message, type) {

    authMessage.textContent = message;

    authMessage.className = "mt-3 alert alert-" + type;
}


// STUDENT REGISTRATION

signupForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const fullName = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    displayMessage("Creating your account...", "info");

    const { data, error } = await supabaseClient.auth.signUp({

        email: email,
        password: password,

        options: {
            data: {
                full_name: fullName
            },
            emailRedirectTo: "http://127.0.0.1:5500/login.html"
        }

    });

    if (error) {

        displayMessage(error.message, "danger");

    } else {

        displayMessage(
            "Account created! Check your email if confirmation is required.",
            "success"
        );

        signupForm.reset();

        console.log("Registration successful:", data);

    }

});


// STUDENT LOGIN

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    displayMessage("Logging you in...", "info");

    const { data, error } = await supabaseClient.auth.signInWithPassword({

        email: email,
        password: password

    });

    if (error) {

        displayMessage(error.message, "danger");

    } else {

        displayMessage("Login successful! Welcome to CampusMarket.", "success");

        console.log("Login successful:", data);

        setTimeout(function() {
            window.location.href = "index.html";
        }, 1500);

    }

});


// ======================================
// STUDENT LOGOUT
// ======================================

const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", async function() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {

        displayMessage(error.message, "danger");

    } else {

        displayMessage("You have successfully logged out.", "success");

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1000);

    }

});
