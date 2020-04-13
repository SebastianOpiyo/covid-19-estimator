// Sample data format representation.
// var data = {
//     region: {
//     name: "Africa",
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//     },
//     periodType: "days",
//     timeToElapse: 58,
//     reportedCases: 674,
//     population: 66622705,
//     totalHospitalBeds: 1380614
//     }


const covid19ImpactEstimator = (data) => {
  const { reportedCases, totalHospitalBeds } = data;

  // Challange 1.
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
