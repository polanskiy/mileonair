export const beforeMaskedValueChange = (newState, oldState, userInput, data) => {
  let { value } = newState;
  let { selection } = newState;
  let cursorPosition = selection ? selection.start : null;
  const valiSymbol = (option) => value.endsWith(option) && userInput !== option && !data.endsWith(option);
  if (valiSymbol('-') || valiSymbol('.') || valiSymbol(')') || valiSymbol('(')) {
    if (cursorPosition === value.length) {
      cursorPosition--;
      selection = { start: cursorPosition, end: cursorPosition };
    }
    value = value.slice(0, -1);
  }

  return {
    value,
    selection,
  };
};
