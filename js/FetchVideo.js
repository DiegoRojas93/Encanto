export function fetchVideoAndPlay(link) {

  fetch(`${link}`)
  .then(response => response.blob())
  .then(blob => {
    video.srcObject = blob;
    return video.play();
  })
  .then(_ => {
    // Video playback started ;)
  })
  .catch(e => {
    // Video playback failed ;(
  })
}