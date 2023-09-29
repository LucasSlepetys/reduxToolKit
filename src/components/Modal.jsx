import { useDispatch } from 'react-redux';
import { toggleModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>Remove all items from your shopping cart?</h4>
        <div className='btn-container'>
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(toggleModal());
            }}
            type='button'
            className='btn confirm-btn'
          >
            confirm
          </button>
          <button
            onClick={() => dispatch(toggleModal())}
            type='button'
            className='btn clear-btn'
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
