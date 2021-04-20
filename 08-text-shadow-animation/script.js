const extrude = (depth = 0, color = '#000') => {
  let shadow = "";

  for (let i = 1; i <= depth; i++) {
    shadow += `${i}px ${i}px ${color}, `;
  }

  return shadow.slice(0, -2);
}

(function () {
  const title = document.getElementById('title');

  title.style.textShadow = extrude(10);
})();