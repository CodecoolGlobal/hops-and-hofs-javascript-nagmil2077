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

const sortButton = (rootLocation) => {
  rootLocation.insertAdjacentHTML('afterbegin', buttonComponent('sortByScore', 'Sort by score'));
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
    console.dir(event.target);
    console.dir(event.target.id);
    if (event.target.id === 'loadBeers') {
      document.getElementById('loadBeers').remove();
      beers.map((beer) => sectionElement.insertAdjacentHTML('beforeend', beerComponent(beer)));
      sortButton(rootElement);
    } else if (event.target.id === 'sortByScore') {
      [...document.querySelectorAll('.beer')].map((beer) => beer.remove());
      const sortedBeerList = [...beers].sort((a, b) => a.score - b.score);
      if (clickCount % 2 === 0) {
        sortedBeerList.map((beer) =>
          sectionElement.insertAdjacentHTML('beforeend', beerComponent(beer)));
        clickCount++;
      } else {
        sortedBeerList.reverse().map((beer) =>
          sectionElement.insertAdjacentHTML('beforeend', beerComponent(beer)));
        clickCount++;
      }
    }
  };
  window.addEventListener('click', clickEvent);
};

// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);
