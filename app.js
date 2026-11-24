
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
