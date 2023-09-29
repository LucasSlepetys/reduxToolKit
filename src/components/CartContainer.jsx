import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { calculateTotal, clearCart } from '../features/cart/cartSlice';
import { toggleModal } from '../features/modal/modalSlice';
import { useEffect } from 'react';

const CartContainer = () => {
  const dispatch = useDispatch();

  const { cartItems, total, amount, isLoading } = useSelector(
    (store) => store.cart
  );

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  if (isLoading)
    return (
      <div className='full-loading'>
        <div className='lds-ripple'>
          <div></div>
          <div></div>
        </div>
      </div>
    );

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button
          className='btn clear-btn'
          onClick={() => dispatch(toggleModal())}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
