// Select the Menu button and navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

// Run only when both elements exist
if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        // Check whether the menu is currently open
        const isExpanded =
            menuButton.getAttribute("aria-expanded") === "true";

        // Update the accessibility state
        menuButton.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        // Add or remove the class that displays the menu
        navigation.classList.toggle("is-open", !isExpanded);
    });
}