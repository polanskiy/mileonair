import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import Input from '../../components/input';
import cardTypes from '../../constants/cardTypes';
import { beforeMaskedValueChange } from '../../utils';
import Popup from './popup';
import './register.css';

const Register = () => {
  const initData = {
    name: '',
    surname: '',
    patronymic: '',
    bank: '',
    phone: '',
    cardType: '',
    uid: '',
    contract: '',
    contractDate: '',
  };
  const [data, setData] = useState(initData);
  const [cancelBtn, setCancelBtn] = useState(false);
  const [acceptBtn, setAcceptBtn] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [promo, setPromo] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [promoSent, setPromoSent] = useState(false);

  useEffect(() => {
    if (!cancelBtn) {
      if (Object.entries(data).some(([k, v]) => v)) {
        setCancelBtn(true);
      }
    } else if (Object.entries(data).every(([k, v]) => !v)) {
      setCancelBtn(false);
    }

    if (!acceptBtn) {
      if (Object.entries(data).every(([k, v]) => v)) {
        setAcceptBtn(true);
      }
    } else if (Object.entries(data).some(([k, v]) => !v)) {
      setAcceptBtn(false);
    }
  }, [data]);

  const generetePromo = () => Math.random().toString().slice(2);

  const handleReset = () => {
    setData(initData);
    setIsValid(false);
    setPromo(null);
  };

  const handlePromo = () => {
    if (data.phone.length && data.phone.length < 16) {
      setIsValid(true);
    } else if (Object.entries(data).every(([k, v]) => v)) {
      setPromo(generetePromo());
    }
  };

  const sendPromo = () => {
    setIsModal(true);
  };

  return (
    <div className="register">
      <p className="pageTitle">
        Регистрация нового пользователя
      </p>
      <div className="register__content">
        <div className="register__fields">
          <div className="register__input-box">

            <Input text="Введите фамилию, имя и отчество полностью" name="name" placeholder="Имя" onChange={setData} value={data.name} />
            <Input name="surname" placeholder="Фамилия" onChange={setData} value={data.surname} />
            <Input name="patronymic" placeholder="Отчество" onChange={setData} value={data.patronymic} />
          </div>
          <div className="register__input-box">
            <InputMask
              mask="+7(999)999-99-99"
              maskChar={null}
              onChange={setData}
              value={data.phone}
              beforeMaskedValueChange={(newState, oldState, userInput) => beforeMaskedValueChange(newState, oldState, userInput, data.phone)}
            >
              {(inputProps) => (
                <Input
                  type="tel"
                  text="Введите номер телефона"
                  valid={isValid}
                  setIsValid={setIsValid}
                  {...inputProps}
                  name="phone"
                  placeholder="+7 ХХХ ХХХ ХХ ХХ"
                />
              )}
            </InputMask>
            <Input text="Название банка" name="bank" placeholder="Название банка" onChange={setData} value={data.bank} />
          </div>
          <div className="register__input-box">
            <Input
              type="select"
              text="Выберите тип карты"
              options={cardTypes}
              name="cardType"
              placeholder="Выберите из списка"
              onChange={setData}
              value={data.cardType}
            />
            <Input text="Введите UID пользователя" type="all" name="uid" placeholder="UID" onChange={setData} value={data.uid} />
          </div>
          <div className="register__input-box">
            <Input text="Введите номер договора" type="all" name="contract" placeholder="Номер договора" onChange={setData} value={data.contract} />
            <Input
              type="date"
              text="Введите дату окончания договора"
              name="contractDate"
              placeholder="ХХ.ХХ.ХХХХ"
              value={data.contractDate}
              onChange={setData}
            />
          </div>
          {promo
            && (
            <div className="register__input-box">
              <Input value={promo} text="Промокод от банка" disabled width={650} />
              <button className="button button_accept" onClick={sendPromo}>Отправить клиенту</button>
            </div>
            )}
        </div>
        <div className="btns-box">
          <button
            className={
              acceptBtn ? 'button button_accept' : 'button button_accept  button_disabled'
            }
            onClick={handlePromo}
          >
            Создать промокод
          </button>
          <button
            className={
              cancelBtn ? 'button button_cancel' : 'button button_cancel  button_disabled'
            }
            onClick={handleReset}
          >
            Отмена
          </button>
        </div>
        <Popup phone={data.phone} isModal={isModal} setIsModal={setIsModal} promo={promo} setPromoSent={setPromoSent} />
      </div>
    </div>
  );
};

export default Register;
