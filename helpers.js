function XHR(URL, callback, mime, noCredentials, isDataview){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        var dv;

        if(this.readyState != 4) return;
        if(isDataview){
            dv = new DataView(this.response);
            callback(dv);
        } else {
            callback(this.responseText);
        }
    }

    if(!noCredentials)
        xmlhttp.withCredentials = true;
    if(mime)
        xmlhttp.overrideMimeType(mime);

    xmlhttp.open('GET', URL);

    if(isDataview)
        xmlhttp.responseType = "arraybuffer";

    xmlhttp.send();
}

//https://github.com/numpy/numpy/blob/master/doc/neps/npy-format.rst#format-specification-version-10
function unpackNPY(dv){
    var HEADER_LEN = dv.getUint16(8, true),
        dataLength, i;

    dataLength = dv.byteLength - 8 - HEADER_LEN;
console.log(dataLength)
    for(i=0; i<dataLength/2; i++)
        console.log(dv.getUint16(8+HEADER_LEN+2*i, true));
}