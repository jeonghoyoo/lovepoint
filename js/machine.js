var Pokemon = function () {
    let gender_URL = "https://teachablemachine.withgoogle.com/models/Zg0cOq3V2/";
    let model;
    let isSelectedGenderFemale = true;
    let humanTypes;
    const that = this;

    this.initWorks = function(doBindElentEvent){
        humanTypes = that.loadJsonData();
        that.initEventBind();
    };
    this.loadJsonData = () => {
        fetch('./json/sasang.json')
        .then(response => response.json())
        .then(data => {
            humanTypes = data;
            console.log(humanTypes);
        });
    }

    this.initilizeModal = () => {
        that.init().then(() => {
            console.log('modal Loaded complete!!!');
            that.hideLoadingBar();
        });
    }

    this.initEventBind = function(){
        $("#yourImageInput").change(function(){
            that.readUrl(this);
        });

        $("#initImageUploadArea").click(() => {
            that.initImageUploadArea();
        });

        var checkbox = document.getElementById("genderCheckbox");

        checkbox.addEventListener('change', function() {
            if (this.checked) {            
                gender_URL = 'https://teachablemachine.withgoogle.com/models/Bwj-HEYsU/';
                isSelectedGenderFemale = false;
            } else {
                gender_URL = 'https://teachablemachine.withgoogle.com/models/Zg0cOq3V2/';
                isSelectedGenderFemale = true;
            }
            that.initImageUploadArea();
        });
    };

    this.readUrl = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                that.hideImageUploadArea(e);
                console.log('hello');
            };
            reader.readAsDataURL(input.files[0]);  
            that.init().then(() => {
                console.log('modal Loaded complete!!!');
                that.predict();
                that.hideLoadingBar();
            });          
        } else {
            that.removeUpload();
        }
    };

    this.hideImageUploadArea = (targetElement) => {
        $('.image-upload-wrap').hide();
        $('.file-upload-image').attr('src', targetElement.target.result);
        $('.file-upload-content').show();
        that.showLoadingBar();
    }

    this.initImageUploadArea = () => {
        $('.result-message').html("");
        $('.image-upload-wrap').show();
        $('.file-upload-image').attr('src', "#");
        $('.file-upload-content').hide();
        document.getElementById("yourImageInput").value = "";
    }

    this.removeUpload = function() {
        $('.file-upload-input').replaceWith($('.file-upload-input').clone());
        $('.file-upload-content').hide();
        $('.image-upload-wrap').show();
    }
    this.showLoadingBar = () => {
        $('#loading-bar-spinner').show();
        $(".event-bind-elements").prop("disabled", true);
    }

    this.hideLoadingBar = () => {
        $('#loading-bar-spinner').hide();
        $(".event-bind-elements").prop("disabled", false);
    }

    this.init = async function() {
        const modelURL = gender_URL + 'model.json';
        const metadataURL = gender_URL + 'metadata.json';
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    }

    this.predict = async function() {
        var image = document.getElementById('face-image');
        var predictions = await model.predict(image, false);
        predictions.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        that.drawResult(predictions[0].className, isSelectedGenderFemale ? "F" : "M");

        let barWidth;
        let rankPredictionFormat = "<div class=\"d-flex\">" +
                                   "     <div class=\"humanType-label d-flex align-items-center\">{humanType}</div>" +
                                   "     <div class=\"bar-container position-relative container\">" +
                                   "         <div class=\"{engTitle}-box\"></div>" +
                                   "         <div class=\"d-flex justify-content-center align-items-center {engTitle}-bar\" style=\"width: {dynamicWidth}\">" +
                                   "             <span class=\"d-block percent-text\">{barWidth}</span>" +
                                   "         </div>" +
                                   "     </div>" +
                                   "</div>"

        for (const prediction of predictions) {
            if (prediction.probability.toFixed(2) > 0.1) {
                barWidth = Math.round(prediction.probability.toFixed(2) * 100) + '%';
            } else if (prediction.probability.toFixed(2) >= 0.01) {
                barWidth = '4%';
            } else {
                barWidth = '2%';
            }
            let engTitle;
            for (humanType of humanTypes) {
                if (prediction.className === humanType.title) {
                    engTitle = humanType.eng;
                    break;
                }
            }
            
            $("#label-container").append(rankPredictionFormat.replace("{humanType}", prediction.className)
                                                             .replace("{dynamicWidth}", barWidth)
                                                             .replaceAll("{engTitle}", engTitle)
                                                             .replace("{barWidth}", barWidth));
        }
    }

    this.find

    this.drawResult = (predicationClassName, genderCode) => {
        for (humanType of humanTypes) {
            if (predicationClassName === humanType.title) {
                $('.result-message').html(that.createResultElement(humanType, genderCode));
                break;
            }
            
        }
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

        let celebrationFormat = "<div class=\"{humanTypeStyle}-celeb pt-2 pb-2\">{genderCode} {title} 연예인: {celebrities}</div>";
        ;
                         
        return  titleFormat.replace("{humanTypeStyle}", humanTypeStyle)
                           .replace("{title}", humanType.title) + 
                explainFormat.replace("{description}", bodyDescriptions) + 
                celebrationFormat.replace("{humanTypeStyle}", humanTypeStyle)
                                 .replace("{genderCode}", genderCode === "F" ? "여성" : "남성")
                                 .replace("{title}", humanType.title)
                                 .replace("{celebrities}", celebrities);    
    }
}