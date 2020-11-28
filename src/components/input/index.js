import React, { useEffect, useState } from 'react';
import './input.css';

const Input = ({
  value, onChange, placeholder,
  type = 'text', name, options,
  valid, text, disabled, width = 316,
  setIsValid,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleList = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener('click', handleList);
    } else {
      document.body.removeEventListener('click', handleList);
    }
    return () => {
      document.body.removeEventListener('click', handleList);
    };
  }, [isOpen]);

  const handleInput = (e) => {
    let { value: newValue } = e.target;
    if (disabled || (type === 'tel' && /^[a-z]+$/i.test(newValue))) {
      return;
    }
    if (type === 'text') {
      newValue = newValue.replace(/[^a-zа-я]/gi, '');
    }
    if (type === 'all') {
      newValue = newValue.replace(/[^a-zA-Z0-9]/gi, '');
    }
    if (name === 'phone' && newValue.length > 16) {
      return;
    }
    if (name === 'contractDate' && newValue.length > 10) {
      return;
    }
    if (name === 'phone' && newValue.length < 3 && newValue[0] === '+') {
      newValue = '';
    }
    if (valid) {
      setIsValid(false);
    }
    if (onChange) {
      onChange((oldData) => ({ ...oldData, [name]: newValue }));
    }
  };

  const handleSelect = () => {
    setIsOpen((oldValue) => !oldValue);
  };

  const handleOption = (newValue) => {
    onChange((oldData) => ({ ...oldData, [name]: newValue }));
    setIsOpen((oldValue) => !oldValue);
  };
  let selectClassName = 'input select';
  if (!value) {
    selectClassName = 'input select defaultOption';
  }
  if (valid && !value) {
    selectClassName = 'input select defaultOption input_alert';
  }

  return (
    <>
      {type === 'select'
        ? (
          <label className={valid && !value ? 'register__label register__label_alert' : 'register__label'}>
            <span>{text}</span>
            <div
              className={selectClassName}
              onClick={handleSelect}
            >
              <p>{value || placeholder}</p>
            </div>
            {isOpen
              && (
              <ul className="listOptions">
                {options.map((item) => (
                  <li key={item} value={item} onClick={() => handleOption(item)}>
                    {item}
                  </li>
                ))}
              </ul>
              )}
          </label>
        )
        : (
          <label
            className={valid ? 'register__label register__label_alert' : 'register__label'}
            style={{ maxWidth: width }}
          >
            <span>{text}</span>
            <input
              name={name}
              disabled={disabled}
              className={valid ? 'input input_alert' : 'input'}
              value={value}
              onChange={handleInput}
              placeholder={placeholder}
              type={type === 'all' ? 'text' : type}
            />
          </label>
        )}
    </>
  );
};

export default React.memo(Input);
