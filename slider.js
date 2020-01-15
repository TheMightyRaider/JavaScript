function Slider() {
  // Initial setup

  this.slides = document.querySelector(".slides");
  this.current = document.querySelector(".current");
  this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;

  // Getting the Elements from the DOM

  this.nextButton = document.querySelector(".goToNext");
  this.prevButton = document.querySelector(".goToPrev");

  // Binded the instance of the object with the method created. Hence function body will be able to access the instance of the user-defined object and not someother instance.
  // Mainly used during event Listener.

  this.slidePrev = this.slidePrev.bind(this);
  this.slideNext = this.slideNext.bind(this);

  // Listening for click event

  this.nextButton.addEventListener("click", this.slideNext);
  this.prevButton.addEventListener("click", this.slidePrev);
}

// Creating a method inside the prototype of the instance object.

Slider.prototype.slidePrev = function(event) {
  this.removeClass();
  [this.prev, this.current, this.next] = [
    this.prev.previousElementSibling || this.slides.lastElementChild,
    this.prev,
    this.current
  ];
  this.addClass();
};

Slider.prototype.slideNext = function(event) {
  this.removeClass();
  [this.prev, this.current, this.next] = [
    this.current,
    this.next,
    this.next.nextElementSibling || this.slides.firstElementChild
  ];
  this.addClass();
};

Slider.prototype.addClass = function() {
  this.prev.classList.add("prev");
  this.current.classList.add("current");
  this.next.classList.add("next");
};

Slider.prototype.removeClass = function() {
  this.prev.classList.remove("prev");
  this.current.classList.remove("current");
  this.next.classList.remove("next");
};

let slideOne = new Slider();
