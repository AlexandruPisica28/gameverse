const apiKey = '2e44053ad0864c69a23d63360fdf2c71';

const urls = [
  `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=1`,
  `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=2`
];

let allProducts = [];

Promise.all(urls.map(url => fetch(url).then(res => res.json())))
  .then(results => {
    results.forEach(data => {
      const products = data.results.map(game => ({
        id: game.id,
        title: game.name,
        price: game.metacritic ? (game.metacritic / 10).toFixed(2) : (Math.random() * 60 + 20).toFixed(2),
        image: game.background_image || 'https://via.placeholder.com/300x200'
      }));
      allProducts = allProducts.concat(products);
    });
    console.log(JSON.stringify(allProducts, null, 2));
  })
  .catch(err => console.error(err));
