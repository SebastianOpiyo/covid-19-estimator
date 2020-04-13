const covid19ImpactEstimator = (data) => {
    const input = data;
    const { reportedCases, totalHospitalBeds } = input;
    
    // Challange 1.
    const notSevereImpact = {
        currentlyInfected : (reportedCases) => reportedCases * 10,
        infectionsByRequestedTime: (currentlyInfected) => currentlyInfected * 512,
        severeCasesByRequestedTime: (infectionsByRequestedTime) => 0.15 * infectionsByRequestedTime,
        hospitalBedsByRequestedTime: (severeCasesByRequestedTime, totalHospitalBeds) => Math.trunc(0.35 * totalHospitalBeds) - severeCasesByRequestedTime,     
    }
    
    const severeCasesImpact = {
        currentlyInfected : (reportedCases) => reportedCases * 50,
        infectionsByRequestedTime: (currentlyInfected) => currentlyInfected * 512,
        severeCasesByRequestedTime: (infectionsByRequestedTime) => 0.15 * infectionsByRequestedTime,
        hospitalBedsByRequestedTime: (severeCasesByRequestedTime, totalHospitalBeds) => (0.35 * totalHospitalBeds) - severeCasesByRequestedTime,  
    }


    return {
        data: input,
        impact: notSevereImpact,
        severeImpact: severeCasesImpact
    };
};


export default covid19ImpactEstimator;
