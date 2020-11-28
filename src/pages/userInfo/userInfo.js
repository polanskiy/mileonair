import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { beforeMaskedValueChange } from '../../utils';
import Input from '../../components/input';
import UserInfoTable from './userInfoTable';
import './userInfo.css';

const UserInfo = () => {
  const initData = {
    fio: '',
    phone: '',
    uid: '',
    contract: '',
  };
  const [data, setData] = useState(initData);
  const [activeTable, setActiveTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullTable, setFullTable] = useState(false);
  const [acceptBtn, setAcceptBtn] = useState(false);

  useEffect(() => {
    if (!acceptBtn) {
      if (Object.entries(data).some(([k, v]) => v)) {
        setAcceptBtn(true);
      }
    } else if (Object.entries(data).every(([k, v]) => !v)) {
      setAcceptBtn(false);
    }
  }, [data]);

  const handleSearch = () => {
    if (acceptBtn) {
      setIsLoading(true);
      setTimeout(() => {
        setActiveTable(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="user-info">
      <p className="pageTitle">
        Данные пользователей
      </p>
      <div className="user-info__content">
        <div className="user-info__fields" style={{ transform: fullTable ? 'translateX(-130%)' : 'translateX(0)' }}>
          <div className="register__input-box">
            <Input width={352} text="Введите фамилию, имя и отчество полностью" name="fio" placeholder="ФИО" onChange={setData} value={data.fio} />
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
                  width={352}
                  type="tel"
                  text="Введите номер телефона"
                  {...inputProps}
                  name="phone"
                  placeholder="+7 ХХХ ХХХ ХХ ХХ"
                />
              )}
            </InputMask>
          </div>
          <div className="register__input-box">
            <Input width={352} text="Введите UID пользователя" type="all" name="uid" placeholder="UID" onChange={setData} value={data.uid} />
          </div>
          <div className="register__input-box">
            <Input width={352} text="Введите номер договора" type="all" name="contract" placeholder="Номер договора" onChange={setData} value={data.contract} />
          </div>
          <div className="btns-box" style={{ justifyContent: 'flex-end' }}>
            <button
              className={
                acceptBtn ? 'button button_accept' : 'button button_accept  button_disabled'
              }
              onClick={handleSearch}
            >
              Поиск
            </button>
          </div>
        </div>
        <UserInfoTable
          isLoading={isLoading}
          activeTable={activeTable}
          fullTable={fullTable}
          setFullTable={setFullTable}
        />
      </div>
    </div>
  );
};

export default UserInfo;
