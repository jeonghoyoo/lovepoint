var LovePoint = function (drawUi, matching) {
    let female_URL = "https://teachablemachine.withgoogle.com/models/Zg0cOq3V2/";
    let male_URL = "https://teachablemachine.withgoogle.com/models/Bwj-HEYsU/";
    let femaleModel, maleModel;
    let femaleImage, maleImage;
   
    const GENDER_TYPE = {
        "F" : "female",
        "M" : "male"
    }
    const that = this;
    //#1. 최초 호출
    this.initWorks = function(){
        maleImage = $("#maleImageInput");
        femaleImage = $("#femaleImageInput");

        that.initEventBind();
        that.init();
    };

    //#3. 이벤트 바인딩
    this.initEventBind = function(){
        //#3-1. 남/여 input Event
        femaleImage.change(function(){
            that.readUrl(this, GENDER_TYPE.F);
            if (drawUi.isImageLoadedByGenderType(GENDER_TYPE.M)) {
                drawUi.displayRunButton();
            }
        });

        maleImage.change(function(){
            that.readUrl(this, GENDER_TYPE.M);
            if (drawUi.isImageLoadedByGenderType(GENDER_TYPE.F)) {
                drawUi.displayRunButton();
            }
        });

        $("#btnRunLovePoint").click(() => {
            that.runLoveMatch();
            $(".run-button-area").hide();
        });

        $("#kakaoShareBtn").click(() => {
            alert("share Button click!!");
        });

    };
    this.runLoveMatch = () => {
        gtag('event', '궁합보기 click', {'event_category': '궁합보기 클릭','event_label': '중간 버튼'});
        drawUi.showLoadingBar();        
        that.predict();
    }

    this.readUrl = function(input, genderType) {
        if (input.files && input.files[0]) {
            drawUi.showLoadingBar();
            var reader = new FileReader();
            reader.onload = function (element) {
                if (GENDER_TYPE.F === genderType) {
                    $('.female-image-upload-wrap').hide();
                    $('.female-file-upload-content').show();
                    $('.female-file-upload-image').attr('src', element.target.result);
                } else {
                    $('.male-image-upload-wrap').hide();
                    $('.male-file-upload-content').show();
                    $('.male-file-upload-image').attr('src', element.target.result);
                }
                drawUi.hideLoadingBar();
                //that.hideImageUploadArea(e);
            };
            reader.readAsDataURL(input.files[0]);          
        } else {
            that.removeUpload();
        }
    };

    this.init = async function() {
        const femaleModelURL = female_URL + 'model.json';
        const femaleMetadataURL = female_URL + 'metadata.json';
        femaleModel = await tmImage.load(femaleModelURL, femaleMetadataURL);
        
        const maleModelURL = male_URL + 'model.json';
        const maleMetadataURL = male_URL + 'metadata.json';
        maleModel = await tmImage.load(maleModelURL, maleMetadataURL);
        maxPredictions = femaleModel.getTotalClasses();

        console.log("modal loaded!!!");
    }

    this.predict = async function() {
        var femaleImage = document.getElementById('female-face-image');
        var maleImage = document.getElementById('male-face-image');

        var femalePredictions = await femaleModel.predict(femaleImage, false);
        var malePredictions = await maleModel.predict(maleImage, false);
        femalePredictions.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        malePredictions.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        const matchingResult = matching.calculateLoveResult(femalePredictions, malePredictions);
        drawUi.drawResult(matchingResult);
        drawUi.hideLoadingBar();
    }

    this.removeUpload = function() {
        $('.file-upload-input').replaceWith($('.file-upload-input').clone());
        $('.file-upload-content').hide();
        $('.image-upload-wrap').show();
    }
    

    this.createResultElement = (humanType, genderCode) => {
        const humanTypeStyle = (genderCode === "F" ? "female" : "male") + humanType.no;
        let bodyDescriptions = "";
        for (description of humanType.body) {
            bodyDescriptions += description + "\n";
        }
        const celebrities = genderCode === "F" ? humanType.female : humanType.male;

        let titleFormat = "<div class=\"{humanTypeStyle}-title\">{title}</div>";
        titleFormat.replace("{humanTypeStyle}", humanTypeStyle)
                   .replace("{title}", humanType.title);
        let explainFormat = "<div class=\"humanType-explain pt-2\">{description}</div>";
        explainFormat.replace("{description}", bodyDescriptions);

        let celebrationFormat = "<div class=\"{humanTypeStyle}-celeb pt-2 pb-2\">{title} {genderCode} 연예인: {celebrities}</div>";
        ;
                         
        return  titleFormat.replace("{humanTypeStyle}", humanTypeStyle)
                           .replace("{title}", humanType.title) + 
                explainFormat.replace("{description}", bodyDescriptions) + 
                celebrationFormat.replace("{humanTypeStyle}", humanTypeStyle)
                                 .replace("{genderCode}", genderCode === "F" ? "여" : "남")
                                 .replace("{title}", humanType.title)
                                 .replace("{celebrities}", celebrities);    
    }
}