function App() {
  const [melons, setMelons] = React.useState({});
  const [shoppingCart, setShoppingCart] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/melons')
      .then((response) => response.json())
      .then((melonData) => {
        setMelons(melonData);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const previousCart = localStorage.getItem('shoppingCart');
    if (previousCart) {
      setShoppingCart(JSON.parse(previousCart));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);


  function addMelonToCart(melonCode) {
    setShoppingCart((currentShoppingCart) => {
      const newShoppingCart = Object.assign({}, currentShoppingCart);

      if (newShoppingCart[melonCode]) {
          newShoppingCart[melonCode] += 1
      } else {
        newShoppingCart[melonCode] = 1
      }

      return newShoppingCart;
    })
  }

  React.useEffect(() => {
    
    fetch('/api/melons')
      .then((response) => response.json())
      .then((data) => {
        setMelons(data);
        
      });
  }, []);

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
        {loading ? (
            <Loading />
          ) : (
            <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart} />
          )}
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
        {loading ? <Loading /> : <ShoppingCartPage cart={shoppingCart} melons={melons} />}
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
