import periodInDays from './dayCalc';

const covid19ImpactEstimator = (data) => {
  // Trajectory calculation for both severe and non severe cases: DRY code
  const currentlyInfected = ({ reportedCases }, notSevereImpact) => (notSevereImpact
    ? reportedCases * 10 : reportedCases * 50);

  // Predicting the infection rate per given duration
  const infectionsByRequestedTime = (curInfected = currentlyInfected()) => {
    const timePeriod = periodInDays();
    return curInfected * Math.trunc((2 ** (timePeriod / 3)));
  };

  const severeCasesByRequestedTime = (infec = infectionsByRequestedTime()) => Math.trunc(
    0.15 * infec
  );
  // hopital bed capacity
  const hospitalBedsByRequestedTime = ({ totalHospitalBeds }, sev =
  severeCasesByRequestedTime()) => (Math.trunc(0.35 * totalHospitalBeds) - sev);

  // Missing days, weeks, or months incorporation
  // Need to refine challage 2
  const notSevereImpact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };

  const severeCasesImpact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };


  return {
    data,
    impact: notSevereImpact,
    severeImpact: severeCasesImpact
  };
};


export default covid19ImpactEstimator;

// challange 3
/*
1. Determine 5% of infectionsByRequestedTime =
   severe +ve cases estimate for ICU : casesForICUByRequestedTime(estimation output)
2. Determine 2% of infectionsByRequestedTime =
  severe +ve for ventilators: casesForVentilatorsByRequestedTime
3. With infected people result and avg income of the region estimate how much the economy
   is about to lose daily over the given period of time: dolarInFlight
*/

//     "babel-jest": "^25.2.0",
