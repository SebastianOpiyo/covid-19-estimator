// import periodInDays from "./dayCalc";

// Normalizing the timePeriod to Days
const periodInDays = ({ periodType, timeToElapse }) => {
  let duration = 0;
  switch (periodType) {
    case 'days':
      duration = timeToElapse;
      break;
    case 'weeks':
      duration = timeToElapse * 7;
      break;
    case 'months':
      duration = timeToElapse * 30;
      break;
    default:
      duration = 0;
  }
  return duration;
};

// COMPUTATION FOR COVID-19 ESTIMATIONS.

// Challange 1.
// Trajectory calculation for both severe and non severe cases: DRY code
const currentlyInfected = ({ reportedCases }) => {
  const impact = reportedCases * 10;
  const severeImpact = reportedCases * 50;
  return {
    impact,
    severeImpact
  };
};

// Predicting the infection rate per given duration
const infectionsByRequestedTime = (infected = currentlyInfected) => {
  const timePeriod = periodInDays();
  const impact = infected.impact * Math.trunc(2 ** (timePeriod / 3));
  const severeImpact = infected.impact * Math.trunc(2 ** (timePeriod / 3));
  return {
    impact,
    severeImpact
  };
};

// Challange 2.
// Severe cases that need hospitalization
const severeCasesByRequestedTime = (infected = infectionsByRequestedTime()) => {
  const impact = Math.trunc(0.15 * infected.impact);
  const severeImpact = Math.trunc(0.15 * infected.severeImpact);
  return {
    impact,
    severeImpact
  };
};
// hopital bed capacity
const hospitalBedsByRequestedTime = ({ totalHospitalBeds }, sev =
severeCasesByRequestedTime()) => {
  const impact = (Math.trunc(0.35 * totalHospitalBeds) - sev.impact);
  const severeImpact = (Math.trunc(0.35 * totalHospitalBeds) - sev.severeImpact);
  return {
    impact,
    severeImpact
  };
};

// Challange 3:
// Cases for ICU
const casesForICUByRequestedTime = (infected = infectionsByRequestedTime()) => {
  const impact = Math.trunc(0.05 * infected.impact);
  const severeImpact = Math.trunc(0.05 * infected.severeImpact);
  return {
    impact,
    severeImpact
  };
};
// Cases in need of ventilators
const casesForVentilatorsByRequestedTime = (infected = infectionsByRequestedTime()) => {
  const impact = Math.trunc(0.02 * infected.impact);
  const severeImpact = Math.trunc(0.02 * infected.severeImpact);
  return {
    impact,
    severeImpact
  };
};

// Daily Economic Impact of the pandemic outbreak.
const dolarInFlight = ({ avgDailyIncomeInUSD, avgDailyIncomePopulation },
  period = periodInDays(), infected = infectionsByRequestedTime()) => {
  const impact = Math.trunc(
    (infected.impact * avgDailyIncomeInUSD * avgDailyIncomePopulation) / period
  );
  const severeImpact = Math.trunc(
    (infected.severeImpact * avgDailyIncomeInUSD * avgDailyIncomePopulation) / period
  );
  return {
    impact,
    severeImpact
  };
};


const covid19ImpactEstimator = ({ data }) => {
  // challange 1:
  const step1 = currentlyInfected;
  const step2 = infectionsByRequestedTime;

  // challange 2:
  const step3 = severeCasesByRequestedTime;
  const step4 = hospitalBedsByRequestedTime;

  // challange 3:
  const step5 = casesForICUByRequestedTime;
  const step6 = casesForVentilatorsByRequestedTime;
  const step7 = dolarInFlight;


  return {
    data,
    impact: {
      currentlyInfected: step1.impact,
      infectionsByRequestedTime: step2.impact,
      severeCasesByRequestedTime: step3.impact,
      hospitalBedsByRequestedTime: step4.impact,
      casesForICUByRequestedTime: step5.impact,
      casesForVentilatorsByRequestedTime: step6.impact,
      dolarInFlight: step7.impact
    },
    severeImpact: {
      currentlyInfected: step1.severeImpact,
      infectionsByRequestedTime: step2.severeImpact,
      severeCasesByRequestedTime: step3.severeImpact,
      hospitalBedsByRequestedTime: step4.severeImpact,
      casesForICUByRequestedTime: step5.severeImpact,
      casesForVentilatorsByRequestedTime: step6.severeImpact,
      dolarInFlight: step7.severeImpact
    }
  };
};


export default covid19ImpactEstimator;
