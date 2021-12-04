const Button = ($button, toggle, callback, callback_open) => {
  $button.addEventListener('click', e => {
  toggle++;
  callback(callback_open)
},

export default Button;