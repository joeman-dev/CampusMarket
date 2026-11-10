
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
 const logoutButton = document.getElementById("logoutButton");


 // VERCEL WEBSITE URL

 const WEBSITE_URL = "https://campusmarket-topaz.vercel.app";


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


 // HANDLE AUTHENTICATION ERRORS

 function handleAuthError(error) {

     console.error("Authentication error:", error);

     if (
         error.status === 429 ||
         error.code === "over_email_send_rate_limit"
     ) {
         displayMessage(
             "Too many email requests. Please wait before trying again.",
             "warning"
         );
     } else {
         displayMessage(error.message, "danger");
     }
 }


 // ======================================
 // STUDENT REGISTRATION
 // ======================================

 signupForm.addEventListener("submit", async function(event) {

     event.preventDefault();

     const submitButton = signupForm.querySelector(
         'button[type="submit"]'
     );

     if (submitButton.disabled) return;

     const fullName = document.getElementById("signupName").value.trim();
     const email = document.getElementById("signupEmail").value.trim();
     const password = document.getElementById("signupPassword").value;

     submitButton.disabled = true;
     submitButton.textContent = "Creating Account...";

     displayMessage("Creating your account...", "info");

     try {

         const { data, error } = await supabaseClient.auth.signUp({

             email: email,
             password: password,

             options: {
                 data: {
                     full_name: fullName
                 },

                 emailRedirectTo: `${WEBSITE_URL}/login.html`
             }

         });

         if (error) {
             handleAuthError(error);
             return;
         }

         if (data.user && !data.session) {

             displayMessage(
                 "Account created! Please check your email and confirm your account before logging in.",
                 "success"
             );

         } else {

             displayMessage(
                 "Registration successful! Welcome to CampusMarket.",
                 "success"
             );

         }

         signupForm.reset();

         console.log("Registration result:", data);

     } catch (error) {

         handleAuthError(error);

     } finally {

         submitButton.disabled = false;
         submitButton.textContent = "Create Account";

     }

 });


 // ======================================
 // STUDENT LOGIN
 // ======================================

 loginForm.addEventListener("submit", async function(event) {

     event.preventDefault();

     const submitButton = loginForm.querySelector(
         'button[type="submit"]'
     );

     if (submitButton.disabled) return;

     const email = document.getElementById("loginEmail").value.trim();
     const password = document.getElementById("loginPassword").value;

     submitButton.disabled = true;
     submitButton.textContent = "Logging in...";

     displayMessage("Checking your account...", "info");

     try {

         const { data, error } =
             await supabaseClient.auth.signInWithPassword({

                 email: email,
                 password: password

             });

         if (error) {
             handleAuthError(error);
             return;
         }

         displayMessage(
             "Login successful! Welcome to CampusMarket.",
             "success"
         );

         console.log("Login successful:", data);

         setTimeout(function() {
             window.location.href = "index.html";
         }, 1500);

     } catch (error) {

         handleAuthError(error);

     } finally {

         submitButton.disabled = false;
         submitButton.textContent = "Login";

     }

 });


 // ======================================
 // STUDENT LOGOUT
 // ======================================

 logoutButton.addEventListener("click", async function() {

     logoutButton.disabled = true;

     try {

         const { error } = await supabaseClient.auth.signOut();

         if (error) {
             handleAuthError(error);
             return;
         }

         displayMessage(
             "You have successfully logged out.",
             "success"
         );

         setTimeout(function() {
             window.location.href = "login.html";
         }, 1000);

     } catch (error) {

         handleAuthError(error);

     } finally {

         logoutButton.disabled = false;

     }

 });
