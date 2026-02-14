let allKeys = document.querySelectorAll('.key');


if (window.innerWidth < 600) {
    alert("This keyboard simulator is best viewed on a desktop or laptop. Some keys may not work properly on mobile devices.");
}



document.addEventListener('keydown', function (event) {
    allKeys.forEach(function (key) { 
        if (event.key === "CapsLock" && key.id.toLowerCase() == "keycapslock") {
            document.querySelector('.capslockLight').classList.toggle('capslockLightOn');
            event.preventDefault(); // Prevent the default behavior of CapsLock key
            
        }
        
        if (key.id.toLowerCase() == "key"+event.key.toLowerCase() || (event.key == " " && key.id == "keySpace")) {
            key.classList.add('active');
        }
    });
});

document.addEventListener('keyup', function (event) {
    allKeys.forEach(function (key) {
        if (key.id.toLowerCase() == "key"+event.key.toLowerCase() || (event.key == " " && key.id == "keySpace")) {
            key.classList.remove('active');
        }
    });
});

