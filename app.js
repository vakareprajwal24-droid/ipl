
// Reusable Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Update the booking summary whenever a booking option changes.
document.addEventListener("DOMContentLoaded", function () {
    const matchSelect = document.getElementById("match");
    const standSelect = document.getElementById("stand");
    const quantityInput = document.getElementById("quantity");
    const matchSummary = document.getElementById("booking-summary-match");
    const standSummary = document.getElementById("booking-summary-stand");
    const priceSummary = document.getElementById("booking-summary-price");
    const quantitySummary = document.getElementById("booking-summary-quantity");
    const totalSummary = document.getElementById("booking-summary-total");

    const ticketPrices = {
        "match-01": { general: 1500, premium: 3500, vip: 7500 },
        "match-02": { general: 1200, premium: 3000, vip: 6500 },
        "match-03": { general: 1000, premium: 2500, vip: 5500 }
    };

    function updateBookingSummary(showNotification) {
        const selectedMatch = matchSelect.selectedOptions[0];
        const selectedStand = standSelect.selectedOptions[0];
        const pricesForMatch = ticketPrices[matchSelect.value];
        const ticketPrice = pricesForMatch ? pricesForMatch[standSelect.value] : 0;
        const quantity = quantityInput.valueAsNumber;
        const hasValidQuantity =
            Number.isInteger(quantity) && quantityInput.validity.valid;
        const validQuantity = hasValidQuantity ? quantity : 0;

        matchSummary.textContent =
            matchSelect.value && selectedMatch
                ? selectedMatch.textContent
                : "Not selected";
        standSummary.textContent = selectedStand ? selectedStand.textContent : "Not selected";
        priceSummary.textContent = `Rs. ${ticketPrice.toLocaleString("en-IN")}`;
        quantitySummary.textContent = String(validQuantity);
        totalSummary.textContent =
            `Rs. ${(ticketPrice * validQuantity).toLocaleString("en-IN")}`;

        if (showNotification) {
            showToast("Booking summary updated.");
        }
    }

    [matchSelect, standSelect, quantityInput].forEach(control => {
        control.addEventListener("change", function () {
            updateBookingSummary(true);
        });
    });

    quantityInput.addEventListener("input", function () {
        updateBookingSummary(false);
    });
});

// Smooth Scrolling to Booking Form
document.addEventListener("DOMContentLoaded", function () {

    const bookButtons = document.querySelectorAll(
        'a[href="#book-ticket"], .book-btn'
    );

    bookButtons.forEach(button => {
        button.addEventListener("click", function (event) {

            const bookingForm = document.getElementById("book-ticket");

            if (bookingForm) {
                event.preventDefault();

                bookingForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                showToast("Welcome! Book your IPL tickets now.");
            }
        });
    });

});
