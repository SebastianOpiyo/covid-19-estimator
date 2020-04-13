const covid19ImpactEstimator = (data) => {
  // Infected not severe
  const currentlyInfected = ({ reportedCases }, notSevereImpact) => (notSevereImpact
    ? reportedCases * 10 : reportedCases * 50);
  const infectionsByRequestedTime = (curInfected = currentlyInfected()) => curInfected * 512;
  const severeCasesByRequestedTime = (infec = infectionsByRequestedTime()) => Math.trunc(
    0.15 * infec
  );
  const hospitalBedsByRequestedTime = ({ totalHospitalBeds }, sev =
  severeCasesByRequestedTime()) => (Math.trunc(0.35 * totalHospitalBeds) - sev);


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
