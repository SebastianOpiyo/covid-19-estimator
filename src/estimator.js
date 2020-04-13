const covid19ImpactEstimator = (data) => {
  const { reportedCases, totalHospitalBeds } = data;

  const notSevereImpact = {
    currentlyInfected:reportedCases * 10,
    infectionsByRequestedTime:currentlyInfected * 512,
    severeCasesByRequestedTime:Math.trunc(0.15 * infectionsByRequestedTime),
    hospitalBedsByRequestedTime:Math.trunc(0.35 * totalHospitalBeds) - severeCasesByRequestedTime,
  }

  const severeCasesImpact = {
    currentlyInfected:reportedCases * 50,
    infectionsByRequestedTime:currentlyInfected * 512,
    severeCasesByRequestedTime:Math.trunc(0.15 * infectionsByRequestedTime),
    hospitalBedsByRequestedTime:Math.trunc(0.35 * totalHospitalBeds) - severeCasesByRequestedTime,
  }


  return {
    data:data,
    impact:notSevereImpact,
    severeImpact:severeCasesImpact
  };
};


export default covid19ImpactEstimator;
