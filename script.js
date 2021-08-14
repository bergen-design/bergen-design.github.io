var overlay_id = "overlay-frame-13";
document.getElementById(overlay_id).addEventListener(
  "click",
  function (event) {
    var overlay_id = "overlay-frame-13";
    var e = event || window.event;
    var overlayElement = document.getElementById(overlay_id);
    var overlayContainer = overlayElement.getElementsByClassName("frame-13");
    var clickedDiv = e.toElement || e.target;
    var dismissButton = clickedDiv.parentElement.id == overlay_id;
    var clickOutsideOverlay = false;
    if (overlayContainer.length > 0) {
      clickOutsideOverlay = !overlayContainer[0].contains(clickedDiv) || overlayContainer[0] == clickedDiv;
    }
    if (dismissButton || clickOutsideOverlay) {
      HideOverlay("frame-13", "animate-disappear");
    }
  },
  false
);


// var overlay_id = "overlay-frame-4";
// document.getElementById(overlay_id).addEventListener(
//   "click",
//   function (event) {
//     var overlay_id = "overlay-frame-4";
//     var e = event || window.event;
//     var overlayElement = document.getElementById(overlay_id);
//     var overlayContainer = overlayElement.getElementsByClassName("frame-4");
//     var clickedDiv = e.toElement || e.target;
//     var dismissButton = clickedDiv.parentElement.id == overlay_id;
//     var clickOutsideOverlay = false;
//     if (overlayContainer.length > 0) {
//       clickOutsideOverlay = !overlayContainer[0].contains(clickedDiv) || overlayContainer[0] == clickedDiv;
//     }
//     if (dismissButton || clickOutsideOverlay) {
//       HideOverlay("frame-4", "animate-disappear");
//     }
//   },
//   false
// );

var overlay_id = "overlay-frame-13";
document.getElementById(overlay_id).addEventListener(
  "click",
  function (event) {
    var overlay_id = "overlay-frame-13";
    var e = event || window.event;
    var overlayElement = document.getElementById(overlay_id);
    var overlayContainer = overlayElement.getElementsByClassName("frame-13");
    var clickedDiv = e.toElement || e.target;
    var dismissButton = clickedDiv.parentElement.id == overlay_id;
    var clickOutsideOverlay = false;
    if (overlayContainer.length > 0) {
      clickOutsideOverlay = !overlayContainer[0].contains(clickedDiv) || overlayContainer[0] == clickedDiv;
    }
    if (dismissButton || clickOutsideOverlay) {
      HideOverlay("frame-13", "animate-disappear");
    }
  },
  false
);
ShowOverlay = function (overlayName, animationName) {
  overlayName = "overlay-" + overlayName;
  var cssClasses = document.getElementById(overlayName).className.split(" ");
  var last = cssClasses.slice(-1)[0];
  if (last.lastIndexOf("animate") == -1) {
    document.getElementById(overlayName).className =
      document.getElementById(overlayName).className + " " + animationName;
  }
  if (window.loadAsyncSrc != undefined) {
    loadAsyncSrc();
  }
};
HideOverlay = function (overlayName, animationName) {
  overlayName = "overlay-" + overlayName;
  var cssClasses = document.getElementById(overlayName).className.split(" ");
  var last = cssClasses.slice(-1)[0];
  if (last.lastIndexOf("animate") != -1) {
    cssClasses.splice(-1);
    cssClasses.push(animationName);
    document.getElementById(overlayName).className = cssClasses.join(" ");

    cssClasses.splice(-1);
    setTimeout(function () {
      document.getElementById(overlayName).className = cssClasses.join(" ");
    }, 1100);
  }
  var vids = document.getElementsByTagName("video");
  if (vids) {
    for (var i = 0; i < vids.length; i++) {
      var video = vids.item(i);
      video.pause();
    }
  }
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

 /* Copyright (c) 2016 Tobias Buschor https://goo.gl/gl0mbf | MIT License https://goo.gl/HgajeK */ 

if (!HTMLFormElement.prototype.reportValidity) {
  HTMLFormElement.prototype.reportValidity = function () {
    if (this.checkValidity()) return true;
    var btn = document.createElement("button");
    this.appendChild(btn);
    btn.click();
    this.removeChild(btn);
    return false;
  };
}

function SubmitForm(form_name) {
  var form = document.getElementsByName(form_name)[0];
  if (form.reportValidity()) {
    form.submit();
    if (window.submitted) window.submitted();
  }}
