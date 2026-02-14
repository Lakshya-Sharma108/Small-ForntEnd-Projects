let allKeys = document.querySelectorAll('.key');
let capsLight = document.querySelector('.capslockLight');


if (window.innerWidth < 600) {
    alert("This keyboard simulator is best viewed on a desktop or laptop. Some keys may not work properly on mobile devices.");
}

if (localStorage.getItem("capsState") === "on") {
    capsLight.classList.add("capslockLightOn");
}

document.addEventListener('keydown', function (event) {
    allKeys.forEach(function (key) {
        if (event.key === "CapsLock" && key.id.toLowerCase() == "keycapslock") {

            capsLight.classList.toggle('capslockLightOn');
            localStorage.setItem(
                "capsState",
                capsLight.classList.contains("capslockLightOn") ? "on" : "off"
            );

            event.preventDefault(); // Prevent the default behavior of CapsLock key

        }

        if (key.id.toLowerCase() == "key" + event.key.toLowerCase() || (event.key == " " && key.id == "keySpace")) {
            key.classList.add('active');
        }
    });
});

document.addEventListener('keyup', function (event) {
    allKeys.forEach(function (key) {
        if (key.id.toLowerCase() == "key" + event.key.toLowerCase() || (event.key == " " && key.id == "keySpace")) {
            key.classList.remove('active');
        }
    });
});

