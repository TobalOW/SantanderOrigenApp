
export function toClp(number) {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  });

  return formatter.format(number);
}

export function objExpenses(obj) {
  let data = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        // "Retiros"
        // "Multitienda"
        // "Carrete"
        // "Comida"
        // "Transporte"
        // "Entretenimiento"
        // "Otros"
      let color = '#ff0000';
      if (key === 'Otros' || key === 'Carrete' || key === 'Retiros') {
        color = '#3366ff';
      } else if (key === 'Multitienda') {
        color = '#FFCC33';
      } else if (key === 'Comida') {
        color = '#63ba68';
      } else if (key === 'Entretenimiento') {
        color = '#18b4bc';
      }
      data = [...data, {
        name: key,
        population: obj[key],
        legendFontSize: 10,
        color
      }];
    }
  }
  return data;
}

export function formatCta(number) {
  const cta = number.toString();
  const num = cta.slice(0, 3);
  const num2 = cta.slice(3);
    return `${num}-${num2}`;
}
