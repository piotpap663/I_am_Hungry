import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexFlow: 'row wrap',
    padding: '0!important',
    width: '100%',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  cart: {
    flex: 2
  }
});

function Cart({
  products,
  showCart,
  showHideCart,
  showIcon,
  minOrderPrice,
  deliveryCost,
  restaurantName,
  removeFromCart
}) {
  const removeProductFromCart = id => e => {
    removeFromCart(id);
  };

  let productSum = 0,
    howManyProductsInCart = 0;
  if (products && products.length) {
    products.map(prod => {
      howManyProductsInCart += prod.count;
      productSum += prod.sum;
    });
  }

  return (
    <div
      className="cart"
      style={{
        // border: '1px solid red',
        flex: '1 1 100%',
        textAlign: 'center',
        flex: showCart ? 1 : 0,
        transition: 'flex-grow 1s ease-out 0s'
      }}
    >
      <div
        onClick={showHideCart}
        style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          {showIcon ? (
            <div>
              {!showCart ? 'Koszyk' : ''} 🛒{' '}
              {products && products.length ? howManyProductsInCart : ''}
            </div>
          ) : (
            'Koszyk ' +
            (products && products.length ? howManyProductsInCart : '')
          )}
        </span>
        {showIcon && showCart ? <span style={{}}>🔽</span> : null}
      </div>
      {showCart && (
        <ul
          style={{
            position: 'absolute',
            top: '3em',
            height: '100vh',
            flexDirection: 'column',
            overflow: 'scroll',
            fontSize: '.7em',
            textAlign: 'left',
            padding: '1em',
            transition: 'flex-grow 1s ease-out 0s',
            width: '100%',
            cursor: 'default',
            backgroundColor: '#cac0c0',
            borderRadius: '1%',
            padding: '2em'
          }}
        >
          {products && products.length ? (
            products.map((product, index) => (
              <li
                className="cart-li"
                key={index}
                onClick={removeProductFromCart(product.id)}
              >
                <span>{product.count}x </span>
                <span>{product.title} </span>
                {product.type ? <span>{product.type} </span> : null}
                <span>{product.name} </span>
                {' ' + product.sum + ' zł '}
                {product.extras && product.extras.length ? (
                  <span style={{ fontSize: '0.7em' }}>
                    {' '}
                    <br />
                    {'Dodatki: ' +
                      product.extras.map(
                        item => item.name + ' ' + item.price + ' zł'
                      )}
                  </span>
                ) : null}
              </li>
            ))
          ) : (
            <p>
              W tym momencie Twój koszyk jest pusty. Aby wybrać produkt do
              koszyka, należy na niego kliknąć.{' '}
            </p>
          )}
          {products && products.length ? (
            <div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Kwota częściowa:</span>
                <span>{productSum} zł</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Koszty dostawy:</span>
                <span>{deliveryCost} zł</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}>
                  Kwota całkowita:
                </span>
                <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}>
                  {productSum + deliveryCost} zł
                </span>
              </div>
              {productSum - minOrderPrice < 0 && (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ fontWeight: 'bold', color: 'red' }}>
                    Do minimalnej wartości zamówienia brakuje:
                  </span>
                  <span style={{ fontWeight: 'bold', color: 'red' }}>
                    {minOrderPrice - productSum} zł
                  </span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  color="primary"
                  to="/checkout"
                  disabled={productSum - minOrderPrice < 0}
                  style={{
                    margin: '1em 4em',
                    padding: ' 1em 0em',
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center'
                  }}
                >
                  Zamów
                </Button>
                {productSum - minOrderPrice < 0 && (
                  <span
                    style={{
                      fontSize: '0.7em'
                    }}
                  >
                    Niestety nie możesz jeszcze zamówić.
                    {restaurantName} ustawiła wartość minimalnego zamówienia na{' '}
                    {minOrderPrice} zł (bez kosztów dostawy)
                  </span>
                )}
              </div>
            </div>
          ) : null}
        </ul>
      )}
    </div>
  );
}

function OneRestaurantDetailsCart(props) {
  const {
    classes,
    showCart,
    cart,
    showHideCart,
    showIcon,
    products,
    minOrderPrice,
    deliveryCost,
    restaurantName,
    removeFromCart
  } = props;

  return (
    <div className={classNames(classes.root, showCart ? classes.cart : '')}>
      <Cart
        showHideCart={showHideCart}
        showCart={showCart}
        products={products}
        showIcon={showIcon}
        minOrderPrice={minOrderPrice}
        deliveryCost={deliveryCost}
        restaurantName={restaurantName}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

OneRestaurantDetailsCart.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const products = state.cart.products;
  const minOrderPrice = state.cart.minOrderPrice;
  const deliveryCost = state.cart.deliveryCost;
  const restaurantName = state.cart.restaurantName;
  return {
    products,
    minOrderPrice,
    deliveryCost,
    restaurantName
  };
};
const mapDispatchToProps = dispatch => ({
  removeFromCart: id => dispatch({ type: 'REMOVE_FROM_CART', id })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OneRestaurantDetailsCart));
