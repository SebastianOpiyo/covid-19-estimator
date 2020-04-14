// import periodInDays from "./dayCalc";

// Normalizing the timePeriod to Days
const periodInDays = (periodType, timeToElapse) => {
  let factor = 0;
  let duration = 0;
  switch (periodType) {
    case 'days':
      duration = timeToElapse;
      factor = Math.trunc(duration / 3);
      break;
    case 'weeks':
      duration = timeToElapse * 7;
      factor = Math.trunc(duration / 3);
      break;
    case 'months':
      duration = timeToElapse * 30;
      factor = Math.trunc(duration / 3);
      break;
    default:
      break;
  }
  return { factor, duration };
};

// COMPUTATION FOR COVID-19 ESTIMATIONS.

// Challange 1.
// Trajectory calculation for both severe and non severe cases
const currentlyInfected = (reportedCases) => {
  const impact = reportedCases * 10;
  const severeImpact = reportedCases * 50;
  return {
    impact,
    severeImpact
  };
};

// Predicting the infection rate per given duration
const infectionsByRequestedTime = (infected, timePeriod) => {
  const impact = infected.impact * (2 ** timePeriod.factor);
  const severeImpact = infected.severeImpact * (2 ** timePeriod.factor);
  return {
    impact,
    severeImpact
  };
};

// Challange 2.
// Severe cases that need hospitalization
const severeCasesByRequestedTime = (infected) => {
  const impact = Math.trunc(0.15 * infected.impact);
  const severeImpact = Math.trunc(0.15 * infected.severeImpact);
  return {
    impact,
    severeImpact
  };
};
// hopital bed capacity
const hospitalBedsByRequestedTime = (totalHospitalBeds, severe) => {
  const impact = Math.trunc((0.35 * totalHospitalBeds) - severe.impact);
  const severeImpact = Math.trunc((0.35 * totalHospitalBeds) - severe.severeImpact);
  return {
    impact,
    severeImpact
  };
};

// Challange 3:
// Cases for ICU
const casesForICUByRequestedTime = (infected) => {
  const impact = Math.trunc(0.05 * infected.impact);
  const severeImpact = Math.trunc(0.05 * infected.severeImpact);
  return {
    impact,
    severeImpact
  };
};
// Cases in need of ventilators
const casesForVentilatorsByRequestedTime = (infected) => {
  const impact = Math.trunc(0.02 * infected.impact);
  const severeImpact = Math.trunc(0.02 * infected.severeImpact);
  return {
    impact,
    severeImpact
  };
};

// Daily Economic Impact of the pandemic outbreak.
const dolarInFlight = (region,
  timePeriod, infected) => {
  const impact = (
    Math.trunc((infected.impact * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation)
    / timePeriod));

  const severeImpact = (
    Math.trunc((infected.severeImpact * region.avgDailyIncomeInUSD
      * region.avgDailyIncomePopulation) / timePeriod));

  return {
    impact,
    severeImpact
  };
};


const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;


  const timePeriod = periodInDays(periodType, timeToElapse);
  // challange 1:
  const step1 = currentlyInfected(reportedCases);
  const step2 = infectionsByRequestedTime(step1, timePeriod);

  // challange 2:
  const step3 = severeCasesByRequestedTime(step2);
  const step4 = hospitalBedsByRequestedTime(totalHospitalBeds, step3);

  // challange 3:
  const step5 = casesForICUByRequestedTime(step2);
  const step6 = casesForVentilatorsByRequestedTime(step2);
  const step7 = dolarInFlight(region, timePeriod.duration, step2);

  // compilation
  const impact = {
    currentlyInfected: step1.impact,
    infectionsByRequestedTime: step2.impact,
    severeCasesByRequestedTime: step3.impact,
    hospitalBedsByRequestedTime: step4.impact,
    casesForICUByRequestedTime: step5.impact,
    casesForVentilatorsByRequestedTime: step6.impact,
    dolarInFlight: step7.impact
  };

  const severeImpact = {
    currentlyInfected: step1.severeImpact,
    infectionsByRequestedTime: step2.severeImpact,
    severeCasesByRequestedTime: step3.severeImpact,
    hospitalBedsByRequestedTime: step4.severeImpact,
    casesForICUByRequestedTime: step5.severeImpact,
    casesForVentilatorsByRequestedTime: step6.severeImpact,
    dolarInFlight: step7.severeImpact
  };


  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
