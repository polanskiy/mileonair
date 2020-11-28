import React from 'react';
import InputMask from 'react-input-mask';
import Input from '../../components/input';
import Modal from '../../components/modal/modal';

const Popup = ({
  phone, isModal, setIsModal, promo, setPromoSent,
}) => {
  const handleClose = () => {
    setIsModal(false);
  };

  const handleSend = () => {
    handleClose();
    setPromoSent(true);
  };

  return (
    <>
      <Modal isOpen={isModal} onClose={handleClose}>
        <div className="register__input-box" style={{ justifyContent: 'center' }}>
          <InputMask
            mask="+7(999)999-99-99"
            maskChar={null}
            value={phone}
            disabled
          >
            {(inputProps) => (
              <Input
                type="tel"
                width={327}
                text="Телефон, на который будет направлена ссылка"
                {...inputProps}
                name="phone"
                placeholder="+7 ХХХ ХХХ ХХ ХХ"
              />
            )}
          </InputMask>
        </div>
        <div className="register__input-box" style={{ justifyContent: 'center' }}>
          <Input value={promo} text="Промокод от банка" disabled width={327} />
        </div>
        <button
          className="button button_accept"
          onClick={handleSend}
          style={{ margin: '0 auto' }}
        >
          Отправить клиенту
        </button>
      </Modal>
    </>
  );
};

export default Popup;
