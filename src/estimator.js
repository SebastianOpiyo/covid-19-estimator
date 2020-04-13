const covid19ImpactEstimator = (data) => {
  // Destructure the data object

  // Infected not severe
  const currentlyInfected = ({ reportedCases }) => reportedCases * 10;
  const infectionsByRequestedTime = (curInfected = currentlyInfected()) => curInfected * 512;
  const severeCasesByRequestedTime = (infec = infectionsByRequestedTime()) => Math.trunc(
    0.15 * infec
  );
  const hospitalBedsByRequestedTime = ({ totalHospitalBeds }, sev =
  severeCasesByRequestedTime()) => (Math.trunc(0.35 * totalHospitalBeds) - sev);

  // Infected and Severe Cases.
  const currentlyInfectedSevere = ({ reportedCases }) => reportedCases * 50;


  const notSevereImpact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };

  const severeCasesImpact = {
    currentlyInfected: currentlyInfectedSevere,
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
