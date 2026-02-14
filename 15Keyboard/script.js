let allKeys = document.querySelectorAll('.key');


document.addEventListener('keydown', function (event) {
    allKeys.forEach(function (key) { 
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

