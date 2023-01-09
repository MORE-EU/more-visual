import { grey } from '@mui/material/colors';
import { IAlerts } from 'app/shared/model/alert.model';
import moment from 'moment';

const chartAlertingChecker = (
  data: { timestamp: number; values: number[] }[],
  alerts: IAlerts[],
  dataset: any,
  selectedMeasures: any[]
) => {
  // const dataCut = alertResults.length === 0 ? data.slice(data.findIndex(o => o.timestamp === alert[0].dateCreated))
  // : data.slice(data.findIndex(o => o.timestamp === alertResults[alertResults.length - 1][1]));
  const selAlertMeasures = getMatchedMeasures(alerts, dataset, selectedMeasures);
  let allAlerts = {};
  for (let x = 0; x < alerts.length; x++) {
    if (selAlertMeasures.includes(alerts[x].measure) && alerts[x].active) {
      const dataCut = data.slice(data.findIndex(o => o.timestamp === alerts[x].dateCreated));
      const acceptedValues = new Map();
      const measureIndex = selAlertMeasures.indexOf(alerts[x].measure);
      let i = 0;
      while (i < dataCut.length) {
        if (checker(dataCut[i].values[measureIndex], alerts[x].operation, alerts[x].values) === true) {
          let y = i + 1;
          while (y < dataCut.length) {
            const start = moment(dataCut[i].timestamp);
            const end = moment(dataCut[y].timestamp);
            const diff = moment.duration(end.diff(start)).asSeconds();
            const bool = checker(dataCut[y].values[measureIndex], alerts[x].operation, alerts[x].values);
            let flag = false;
            if (bool && diff >= alerts[x].duration) {
              acceptedValues.forEach((value, key, map) => {
                if (start.isBetween(moment(value[0]), moment(value[1]))) {
                  map.set(key, [value[0], dataCut[y].timestamp]);
                  flag = true;
                } else {
                  flag = false;
                }
              });
              !flag && acceptedValues.set(start.valueOf(), [start.valueOf(), dataCut[y].timestamp]);
              if (dataCut.length - y === 1) {
                i = dataCut.length;
                break;
              }
            } else if (!bool && diff >= alerts[x].duration) {
              acceptedValues.set(start.valueOf(), [start.valueOf(), dataCut[y - 1].timestamp]);
              i = y;
              break;
            } else if (!bool && diff < alerts[x].duration) {
              i = y;
              break;
            }
            y++;
          }
        }
        i++;
      }
      allAlerts = {
        ...allAlerts,
        [alerts[x].name]: { results: Array.from(acceptedValues.values()), color: alerts[x].color, severity: alerts[x].severity },
      };
    }
  }
  return allAlerts;
};

const checker = (val, operation, targetValue) => {
  let check = false;
  if (operation === 'over' || operation === 'under') {
    if (operation === 'over') {
      check = val > parseFloat(targetValue.value1);
    } else {
      check = val < parseFloat(targetValue.value1);
    }
  } else {
    if (operation === 'between') {
      check = val > parseFloat(targetValue.value1) && val < parseFloat(targetValue.value2);
    } else {
      check = val < parseFloat(targetValue.value1) && val > parseFloat(targetValue.value2);
    }
  }
  return check;
};

export const alertingPlotBandsCreator = (vals: {}) => {
  const plotBands = [];
  for (const [key, values] of Object.entries(vals)) {
    vals[key].results.map((val, idx) =>
      plotBands.push({
        color: vals[key].color,
        from: val[0],
        to: val[1],
        id: `${key}${idx}`,
        borderWidth: 0,
        borderColor: '#424242',
        label: {
          text: key,
          style: {
            color: '#424242',
            fontWeight: 'bold',
            fontSize: 18,
          },
        },
      })
    );
  }
  return plotBands;
};

export const getMatchedMeasures = (alerts, dataset, selectedMeasures) => {
  const matchedMeasures = [];
  if (alerts.length !== 0) {
    selectedMeasures.map(sMeas => matchedMeasures.push(dataset.header[sMeas]));
  }
  return matchedMeasures;
};

export default chartAlertingChecker;
