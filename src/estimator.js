// import periodInDays from "./dayCalc";

// Normalizing the timePeriod to Days
const periodInDays = ({ periodType, timeToElapse }) => {
  let duration = 0;
  switch (periodType) {
    case 'DAYS':
      duration = timeToElapse;
      break;
    case 'WEEKS':
      duration = timeToElapse * 7;
      break;
    case 'MONTHS':
      duration = timeToElapse * 30;
      break;
    default:
      duration = null;
  }
  return duration;
};

const covid19ImpactEstimator = (data) => {
  // Trajectory calculation for both severe and non severe cases: DRY code
  const currentlyInfected = ({ reportedCases }, notSevereImpact) => (notSevereImpact
    ? reportedCases * 10 : reportedCases * 50);

  // Predicting the infection rate per given duration
  const infectionsByRequestedTime = (curInfected = currentlyInfected()) => {
    const timePeriod = periodInDays();
    return curInfected * Math.trunc((2 ** (timePeriod / 3)));
  };

  // Severe cases that need hospitalization
  const severeCasesByRequestedTime = (infected = infectionsByRequestedTime()) => Math.trunc(
    0.15 * infected
  );

  // hopital bed capacity
  const hospitalBedsByRequestedTime = ({ totalHospitalBeds }, sev =
  severeCasesByRequestedTime()) => (Math.trunc(0.35 * totalHospitalBeds) - sev);

  // Cases for ICU
  const casesForICUByRequestedTime = (infected = infectionsByRequestedTime()) => Math.trunc(
    0.05 * infected
  );

  // Cases in need of ventilators
  const casesForVentilatorsByRequestedTime = (infected = infectionsByRequestedTime()) => (
    Math.trunc(0.02 * infected));

  // Daily Economic Impact of the pandemic outbreak.
  const dolarInFlight = ({ avgDailyIncomeInUSD, avgDailyIncomePopulation },
    period = periodInDays(), infected = infectionsByRequestedTime()) => Math.trunc(
    (infected * avgDailyIncomeInUSD * avgDailyIncomePopulation) / period
  );

  const notSevereImpact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dolarInFlight
  };

  const severeCasesImpact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dolarInFlight
  };


  return {
    data,
    impact: notSevereImpact,
    severeImpact: severeCasesImpact
  };
};


export default covid19ImpactEstimator;
