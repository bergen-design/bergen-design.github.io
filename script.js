 //Add personalized welcome
setTimeout(
function addWelcome() {

      var name = prompt("Hey! Welcome to my website! What should I call you?", "");
      document.cookie = `${name}; path=/`;
      let x = document.cookie;
      
      
      if (name === null) {
          let welcome = document.getElementById('welcome');
          console.log(name);
          
          document.getElementById("name").innerHTML = "";

          
      }else if (name != "") {
          let welcome = document.getElementById('welcome');
          console.log(name);
          
          document.getElementById("name").innerHTML = name +"! ";
          
      }
      
      
 }, 1000);

// Check if elements exist before accessing their offset
var homeEl = $('#home');
var featuredWorkEl = $('#featuredWork');
var caseStudyEl = $('#caseStudy');

var top1 = homeEl.length ? homeEl.offset().top : 0;
var top2 = featuredWorkEl.length ? featuredWorkEl.offset().top : 0;
var top3 = caseStudyEl.length ? caseStudyEl.offset().top : 0;

$(document).scroll(function() {
  var scrollPos = $(document).scrollTop();
  if (top1 && top2 && scrollPos >= top1 && scrollPos < top2) {
    $('#change').css('background-color', '#f00');
  } else if (top2 && top3 && scrollPos >= top2 && scrollPos < top3) {
    $('#change').css('background-color', '#0f0');
  } else if (top3 && scrollPos >= top3) {
    $('#change').css('background-color', '#00f');
  }
});

  //Advice add in
function getAdvice() {
  $.getJSON("https:api.adviceslip.com/advice", function (result) {
       console.log(result.slip.advice);
      let input = document.createElement("div");
      input.innerHTML = result.slip.advice;
      console.log(input);
      document.getElementById("insertAdvice").appendChild(input);
  });
}
getAdvice();

    // image slide in
  //  window.onscroll = function () { myFunction() };

    //function myFunction() {
      //  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        //    let img = document.getElementById("profile");
          //  img.className = "slideIn";
            //console.log(img);
       // }
    //};

// Only run if contact element exists
var contact = document.getElementById('contactme') || document.querySelector('.contact');
if (contact) {
  contact.onmouseover = function increaseSize(x) {
    x.style.fontSize = "30px";
    x.onmouseleave = function decreaseName() {
      x.style.fontSize = "20px";
    }
  };
}

//Change Color for menu
//function changeColor(x) {
  //  x.style.color = "#18A999";
    //x.onmouseleave = function () {
      //  x.style.color = "#123840";
   // }
//}
//Change name color and add title
//title.onmouseover = function () {
  //  title.innerHTML = 'Micah Andre Bergen. <div style="font-size: 20px;"> -UI/UX Futurist</div>';
    //title.style.color = "#18A999";
    //title.onmouseleave = function () {
      //  title.innerHTML = " Micah Andre Bergen."
        //title.style.color = "#18A999";
    //}
//};
// After anima-src
setTimeout(function () {
  var instShowOnScroll = new ShowOnScroll();
  instShowOnScroll.init();
}, 250);

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

