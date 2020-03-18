//cac bien de dinh dang ten duoc luu trong localStorage
var date = new Date();
var data = new Date();
data.setDate(date.getDate());
data.setMonth(date.getMonth());
data.setFullYear(date.getFullYear());
data.setHours(0);
data.setMinutes(0);
data.setSeconds(0);
data.setMilliseconds(0);

//Dinh dang ten key duoc luu trong localStorage
function getNameThoiGianFacebook() {
    let stringThoigian = data.getTime() + "-thoigianfacebook";
    return stringThoigian;
}

function getNameSoLanFacebook() {
    let stringSolan = data.getTime() + "-solanfacebook";
    return stringSolan;
}

function getNameThoiGianInstagram() {
    let stringThoigian = data.getTime() + "-thoigianinstagram";
    return stringThoigian;
}

function getNameSoLanInstagram() {
    let stringSolan = data.getTime() + "-solaninstagram";
    return stringSolan;
}

//set su kien nhap nut viewpage
document.getElementById("view_full_page").addEventListener("click", function() {
    chrome.tabs.create({ url: chrome.extension.getURL("fullpage.html") });
});

//ham them so 0 dang truoc neu thoi gian < 10
function formatTime(time) {
    if (parseInt(time) < 10) {
        time = "0" + time;
        return time;
    } else return time;
}

//ham tinh thoi gian
function mathTime(time) {
    let hour = Math.floor(time / 3600);
    let min = time - hour * 3600;
    min = Math.floor(min / 60);
    let sec = Math.floor(time - hour * 3600 - min * 60);
    return formatTime(hour) + ":" + formatTime(min) + ":" + formatTime(sec);
}

//vong lap de hien thi thoi gian Facebook
var loopTimeFacebook = setInterval(function() {
    if (localStorage.getItem("timestampfacebook") == 0) {
        clearInterval(loopTimeFacebook);
    }
    let momentTimeFacebook = localStorage.getItem("timestampfacebook");
    momentTimeFacebook = momentTimeFacebook / 1000;
    document.getElementById("time_facebook").innerText = mathTime(momentTimeFacebook);

    let totalTimeFacebook = localStorage.getItem(getNameThoiGianFacebook());
    totalTimeFacebook = totalTimeFacebook / 1000;
    document.getElementById("time_total_facebook").innerText = mathTime(totalTimeFacebook);

    document.getElementById("number_facebook").innerText = localStorage.getItem(getNameSoLanFacebook());
}, 1000);

//instagram
var loopTimeInstagram = setInterval(function() {
    if (localStorage.getItem("timestampinstagram") == 0) {
        clearInterval(loopTimeInstagram);
    }
    let momentTimeInstagram = localStorage.getItem("timestampinstagram");
    momentTimeInstagram = momentTimeInstagram / 1000;
    document.getElementById("time_instagram").innerText = mathTime(momentTimeInstagram);

    let totalTimeInstagram = localStorage.getItem(getNameThoiGianInstagram());
    totalTimeInstagram = totalTimeInstagram / 1000;
    document.getElementById("time_total_instagram").innerText = mathTime(totalTimeInstagram);

    document.getElementById("number_instagram").innerText = localStorage.getItem(getNameSoLanInstagram());
}, 1000);