function toggleList(category) {
    var list = document.getElementById(category);
    list.style.display = (list.style.display === "none") ? "block" : "none";
}

function loadChannel(url) {
    document.getElementById("tvPlayer").src = url;
}