// Function to check if .proj elements intersect with .proj-trigger-zone
function checkProjTriggerZoneIntersection() {
  console.log('checkProjTriggerZoneIntersection called, viewport width:', window.innerWidth);
  
  // Only run on mobile (max-width: 900px)
  if (window.innerWidth > 900) {
    console.log('Desktop view - skipping');
    // Remove all centered classes on desktop
    document.querySelectorAll('.proj').forEach(function(el) {
      el.classList.remove('proj-centered');
    });
    return;
  }
  
  console.log('Mobile view - checking intersections');

  var triggerZone = document.querySelector('.proj-trigger-zone');
  if (!triggerZone) {
    console.log('Trigger zone not found');
    return;
  }

  var triggerRect = triggerZone.getBoundingClientRect();
  var projElements = document.querySelectorAll('.proj');
  
  if (projElements.length === 0) {
    console.log('No .proj elements found');
    return;
  }

  console.log('Trigger zone rect:', triggerRect);
  console.log('Checking', projElements.length, 'proj elements');
  
  projElements.forEach(function(element, index) {
    var elementRect = element.getBoundingClientRect();
    
    // Check if element intersects with trigger zone
    // More lenient check - if any part of element overlaps with trigger zone
    var isIntersecting = (
      elementRect.top < triggerRect.bottom &&
      elementRect.bottom > triggerRect.top &&
      elementRect.left < triggerRect.right &&
      elementRect.right > triggerRect.left
    );
    
    if (index < 3) { // Log first 3 elements for debugging
      console.log('Element', index, ':', element.textContent.trim().substring(0, 20));
      console.log('  Element rect:', elementRect);
      console.log('  Is intersecting:', isIntersecting);
      console.log('  Has proj-centered class:', element.classList.contains('proj-centered'));
    }
    
    if (isIntersecting) {
      // Element is intersecting the trigger zone - apply gradient color
      if (!element.classList.contains('proj-centered')) {
        element.classList.add('proj-centered');
        console.log('✓ Added proj-centered to:', element.textContent.trim().substring(0, 20));
        console.log('  Element classes after add:', element.className);
      }
    } else {
      // Element is not intersecting the trigger zone - remove gradient color
      if (element.classList.contains('proj-centered')) {
        element.classList.remove('proj-centered');
        console.log('✗ Removed proj-centered from:', element.textContent.trim().substring(0, 20));
      }
    }
  });
}

// Initialize intersection checking on scroll and resize
function initProjTriggerZone() {
  console.log('=== Setting up proj trigger zone intersection checker ===');
  var triggerZone = document.querySelector('.proj-trigger-zone');
  var projElements = document.querySelectorAll('.proj');
  console.log('DOM ready, trigger zone exists:', !!triggerZone);
  console.log('Proj elements found:', projElements.length);
  if (triggerZone) {
    console.log('Trigger zone classes:', triggerZone.className);
    console.log('Trigger zone computed style display:', window.getComputedStyle(triggerZone).display);
  }
  
  window.addEventListener('scroll', checkProjTriggerZoneIntersection, { passive: true });
  window.addEventListener('resize', checkProjTriggerZoneIntersection);
  // Run once on page load
  setTimeout(function() {
    console.log('=== Initial check on page load ===');
    checkProjTriggerZoneIntersection();
    
    // Test: Manually add class to first proj element to verify CSS works
    if (projElements.length > 0 && window.innerWidth <= 900) {
      console.log('=== TEST: Manually adding proj-centered to first element ===');
      var testElement = projElements[0];
      testElement.classList.add('proj-centered');
      console.log('Test element classes:', testElement.className);
      console.log('Test element computed background:', window.getComputedStyle(testElement).background);
      console.log('Test element computed color:', window.getComputedStyle(testElement).color);
      console.log('Test element computed webkitTextFillColor:', window.getComputedStyle(testElement).webkitTextFillColor);
      // Remove after 2 seconds
      setTimeout(function() {
        testElement.classList.remove('proj-centered');
        console.log('Test: Removed class');
      }, 2000);
    }
  }, 100);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjTriggerZone);
} else {
  // DOM is already ready
  initProjTriggerZone();
}

// Simple test function - call this from console to test
window.testProjColor = function() {
  console.log('=== MANUAL TEST ===');
  var projElements = document.querySelectorAll('.proj');
  console.log('Found', projElements.length, 'proj elements');
  console.log('Viewport width:', window.innerWidth);
  
  if (projElements.length > 0) {
    var firstProj = projElements[0];
    console.log('First proj element:', firstProj);
    console.log('Current classes:', firstProj.className);
    console.log('Current color:', window.getComputedStyle(firstProj).color);
    console.log('Current background:', window.getComputedStyle(firstProj).background);
    
    // Add the class
    firstProj.classList.add('proj-centered');
    console.log('Added proj-centered class');
    console.log('New classes:', firstProj.className);
    console.log('New color:', window.getComputedStyle(firstProj).color);
    console.log('New background:', window.getComputedStyle(firstProj).background);
    console.log('New webkitTextFillColor:', window.getComputedStyle(firstProj).webkitTextFillColor);
    console.log('New backgroundClip:', window.getComputedStyle(firstProj).backgroundClip);
    
    // Check if in mobile media query
    var mediaQuery = window.matchMedia('(max-width: 900px)');
    console.log('Mobile media query matches:', mediaQuery.matches);
  }
};

  