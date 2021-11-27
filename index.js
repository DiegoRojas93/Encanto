const d = document,
      w = window,
      $button = d.querySelector('#button-menu'),
      $show = d.querySelector('#show'),
      $slider = d.querySelector('.slider').querySelectorAll('img'),
      $ul = d.querySelector('ul'),
      $audio = d.querySelector('audio'),
      $videos = d.querySelectorAll('video[data-smart-video]'),
      callback = (entries) => {
        entries.forEach(entry => {

          if (entry.isIntersecting && $show.classList.contains("open") && toggle % 2) {
            entry.target.play();
          } else {
            entry.target.pause()
          }

          w.addEventListener('visibilitychange', e => {
            (d.visibilityState === 'visible' && entry.isIntersecting)
              ? entry.target.play()
              : entry.target.pause()
          })
        });
      },
      open_close = (cb = undefined) =>{
        $audio.play();
        $show.classList.toggle('open');
        if (cb !== undefined) cb()
      },
      callback_open = () => {
        if (toggle === 1 && $show.classList.contains("open")) $videos[0].play();
        if (!$show.classList.contains("open")) Array.from($videos).forEach( video => video.pause());
      },
      $menu = d.querySelector('#show').querySelectorAll('a');

let toggle = 0;

const slider = (slide_1, slide_2) => {
  for (const img in $slider) {
    if (Object.hasOwnProperty.call($slider, img)) {
      if ($slider[img].className === 'no_hide') $slider[img].classList.remove('no_hide')
    }
  }

  $slider[slide_1].classList.add('no_hide')
  $slider[slide_2].classList.add('no_hide')
}

d.addEventListener('DOMContentLoaded', e => {


  $button.addEventListener('click', e => {
    toggle++
    open_close(callback_open)
  });

  $menu.forEach(anchor => {
    anchor.addEventListener('click', e => {
      if (anchor.getAttribute('href') === '#home'){
        toggle++
        open_close(callback_open)
      } else {
        open_close()
      }
    })
  });

  $ul.addEventListener('click', e => {

    if(e.target.matches('.image_1')) slider(0,2)

    if(e.target.matches('.image_2')) slider(1,3)
  })
})

w.addEventListener('load', e => {
  const observer = new IntersectionObserver(callback,{threshold: 0.75});
  $videos.forEach(video => observer.observe(video))
});


