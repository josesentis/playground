const extrude = (depth = 0, color = '#000') => {
  let shadow = "";

  for (let i = 1; i <= depth; i++) {
    shadow += `${i}px ${i}px ${color}, `;
  }

  return shadow.slice(0, -2);
}

(function () {
  const title = document.getElementById('title');
  // title.style.textShadow = extrude(30, '#bdb2ff'); // In order to apply shadow in JS

  setTimeout(() => {
    title.classList.add('loaded');
  }, 1000);

  setTimeout(() => {
    const childs = title.getElementsByTagName('span');

    for (let i = 0; i <= childs.length; i++) {
      childs[i].classList.add('animated');
    }
  }, 1500);
})();