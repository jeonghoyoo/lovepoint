var Matching = function () {
    let humanTypes;
    fetch('./json/sasang.json')
    .then(response => response.json())
    .then(data => {
        humanTypes = data;
    });
    const that = this;

    this.calculateLoveResult = (femalePredictions, malePredictions) => {
        const matchingResult = {};
        console.log("femalePredictions[0] : " + femalePredictions[0].className);
        console.log("malePredictions[0] : " + malePredictions[0].className);
        const femaleResultType = femalePredictions[0];
        const maleResultType = malePredictions[0];
        matchingResult.male = maleResultType.className;
        matchingResult.female = femaleResultType.className;
        matchingResult.result = that.findMachingObject(femaleResultType.className, 
                                    maleResultType.className);
        return matchingResult;
    }

    this.findMachingObject = (femaleTypeName, maleTypeName) => {
        for (humanType of humanTypes) {
            if (maleTypeName === humanType.title) {
                for (machingType of humanType.matching) {
                    if (machingType.title === femaleTypeName) {
                        return machingType;       
                    }
                }
            }
        }
    }
}