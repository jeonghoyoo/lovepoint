var DrawUI = function () {
    const femaleImage = $("#femaleImageInput");    
    const maleImage = $("#maleImageInput");
    let humanTypes;
    fetch('./json/sasang.json')
    .then(response => response.json())
    .then(data => {
        humanTypes = data;
    });

    const GENDER_TYPE = {
        "F" : "female",
        "M" : "male"
    }
    const that = this;

    this.displayRunButton = () => {
        $(".center-heart").hide();
        $(".run-button").show();
    }
    this.displayCenterHeart = () => {
        $(".center-heart").show();
        $(".run-button").hide();
    }

    this.displayResultMessageArea = () => {
        $(".file-upload-content").show();
    }

    this.isImageLoadedByGenderType = (genderType) => {
        if (GENDER_TYPE.F === genderType) {
            return femaleImage[0].files.length > 0
        }
        return maleImage[0].files.length > 0
    }

    this.showLoadingBar = () => {
        $('#loading-bar-spinner').show();
        $(".event-bind-elements").prop("disabled", true);
    }

    this.hideLoadingBar = () => {
        $('#loading-bar-spinner').hide();
        $(".event-bind-elements").prop("disabled", false);
    }

    this.drawResult = (matchingResult) => {
        that.clearResultArea();
        $('.result-message').html(that.createResultElement(matchingResult));
        $("#label-container").append(that.createPointBar(matchingResult));
        that.displayResultMessageArea();
    }

    this.clearResultArea = () => {
        $('.result-message').html("");
        $("#label-container").html("");
    }

    this.createResultElement = (matchingResult) => {
        const maleHumanType = that.findHumanTypeBy(matchingResult.male);
        const femaleHumanType = that.findHumanTypeBy(matchingResult.female);

        let bodyDescriptions = "";
        for (description of matchingResult.result.descriptions) {
            bodyDescriptions += description + "&nbsp;";
        }

        let titleFormat = "<div class=\"{humanTypeStyle}-title\">{title}</div>";
        let resultTitle = "남성 : {maleType} / 여성 : {femaleType}";        

        let explainFormat = "<div class=\"humanType-explanation pt-2\">{description}</div>";

        let femaleCelebrityFormat = "<div class=\"{humanTypeStyle}-celeb mt-2 text-align: left\">{genderCode} {title} 연예인: {celebrities}</div>";
        let maleCelebrityFormat = "<div class=\"{humanTypeStyle}-celeb mb-2 text-align: left\">{genderCode} {title} 연예인: {celebrities}</div>";

        let maleResultTitle = "남성 : {maleType}";
        $('.male-file-upload-content').append(titleFormat.replace("{humanTypeStyle}", "male" + maleHumanType.no)
                                                         .replace("{title}", maleResultTitle.replace("{maleType}", maleHumanType.title)));
                         
        $('.male-file-upload-content').append(maleCelebrityFormat.replace("{humanTypeStyle}", "male" + maleHumanType.no)
                                                                 .replace("{genderCode}", "남성")
                                                                 .replace("{title}", maleHumanType.title)
                                                                 .replace("{celebrities}", maleHumanType.male));

        let femaleResultTitle = "여성 : {femaleType}";
        $('.female-file-upload-content').append(titleFormat.replace("{humanTypeStyle}", "female" + femaleHumanType.no)
                                                         .replace("{title}", femaleResultTitle.replace("{femaleType}", femaleHumanType.title)));
                         
        $('.female-file-upload-content').append(femaleCelebrityFormat.replace("{humanTypeStyle}", "female" + femaleHumanType.no)
                                                                     .replace("{genderCode}", "여성")
                                                                     .replace("{title}", femaleHumanType.title)
                                                                     .replace("{celebrities}", femaleHumanType.female));

                                                                 

        return  explainFormat.replace("{description}", bodyDescriptions);    
    }

    this.createPointBar = (matchingResult) => {
        const femaleHumanType = that.findHumanTypeBy(matchingResult.female);
        let rankPredictionFormat = "<div>" +
                                   "     <div class=\"humanType-label align-items-center mb-1\">{humanType}</div>" +
                                   "     <div class=\"bar-container position-relative container\">" +
                                   "         <div class=\"{engTitle}-box\"></div>" +
                                   "         <div class=\"d-flex justify-content-center align-items-center {engTitle}-bar\" style=\"width: {dynamicWidth}\">" +
                                   "             <span class=\"d-block percent-text\">{barWidth}</span>" +
                                   "         </div>" +
                                   "     </div>" +
                                   "</div>"

        return rankPredictionFormat.replace("{humanType}", "🖤 사랑점수 🖤")
                                   .replace("{dynamicWidth}", matchingResult.result.point + "%")
                                   .replaceAll("{engTitle}", femaleHumanType.eng)
                                   .replace("{barWidth}", matchingResult.result.point + "점");
    }

    this.findHumanTypeBy = (humanTypeClassName) => {
        for (humanType of humanTypes) {
            if (humanTypeClassName === humanType.title) {
                return humanType;
            }
        }
    }
}