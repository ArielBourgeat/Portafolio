// Mostrar el botón "← PROJECT ARCHIVE" solo cuando el usuario llega al final del scroll (imágenes)
document.addEventListener("DOMContentLoaded", function () {
    var backLink = document.getElementById("projectBackLink");
    var imagesColumn = document.querySelector(".project-detail-images");
    if (!backLink || !imagesColumn) return;

    function checkScrollEnd() {
        var rect = imagesColumn.getBoundingClientRect();
        var scrollBottom = window.scrollY + window.innerHeight;
        var columnBottom = imagesColumn.offsetTop + imagesColumn.offsetHeight;
        var threshold = 120;
        if (scrollBottom >= columnBottom - threshold) {
            backLink.classList.add("visible");
        } else {
            backLink.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", checkScrollEnd, { passive: true });
    checkScrollEnd();
});
