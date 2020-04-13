const covid19ImpactEstimator = (data) => {
    const input = data;
    const { reportedCases } = input;
    
    // Challange 1.
    const notSevereImpact = {
        currentlyInfected : (reportedCases) => reportedCases * 10,
        infectionsByRequestedTime: (currentlyInfected) => currentlyInfected * 512
    }
    
    const severeCasesImpact = {
        currentlyInfected : (reportedCases) => reportedCases * 50,
        infectionsByRequestedTime: (currentlyInfected) => currentlyInfected * 512
    }

    // Challange 2.

    return {
        data: input,
        impact: notSevereImpact,
        severeImpact: severeCasesImpact
    };
};


export default covid19ImpactEstimator;
