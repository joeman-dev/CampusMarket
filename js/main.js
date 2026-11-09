
// GET THE SEARCH ELEMENTS

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// GET ALL FEATURED PRODUCT CARDS

const productCards = document.querySelectorAll(".product-card");

// GET THE PRODUCT CONTAINER

const productContainer = document.querySelector(".products-section .row");

// CREATE A MESSAGE FOR WHEN NO PRODUCT IS FOUND

const noResultsMessage = document.createElement("p");

noResultsMessage.textContent = "Sorry, no matching products found.";

noResultsMessage.style.display = "none";
noResultsMessage.style.textAlign = "center";
noResultsMessage.style.marginTop = "20px";

productContainer.insertAdjacentElement("beforebegin", noResultsMessage);


// SEARCH FUNCTION

function searchProducts() {

    // GET WHAT THE USER TYPES

    const searchValue = searchInput.value.toLowerCase().trim();

    let productsFound = 0;

    // CHECK EACH PRODUCT

    productCards.forEach(function(card) {

        const productName = card.querySelector("h5").textContent.toLowerCase();

        const productCategory = card.querySelector(".product-category").textContent.toLowerCase();

        // CHECK WHETHER THE NAME OR CATEGORY MATCHES

        if (
            productName.includes(searchValue) ||
            productCategory.includes(searchValue)
        ) {

            card.parentElement.style.display = "";

            productsFound++;

        } else {

            card.parentElement.style.display = "none";

        }

    });

    // DISPLAY MESSAGE IF NO PRODUCT MATCHES

    if (productsFound === 0) {

        noResultsMessage.style.display = "block";

    } else {

        noResultsMessage.style.display = "none";

    }

}


// SEARCH WHEN BUTTON IS CLICKED

searchButton.addEventListener("click", searchProducts);


// SEARCH WHEN ENTER IS PRESSED

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchProducts();

    }

});


async function testDatabaseConnection() {

    const { data, error } = await supabaseClient
        .from("products")
        .select("id")
        .limit(1);

    if (error) {

        console.error("Database connection failed:", error);

    } else {

        console.log("Database connection successful!");
        console.log("Products retrieved:", data);

    }

}

testDatabaseConnection();
