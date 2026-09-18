export const formatMoney = (n: number) =>
  `$ ${n.toLocaleString("es-UY", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

export const formatMoneyFull = (n: number) =>
  `$ ${n.toLocaleString("es-UY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;