var FilterMobile = function(parentsObj, platFormFlag, passingParamObj) {
    /* Default System Info */
    var RootFullPATH = this.getRootFullPATH();
    var RootSslPATH = this.getRootSslPATH();
    var RootPATH = this.getRootPATH();
    var ImgPATH = this.getImgPATH();
    var ScriptPATH = this.getScriptPATH();
    var CssPATH = this.getCssPATH();
    var ImgURL = this.getImgURL();
    var PAGE_MENU = this.getPAGE_MENU();
    var MID_MENU = this.getMID_MENU();
    //var S_MEMBER_CD = this.getS_MEMBER_CD();
    /* Default System Info */
    var paramObj = passingParamObj;

    var that = this;

    //#0. 파라미터 필터
    this.FILTER_DEFAULT = {

    };

    this.logCollectEventCheck = false;

    /**
     * 필터 내 항목관리를 위한 키값의 목록
     */
    this.ARR_FILTER_CATEGORY = [
        "wr_eq_v_center_code",
        "wr_gt_n_price",
        "wr_lt_n_price",
        "wr_gt_n_mileage",
        "wr_lt_n_mileage",
        "wr_gt_v_mfr_date",		//끝연식
        "wr_lt_v_mfr_date",		//시작연식
        "wr_gt_n_pass_cnt",
        "wr_lt_n_pass_cnt",
        "wr_in_n_pass_cnt",
        "wr_in_v_exterior_colorcd",
        "wr_in_v_fuel_typecd",
        "wr_in_v_transmissioncd",
        "wr_in_v_optioncd",
        "wr_in_v_rec_comment_cd",
        "wr_in_v_center_region_code",
        "wr_in_v_center_code",
        "wr_in_multi_columns",
        "wr_in_multi_values",
        "wr_eq_v_usernm",
        "wr_like_v_car_number",
        "wr_gt_n_month_price_self",	// 월할부금 최소
        "wr_lt_n_month_price_self",	// 월할부금 최대
        "wr_eq_n_inst_month",		// 할부기간
        "v_tag_param"				// 메인 인기태그 검색 param
    ];

    //#1. 필터 적용 시 실제 반영 될 Object
    this.FILTER_REAL = {

    };

    //#2. 필터 Option 선택 시 임시로 사용할 Object
    this.FILTER_TEMP = {

    };

    this.POPUP_FLAG = {
        "YEAR" : {
            "LAST" : "",
            "BEGIN" : "",
            "END" : "",
        },
        "PRICE" : {
            "LAST" : "",
            "BEGIN" : "",
            "END" : "",
        },
        "MILEAGE" : {
            "LAST" : "",
            "BEGIN" : "",
            "END" : "",
        }
    };

    this.initPopupFlag = function(flag){
        if(flag !== 'ALL'){
            that.POPUP_FLAG[flag].BEGIN = "";
            that.POPUP_FLAG[flag].END = "";
            that.POPUP_FLAG[flag].LAST = "";
        }else{
            that.POPUP_FLAG = {
                "YEAR" : {
                    "LAST" : "",
                    "BEGIN" : "",
                    "END" : "",
                },
                "PRICE" : {
                    "LAST" : "",
                    "BEGIN" : "",
                    "END" : "",
                },
                "MILEAGE" : {
                    "LAST" : "",
                    "BEGIN" : "",
                    "END" : "",
                }
            };
        }
    };


    this.INPUT_FLAG = {
        "PRICE" : "PRICE",
        "INSTALLMENT" : "INSTALLMENT",
        "MILEAGE" : "MILEAGE",
        "YEAR" : "YEAR",
        "COLOR" : "COLOR",
        "FUEL" : "FUEL",
        "OPTION" : "OPTION",
        "SEATER" : "SEATER",
        "SEATER_DIRECT" : "SEATER_DIRECT",
        "AREA" : "AREA",
        "HOTMARK" : "HOTMARK",
        "TRANS" : "TRANS",
        "REC" : "REC"
    };

    this.etcCategoryMapper = {
        'yearBefore'   : {category : '최소연식', unit : '년'},
        'yearAfter'   : {category : '최대연식', unit : '년'},
        'mileageMin'    : {category : '최소주행거리', unit : 'km'},
        'mileageMax'    : {category : '최대주행거리', unit : 'km'},
        'priceMin'      : {category : '최소차량가', unit : '만원'},
        'priceMax'      : {category : '최대차량가', unit : '만원'},
        'instPriceMin'  : {category : '최소월할부금', unit : '만원'},
        'instPriceMax'  : {category : '최대월할부금', unit : '만원'},
        'wr_eq_n_inst_month' : {category : '할부기간', unit : '개월'},
        'wr_in_v_exterior_colorcd'   : {category : '색상'},
        'wr_in_v_fuel_typecd'        : {category : '연료'},
        'wr_in_v_transmissioncd'     : {category : '변속기'},
        'wr_in_v_optioncd'           : {category : '옵션'},
        'wr_in_v_rec_comment_cd'     : {category : '사고유무'},
        'wr_in_n_pass_cnt'           : {category : '인승'},
        'wr_in_v_center_region_code' : {category : '지역'},
        'wr_in_v_center_code'         : {category : '직영점'},
    }

    this.keyArr = [
		"i_sCarCd",
		"i_sMakeCd","wr_eq_v_makecd","wr_in_v_makecd",
		"v_model_grp_cd","v_modelcd","v_class_headcd","v_class_detailcd",
		"wr_in_v_categorycd","wr_in_v_car_type",
		"wr_in_v_center_code","wr_eq_v_usernm","wr_eq_v_sell_empid","v_sell_empid",
		"wr_in_v_hot_markcd",
		"wr_gt_n_price","wr_lt_n_price",
		"wr_gt_n_mileage","wr_lt_n_mileage",
		"wr_gt_v_mfr_date","wr_lt_v_mfr_date",
		"wr_gt_n_pass_cnt","wr_lt_n_pass_cnt","wr_in_n_pass_cnt",
		"wr_in_v_exterior_colorcd","wr_in_v_fuel_typecd",
		"wr_in_v_transmissioncd","wr_in_v_optioncd","wr_in_v_rec_comment_cd",
		"wr_in_v_center_region_code","wr_gt_n_month_price_self",
		"wr_lt_n_month_price_self","wr_eq_n_inst_month",
		"wr_in_multi_columns","wr_in_multi_values",
		"wr_like_v_car_number",
		"wr_in_multi_columns_car","wr_in_multi_values_car",
    ];

    this.CALLBACK = {
        "order" : null,
        "filter" : null,
        "apply" : null
    };

    this.$id = 'modalFilterSimple';
	// option Common
    this.optionComm = {
        id:'',
        remove:false,
        openback: function(v) {  },
        closeback: function(v) {  }
    };

    // 필터 옵션 값이 존재 할 때 데이터 설정해주는 class
    this.filterDraw;

    // #0-1. 최초 Init work 함수
    this.initWorks = function(centerFlag, paramObj, filterMobile){
        // #0. 지점 차량 리스트 일 경우
        if(centerFlag === true){
            document.querySelector("div.regionAndCenterGroup").hidden = true;
        }

        // #1. 이전 필터 적용 옵션을 Temp로 복사
        that.setFilterRealToTemp(paramObj, filterMobile);

        if (paramObj && paramObj.eventBind === 'false') return;

        // #2. 필터 이벤트 바인딩
        // 필터에 각 항목들을 append 처리한다.
        that.initEventBind();
    };
    //#0-2
    this.copyObject = function(mainObj){
        var objCopy = {}; // objCopy will store a copy of the mainObj
        var key;

        for (key in mainObj) {
            objCopy[key] = mainObj[key]; // copies each property to the objCopy object
        }
        return objCopy;
    };

    //#0-3. if FILTER_REAL exist, FILTER_REAL => FILTER_TEMP
    this.setFilterRealToTemp = function(paramObj, filterMobile){
        //if(!that.isObjectEmpty(paramObj) && !that.isObjectForFilter(paramObj)) {
    	if(!that.isObjectEmpty(paramObj)) {
            that.FILTER_REAL = paramObj;
        }
        if(that.isObjectEmpty(that.FILTER_REAL)) return;
        that.FILTER_TEMP = that.cloneObject(that.FILTER_REAL);
    };

    this.setFilterDraw = function(filterDraw){
        that.filterDraw = filterDraw;
    };

    //#0-4. draw filter Popup with options
    this.drawFilterOptionsIfExist = function(filterMobile){
        if(!that.filterDraw) {
            that.filterDraw = new FilterDraw(filterMobile);
        }
        that.filterDraw.drawFilterOptionsIfExist(that.FILTER_TEMP);
    };
    //#0-5.
    this.setFilterDefault = function(paramObj) {
        that.FILTER_DEFAULT = paramObj;

        // url 쿼리스트링 데이터객체를 FILTER_REAL과 병합.
        // TEMP가 아닌 실제 REAL로 검색하게 된다.
        for(var defaultObjKey in that.FILTER_DEFAULT) {
            if(!that.FILTER_REAL.hasOwnProperty(defaultObjKey)) {
                that.FILTER_REAL[defaultObjKey] = that.FILTER_DEFAULT[defaultObjKey];
            }
        }
    };

    //#1. return 검색 서버용 Parameters
    // 필터에서 선택한 데이터를 json 객체로 반환.
    this.getSearchParameters = function(realFilterFlag){
        function getAreaParamArr(){

            var regionCodeArr = that.getFilterOption("wr_in_v_center_region_code");
            var centerCodeArr = that.getFilterOption("wr_in_v_center_code");

            if($.isEmptyObject(regionCodeArr)) return [];

            var rtnArr = [];
            regionCodeArr.forEach(function(regionCode, outIdx){
                var rtnStr = "";
                var innerIndex = 0;

                if(centerCodeArr){
                    centerCodeArr.forEach(function(centerCodeInfo, idx){
                        var centerCodeArr = centerCodeInfo.split("|");
                        if(regionCode == centerCodeArr[1]){
                            rtnArr.push(regionCode + "," + centerCodeArr[0]);
                            innerIndex++;
                        }
                    });
                }
                if(innerIndex === 0) rtnArr.push(regionCode);
            });
            return rtnArr;
        };
        var rtnObj = {};

        //#1. 실제 적용할 필터옵션 = FILTER_REAL
        var allOptionObj = realFilterFlag === true ? that.getRealFilterOption() : that.getTempFilterOption();

        var centerRegionFlag = false;
        for(var option in allOptionObj){
            if(Array.isArray(allOptionObj[option]) && allOptionObj[option].length > 0){

            	if ((option == 'wr_in_v_center_region_code' || option == 'wr_in_v_center_code') && !centerRegionFlag) {
            		centerRegionFlag = !!(allOptionObj["wr_in_v_center_region_code"] && allOptionObj["wr_in_v_center_region_code"][0]);
            		centerRegionFlag = centerRegionFlag || !!(allOptionObj["wr_in_v_center_code"] && allOptionObj["wr_in_v_center_code"][0]);
            	}

                var arrParamStr = "";
                //지역 설정값은 특수하게 처리 분기
                if(centerRegionFlag){

                    //지역 설정 값이 있으면, 필수로 보내야 하는 값
                    rtnObj["wr_in_multi_columns"] = "v_center_region_code|v_center_code";

                    getAreaParamArr().forEach(function(arrInfo, arrIdx){
                        arrParamStr += (arrIdx == 0 ? "" : "|") + arrInfo;
                    });

                    //지역 설정 값이 있을 경우, 보내야 하는 key값
                    rtnObj["wr_in_multi_values"] = arrParamStr;
                    centerRegionFlag = false;
                }else{
                    if(option !== "wr_in_v_center_region_code" && option !== "wr_in_v_center_code"){
                        allOptionObj[option].forEach(function(arrInfo, arrIdx){
                            arrParamStr += (arrIdx == 0 ? "" : "|") + arrInfo;
                        });
                        rtnObj[option] = arrParamStr;
                    }
                }
            }else{
                if(!Array.isArray(allOptionObj[option]) && allOptionObj[option]){

                    var defaultValue = allOptionObj[option];
                    //시작 연식 분기
                    if(option === "wr_gt_v_mfr_date" && allOptionObj[option].length === 4){
                        defaultValue = allOptionObj[option] + "01";
                    }
                    //끝 연식 분기
                    if(option === "wr_lt_v_mfr_date" && allOptionObj[option].length === 4){
                        defaultValue = allOptionObj[option] + "12";
                    }

                    //정렬 분기
                    if(option === "orderby"){
                        rtnObj["orderFlag"] = true;
                    }
                    rtnObj[option] = defaultValue;
                }
            }
        }

        return rtnObj;
    };

    //#2. set Filter 적용시 실행할 CallBack 함수
    this.setFilterCallBack = function(_callBack, _callBack2){
        that.CALLBACK.filter = _callBack();
        if (!!_callBack2) {
        	that.CALLBACK.apply = _callBack2();
        }
    };

    //#3. Filter 적용시 실행할 CallBack 함수  실행
    this.runFilterCallBack = function(orderFlag){
        //#1. Set 판매사원/차량번호 값
        that.setDirectSearchOption();

        // URL QueryString이 아닌 필터데이터 선택시는, 필터데이터 우선.
        //#2. FILTER_TEMP => FILTER_REAL, init FILTER_TEMP
        that.FILTER_REAL = that.cloneObject( that.FILTER_TEMP );

        //#3. 사용자가 넘긴 CallBack 함수 실행 (with Parameter true)
        var filterCallback = that.CALLBACK.filter;
        if ($.isFunction(filterCallback)) {
        	filterCallback(true,undefined,orderFlag);
        }
    };

    this.runFilterApplyCallBack = function(){
    	//#1. Set 판매사원/차량번호 값
        that.setDirectSearchOption();

        // URL QueryString이 아닌 필터데이터 선택시는, 필터데이터 우선.
        //#2. FILTER_TEMP => FILTER_REAL, init FILTER_TEMP
        that.FILTER_REAL = that.cloneObject( that.FILTER_TEMP );

        //#3. 사용자가 넘긴 CallBack 함수 실행 (with Parameter true)
        var applyCallback = that.CALLBACK.apply;
        if ($.isFunction(applyCallback)) {
        	applyCallback(true);
        }
    };

    //#4. 필터 option 선택 / 해제 시 그에 따른 버튼 상태 값 변경 (by value from getSearchParameters())
    this.setCategoryOnOff = function(realFilterFlag ){ //realFilterFlag === true, RealFilterOption or TempFilterOption
        //#0. objectID와  on/off 여부에 따른 Element 상태 변경
        function setObjectClassStatus(objectID, onFlag) {
            var targetObj = document.getElementById(objectID);
            //#1. onFlag === true, set small Element class on
            if(onFlag === true){
                //targetObj.classList.add('on');
                $(targetObj).addClass('in').find('.inp_filter').addClass('in');
            }else{
            //#2. onFlag === false, remove small Element class
                //targetObj.classList.remove('on');
                $(targetObj).removeClass('in').find('.inp_filter').removeClass('in');
            }
        };

        //#1. 사용자가 설정 한 전체 파라미터 가져오기
        var afo = that.getSearchParameters(realFilterFlag); //allFilterOption

        //#2. Filter 적용 버튼 내 class 적용
        var filterCntFlag = false;

        // 연식 on / off
        if(afo.wr_gt_v_mfr_date || afo.wr_lt_v_mfr_date){
            setObjectClassStatus("smallYearID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallYearID", false);
        }

        // 주행거리 on / off
        if(afo.wr_gt_n_mileage || afo.wr_lt_n_mileage){
            setObjectClassStatus("smallMileageID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallMileageID", false);
        }

        // 가격 on / off & 할부 on / off
        if( (afo.wr_gt_n_price || afo.wr_lt_n_price) || (afo.wr_gt_n_month_price_self || afo.wr_lt_n_month_price_self) ){
            setObjectClassStatus("smallPriceInstallmentID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallPriceInstallmentID", false);
        }

        // 색상 on / off
        if(afo.wr_in_v_exterior_colorcd){
            setObjectClassStatus("smallColorID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallColorID", false);
        }

        // 연료 on / off
        if(afo.wr_in_v_fuel_typecd){
        	setObjectClassStatus("smallFuelID", true); filterCntFlag = true;
        }else{
        	setObjectClassStatus("smallFuelID", false);
        }

        // 미션 on / off
        if(afo.wr_in_v_transmissioncd){
            setObjectClassStatus("smallTransID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallTransID", false);
        }

        // 사고유무 on / off
        if(afo.wr_in_v_rec_comment_cd){
            setObjectClassStatus("smallRecID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallRecID", false);
        }

        // 옵션 on / off
        if(afo.wr_in_v_optioncd){
            setObjectClassStatus("smallOptionID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallOptionID", false);
        }

        // 인승 on / off
        if(afo.wr_in_n_pass_cnt || afo.wr_lt_n_pass_cnt || afo.wr_gt_n_pass_cnt){
            setObjectClassStatus("smallSeaterID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallSeaterID", false);
        }

        // 지점 on / off
        if((afo.wr_in_multi_columns && afo.wr_in_multi_columns.length > 0)
                || (afo.wr_in_multi_values && afo.wr_in_multi_values.length > 0)){
            setObjectClassStatus("smallAreaID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallAreaID", false);
        }

        // 차량번호/판매담당자 on / off
        if(afo.wr_eq_v_usernm || afo.wr_like_v_car_number){
            setObjectClassStatus("smallDirectID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallDirectID", false);
        }

        /*
        //#3-2. 할부 on / off
        if(afo.wr_gt_n_month_price_self || afo.wr_lt_n_month_price_self){
            setObjectClassStatus("smallMoneyID", true); filterCntFlag = true;
            setObjectClassStatus("smallMonthID", true); filterCntFlag = true;
        }else{
            setObjectClassStatus("smallMoneyID", false);
            setObjectClassStatus("smallMonthID", false);
        }
        */
    };

    //#5. set FilterOption value with Property Object
    //ex : {wr_eq_v_userName : ######}
    this.setFilterOption = function(propObj, passFlag){
        try{
            for (prop in propObj) {
                that.FILTER_TEMP[prop] = propObj[prop];
            }

            //whenever filterOption set or remove, call the "setCategoryOnOff" function
            if(!passFlag) that.setCategoryOnOff();
        }catch(error){}
    };

    //#6-1. get FilterOption with Property Name or get all FilterOptions
    this.getFilterOption = function(propName){
        var newCloneObj = that.cloneObject(that.FILTER_TEMP);
        if(propName){
            return newCloneObj[propName];
        }else{
            return newCloneObj;
        }
    };

    //#6-2. init FILTER_TEMP option
    this.initFilterOption = function(){
        that.FILTER_TEMP = {};
    };

    //#6-3. get REAL FilterOption with Property Name or get all FilterOptions
    this.getRealFilterOption = function(propName){
        if(propName){
            return that.FILTER_REAL[propName];
        }else{
            return that.FILTER_REAL;
        }
    };

    //#6-4. get TEMP FilterOption with Property Name or get all FilterOptions
    this.getTempFilterOption = function(propName){
        if(propName){
            return that.FILTER_TEMP[propName];
        }else{
            return that.FILTER_TEMP;
        }
    };


    //#7. 판매사원 / 차량번호 입력의 경우 필터적용을 선택 했을 때 Filter Option에 설정
    this.setDirectSearchOption = function(){
    	var staffSearch = document.getElementById("staffSearch");
        var inputValue = (staffSearch) ? staffSearch.value.trim() : '';

        that.setFilterOption({"wr_eq_v_usernm" : false});
        that.setFilterOption({"wr_like_v_car_number" : false});

        $('#wr_eq_v_usernm').val('');
        $('#wr_like_v_car_number').val('');

        if(inputValue){
            //#1. 숫자가 포함되어 있을 경우 차량번호로 판단
            if(/\d/.test(inputValue)){
                that.setFilterOption({"wr_like_v_car_number" : inputValue}, true);
                that.setFilterOption({"wr_eq_v_usernm" : false});
            }else{
            //#2. 숫자가 없을 경우 판매사원 정보로 판단
                that.setFilterOption({"wr_eq_v_usernm" : inputValue}, true);
                that.setFilterOption({"wr_like_v_car_number" : false});
            }
        }else {
            that.setFilterOption({"wr_eq_v_usernm" : false});
            that.setFilterOption({"wr_like_v_car_number" : false});
        }
    }

    //#8. 전체 또는 각 옵션 별 Reset 요청 시 실행
    // 필터의 'X' 버튼을 클릭하여도 실행됨.
    this.resetInputData = function(inputFlag, allResetFlag){
        var resetParamName;
        var filterOptionParam = false;

        if(allResetFlag === false){
            filterOptionParam = true;
        }else{
            filterOptionParam = false;
        }

        //#0. 전체 초기화 요청 시
        if(allResetFlag === true){
        	var staffSearch = document.getElementById("staffSearch");

            //## 팝업창 없이 바로 선택되는 Optoin의 경우, 전체 리셋요청에만 초기화
            //미션
            //$("ul.trans > li").removeClass("on");
            that.setFilterOption({"wr_in_v_transmissioncd" : []}, filterOptionParam);

            //사고 유무
            //$("ul.rec_comment > li").removeClass("on");
            that.setFilterOption({"wr_in_v_rec_comment_cd" : []}, filterOptionParam);
            
            that.setFilterOption({"i_sCenterCode" : ''}, filterOptionParam);
            $('#i_sCenterCode').val('');
            
            that.setFilterOption({"wr_in_multi_columns" : []});
            that.setFilterOption({"wr_in_multi_values" : []});
            $('#wr_in_multi_columns').val('');
            $('#wr_in_multi_values').val('');
            
            //차량번호/판매담당자 검색
            that.setFilterOption({"wr_like_v_car_number" : ''}, filterOptionParam);
            that.setFilterOption({"wr_eq_v_usernm" : ''}, filterOptionParam);
            (staffSearch) ? staffSearch.value = "" : undefined;

            /* 브랜드인증몰 - 20200731 Start */
            $("[name=v_sell_cl_cd]").eq(1).click();
            /* 브랜드인증몰 - 20200731 End */

        	try {
        		$.each(filterMobile.ARR_FILTER_CATEGORY, function(index, key)  {
            	    $('#' + key).val('');
            	});

        		$.each(filterMobile.ARR_FILTER_CATEGORY, function(index, key)  {
        			delete filterMobile.FILTER_TEMP[key];
        			try {delete searchBrand.init.filter[key];} catch (e){}
            	});

        		var filterParam = filterMobile.getSearchParameters();
        		searchEvent.checkFilter(filterParam);
        	}catch (e) {
        		console.log(e)
        	};
        }

        //#1-1 . 가격 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.PRICE){
            $("button.filter_price").html("가격 또는 월할부금을 선택해 주세요.");

            $("input[type='hidden'][name='wr_gt_n_price']").val('');
            $("input[type='hidden'][name='wr_lt_n_price']").val('');

            that.setFilterOption({"wr_gt_n_price" : ''}, filterOptionParam);
            that.setFilterOption({"wr_lt_n_price" : ''}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_gt_n_price'];
            	delete searchBrand.init.filter['wr_lt_n_price'];
            } catch (e){}

            that.initPopupFlag(that.INPUT_FLAG.PRICE);
        }

        //#1-2 . 할부 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.INSTALLMENT){
            filterMobile.drawCarInstallmenPeriod(false);

            $("input[type='hidden'][name='wr_gt_n_month_price_self']").val('');
            $("input[type='hidden'][name='wr_lt_n_month_price_self']").val('');
            $("input[type='hidden'][name='wr_eq_n_inst_month']").val('');

            that.setFilterOption({"wr_gt_n_month_price_self" : ''}, filterOptionParam);
            that.setFilterOption({"wr_lt_n_month_price_self" : ''}, filterOptionParam);
            that.setFilterOption({"wr_eq_n_inst_month" : ''}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_gt_n_month_price_self'];
            	delete searchBrand.init.filter['wr_lt_n_month_price_self'];
            	delete searchBrand.init.filter['wr_eq_n_inst_month'];
            } catch (e){}
        }

        //#2. 주행거리 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.MILEAGE){
            $("button.filter_mileage").html("주행거리를 선택해 주세요.");

            $("input[type='hidden'][name='wr_gt_n_mileage']").val('');
            $("input[type='hidden'][name='wr_lt_n_mileage']").val('');

            that.setFilterOption({"wr_gt_n_mileage" : ''}, filterOptionParam);
            that.setFilterOption({"wr_lt_n_mileage" : ''}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_gt_n_mileage'];
            	delete searchBrand.init.filter['wr_lt_n_mileage'];
            } catch (e){}

            that.initPopupFlag(that.INPUT_FLAG.MILEAGE);
        }

        //#3. 연식 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.YEAR){
            $("button.filter_year").html("연식을 선택해 주세요.");

            $("input[type='hidden'][name='wr_gt_v_mfr_date']").val('');
            $("input[type='hidden'][name='wr_lt_v_mfr_date']").val('');

            that.setFilterOption({"wr_gt_v_mfr_date" : ''}, filterOptionParam);
            that.setFilterOption({"wr_lt_v_mfr_date" : ''}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_gt_v_mfr_date'];
            	delete searchBrand.init.filter['wr_lt_v_mfr_date'];
            } catch (e){}

            that.initPopupFlag(that.INPUT_FLAG.YEAR);
        }


        //#4. 색상 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.COLOR){
            $("button.inp_filter_color").html("색상을 선택해 주세요.");

            $("input[type='hidden'][name='wr_in_v_exterior_colorcd']").val('');

            resetParamName = "wr_in_v_exterior_colorcd";
            that.setFilterOption({"wr_in_v_exterior_colorcd" : []}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_in_v_exterior_colorcd'];
            } catch (e){}
        }

        //#5. 연료 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.FUEL){
            //$("ul.fuel > li.on").removeClass("on");
            $("button.inp_filter_fuel").html("연료를 선택해 주세요.");

            $("input[type='hidden'][name='wr_in_v_fuel_typecd']").val('');

            resetParamName = "wr_in_v_fuel_typecd";
            that.setFilterOption({"wr_in_v_fuel_typecd" : []}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_in_v_fuel_typecd'];
            } catch (e){}
        }

        //#6. 옵션 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.OPTION){
            $("button.inp_filter_option").html("옵션을 선택해 주세요.");

            $("input[type='hidden'][name='wr_in_v_optioncd']").val('');

            resetParamName = "wr_in_v_optioncd";
            that.setFilterOption({"wr_in_v_optioncd" : []}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_in_v_optioncd'];
            } catch (e){}
        }

        //#7. 좌석 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.SEATER){
            //인승 checkbox 초기화
            try{
                $("ul.seater_popup_list").find('input[type="checkbox"]').prop('checked',false);
            }catch(error){}


            $("input[type='hidden'][name='wr_in_n_pass_cnt']").val('');

            resetParamName = "wr_in_n_pass_cnt";
            that.setFilterOption({"wr_in_n_pass_cnt" : []}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_in_n_pass_cnt'];
            } catch (e){}

            //인승 Text 초기화
            $("button.inp_filter_seater").html("인승 정보를 선택해 주세요.");
        }

        //#8. 좌석(직접입력) 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.SEATER_DIRECT){
            //Input 초기화
            try{
                $("input[name='directIp']").val("");
            }catch(error){}

            $("input[type='hidden'][name='wr_lt_n_pass_cnt']").val('');
            $("input[type='hidden'][name='wr_gt_n_pass_cnt']").val('');

            //최소 인승
            resetParamName = "wr_lt_n_pass_cnt";
            that.setFilterOption({"wr_lt_n_pass_cnt" : ''}, filterOptionParam);

            //최대 인승
            resetParamName = "wr_gt_n_pass_cnt";
            that.setFilterOption({"wr_gt_n_pass_cnt" : ''}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_lt_n_pass_cnt'];
            	delete searchBrand.init.filter['wr_gt_n_pass_cnt'];
            } catch (e){}

            //인승 Text 초기화
            $("button.inp_filter_seater").html("인승 정보를 선택해 주세요.");
        }

        //#9. 지역 정보 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.AREA){
            try{
            	if (allResetFlag != false) {
            		kcar.uiAccordionCloseAll('#selectOffice .type_filter');
            		$(".ui_acco_wrap input[type=checkbox]").prop('checked',false);
            	}
            }catch(error){}

            //지역/지점 Text 초기화
            $("button.branchDate").html("지역/지점을 선택해 주세요.");

            $("input[type='hidden'][name='wr_in_v_center_region_code']").val('');
            $("input[type='hidden'][name='wr_in_v_center_code']").val('');
            $("input[type='hidden'][name='wr_in_multi_columns']").val('');
            $("input[type='hidden'][name='wr_in_multi_values']").val('');

            that.setFilterOption({"wr_in_v_center_region_code" : ''}, filterOptionParam);
            that.setFilterOption({"wr_in_v_center_code" : ''}, filterOptionParam);
            that.setFilterOption({"wr_in_multi_columns" : []}, filterOptionParam);
            that.setFilterOption({"wr_in_multi_values" : []}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_in_v_center_region_code'];
            	delete searchBrand.init.filter['wr_in_v_center_code'];
            	delete searchBrand.init.filter['wr_in_multi_columns'];
            	delete searchBrand.init.filter['wr_in_multi_values'];
            } catch (e){}
        }

        //#10. 핫마크 초기
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.HOTMARK){

        	$("input[type='hidden'][name='wr_in_v_hot_markcd']").val('');

            resetParamName = "wr_in_v_hot_markcd";
            that.setFilterOption({"wr_in_v_hot_markcd" : []}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_in_v_hot_markcd'];
            } catch (e){}
        }

        //#11. 미션 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.TRANS){
            $("button.inp_filter_trans").html("미션을 선택해 주세요.");

            $("input[type='hidden'][name='wr_in_v_transmissioncd']").val('');

            resetParamName = "wr_in_v_transmissioncd";
            that.setFilterOption({"wr_in_v_transmissioncd" : []}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_in_v_transmissioncd'];
            } catch (e){}
        }

        //#12. 사고유무 초기화
        if(allResetFlag === true || inputFlag === that.INPUT_FLAG.REC){
            $("button.inp_filter_rec").html("사고유무를 선택해 주세요.");

            $("input[type='hidden'][name='wr_in_v_rec_comment_cd']").val('');

            resetParamName = "wr_in_v_rec_comment_cd";
            that.setFilterOption({"wr_in_v_rec_comment_cd" : []}, filterOptionParam);

            try {
            	delete searchBrand.init.filter['wr_in_v_rec_comment_cd'];
            } catch (e){}
        }

        if(allResetFlag === true) that.setFilterOption({}, false);
    };

    //#9. 각 버튼 별 Event Bingding with delegation
    this.initEventBind = function(){
        // event #0. 정렬 이벤트 바인딩
        that.bindOrderEvent();

        // event #1-1. 가격 이벤트 바인딩
        that.bindCarPriceEvent();

        // event #1-2. 할부 이벤트 월할부금 바인딩
        that.bindCarInstallmenPriceEvent();

        // event #1-3. 가격 이벤트 바인딩
        that.bindCarPriceInstallmentEvent();

        // event #2. 주행거리 이벤트 바인딩
        that.bindCarMileageEvent();

        // event #3. 연식 이벤트 바인딩
        that.bindCarYearEvent();

        // event #4. 색상 이벤트 바인딩
        that.bindCarColorEvent();

        // event #5. 연료 이벤트 바인딩
        that.bindCarFuelEvent();

        // event #6. 미션 이벤트 바인딩
        that.bindCarTransEvent();

        // event #7. 옵션 이벤트 바인딩
        that.bindCarOptionEvent();

        // event #8. 사고여부 이벤트 바인딩
        that.bindCarRecEvent();

        // event #9. 인승 이벤트 바인딩
        that.bindCarSeaterEvent();

        // event #10. 지점 이벤트 바인딩
        that.bindCarAreaEvent();

        /* 브랜드인증몰 - 20200731 Start */
        $("[name=v_sell_cl_cd]").change(function(_e){
        	var sellClCd = _e.currentTarget.value || '';
        	that.setFilterOption({"v_sell_cl_cd" : sellClCd});
        	$('#v_sell_cl_cd').val(sellClCd);
        });
        /* 브랜드인증몰 - 20200731 End */
    };

    //#10. 필터 내 각 카테고리 별 팝업 오픈
    this.showFilterPopup = function(idValue, _callBack){
        popupBase.layerPopup(idValue);

        if(_callBack){
            _callBack();
        }
    };

    //#11. 필터 내 체크박스 Uniform Plugin 적용 with className
    this.activateUniformUI = function(addClassName){
        var $uniformed = $("input.uniform" + addClassName ? addClassName : "");
        $.each($uniformed, function(i) {
            var $el = $uniformed.eq(i);
            if (!$el.parent().parent().hasClass('checker')) {
                $el.uniform();
            }
        })
    };

    //#12. get Lazy Load에 필요한 Code info for Color, Option etc
    this.getCmSubCodeListWithMstCode = function(mstCode, _callBack){
    	var item = localStorage.getItem(mstCode);
    	var result = {};

    	if (item) {
    		result = JSON.parse(item);
    		_callBack(result);
    		return;
    	} else {
    		$.ajax({
                type : "POST"
                , url : "/api/common/getCmSubCodeList.do"
                , data : {i_sMstCode : mstCode}
            	, async : false
                , success:function(result) {
                    if(result.state == 'succ' && result.data){
                        //ajax 서버 호출 성공 시 _callBack 함수 실행
                    	localStorage.setItem(mstCode, JSON.stringify(result));
                        _callBack(result);
                    }else{
                        alert("서버로부터 데이터를 가져오지 못하였습니다.");
                    }
                }
                , error:function(e) {
                }
            });
    	}
    };

    //#13. 지역정보의 경우 Code값이 아니라 따로 Api 호출
    this.getRegionAndCenterList = function(_callBack){
        $.ajax({
            type : "POST",
            //url : "/index_api/getRegionList.do",
            url : "/api/index/getRegionList.do",
            data : {},
            async :false,
            dataType : "json",
            success : function(data) {
                _callBack(data);
            },
            error : function(e) {

            }
        });
    };

    //#14. Array의 경우 해당 targetValue가 있는지 확인 후 Return with index, isExist ( = Array.prototype.includes )
    this.getArrayIndexWithIncludeStatus = function(inputArr, targetValue){
        var returnObj = {
            "index" : -1,
            "isExist" : false
        }
        // undefined 등의 사유인 경우 바로 리턴
        if(!inputArr) return returnObj;

        // 해당 데이터가 배열이 아닌 스트링 타입의 경우 배열로 변환..
        // 데이터의 존재 체크
        ($.isArray(inputArr) ? inputArr : inputArr.split("|")).forEach(function(item, index) {
        	if(item == targetValue){
                returnObj.index = index;
                returnObj.isExist = true;
            }
        });

        return returnObj;
    };

    //#15. Array로 FilterOption을 add/remove 할 경우, push와 splice를 이용 Update
    //체크 상자 체크
    this.getAllSelectedArrWithProperty = function(addFlag, propName ,paramCode){
        var returnArray = [];
        var selectedColorArray = that.getFilterOption(propName);
        selectedColorArray = (typeof selectedColorArray === 'string') ? selectedColorArray.split('|') : selectedColorArray;
        if (Array.isArray(selectedColorArray) && $.isEmptyObject(selectedColorArray) == false) {
        	if (selectedColorArray[0] == "") selectedColorArray.splice(0, 1);
        }

        // undefined, null, 공백인 경우만 true. ![] -> false
        if($.isEmptyObject(selectedColorArray)){
            if(addFlag && paramCode) returnArray.push(paramCode);
            // 해당 단일 값의 배열이 filter 값으로 세팅됨.
            return returnArray;
        }

        // 필터 내 값 존재 유무 체크
        // paramCode 값이 selectedColorArray 배열 내 존재하지 않는 경우 : checkArrayObj = {index: -1, isExist: false}
        var checkArrayObj = that.getArrayIndexWithIncludeStatus(selectedColorArray, paramCode);

        //값 추가
        if(addFlag == true){
            if(checkArrayObj.isExist){
            	// 존재하는 경우 배열 내 값 업데이트
                selectedColorArray[checkArrayObj.index] = paramCode;
            }else{
            	// 존재하지 않는 경우 배열 내 값 추가
                selectedColorArray.push(paramCode);
            }
        }else{
            // 값 제거
            if(checkArrayObj.isExist){
                selectedColorArray.splice(checkArrayObj.index, 1);
            }
        }
        return selectedColorArray;
    };

    //지역, 센터 선택 할 때마다 필터 창 내 지역/지점 선택 Text 변경
    this.drawSelectedCenterInfo = function(areaMappingObj){
    	var drawTextHtml = "지역/지점을 선택해 주세요.";
        try {
        	var regionCodeArr = that.getFilterOption("wr_in_v_center_region_code");
            var centerCodeArr = that.getFilterOption("wr_in_v_center_code");

            if (!$.isEmptyObject(regionCodeArr) && regionCodeArr[0] == "")  regionCodeArr.splice(0, 1);
            if (!$.isEmptyObject(centerCodeArr) && centerCodeArr[0] == "")  centerCodeArr.splice(0, 1);

            //var drawTextHtml = "선택";
            if(!$.isEmptyObject(regionCodeArr)){
                drawTextHtml = "";
                regionCodeArr.forEach(function(regionCode, idx){
                    drawTextHtml += (idx === 0 ? "" : ",")  + areaMappingObj[regionCode].REGION;
                });

                if(!$.isEmptyObject(centerCodeArr)){
                    drawTextHtml += ">";

                    var centerInfoIndex = 0;
                    centerCodeArr.forEach(function(centerCodeInfo, centerCodeIdx){
                        //ex : allCenterArrWithRegion => "부산지점|068"
                        var centerCodeArr = centerCodeInfo.split("|");
                        var allCenterArrWithRegion = areaMappingObj[centerCodeArr[1]].CENTER;

                        allCenterArrWithRegion.forEach(function(centerNameInfo, idx){
                            //ex : centerNameArr => "129|JUNJU"
                            var centerNameArr = centerNameInfo.split("|");
                            if(centerNameArr[1] !== centerCodeArr[0]) return

                            drawTextHtml += (centerInfoIndex++ === 0 ? "" : ",")  + centerNameArr[0];
                        })
                    });
                }
            } else {
            	$("button.branchDate").removeClass('in');
            }
            if(drawTextHtml.length > 20){
                drawTextHtml = drawTextHtml.substring(0,20) + "...";
            }
        } catch (e) {}
        //$("div.branchDate").html(drawTextHtml);
        $("button.branchDate").html(drawTextHtml);

    };
    //combined in bindCarAreaEvent End

    // event #0. 정렬 이벤트 바인딩
    this.bindOrderEvent = function(){
    };

    // event #1-1. 가격 이벤트 바인딩
    this.bindCarPriceEvent = function(){
        var addPriceFlag = false;
        $("#priceMin, #priceMax").click(function(){
            var currentObjID = $(this).attr('id');

            if(addPriceFlag === false){
                var defaultPassingPrice = false;
                if(currentObjID === "priceMin" && that.POPUP_FLAG.PRICE.BEGIN){
                    defaultPassingPrice = that.POPUP_FLAG.PRICE.BEGIN;
                }else if(currentObjID === "priceMax" && that.POPUP_FLAG.PRICE.END){
                    defaultPassingPrice = that.POPUP_FLAG.PRICE.END;
                }

                //1. 최초1 회만 가격 정보 추가
                addPriceFlag = true;

                var fromPrice =  100;
                var toPrice = 1000;

                var innerHTML = "<ul class=\"price_list\">";
                innerHTML +=    "		<li data-price=\"99999\">전체선택</li>";

                for( ; fromPrice <= toPrice ; fromPrice += 100){
                    innerHTML += "<li data-price=\""+fromPrice+"\" class=\""+(defaultPassingPrice && defaultPassingPrice == fromPrice ? "on" : "")+"\">"+that.addComma(fromPrice)+"만원</li>"
                }

                fromPrice = 2000;
                toPrice = 10000;

                for( ; fromPrice <= toPrice ; fromPrice += 1000){
                    innerHTML += "<li data-price=\""+fromPrice+"\" class=\""+(defaultPassingPrice && defaultPassingPrice == fromPrice ? "on" : "")+"\">"+that.addComma(fromPrice)+"만원</li>"
                }

                innerHTML += "<li data-price=\""+60000+"\">"+"10,000만원 초과</li>"

                innerHTML +=    "</ul>";
                $("div#divModelPrice").html(innerHTML);

                //#3-1. 가격 클릭
                var priceUlObj = document.querySelector("ul.price_list");
                priceUlObj.addEventListener("click", function(evt){
                    var openFlag = that.POPUP_FLAG.PRICE.LAST;
                    var targetObj = evt.target;

                    var onLiObj = targetObj.parentElement.querySelector(".on");
                    if(onLiObj){
                        onLiObj.classList.remove("on");
                    }

                    targetObj.classList.add("on");
                    var chosenPrice = targetObj.dataset.price;

                    if(openFlag === "priceMin"){
                        that.POPUP_FLAG.PRICE.BEGIN = chosenPrice;
                        if(chosenPrice == "99999"){
                            chosenPrice = "전체";
                            that.setFilterOption({"wr_gt_n_price" : false});
                        }else if(chosenPrice == "60000"){
                            chosenPrice = "1억 초과";
                            that.setFilterOption({"wr_gt_n_price" : "10001"});
                        }else{
                            that.setFilterOption({"wr_gt_n_price" : chosenPrice});
                            chosenPrice = that.addComma(Number(chosenPrice)) + "만원";
                        }

                        $("#priceMin").html(chosenPrice);
                    }else{
                        that.POPUP_FLAG.PRICE.END = chosenPrice;
                        if(chosenPrice == "99999"){
                            chosenPrice = "전체";
                            that.setFilterOption({"wr_lt_n_price" : false});
                        }else if(chosenPrice == "60000"){
                            chosenPrice = "6억 이하";
                            that.setFilterOption({"wr_lt_n_price" : "60000"});
                        }else{
                            that.setFilterOption({"wr_lt_n_price" : chosenPrice});
                            chosenPrice = that.addComma(Number(chosenPrice)) + "만원";
                        }

                        $("#priceMax").html(chosenPrice);
                    }

                    var keyword = $(targetObj).data('price');
                    var ecm     = that.etcCategoryMapper[openFlag];
                    var category = ecm.category;
                    var unit     = ecm.unit;

                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {}, $(this));

                    //선택하면 레이어 종료
                    popupBase.closePopup();
                });
            }else{
                //1. 반대 가격 선택 값 삭제 및 현재 상태값 체크
                if(currentObjID !== that.POPUP_FLAG.PRICE.LAST){
                    var priceUlObj = document.querySelector("ul.price_list");
                    var minPrice = that.POPUP_FLAG.PRICE.BEGIN;
                    var maxPrice = that.POPUP_FLAG.PRICE.END;

                    $("ul.price_list > li.on").removeClass("on");

                    if(currentObjID === "priceMin"){
                        if(minPrice){
                            priceUlObj.querySelectorAll("[data-price='"+minPrice+"']")[0].classList.add('on');
                        }
                    }else if(currentObjID === "priceMax"){
                        if(maxPrice){
                            priceUlObj.querySelectorAll("[data-price='"+maxPrice+"']")[0].classList.add('on');
                        }
                    }
                }

                //2. 최소가격이 있을 경우 최대가격을 최소가격 이하의 값 선택 X
                if(currentObjID == "priceMax" && that.POPUP_FLAG.PRICE.BEGIN){
                    $("ul.price_list > li").each(function(idx, priceInfo){
                        if(that.POPUP_FLAG.PRICE.BEGIN !== "99999" && $(priceInfo).data().price <= that.POPUP_FLAG.PRICE.BEGIN){
                            $(priceInfo).hide();
                        }else{
                            $(priceInfo).show();
                        }
                    });
                }else if(currentObjID == "priceMin" && that.POPUP_FLAG.PRICE.END){
                    $("ul.price_list > li").each(function(idx, priceInfo){
                        if(that.POPUP_FLAG.PRICE.END === "99999" || $(priceInfo).data().price <= that.POPUP_FLAG.PRICE.END){
                            $(priceInfo).show();
                        }else{
                            $(priceInfo).hide();
                        }
                    });
                }
            }
            //팝업 띄우기
            if (  $(this).attr('id')  == "priceMin" ) {
                that.POPUP_FLAG.PRICE.LAST = "priceMin";
            } else {
                that.POPUP_FLAG.PRICE.LAST = "priceMax";
            }
            that.showFilterPopup('#modelPricePopup');
        });
    };

    // event #1-2. 할부 이벤트 월할부금 바인딩
    this.bindCarInstallmenPriceEvent = function() {

        // 할부가 입력 체크
        $('input[name="instPrice"]').on('blur', function(evt) {
            // 최소 ~ 최대 체크 후 교체
            var start = $('#instPriceMin').val();
            var end = $('#instPriceMax').val();
            if(start != "" && end != "" && Number(start) > Number(end)){
                alert('시작 값이 끝 값보다 크므로 값을 변경 합니다.');
                $('#instPriceMin').val(end);
                $('#instPriceMax').val(start);
            }

            that.setFilterOption({"wr_gt_n_month_price_self" : start});
            that.setFilterOption({"wr_lt_n_month_price_self" : end});

            // 할부기간 클릭 활성 & 비활성
            if ( start !='' || end !='' ){
                that.drawCarInstallmenPeriod( true );

                var instPriceInputID = $(this).attr('id');
                var keyword = $(this).val();
                var ecm     = that.etcCategoryMapper[instPriceInputID];
                var category = ecm.category;
                var unit     = ecm.unit;

                //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {}, $(this));
            } else {
                that.drawCarInstallmenPeriod( false );
            }
        });

    	// 최초 할부기간 클릭 초기화
    	// 타입변환 -> boolean
        var wasSelectedInstMonth = !!filterMobile.getRealFilterOption('wr_eq_n_inst_month');
    	that.drawCarInstallmenPeriod( wasSelectedInstMonth );
    };

    // combined in bindCarInstallmenPriceEvent (할부기간 클릭 활성 & 비활성 )
    this.drawCarInstallmenPeriod = function( activeFlag ){
        if ( activeFlag == true ) {
            $('#installmentPeriodGroup').removeClass('off').off('click').on('click',function(evt, isTriggered){
                var $this = $(evt.target);
                var $data = $this.data('instperiod');
                // 버튼 on /off
                $this.parent().children().removeClass('on')
                $this.addClass('on');
                that.setFilterOption({"wr_eq_n_inst_month" : $data});
                //console.log($data);

                // 이벤트가 트리거로 실행되지 않은경우에만 로그 수집
                if(!isTriggered) {
                    var keyword = $this.data('instperiod');
                    var ecm     = that.etcCategoryMapper['wr_eq_n_inst_month'];
                    var category = ecm.category;
                    var unit     = ecm.unit;

                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {});
                }
            })

            if ( $('#installmentPeriodGroup').children('li.on').length ==0 ){
                // 36개월 Default
                $('#installmentPeriodGroup').find('li:eq(2)').trigger('click', true);
            }
        } else {
            // 비활성
            $('input[name="instPrice"]').val('');
            $('#installmentPeriodGroup').addClass('off').off('click').children('li').removeClass('on');

            $('#installmentPeriodGroup').on('click',function(evt){
                alert('월할부금을 설정해 주세요.');
            });

            that.setFilterOption({"wr_eq_n_inst_month" : false}, false);
        }
    }

    // event #1-3. 가격 이벤트 바인딩
    this.addPriceFlag = false;
    this.bindCarPriceInstallmentEvent = function(){
        if(that.addPriceFlag === false){
            var $tgId = "modalFilterPrice";
            //1. 최초1 회만 가격 정보 추가
            that.addPriceFlag = true;

            //많이 찾는 가격:가격
            var pricePopTagObj = document.querySelector("div.core.pnl_price");
            pricePopTagObj.addEventListener("click", function(evt){
                var targetObj = evt.target;
                filterFn.popularSet($(targetObj), true);
                var txt = filterFn.popularRetrunTxt($(targetObj)),
                    $tgPrice = $("button.filter_price");

                var $optionWrap = $('#'+$tgId),
                    $min = $optionWrap.find('.filter_condition .min'),
                    $max = $optionWrap.find('.filter_condition .max'),
                    gt_price = $min.data('value'),
                    lt_price = $max.data('value');

                var keyword, ecm, category, unit = "";
                if(gt_price){
                    that.POPUP_FLAG.PRICE.BEGIN = gt_price;
                    that.setFilterOption({"wr_gt_n_price" : gt_price});

                    keyword = gt_price;
                    ecm = that.etcCategoryMapper['priceMin'];
                    category = ecm.category;
                    unit = ecm.unit;
                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {}, $(targetObj));
                }else that.setFilterOption({"wr_gt_n_price" : false});

                if (lt_price){
                    that.POPUP_FLAG.PRICE.END = lt_price;
                    that.setFilterOption({"wr_lt_n_price" : lt_price});

                    keyword = lt_price;
                    ecm = that.etcCategoryMapper['priceMax'];
                    category = ecm.category;
                    unit = ecm.unit;
                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {}, $(targetObj));
                } else {
                	that.setFilterOption({"wr_lt_n_price" : false});
                }

                //$tgPrice.html(txt?$min.text() +'~'+ $max.text():'');
                $tgPrice.html($min.text().indexOf('만원') > -1 ? $min.text()+'대' : $min.text()+'만원대');
                $min.text($min.data("placeholder")).data("value","");
                $max.text($max.data("placeholder")).data("value","");
                $plugins.uiModalClose({ id:$tgId,
                    closeback:function(v){ $(targetObj).removeClass("in"); }
                });
            });

            //많이 찾는 가격:할부
            var installmentPopTagObj = document.querySelector("div.core.pnl_installment");
            installmentPopTagObj.addEventListener("click", function(evt){
                var targetObj = evt.target;
                filterFn.popularSet($(targetObj), true);
                var txt = filterFn.popularRetrunTxt($(targetObj)),
                    $tgPrice = $("button.filter_price");

                var $optionWrap = $('#'+$tgId),
                    $min = $optionWrap.find('.filter_condition .min'),
                    $max = $optionWrap.find('.filter_condition .max'),
                    gt_installment = $min.data('value'),
                    lt_installment = $max.data('value');

                var keyword, ecm, category, unit = "";
                if(gt_installment){
                    that.setFilterOption({"wr_gt_n_month_price_self" : gt_installment});

                    keyword = gt_installment;
                    ecm = that.etcCategoryMapper['instPriceMin'];
                    category = ecm.category;
                    unit = ecm.unit;
                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {}, $(targetObj));
                }else that.setFilterOption({"wr_gt_n_month_price_self" : false});

                if(lt_installment){
                    that.setFilterOption({"wr_lt_n_month_price_self" : lt_installment});

                    keyword = lt_installment;
                    ecm = that.etcCategoryMapper['instPriceMax'];
                    category = ecm.category;
                    unit = ecm.unit;
                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {}, $(targetObj));
                }else that.setFilterOption({"wr_lt_n_month_price_self" : false});

                // 36개월 Default
                var $month = $("div.value_installment").find("button:eq(2)").data("value");
                that.setFilterOption({"wr_eq_n_inst_month" : $month});

                $tgPrice.html($min.text()+'만원대, '+ $month+'개월');
                $min.text($min.data("placeholder")).data("value","");
                $max.text($max.data("placeholder")).data("value","");
                $plugins.uiModalClose({ id:$tgId,
                    closeback:function(v){ $(targetObj).removeClass("in"); }
                });
            });

            //가격/할부 옵션 선택
            var priceTabConObj = document.querySelector("div.tab_type2");
            priceTabConObj.addEventListener("click", function(evt){
                var targetObj = evt.target,
                    $idx = $(targetObj).parent().index(),
                    $tg = ['pnl_price', 'pnl_installment'];

                $('#'+$tgId+' .filter_condition').removeClass('is_installment');

                for(var i=0; i<$tg.length; i++){
                    $('.'+$tg[i]).hide();
                }
                $('.'+$tg[$idx]).show();
                if($tg[$idx] == 'pnl_installment'){
                    $('#'+$tgId+' .filter_condition').toggleClass('is_installment');
                }
                resetPrice($idx); // 탭 전환시 reset
            });

            //최소가격선택, 최대가격선택 선택
            var priceFilterConObj = document.querySelector("div.filter_condition.price");
            priceFilterConObj.addEventListener("click", function(evt){
                var targetObj = evt.target;
                
                // 최소가격, 최대가격, 개월 영역 중 개월에 대한 영역은 할부개월 버튼 영역으로의 focusing 처리로 대체한다.
                if (targetObj.id == 'valueInstallment') {
                    location.href='#installment_btn_area';
                    return;
                }
                
                if(!targetObj.readOnly) return;
                if($(targetObj).hasClass('min')) filterFn.optMin($tgId);
                else filterFn.optMax($tgId);
                //$('#valueInstallment').removeClass('in focus');
            });

            //직접입력
            var selfFilterConObj = document.querySelector("div.filter_changeform #moreCost");
            selfFilterConObj.addEventListener("click", function(evt){
                var targetObj = evt.target,
                    $bool = $(targetObj).is(":checked");
                var $idx = $("div.ui_tab_btns").find(".selected").parent().index();
                if(targetObj.nodeName != "INPUT") return;

                var valuePriceElements = $('#'+$tgId+' .filter_condition input[id^=valuePrice]');
                valuePriceElements.attr('readonly', !$bool).toggleClass('onlyNum');

                // 직접입력 클릭시에 키보드 및 블러이벤트 등록..
                if ($bool) {
                	// 숫자만 입력되도록 처리
                	valuePriceElements.css('imeMode', 'disabled').keypress(function(event) {
                		// IE 처리
                		if (event.which && (event.which < 48 || event.which > 57) && event.which != 8) {
                			if (event.preventDefault()) {
                				event.preventDefault();
                			} else {
                				event.returnValue = false;
                			}
                		}
                	}).keyup(function(event) {
                		// FF 처리
                		if ($(this).val() != null && $(this).val() != '') {
                			$(this).val($(this).val().replace(/[^0-9]/g, ''));
                		}
                	}).focusout(function() {
                		// FF 처리
                		if ($(this).val() != null && $(this).val() != '') {
                			$(this).val($(this).val().replace(/[^0-9]/g, ''));
                		}
                	});
                } else {	// 아닌 경우는 이벤트 해제..
                	valuePriceElements.off('keypress');
                	valuePriceElements.off('keyup');
                	valuePriceElements.off('focusout');
                }

                resetPrice($idx); // 탭 전환시 reset
            });

            //가격 선택
            var priceInstallMentSelectObj = document.querySelectorAll("div.filter_options.is_price_installment .type_filteropt");
            priceInstallMentSelectObj.forEach(function(item, idx){
                item.addEventListener("click", function(evt){
                    var targetObj = evt.target,
                        $this = $(targetObj);
                    var $optionWrap = $('#'+$tgId),
                        $min = $optionWrap.find('.filter_condition .min'),
                        $max = $optionWrap.find('.filter_condition .max'),
                        $installment = $optionWrap.find('.filter_condition .installment'),
                        $value = $this.data('value'),
                        $minLimit = $this.data('min'),
                        $maxLimit = $this.data('max'),
                        $unit = ($this.data('unit') == undefined) ? '' : $this.data('unit');
                    var $idx = $("div.ui_tab_btns").find(".selected").parent().index(),
                        $month = $("div.value_installment button");

                    if(_isMin){
                        // 최소
                        $value = (Number($value) > 10000 ? "10001" : $value);
                        $optionWrap.find('.filter_options.is_price_installment button').removeClass('min');
                        $this.addClass('min');
                        if($('.fake').length === 0) {
                            $min.val(' ').parent().append('<span id="minFake" class="fake" />');
                        }
                        $plugins.uiCountStep({
                            id: 'minFake',
                            value: Number($value) > 10000 ? '1억 초과' : $value,
                            comma: false,
                            callback:function(v){
                            	var txt = Number($value) > 10000 ? '1억 초과' : uiComma($value) + $unit;
                                $min.addClass('in').val(txt);
                                $('#minFake').remove();
                            }
                        });
                    }else{
                        // 최대
                    	$value = (Number($value) > 10000 ? "10001" : $value);
                        $optionWrap.find('.filter_options.is_price_installment button').removeClass('max');
                        $this.addClass('max');
                        if($('.fake').length === 0) {
                            $max.val(' ').parent().append('<span id="maxFake" class="fake" />');
                        }
                        $plugins.uiCountStep({
                            id: 'maxFake',
                            value: Number($value) > 10000 ? '6억 이하' : $value,
                            comma: false,
                            callback:function(v){
                            	var txt = Number($value) > 10000 ? '6억 이하' : uiComma($value) + $unit;
                                $max.addClass('in').val(txt);
                                $('#maxFake').remove();
                            }
                        });
                    }

                    $optionWrap.find('.popular_tag button').removeClass('in'); // 인기태그 선택 해제
                    $optionWrap.find('.filter_actions .btn_submit').attr('disabled', false); // 선택 버튼 활성화
                });
            });

            //할부개월 선택
            var installMentMonthObj = document.querySelector("div.value_installment");
            installMentMonthObj.addEventListener("click", function(evt){
                var targetObj = evt.target,
                    $this = $(targetObj);
                var $optionWrap = $('#'+$tgId),
                    $installment = $optionWrap.find('.filter_condition #valueInstallment')
                    $value = $this.data('value'),
                    $unit = ($this.data('unit') == undefined) ? '' : $this.data('unit');

                if($('.fake').length === 0) {
                    $installment.val(' ').parent().append('<span id="installFake" class="fake" />');
                }
                $plugins.uiCountStep({
                    id: 'installFake',
                    value: $value,
                    comma: false,
                    callback:function(v){
                        $installment.addClass('in').val(uiComma($value)+$unit);
                        $('#installFake').remove();
                    }
                });
            });

            //직접입력 blue and oninput Event with jquery
            $('#'+$tgId+' .filter_condition input[id^=valuePrice]').blur(function(evt){
                // 최소 ~ 최대 체크 후 교체
                var start = $('#valuePriceMin').val();
                var end = $('#valuePriceMax').val();
                if(start != "" || end != ""){
                    if(start != "" && end != "" && Number(start) > Number(end)){
                        alert('시작 값이 끝 값보다 크므로 값을 변경 합니다.');
                        $('#valuePriceMin').val(end);
                        $('#valuePriceMax').val(start);
                    }
                }
            });

            //탭 전환시 reset
            function resetPrice(idx){
                var _bool = $('#moreCost').is(':checked');

                $('#'+$tgId+' .filter_condition .min').val($('#'+$tgId+' .filter_condition .min').attr('palceholder'));
                $('#'+$tgId+' .filter_condition .min').removeClass('in focus');
                $('#'+$tgId+' .filter_condition .max').removeClass('in focus');
                $('#'+$tgId+' .filter_condition .max').val($('#'+$tgId+' .filter_condition .max').attr('palceholder'));
                $('#'+$tgId+' .filter_condition .nth_child_1 .ui_count').trigger('click'); // 최소가격 포커스
                $('#'+$tgId+' .filter_condition .installment').removeClass('in focus');
                
                var selectedMonth = $('#' + $tgId).find('.filter_options.value_installment button.in').data('value');
                $('#'+$tgId+' .filter_condition .installment').val(selectedMonth + $('#'+$tgId+' .filter_condition .installment').data('unit'));
                $('#'+$tgId+' .filter_options .type_filteropt, #'+$tgId+' .value_installment .type_filteropt').not('.instperiod').removeClass('in min max');
                
                //직접입력 체크,체크해제
                $('#'+$tgId+' .filter_options .type_filteropt').attr('disabled', _bool);
                if(idx == 0){
                    // 가격 선택시 => 할부 초기화
                    filterMobile.resetInputData(filterMobile.INPUT_FLAG.INSTALLMENT);
                }else{
                    // 할부 선택시 => 가격 초기화
                    filterMobile.resetInputData(filterMobile.INPUT_FLAG.PRICE);
                }
            }
        }
    };

    // event #2. 주행거리 이벤트 바인딩
    this.addMileageFlag = false;
    this.bindCarMileageEvent = function(){

        if(that.addMileageFlag === false){
            var $tgId = "modalFilterMileage";
            //1. 최초1 회만 주행거리 정보 추가
            that.addMileageFlag = true;

            //많이 찾는 주행거리
            var mileagePopTagObj = document.querySelector("div.core.popular_mileage");
            mileagePopTagObj.addEventListener("click", function(evt){
                var targetObj = evt.target;
                filterFn.popularSet($(targetObj), true);
                var txt = filterFn.popularRetrunTxt($(targetObj)),
                    $tgMileage = $("button.filter_mileage");

                var $optionWrap = $('#'+$tgId),
                    $min = $optionWrap.find('.filter_condition .min'),
                    $max = $optionWrap.find('.filter_condition .max'),
                    gt_mileage = $min.data('value'),
                    lt_mileage = $max.data('value');

                var keyword, ecm, category, unit = "";
                if(gt_mileage){
                    that.POPUP_FLAG.MILEAGE.BEGIN = gt_mileage;
                    that.setFilterOption({"wr_gt_n_mileage" : gt_mileage});

                    keyword = gt_mileage;
                    ecm = that.etcCategoryMapper['mileageMin'];
                    category = ecm.category;
                    unit = ecm.unit;
                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {}, $(targetObj), 'min');
                }else that.setFilterOption({"wr_gt_n_mileage" : false});

                if(lt_mileage){
                    that.POPUP_FLAG.MILEAGE.END = lt_mileage;
                    that.setFilterOption({"wr_lt_n_mileage" : lt_mileage});

                    keyword = lt_mileage;
                    ecm = that.etcCategoryMapper['mileageMax'];
                    category = ecm.category;
                    unit = ecm.unit;
                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {}, $(targetObj), 'max');
                }else that.setFilterOption({"wr_lt_n_mileage" : false});

                //$tgMileage.html(txt?$min.text() +'~'+ $max.text():'');
                $tgMileage.html($min.text()+'대');
                $min.text($min.data("placeholder")).data("value","");
                $max.text($max.data("placeholder")).data("value","");
                $plugins.uiModalClose({ id:$tgId,
                    closeback:function(v){ $(targetObj).removeClass("in"); }
                });
            });

            //최소주행거리선택, 최대주행거리선택 선택
            var mileageFilterConObj = document.querySelector("div.filter_condition.mileage");
            mileageFilterConObj.addEventListener("click", function(evt){
                var targetObj = evt.target;
                if($(targetObj).hasClass('min')) filterFn.optMin($tgId);
                else filterFn.optMax($tgId);
            });

            //주행거리 선택
            var mileageSelectObj = document.querySelector("div.filter_options.is_mileage");
            mileageSelectObj.addEventListener("click", function(evt){
                var targetObj = evt.target,
                    $this = $(targetObj);
                var $optionWrap = $('#'+$tgId),
                    $min = $optionWrap.find('.filter_condition .min'),
                    $max = $optionWrap.find('.filter_condition .max'),
                    $value = $this.data('value'),
                    $unit = ($this.data('unit') == undefined) ? '' : $this.data('unit');

                if(_isMin){
                    // 최소
                    $optionWrap.find('.filter_options.is_mileage button').removeClass('min');
                    $this.addClass('min');
                    filterFn.drawValue(valueMileageMin, $value, $unit, true);
                }else{
                    // 최대
                    $optionWrap.find('.filter_options.is_mileage button').removeClass('max');
                    $this.addClass('max');
                    filterFn.drawValue(valueMileageMax, $value, $unit, true);
                }

                $optionWrap.find('.popular_tag button').removeClass('in'); // 인기태그 선택 해제
                $optionWrap.find('.filter_actions .btn_submit').attr('disabled', false); // 선택 버튼 활성화
            });
        }
    };

    // event #3. 연식 정보 설정
    this.addYearFlag = false;
    this.bindCarYearEvent = function(){
        if(that.addYearFlag === false){
            var $tgId = "modalFilterYear";
            //1. 최초1 회만 연식 정보 추가
            that.addYearFlag = true;

            //많이 찾는 연식
            var yearPopTagObj = document.querySelector("div.core.popular_year");
            yearPopTagObj.addEventListener("click", function(evt){
                var targetObj = evt.target;
                filterFn.popularSet($(targetObj));
                var txt = filterFn.popularRetrunTxt($(targetObj)),
                    $tgYear = $("button.filter_year");

                //wr_gt_v_mfr_date = 시작연식
                //wr_lt_v_mfr_date = 끝연식
                var $optionWrap = $('#'+$tgId),
                    $min = $optionWrap.find('.filter_condition .min'),
                    $max = $optionWrap.find('.filter_condition .max'),
                    gt_date = $min.data('value') + "",
                    lt_date = $max.data('value') + "";

                var keyword, ecm, category, unit = "";
                if(gt_date){
                    that.POPUP_FLAG.YEAR.BEGIN = gt_date;
                    that.setFilterOption({"wr_gt_v_mfr_date" : gt_date});

                    keyword = gt_date;
                    ecm = that.etcCategoryMapper['yearBefore'];
                    category = ecm.category;
                    unit = ecm.unit;
                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {});
                }else that.setFilterOption({"wr_gt_v_mfr_date" : false});

                if(lt_date){
                    that.POPUP_FLAG.YEAR.END = lt_date;
                    that.setFilterOption({"wr_lt_v_mfr_date" : lt_date});

                    keyword = lt_date;
                    ecm = that.etcCategoryMapper['yearAfter'];
                    category = ecm.category;
                    unit = ecm.unit;
                    //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword + unit, function(data) {});
                }else that.setFilterOption({"wr_lt_v_mfr_date" : false});

                //$tgYear.html(txt?$min.text() +'~'+ $max.text():'');
                $tgYear.html($min.data('value')+'연식');
                $min.text($min.data("placeholder")).data("value","");
                $max.text($max.data("placeholder")).data("value","");
                $plugins.uiModalClose({ id:$tgId,
                    closeback:function(v){ $(targetObj).removeClass("in"); }
                });
            });

            //최소연식, 최대연식 선택
            var yearFilterConObj = document.querySelector("div.filter_condition.year");
            yearFilterConObj.addEventListener("click", function(evt){
                var targetObj = evt.target;
                if($(targetObj).hasClass('min')) filterFn.optMin($tgId);
                else filterFn.optMax($tgId);
            });

            //연식 선택 filter_normal
            var yearSelectObj = document.querySelector("div.filter_options.is_year");
            yearSelectObj.addEventListener("click", function(evt){
                var targetObj = evt.target,
                    $this = $(targetObj);
                var $optionWrap = $('#'+$tgId),
                    $min = $optionWrap.find('.filter_condition .min'),
                    $max = $optionWrap.find('.filter_condition .max'),
                    $value = $this.data('value'),
                    $unit = ($this.data('unit') == undefined) ? '' : $this.data('unit');

                if(_isMin){
                    // 최소
                    $optionWrap.find('.filter_options.is_year button').removeClass('min');
                    $this.addClass('min');
                    filterFn.drawValue(valueYearMin, $value, $unit);
                }else{
                    // 최대
                    $optionWrap.find('.filter_options.is_year button').removeClass('max');
                    $this.addClass('max');
                    filterFn.drawValue(valueYearMax, $value, $unit);
                }

                $optionWrap.find('.popular_tag button').removeClass('in'); // 인기태그 선택 해제
                $optionWrap.find('.filter_actions .btn_submit').attr('disabled', false); // 선택 버튼 활성화
            });
        }
    };

    // event #4. 색상 이벤트 바인딩
    this.addColorFlag = false;
    this.bindCarColorEvent = function(){
        var colorLiTemplate = "<li>"
                            + 	"<div class=\"check_wrap\">"
                            + 		"<input type=\"checkbox\" name=\"carColor\" id=\"{colorID}\" class=\"uniform colorUniform\" data-color={colorSubCode} value=\"{colorSubCode}_{colorKorName}\" {checked}>"
                            + 		"<label for=\"{colorID}\">"
                            + 			"<span class=\"color\"><img src=\"/resources/images/mobile/buy/car_color_{no}.png\" alt=\"{colorKorName}\"></span>"
                            + 			"<span class=\"name\">{colorKorName}</span>"
                            + 		"</label>"
                            + 	"</div>"
                            + "</li>";

        var $container;

        //#1. 밖에서 선택된 색상 정보 가져오기
        var initColorOnBtnArray = that.getFilterOption("wr_in_v_exterior_colorcd");

        if((initColorOnBtnArray && initColorOnBtnArray.length >0) || that.addColorFlag === false){
            $container = document.querySelector("div#divCarColor");

            //#1-1. 최초 1회만 색상 정보 추가
            that.addColorFlag = true;

            var innerHTML = "<ul class=\"row_list color_popup_list\">";
            that.getCmSubCodeListWithMstCode("CAR_COLOR", function(result){
                $(result.data).each(function(colorIdx, colorInfo){
                    colorIdx++;
                    var no = (colorIdx < 10) ? "0"+colorIdx : ""+colorIdx;
                    innerHTML += colorLiTemplate.replace(/{colorID}/gi, "carColor" + no)
                                   .replace(/{colorSubCode}/gi, colorInfo.v_sub_code)
                                   .replace(/{colorKorName}/gi, colorInfo.v_sub_codenm)
                                   .replace("{checked}", that.getArrayIndexWithIncludeStatus(initColorOnBtnArray, colorInfo.v_sub_code).isExist ? "checked" : "")
                                   .replace(/{no}/gi, no);
                });
                innerHTML += "</ul>";
                $container.innerHTML = innerHTML;

                // '기타'에 대한 이미지 태그 제거
                $('.color_popup_list').children().filter(function(i, v) {
                    var id = $(v).find('input').attr('id');
                    if(id === 'carColor31') {
                        return $('#'+id);
                    }
                }).find('img').remove();
            });
        }
    };

    // event #5. 연료 이벤트 바인딩
    this.addFuelFlag = false;
    this.bindCarFuelEvent = function(){
        var fuelLiTemplate = "<li>"
                            + 	"<div class=\"check_wrap\">"
                            + 		"<input type=\"checkbox\" name=\"fuelList\" id=\"{fuelID}\" class=\"uniform fuelUniform\" data-fuel={fuelSubCode} value=\"{fuelSubCode}_{fuelKorName}\" {checked}>"
                            + 		"<label for=\"{fuelID}\">{fuelKorName}</label>"
                            + 	"</div>"
                            + "</li>";

        var $container;

        //#1. 밖에서 선택된 연료 정보 가져오기
        var initColorOnBtnArray = that.getFilterOption("wr_in_v_fuel_typecd");

        if((initColorOnBtnArray && initColorOnBtnArray.length >0) || that.addFuelFlag === false){
            $container = document.querySelector("div#divCarFuel");

            //#1-1. 최초 1회만 연료 정보 추가
            that.addFuelFlag = true;

            var innerHTML = "<ul class=\"row_list fuel_popup_list\">";
            that.getCmSubCodeListWithMstCode("CAR_FUEL", function(result){
                $(result.data).each(function(fuelIdx, fuelInfo){
                    fuelIdx++;
                    var no = (fuelIdx < 10) ? "0"+fuelIdx : ""+fuelIdx;
                    innerHTML += fuelLiTemplate.replace(/{fuelID}/gi, "carFuel" + no)
                                   .replace(/{fuelSubCode}/gi, fuelInfo.v_sub_code)
                                   .replace(/{fuelKorName}/gi, fuelInfo.v_sub_codenm)
                                   .replace("{checked}", that.getArrayIndexWithIncludeStatus(initColorOnBtnArray, fuelInfo.v_sub_code).isExist ? "checked" : "")
                                   .replace(/{no}/gi, no);
                });
                innerHTML += "</ul>";
                $container.innerHTML = innerHTML;
            });
        }
    };

    // event #6. 미션 이벤트 바인딩
    this.bindCarTransEvent = function(){
        /*
        var transUlObj = document.querySelector("ul.trans");

        transUlObj.addEventListener("click", function(evt){
            var targetObj = evt.target;
            var chosenTran = targetObj.dataset.trans;
            if(!chosenTran) return;

            var $container;

            //색상 정보  on/off
            if(targetObj.classList.contains("on")){
                targetObj.classList.remove("on");
                that.setFilterOption({"wr_in_v_transmissioncd" : that.getAllSelectedArrWithProperty(false, "wr_in_v_transmissioncd", targetObj.dataset.trans)});
            }else{
                targetObj.classList.add("on");
                that.setFilterOption({"wr_in_v_transmissioncd" : that.getAllSelectedArrWithProperty(true, "wr_in_v_transmissioncd", targetObj.dataset.trans)});
            }
        });
        */
    };

    // event #7. 옵션 이벤트 바인딩
    this.addOptionFlag = false;
    this.bindCarOptionEvent = function(){
        var optionLiTemplate ="<span class=\"check_wrap\">"
                             + 	"<input type=\"checkbox\" name=\"opDetail\" id=\"{optionID}\" class=\"uniform optionUniform\" data-option={optionSubCode} value=\"{optionSubCode}_{optionKorName}\" {checked}>"
                             + 	"<label for=\"{optionID}\">{optionKorName}</label>"
                             + "</span>";

        var $container;

        //#1. 밖에서 선택된 옵션 정보 가져오기
        var initOptionOnBtnArray = that.getFilterOption("wr_in_v_optioncd");

        if((initOptionOnBtnArray && initOptionOnBtnArray.length >0) || that.addOptionFlag === false){
            $container = document.querySelector("div#divCarOption");

            //#1-1. 최초 1회만 옵션 정보 추가
            that.addOptionFlag = true;

            var innerHTML = "<div class=\"ui_acco acco_type2 filter_opts option_setList\" role=\"group\">";
            //옵션 각 카테고리 별 제목 설정
            var innerExtHTML = "<div class=\"ui_acco_wrap\"><h2 class=\"ui_acco_tit\"><button type=\"button\" class=\"ui_acco_btn\">{spanTitle}<span class=\"ui_acco_arrow\">열기</span></button></h2><div class=\"ui_acco_pnl\">"; //외장
            var innerIntHTML = innerExtHTML.replace("{spanTitle}", "내장"); //내장
            var innerSafHTML = innerExtHTML.replace("{spanTitle}", "안전"); //안전
            var innerCovHTML = innerExtHTML.replace("{spanTitle}", "편의"); //편의
            innerExtHTML = innerExtHTML.replace("{spanTitle}", "외장");

            //각 옵션 탭 별 Index 설정 (init = 1)
            var optionExtIndex = 1;
            var optionIntIndex = 1;
            var optionSafIndex = 1;
            var optionCovIndex = 1;

            //#1-2. option Code 정보 가져오기
            function getOptionTemplateHtml(optInfo, optionDetailID){
                if(!optInfo || !optionDetailID) return "";
                return optionLiTemplate.replace(/{optionID}/gi, optionDetailID)
                                       .replace(/{optionSubCode}/gi, optInfo.v_sub_code)
                                       .replace(/{optionKorName}/gi, optInfo.v_sub_codenm)
                                       .replace("{checked}", that.getArrayIndexWithIncludeStatus(initOptionOnBtnArray, optInfo.v_sub_code).isExist ? "checked" : "");
            }
            that.getCmSubCodeListWithMstCode("CAR_OPTION", function(result){
                $(result.data).each(function(optIdx, optInfo){
                    var optionDetailID = "";
                    if(optInfo.v_buffer1 === '외관'){
                        optionDetailID = "op1_detail" + optionExtIndex++;
                        innerExtHTML += getOptionTemplateHtml(optInfo, optionDetailID);
                    }else if(optInfo.v_buffer1 === '내장'){
                        optionDetailID = "op2_detail" + optionIntIndex++;
                        innerIntHTML += getOptionTemplateHtml(optInfo, optionDetailID);
                    }else if(optInfo.v_buffer1 === '안전'){
                        optionDetailID = "op3_detail" + optionSafIndex++;
                        innerSafHTML += getOptionTemplateHtml(optInfo, optionDetailID);
                    }else{ //편의
                        optionDetailID = "op4_detail" + optionCovIndex++;
                        innerCovHTML += getOptionTemplateHtml(optInfo, optionDetailID);
                    }
                });
                innerExtHTML += "</div></div>";
                innerIntHTML += "</div></div>";
                innerSafHTML += "</div></div>";
                innerCovHTML += "</div></div>";

                //외장, 내장, 안전, 편의 순으로 설정
                innerHTML += innerExtHTML;
                innerHTML += innerIntHTML;
                innerHTML += innerSafHTML;
                innerHTML += innerCovHTML;
                innerHTML += "</div>";

                $container.innerHTML = innerHTML;
            });
        }
    };

    // event #8. 사고여부 이벤트 바인딩
    this.bindCarRecEvent = function(){
        /*
        var recUlObj = document.querySelector("ul.rec_comment");

        recUlObj.addEventListener("click", function(evt){
            var targetObj = evt.target;
            var chosenRec = targetObj.dataset.rec;
            if(!chosenRec) return;

            var $container;

            //색상 정보  on/off
            if(targetObj.classList.contains("on")){
                targetObj.classList.remove("on");
                that.setFilterOption({"wr_in_v_rec_comment_cd" : that.getAllSelectedArrWithProperty(false, "wr_in_v_rec_comment_cd", targetObj.dataset.rec)});
            }else{
                targetObj.classList.add("on");
                that.setFilterOption({"wr_in_v_rec_comment_cd" : that.getAllSelectedArrWithProperty(true, "wr_in_v_rec_comment_cd", targetObj.dataset.rec)});

                var category = that.etcCategoryMapper['wr_in_v_rec_comment_cd'].category;
                var keyword  = $(targetObj).text();
                apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword, function(data) {});
            }
        });
        */
    };

    // event #9. 인승 이벤트 바인딩
    this.addSeaterFlag = false;
    this.bindCarSeaterEvent = function(){
        if(that.addSeaterFlag){
            //#1. 기존 설정된 값이 있을 경우, 해당 필터 옵션 설정
            var initSeaterOnBtnArray = $.isEmptyObject(that.getFilterOption("wr_in_n_pass_cnt")) ? [] : that.getFilterOption("wr_in_n_pass_cnt");
            initSeaterOnBtnArray = (typeof initSeaterOnBtnArray === 'string') ? initSeaterOnBtnArray.split('|') : initSeaterOnBtnArray;

            var minPassCnt = that.getFilterOption("wr_gt_n_pass_cnt");
            var maxPassCnt = that.getFilterOption("wr_lt_n_pass_cnt");
            //#1-1. Filter Option 값에 따른 체크박스 설정
            if(!$.isEmptyObject(initSeaterOnBtnArray)){
                var seaterElements = Array.from(document.querySelectorAll("input[name=seater]"));
                initSeaterOnBtnArray.forEach(function(code, idx){
                    seaterElements.some(function(ele, eleIdx){
                        if(ele.dataset.seater == code){
                            //ele.parentElement.classList.add("checked");
                            ele.checked = true;
                            return true;
                        }
                    })
                });
            }else{
                //#2-2. Filter Option 값에 따른 최소인승, 최대인승 설정
                if(minPassCnt){
                    document.getElementById("directIp01").value = minPassCnt;
                }
                if(maxPassCnt){
                    document.getElementById("directIp02").value = maxPassCnt;
                }
            }
            //End

            //#2 더보기 내 색상 click 이벤트
            var innerSeaterUlObj = document.querySelector("ul.seater_popup_list");
            innerSeaterUlObj.addEventListener("click", function(evt){
                if(!evt.target.dataset.seater) return;
                evt.stopPropagation();

                //직접 입력 seater info remove (with SEATER_DIRECT)
                that.resetInputData(that.INPUT_FLAG.SEATER_DIRECT);
            });

            //#3 인승 직접입력 blue and oninput Event with jquery
            $("input[name='directIp']").blur(function(evt){
                diffSeater();
                //setSeaterOption();
                //that.drawSelectedSeaterInfo(false);
            }).on("input", function(evt){
                maxLengthCheck(this);
            }).click(function(evt){
                var checkedElements =  $("ul.seater_popup_list :checked");
                if(checkedElements.length > 0){
                    //선택 입력 seater info remove (with SEATER)
                    that.resetInputData(that.INPUT_FLAG.SEATER);
                }
            });
        }
        that.addSeaterFlag = true;

        //인승 최대 입력 자릿수 체크
        function maxLengthCheck(object){
            if (object.value.length > object.maxLength){
                object.value = object.value.slice(0, object.maxLength);
            }
        }
        //if 최소  > 최대 then 최소 인승 <-> 최대인승
        function diffSeater(){
            var start = $("#directIp01").val();
            var end = $("#directIp02").val();
            if(start != "" && end != "" && Number(start) > Number(end)){
                alert('시작 값이 끝 값보다 크므로 값을 변경 합니다.');
                $("#directIp01").val(end);
                $("#directIp02").val(start);
            }
        }
        //직접입력 값 설정
        function setSeaterOption(){
            var start = $("#directIp01").val();
            var end = $("#directIp02").val();

            if(start) that.setFilterOption({"wr_gt_n_pass_cnt" : that.getAllSelectedArrWithProperty(true, "wr_gt_n_pass_cnt", start)});
            if(end) that.setFilterOption({"wr_lt_n_pass_cnt" : that.getAllSelectedArrWithProperty(true, "wr_lt_n_pass_cnt", end)});
        }
    };

    //combined in bindCarSeaterEvent
    this.drawSelectedSeaterInfo = function(drawFlag){
    	//var seaterUlObj = document.querySelector("div.seaterDate");
        var seaterUlObj = document.querySelector("button.inp_filter_seater");
        var innerHtml = "";
        //선택 입력
        if(drawFlag === true){
        	var passCntOption = that.getFilterOption("wr_in_n_pass_cnt");
        	if (typeof passCntOption === 'string') {
        		passCntOption = passCntOption.split('|');
        	}

            var selectedSeaterArr = passCntOption.sort(function(a, b) { return Number(a) - Number(b); });

            if($.isEmptyObject(selectedSeaterArr)){
                innerHtml = "선택";
            } else {
                selectedSeaterArr.forEach(function(info, idx){
                    idx++;
                    innerHtml += info + "인승" + (selectedSeaterArr.length !== idx ? "," : "");
                });

                if (! $(seaterUlObj).hasClass('in')) {
            		$(seaterUlObj).addClass('in');
            	}
            }
        } else {
            //직접 입력
            var start = that.getFilterOption("wr_gt_n_pass_cnt");
            var end = that.getFilterOption("wr_lt_n_pass_cnt");

            if (start && end){
                innerHtml = "{startSeater} ~ {endSeater} 인승 이하";
                innerHtml = innerHtml.replace("{startSeater}", start)
                                     .replace("{endSeater}", end);
            } else if (start && !end){
                innerHtml = "{startSeater}인승 이상";
                innerHtml = innerHtml.replace("{startSeater}", start);
            } else if (!start && end){
                innerHtml = "~ {endSeater}인승 이하";
                innerHtml = innerHtml.replace("{endSeater}", end);
            } else{
                innerHtml = "인승 정보를 선택해 주세요.";
            }

            if (start || end) {
            	if (! $(seaterUlObj).hasClass('in')) {
            		$(seaterUlObj).addClass('in');
            	}
            }
        }
        seaterUlObj.innerHTML = innerHtml;
    };

    // event #10. 지점 이벤트 바인딩
    this.addAreaFlag = false;
    this.bindCarAreaEvent = function(){
        var $container;

        //code와 name mapping Object
        var areaMappingObj = {};

        var multiValues = filterMobile.getRealFilterOption('wr_in_multi_values') || $('#wr_in_multi_values').val();
        multiValues = ($.isArray(multiValues) && multiValues.join('|')) || multiValues;

        if (!$.isEmptyObject(multiValues)) {
        	var centerReions = $.unique(multiValues.split('|').map(function(item, idx) { return item.split(',')[0]; }));
        	!$.isEmptyObject(centerReions) ? filterMobile.setFilterOption({'wr_in_v_center_region_code' : centerReions})
        				 				   : filterMobile.setFilterOption({'wr_in_v_center_region_code' : false});

        	var centerCodes = multiValues.split('|').map(function(item, idx) { return item.split(',')[1] + "|" + item.split(',')[0]; });
        	!$.isEmptyObject(centerCodes) ? filterMobile.setFilterOption({'wr_in_v_center_code' : centerCodes})
    									  : filterMobile.setFilterOption({'wr_in_v_center_code' : false});
        }

        var initRegionCodeArray = that.getFilterOption("wr_in_v_center_region_code");
        var initCenterCodeArray	= that.getFilterOption("wr_in_v_center_code");

        var regionCheckFlag = false;
        var centerCheckFlag = false;
        if(initCenterCodeArray && initCenterCodeArray.length > 0){
            centerCheckFlag = true;
        }

        if(initRegionCodeArray && initRegionCodeArray.length > 0){
            regionCheckFlag = true;
        }

        if(that.addAreaFlag && (!centerCheckFlag && !regionCheckFlag))
            $('.type_filter input[type=checkbox]:checked').prop("checked",false);
        if((centerCheckFlag || regionCheckFlag) || that.addAreaFlag === false){
            $container = document.querySelector("div#divCarArea");

            //#1-1. 최초 1회만 지역 정보 추가
            that.addAreaFlag = true;

            //#1-2. 지역 Tempalate
            var outerRegionHTML = "<div class=\"ui_acco type_filter\" role=\"group\">{innerHTML}</div>";
            var innerRegionHTML = "<div class=\"ui_acco_wrap\">"
                                + 	"<h2 class=\"ui_acco_tit\">"
                                + 		"<div class=\"check_wrap check_ip\">"
                                + 			"<input type=\"checkbox\" name=\"province\" id=\"province{no}\" value=\"{areaSubCode}_{areaKorName}\" "
                                + 				"class=\"js_checkall\" data-group=\"{areaSubCode}\" {checked}>"
                                + 			"<label for=\"province{no}\">{areaKorName}</label>"
                                + 			"<span class=\"count\">({area_cnt})</span>"
                                + 		"</div>"
                                + 		"<button type=\"button\" class=\"ui_acco_btn\"><span class=\"ui_acco_arrow\">열기</span></button>"
                                + 	"</h2>"
                                + 	"{centerList}"
                                + "</div>";
            var tempRegionHTML = "";

            //#1-3. 센터 Tempalate
            var outerCenterHTML = "<div class=\"ui_acco_pnl\"><div class=\"col_2\">{innerHTML}</div></div>";
            var innerCenterHTML = "<span class=\"check_wrap\">"
                                + 	"<input type=\"checkbox\" name=\"branch\" id=\"pr1_branch_{centerCode}\" "
                                + 		"class=\"uniform centerUniform smallCate_ip area_checkIp\" data-center=\"{centerCode}\" data-region=\"{regionCode}\" "
                                + 		"value=\"{centerCode}_{centerName}\" data-group=\"{regionCode}\" {checked}>"
                                + 	"<label for=\"pr1_branch_{centerCode}\">{centerName}</label>"
                                + "</span>";

            that.getRegionAndCenterList(function(result){
                //draw view with template and json return value
                $(result.REGION_LIST).each(function(regionIdx, regionInfo){
                    //모든 지역과 센터 정보 object mapping
                    areaMappingObj[regionInfo.v_sub_code] = {
                        "REGION" : regionInfo.v_sub_codenm,
                        "CENTER" : []
                    };
                    //center 정보 설정
                    var tempCenterHTML = "";
                    $(result.CENTER_LIST).each(function(centerIdx, centerInfo){
                        if(centerInfo.v_center_region !== regionInfo.v_sub_code) return;
                        var innerChecked = "";
                        if(centerCheckFlag){
                        	try {
                        		initCenterCodeArray.some(function(code, idx){
                                    var codeArr = code.split("|");
                                    if(codeArr[1] == regionInfo.v_sub_code && codeArr[0] == centerInfo.v_center_code){
                                        innerChecked = "checked";
                                        return true;
                                    }
                                });
                        	} catch (e) {}
                            
                        }
                        tempCenterHTML += innerCenterHTML.replace(/{centerCode}/gi, centerInfo.v_center_code)
                                                         .replace(/{centerName}/gi, centerInfo.v_center_name)
                                                         .replace(/{regionCode}/gi, regionInfo.v_sub_code)
                                                         .replace("{checked}", innerChecked);

                        areaMappingObj[regionInfo.v_sub_code]["CENTER"].push(centerInfo.v_center_name + "|" + centerInfo.v_center_code);
                    });

                    var outerChecked = "";
                    if(regionCheckFlag){
                        initRegionCodeArray.some(function(code, idx){
                            if(code == regionInfo.v_sub_code){
                                outerChecked = "checked";
                                return true;
                            }
                        });
                    }

                    regionIdx++;
                    tempRegionHTML += innerRegionHTML.replace(/{no}/gi, regionIdx)
                                                     .replace(/{areaSubCode}/gi, regionInfo.v_sub_code)
                                                     .replace(/{areaKorName}/gi, regionInfo.v_sub_codenm)
                                                     .replace("{area_cnt}", regionInfo.n_count)
                                                     .replace("{centerList}", outerCenterHTML.replace("{innerHTML}" , tempCenterHTML))
                                                     .replace("{checked}", outerChecked);
                });
                that.setAreaMappingObject(areaMappingObj);

                outerRegionHTML = outerRegionHTML.replace("{innerHTML}", tempRegionHTML);

                $container.innerHTML = outerRegionHTML;

                //지역 선택시 toggle 이벤트 Start
                var $regionMenu = $('.region_menu');

                $.each($regionMenu,function(i){
                    var $el = $regionMenu.eq(i);
                    var $largeMenu = $el.find('input[type="checkbox"]');
                    var $branch = $el.siblings('.branch_gater');
                    var $btn = $el.find('.toggle_btn');
                    if($largeMenu.is(":checked")){
                        $branch.show();
                        $btn.addClass('on');
                        $.uniform.update();
                    }
                    $largeMenu.on('change',function(){
                        var $tg = $(this);
                        var regionCode = $tg.val().split("_")[0];
                        if($tg.prop('checked')){
                            $branch.show();
                            $btn.addClass('on');
                            $.uniform.update();
                            that.setFilterOption({"wr_in_v_center_region_code" : that.getAllSelectedArrWithProperty(true, "wr_in_v_center_region_code", regionCode)});

                            var category = that.etcCategoryMapper['wr_in_v_center_region_code'].category;
                            var keyword  = $(this).closest('div.check_wrap').find('label').text();
                            keyword = keyword.substring(0, keyword.indexOf('('));

                            //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword, function(data) {});
                        } else {
                            $branch.hide();
                            $btn.removeClass('on');
                            $branch.find('input[type="checkbox"]').prop('checked',false);
                            $.uniform.update();
                            that.setFilterOption({"wr_in_v_center_region_code" : that.getAllSelectedArrWithProperty(false, "wr_in_v_center_region_code", regionCode)});
                            deleteCenterCodeWithRegion(regionCode)
                        }
                        //지역 선택에 따른 지역/지점 Text 설정
                        that.drawSelectedCenterInfo(areaMappingObj);
                    });
                });
                //지역 선택시 toggle 이벤트 End

                //#2. 더보기 내 지점/센터 click 이벤트
                var innerBranchUlObj = document.querySelectorAll("ul.branch_gater");
                innerBranchUlObj.forEach(function(info, idx){
                    info.addEventListener('click', function(evt) {
                        if(!evt.target.dataset.center) return;
                        evt.stopPropagation();

                        var innerTargetCenterCodeWithRegion = evt.target.dataset.center + "|" + evt.target.dataset.region;
                        //#2-1. 최종 선택 된 값
                        if(evt.target.checked){
                            that.setFilterOption({"wr_in_v_center_code" : that.getAllSelectedArrWithProperty(true, "wr_in_v_center_code", innerTargetCenterCodeWithRegion)});

                            var category = that.etcCategoryMapper['wr_in_v_center_code'].category;
                            var keyword  = $(evt.target).closest('li').find('label').text();

                            //apiEvent.collectCustomLog('kcar@'+category+'+guest$|첫검색||정확도순^'+ keyword, function(data) {});
                        }else{
                            that.setFilterOption({"wr_in_v_center_code" : that.getAllSelectedArrWithProperty(false, "wr_in_v_center_code", innerTargetCenterCodeWithRegion)});
                        }

                        //센턴 선택에 따른 지역/지점 Text 설정
                        that.drawSelectedCenterInfo(areaMappingObj);
                    });
                });
            });
        }

        //on 상태의 지역 선택 시  off되면서 해당 지역의 모든 center filter option 값 제거
        function deleteCenterCodeWithRegion(regionCode){
            var filterName = "wr_in_v_center_code";
            var filterOption = that.getFilterOption(filterName);
            if(!filterOption) return;

            var rtnFilterOption = filterOption.filter(function(value){
                var centerInfoArr = value.split("|");
                if(centerInfoArr[1] == regionCode){
                    return false;
                }
                return true;
            });
            that.setFilterOption({"wr_in_v_center_code" : rtnFilterOption});
        }
    };

    //combined in bindCarAreaEvent
    this.setAreaMappingObject = function(areaMappingObj){
        that.areaMappingObj = areaMappingObj;
    };

    this.isObjectEmpty = function(obj){
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    this.isObjectForFilter = function(obj){
        var arrFilterCategory = that.ARR_FILTER_CATEGORY;
        for(var key in obj) {
            for (var i = 0; i < arrFilterCategory.length; i++) {
                if (arrFilterCategory[i] == key) {
                    if(obj.hasOwnProperty(key))
                        return false;
                }
            }
        }
        return true;
    };

    this.cloneObject = function(obj){
        if (obj === null || typeof(obj) !== 'object')
        return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if(Array.isArray(obj[attr])){
                    copy[attr] = obj[attr].concat();
                }else{
                    copy[attr] = obj[attr];
                }
            }
        }
        return copy;
    };

    /**
     * 필터가 최초로 activate 될 경우,
     * FILTER_REAL (이전페이지로부터 넘겨받은)의 데이터를 기준으로 필터 내 '요약' 텍스트 세팅..
     * 필터 상세 내 항목들이 button 의 집합인 경우 위 데이터를 기반으로 처리
     * 사용 대상 : 연식 ~ 가격/할부
     */
    this.drawSelectButtonArea = function(param) {
    	var minId = param.id.minId,
    		maxId = param.id.maxId;

    	var minText = param.text.minText,
    		maxText = param.text.maxText;

    	var minDataKey = param.data.minDataKey,
    		maxDataKey = param.data.maxDataKey;

    	var filterModalId  = param.modalFilterId;
    	var $targetBtn      = param.$targetBtn;

    	var unit = param.unit || '';
    	var isComma = param.isComma || false;

    	var $min = $('#'+filterModalId).find(minId);
        var $max = $('#'+filterModalId).find(maxId);

    	var minValue = filterMobile.getFilterOption(minDataKey);
    	var maxValue = filterMobile.getFilterOption(maxDataKey);

    	if (minValue && minDataKey === 'wr_gt_v_mfr_date') {
    		minValue = minValue.toString().substring(0, 4);
    	}
    	if (maxValue && maxDataKey === 'wr_lt_v_mfr_date') {
    		maxValue = maxValue.toString().substring(0, 4);
    	}

    	// 타겟의 아이디가 가격/할부의 필터 창인 경우
        if (filterModalId === 'modalFilterPrice') {
        	var instMonth = filterMobile.getFilterOption('wr_eq_n_inst_month');
        	var minMonthPrice = filterMobile.getFilterOption('wr_gt_n_month_price_self');
        	var maxMonthPrice = filterMobile.getFilterOption('wr_lt_n_month_price_self');

        	minValue = minValue || minMonthPrice;
        	maxValue = maxValue || maxMonthPrice;

        	if ((minMonthPrice || maxMonthPrice) && instMonth) {
        		var $tabs = $('#ui_tab_btns').find('button.ui_tab_btn');
        		var $pnlPriceElem = $('div.pnl_price');
        		var $pnlInstElem = $('div.pnl_installment');

        		$tabs.eq(0).removeClass('selected');
        		$tabs.eq(1).addClass('selected');

        		$('div.filter_condition.price').addClass('is_installment');

        		$('div.pnl_price').css('display', 'none');
        		$('div.pnl_installment').css('display', 'block');

        		var instMonthId = param.id.monthPriceId;
        		var $instMonth = $('#'+filterModalId).find(instMonthId);
        		$instMonth.val(instMonth + '개월');
        		$instMonth.text(instMonth + '개월');
        		
        		$('#installment_btn_area button.instperiod').removeClass('in');
        		$('#installment_btn_area button.instperiod[data-value='+instMonth+']').addClass('in');
        	}
        }

        var originMinValue = (minValue && isComma) ? filterMobile.addComma(minValue) : minValue;
        var originMaxValue = (maxValue && isComma) ? filterMobile.addComma(maxValue) : maxValue;
        var _min = ( minValue ) ? (minValue == "10001" ? "1억 초과" : originMinValue + unit) : minText.replace(/선택/ig, '');
		var _max = ( maxValue ) ? (maxValue == "60000" ? "6억 이하" : originMaxValue + unit) : maxText.replace(/선택/ig, '');

    	$min.val(_min);
    	$min.text(_min);

    	$max.val(_max);
    	$max.text(_max);
    	
    	// 선택된 데이터 lighting 처리
    	if ((minValue || maxValue) && $.isEmptyObject($targetBtn) == false) {
    		if (! $targetBtn.hasClass('in')) {
    			$targetBtn.addClass('in');
    		}
    	}
    };

    /**
     * 필터가 최초로 activate 될 경우,
     * FILTER_REAL (이전페이지로부터 넘겨받은)의 데이터를 기준으로 필터 내 '요약' 텍스트 세팅..
     * 필터 상세 내 항목들이 체크박스의 집합인 경우 위 데이터를 기준으로 checked 처리
     * 사용 대상 : 색상 ~ 지역/지점
     */
    this.drawMultiCheckboxArea = function(param) {
    	// param.code : 실제 값 (배열일수도, 구분자로 연결된 문자열일 수도 있음)
    	if(!$.isEmptyObject(param.code)){
        	var selectedItems = param.code;
            var selectedItemArr = (typeof selectedItems === "string") ? selectedItems.split("|") : selectedItems;

            var $tx = [];
            var $cnt = $.isEmptyObject(selectedItemArr) ? 0 : selectedItemArr.length;

            // 데이터 존재시, 체크박스의 체킹 작업 시작
            if ($cnt) {
            	selectedItemArr.forEach(function(itemCode, idx){
	                var $element =  param.$UlObj.find("input[data-"+param.dataKey+"='"+itemCode+"']");
	                if($element.length) $element.prop('checked', 'checked');
	                $tx.push($element.closest('.check_wrap').find(param.textTag).text());
	            });
            }
            // 선택된 데이터의 요약 텍스트 출력..
            fnSetField({ cnt:$cnt, tg:param.$target, tx:$tx });
            if (! param.$target.hasClass('in')) {
    			param.$target.addClass('in');
    		}
        }else {
        	// 전체 체크 해제..
        	param.$UlObj.find('input').prop('checked', false);
        }
    };
}
FilterMobile.prototype = new commonParam();
FilterMobile.prototype.addComma = function(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    var rtnVal = "0";
    if (num) {
    	var strNum = new String(num);
    	rtnVal = strNum.replace(regexp, ',');
    }

    return rtnVal;
}

FilterMobile.prototype.uncomma = function(num) {
    var str = String(num);
    return str.replace(/[^\d]+/g, '');
}
