function sendLink(blobFile) {
    Kakao.Link.uploadImage({
    	file: [blobFile]
    }).then(function(res){
        console.log(res.infos.original.url)
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
              title: '너와 나의 사랑 점수',
              imageUrl: res.infos.original.url,
              link: {
                mobileWebUrl: res.infos.original.url
              },
            },
            buttons: [
                {
                  title: '나도 하러 가기',
                  link: {
                    mobileWebUrl: 'https://lovepoint.netlify.app',
                  },
                }
              ]
          })
        });
}

function blobToFile(theBlob, fileName){
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}
function dataURItoBlob(dataURI) { 
    let byteStr = atob(dataURI.split(',')[1]);
    let mimeStr = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let arrBuf = new ArrayBuffer(byteStr.length); 
    let uInt8Arr = new Uint8Array(arrBuf); 
    for (var i = 0; i < byteStr.length; i++) { 
        uInt8Arr[i] = byteStr.charCodeAt(i); 
    } 
    return new Blob([uInt8Arr], {type: mimeStr});  
}

function resultShot() {    
    $(".result-shot-display-element").hide();
    window.scrollTo( 0, 0 );
    html2canvas(document.getElementById("result-shot-div",{

    })).then(function(canvas){
        var base64image = canvas.toDataURL("image/png");
        sendLink(blobToFile(dataURItoBlob(base64image), "lovepoint_result.jpeg"));        
        $(".result-shot-display-element").show();
    });

}