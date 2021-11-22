const d = document,
      $button = d.querySelector('#button-menu'),
      $sidebar = d.querySelector('.sidebar'),
      $slider = d.querySelector('.slider').querySelectorAll('img'),
      $ul = d.querySelector('ul'),
      $videos = d.querySelectorAll('video[data-smart-video]'),
      options = {
        threshold: 0.5
      },
      callback = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.play()
          } else {
            entry.target.pause()
          }

          d.addEventListener('visibilitychange', e => {
            d.visibilityState === 'visible'
              ? entry.target.play()
              : entry.target.pause
          })
        });
      };

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
    $sidebar.classList.toggle('show');
  })

  $ul.addEventListener('click', e => {

    if(e.target.matches('.image_1')) slider(0,2)

    if(e.target.matches('.image_2')) slider(1,3)
  })
})

window.addEventListener('load', (e) => {
  const observer = new IntersectionObserver(callback, options);
  $videos.forEach(video => observer.observe(video))
})