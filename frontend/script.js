const buttonComponent = (id, text) => `<button id=${id}>${text}</button>`;

const beerTypeComponent = (list) => list.map((tag) => `<li>${tag}</li>`).join('');

const beerComponent = ({ brewery, name, type, score, abv }) => `
	<div class="beer">
		<h2>${name}</h2>
		<h3>${brewery}</h3>
		<ul>${beerTypeComponent(type)}</ul>
		<h4>${score}</h4>
		<h5>${abv}</h5>
	</div>
`;

const winnerComponent = (beer) => `
	<div id="winner">
		<h1>The best light Ale is</h1>
		${beerComponent(beer)}
		${buttonComponent('closeWinner', 'Close')}
	</div>
`;

const loadBeerButton = (section, root) => {
  document.getElementById('loadBeers').remove();
  beers.map((beer) => section.insertAdjacentHTML('beforeend', beerComponent(beer)));
  root.insertAdjacentHTML('afterbegin', buttonComponent('sortByScore', 'Sort by score'));
  root.insertAdjacentHTML('afterbegin', buttonComponent('bestLightAle', 'Best Light Ale'));
  root.insertAdjacentHTML('afterbegin', buttonComponent('filterStrongIPAs', 'Strong IPAs'));
};

const sortByScoreButton = (clickCount, section) => {
  [...document.querySelectorAll('.beer')].map((beer) => beer.remove());
  const sortedBeerList = [...beers].sort((a, b) => a.score - b.score);
  if (clickCount % 2 === 0) {
    sortedBeerList.map((beer) =>
      section.insertAdjacentHTML('beforeend', beerComponent(beer)));
  } else {
    sortedBeerList.reverse().map((beer) =>
      section.insertAdjacentHTML('beforeend', beerComponent(beer)));
  }
};

const strongIpaButton = (section, root) => {
  [...document.querySelectorAll('.beer')].map((beer) => beer.remove());
  const filteredBeerList = beers.filter((beer) => beer.abv >= 6);
  filteredBeerList.map((beer) =>
    section.insertAdjacentHTML('beforeend', beerComponent(beer)));
  document.getElementById('filterStrongIPAs').remove();
  root.insertAdjacentHTML('afterbegin', buttonComponent('resetFilter', 'Reset filter'));
};

const resetFilterButton = (section, root) => {
  [...document.querySelectorAll('.beer')].map((beer) => beer.remove());
  beers.map((beer) => section.insertAdjacentHTML('beforeend', beerComponent(beer)));
  document.getElementById('resetFilter').remove();
  root.insertAdjacentHTML('afterbegin', buttonComponent('filterStrongIPAs', 'Strong IPAs'));
};

const bestLightAleButton = (section, root) => {
  const bestAle = beers.reduce((acc, val) => {
    return (val.type.includes('Ale') && val.abv <= 6 && val.score > 900) ? { ...val} : acc;
  });
  section.insertAdjacentHTML('afterbegin', winnerComponent(bestAle));
  document.getElementById('bestLightAle').remove();
};

const closeButton = (root) => {
  document.getElementById('winner').remove();
  root.insertAdjacentHTML('afterbegin', buttonComponent('bestLightAle', 'Best Light Ale'));
};

const loadEvent = () => {
  let clickCount = 0;
  // the HTML elements with ID are available as global variables with the ID (eg. root) but it is better if you
  const rootElement = document.getElementById('root');
  //You can add the HTML code to the DOM like this
  rootElement.insertAdjacentHTML('afterbegin', buttonComponent('loadBeers', 'Load the beers'));

  rootElement.insertAdjacentHTML('beforeend', '<section id=\'beerSect\'></section>');
  const sectionElement = document.getElementById('beerSect');

  const clickEvent = (event) => {
    /* console.dir(event.target);
    console.dir(event.target.id); */
    const result = event.target.id === 'loadBeers' ? loadBeerButton(sectionElement, rootElement)
      : event.target.id === 'sortByScore' ?
        (sortByScoreButton(clickCount, sectionElement), clickCount++)
        : event.target.id === 'filterStrongIPAs' ? strongIpaButton(sectionElement, rootElement)
          : event.target.id === 'resetFilter' ?
            (resetFilterButton(sectionElement, rootElement), clickCount = 0)
            : event.target.id === 'bestLightAle' ? bestLightAleButton(sectionElement, rootElement)
              : event.target.id === 'closeWinner' ? closeButton(rootElement)
                : event;
    return result;
  };
  window.addEventListener('click', clickEvent);
};
// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);
