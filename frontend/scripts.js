const menuButtons = document.querySelectorAll(".main-menu .menu-button");

menuButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
        menuButtons.forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
    });
});
