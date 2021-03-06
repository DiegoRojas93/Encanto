// variables

const d = document,
      w = window,
      $button = d.querySelector("#button-menu"),
      $show = d.querySelector("#show"),
      $slider = d.querySelector(".slider").querySelectorAll("img"),
      $texts = d.querySelector(".slider").querySelectorAll("p"),
      $ul = d.querySelector("ul"),
      $audio = d.querySelector("audio"),
      $videos = d.querySelectorAll("video[data-smart-video]"),
      $menu = d.querySelector("#show").querySelectorAll("a");

let toggle = 0,
  breakPoint = w.matchMedia("(max-width: 768px)");


// Functions

const callback = (entries) => {

    entries.forEach((entry, index) => {

      if ((entry.isIntersecting && $show.classList.contains("open") && toggle % 2) || (!(breakPoint.matches))){
        entry.target.play();
      } else {
        entry.target.pause();
      }

      w.addEventListener("visibilitychange", (e) => {
        d.visibilityState === "visible" && entry.isIntersecting
          ? entry.target.play()
          : entry.target.pause();
      });
    });
  },
  open_close = (cb = undefined) => {
    if (breakPoint.matches) {
      $show.classList.toggle("open");
      $audio.play();
    }
    if (cb !== undefined) cb();
  },
  callback_open = () => {
    if (toggle === 1 && $show.classList.contains("open")) {
      $videos[0].removeAttribute('muted');
      $videos[0].play();
    }
    if (!$show.classList.contains("open"))
      Array.from($videos).forEach((video) => video.pause());
  },
  mediaFunction = (e) => {
    (e.matches)
      ? $show.classList.add("open")
      : $show.classList.remove("open")
  },
  slider = (slide_1, slide_2, number_text) => {
    for (const img in $slider) {
      if (Object.hasOwnProperty.call($slider, img)) {
        if ($slider[img].className === "no_hide")
          $slider[img].classList.remove("no_hide");
      }
    }
    for (const text in $texts) {
      if (Object.hasOwnProperty.call($texts, text)) {
        if ($texts[text].className === "text_no_hide")
          $texts[text].classList.remove("text_no_hide");
      }
    }

    $slider[slide_1].classList.add("no_hide");
    $slider[slide_2].classList.add("no_hide");
    $texts[number_text].classList.add("text_no_hide");
  };



// DOM

d.addEventListener("DOMContentLoaded", (e) => {
  $button.addEventListener("click", (e) => {
    toggle++;
    open_close(callback_open);
  });

  $menu.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      if (anchor.getAttribute("href") === "#home") {
        toggle++;
        open_close(callback_open);
      } else {
        open_close();
      }
    });
  });

  $ul.addEventListener("click", (e) => {
    if (e.target.matches(".image_1")) slider(0, 3, 0);
    if (e.target.matches(".image_2")) slider(1, 4, 1);
    if (e.target.matches(".image_3")) slider(2, 5, 2);
  });

  breakPoint.addListener(mediaFunction);
});

w.addEventListener("load", (e) => {
  const observer = new IntersectionObserver(callback, { threshold: 0.75 });
  $videos.forEach((video) => observer.observe(video));
});
