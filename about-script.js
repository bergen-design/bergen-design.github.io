
    // image slide in
    window.onscroll = function () { myFunction() };

    function myFunction() {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            let img = document.getElementById("profile");
            img.className = "slideIn";
            console.log(img);
        }
    };

contact.onmouseover = function increaseSize(x) {
    x.style.fontSize = "30px";
    x.onmouseleave = function decreaseName() {
        x.style.fontSize = "20px";
    }
};
//Change Color for menu
function changeColor(x) {
    x.style.color = "#18A999";
    x.onmouseleave = function () {
        x.style.color = "#123840";
    }
}
//Change name color and add title
title.onmouseover = function () {
    title.innerHTML = 'Micah Andre Bergen. <div style="font-size: 20px;"> -UI/UX Futurist</div>';
    title.style.color = "#18A999";
    title.onmouseleave = function () {
        title.innerHTML = " Micah Andre Bergen."
        title.style.color = "#18A999";
    }
};
//Advice add in
function getAdvice() {
    $.getJSON("https:api.adviceslip.com/advice", function (result) {
        // console.log(result.slip.advice);
        let input = document.createElement("div");
        input.innerHTML = result.slip.advice;
        // console.log(input);
        document.getElementById("insertAdvice").appendChild(input);
    });
}
getAdvice();

