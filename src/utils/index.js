import { Platform } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';

export function toClp(number) {
  // if (Platform.OS === 'ios') {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: Platform.OS === 'ios' ? 'CLP' : 'USD',
      minimumFractionDigits: 0,
      currencyDisplay: 'symbol'
    });
    return formatter.format(number);
  // }
  // return `$${number}`;
}

export function objExpenses(obj) {
  let data = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let color = '#ff0000';
      if (key === 'Otros' || key === 'Carrete') {
        color = '#3366ff';
      } else if (key === 'Multitienda') {
        color = '#FFCC33';
      } else if (key === 'Retiros') {
        color = '#9F3668';
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
