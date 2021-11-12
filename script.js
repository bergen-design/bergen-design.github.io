// Add personalized welcome
setTimeout(
    function addWelcome() {

        var name = prompt("Hey! Welcome to my website, to get started please input your nickname below:", "");
        if (name === null) {
            let welcome = document.getElementById('welcome');
            console.log(name);
            document.getElementById("name").innerHTML = "";
            
        }else if (name != "") {
            let welcome = document.getElementById('welcome');
            console.log(name);
            document.getElementById("name").innerHTML = name +"!";
        }
    }, 1000);
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

// image slide in
 window.onscroll = function () { myFunction() };

 function myFunction() {
     if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
         let img = document.getElementById("profile");
         img.className = "slideIn";
         console.log(img);
     }
 };
  // Add top button on scroll
  // Get
  // var button = document.getElementById("myBtn");

  //on scroll
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10)
    {
    let button = document.getElementById("myBtn");
    button.className ="show";
    }
  };

  //onclick
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

function ShowOnScroll() {
    this.toShow = [];
    this.nextEventY = undefined;
  }

  ShowOnScroll.prototype.show = function (e) {
    e.style.display = "";
  };

  ShowOnScroll.prototype.hide = function (e) {
    e.style.display = "none";
  };

  ShowOnScroll.prototype.getTop = function (e) {
    if (e.Top != undefined && e.Top != 0) {
      return e.Top;
    }
    var top = 0;
    var iter = e;
    do {
      top += iter.offsetTop || 0;
      iter = iter.offsetParent;
    } while (iter);
    e.Top = top;
    return top;
  };

  ShowOnScroll.prototype.onScroll = function () {
    var screenBottom = window.pageYOffset + window.innerHeight;
    if (this.nextEventY == undefined || this.nextEventY > screenBottom) {
      return;
    }
    this.nextEventY = undefined;
    for (var i = 0; i < this.toShow.length; i++) {
      var e = this.toShow[i];
      var top = this.getTop(e);
      if (top < screenBottom) {
        this.show(e);
        this.toShow.shift();
        i--;
      } else {
        this.nextEventY = top;
        break;
      }
    }
  };

  ShowOnScroll.prototype.resetScrolling = function () {
    // Clear state
    var screenBottom = window.pageYOffset + window.innerHeight;
    for (var i = 0; i < this.toShow.length; i++) {
      var e = this.toShow[i];
      this.show(e);
    }
    this.toShow = [];
    this.nextEventY == undefined;

    // Collect items
    var itemsToShowOnScroll = Array.prototype.slice.call(document.getElementsByTagName("*"));
    itemsToShowOnScroll = itemsToShowOnScroll.filter(function (e) {
      return e.getAttribute("show-on-scroll") != undefined;
    });
    var getTop = this.getTop;
    itemsToShowOnScroll.sort(function (a, b) {
      return getTop(a) - getTop(b);
    });
    for (var i = 0; i < itemsToShowOnScroll.length; i++) {
      var e = itemsToShowOnScroll[i];
      var top = this.getTop(e);
      if (top < screenBottom) {
        continue;
      }
      this.toShow.push(e);
      this.hide(e);
      this.nextEventY = this.nextEventY != undefined ? this.nextEventY : top;
    }
  };

  ShowOnScroll.prototype.handleEvent = function (e) {
    switch (e.type) {
      case "scroll":
        this.onScroll();
        break;
      case "resize":
        this.resetScrolling();
        break;
    }
  };

  ShowOnScroll.prototype.init = function () {
    this.resetScrolling();
    window.addEventListener("scroll", this);
    window.addEventListener("resize", this);
  };

  // After anima-src
  setTimeout(function () {
    var instShowOnScroll = new ShowOnScroll();
    instShowOnScroll.init();
  }, 250);

 // image slide in
 window.onscroll = function () { myFunction() };

 function myFunction() {
     if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
         let img = document.getElementById("profile");
         img.className = "slideIn";
         console.log(img);
     }
 };
  // Add top button on scroll
  // Get
  var button = document.getElementById("myTop");

  //on scroll
  window.onscroll = function () { rollFunction() };

  function rollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10)
    {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };

  //onclick
  function topFunction() {
    document.body.srollTop = 0;
    document.documentElement.scrollTop = 0;
  };