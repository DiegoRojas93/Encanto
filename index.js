const d = document,
      $buttom = d.querySelector('#buttom-menu'),
      $sidebar = d.querySelector('.sidebar');

d.addEventListener('DOMContentLoaded', e => {
  $buttom.addEventListener('click', e => {
    $sidebar.classList.toggle('show')
  })
})