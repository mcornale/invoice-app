const formatTotal = (total: number) => {
  let [totalIntPart, totalDecimalPart] = total.toFixed(2).toString().split('.');

  if (totalIntPart.length > 3) {
    totalIntPart = totalIntPart
      .split('')
      .reverse()
      .map((digit, index) =>
        index !== 0 && index % 3 === 0 ? `${digit},` : digit
      )
      .reverse()
      .join('');
  }

  return [totalIntPart, totalDecimalPart].join('.');
};

export default formatTotal;
