//su kien khi click nut "xem thong tin"
document.getElementById("showInformation").addEventListener("click", function() {
    let time = document.getElementById("datePicker").value;
    if (time == "") {
        document.getElementById("errorDate").style.visibility = "visible";
    } else {
        document.getElementById("errorDate").style.visibility = "hidden";
        showInformation(time);
    }
});

//su kien khi click nut "dong y"
document.getElementById("apply").addEventListener("click", function() {
    let time = document.getElementById("timePicker").value;
    if (time == "") {
        document.getElementById("errorTime").style.visibility = "visible";
    } else {
        document.getElementById("errorTime").style.visibility = "hidden";
        setMaxTime(time);
    }
});

//su kien khi click nut "bo gioi han"
document.getElementById("removeMax").addEventListener("click", function() {
    localStorage.setItem("timeMax", 0);
    document.getElementById("timeMax").innerText = "Bạn chưa thiết lập thời gian giới hạn";
});

//hien thi thoi gian gioi han khi bat dau vao trang web
if ((localStorage.getItem("timeMax") == null) || (localStorage.getItem("timeMax") == 0)) {
    document.getElementById("timeMax").innerText = "Bạn chưa thiết lập thời gian giới hạn";
} else {
    document.getElementById("timeMax").innerText = mathTime(localStorage.getItem("timeMax"));
}

//ham xu ly thiet lap gioi han thoi gian
function setMaxTime(time) {
    let maxTime = time.split(":");
    let maxTimestamp = maxTime[0] * 3600 + maxTime[1] * 60;
    localStorage.setItem("timeMax", maxTimestamp);
    document.getElementById("timeMax").innerText = mathTime(localStorage.getItem("timeMax"));
}

//ham xu ly "xem thong tin"
function showInformation(date) {
    let datetime = date.split("-");
    let time = new Date();
    time.setDate(datetime[2]);
    time.setMonth(datetime[1] - 1);
    time.setFullYear(datetime[0]);
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    let string = time.getTime();
    if ((localStorage.getItem(string + "-thoigianfacebook") == null) || (localStorage.getItem(string + "-thoigianfacebook") == 0)) {
        document.getElementById("informationFacebook").innerText = "Không có dữ liệu truy cập facebook trong ngày này";
    } else {
        let totalTimeFacebook = localStorage.getItem(string + "-thoigianfacebook");
        document.getElementById("informationFacebook").innerText = "Trong ngày này bạn đã truy cập facebook: " +
            localStorage.getItem(string + "-solanfacebook") + " lần, tổng thời gian truy cập là: " +
            mathTime(totalTimeFacebook / 1000);
    }
    if ((localStorage.getItem(string + "-thoigianinstagram") == null) || (localStorage.getItem(string + "-thoigianinstagram") == 0)) {
        document.getElementById("informationInstagram").innerText = "Không có dữ liệu truy cập instagram trong ngày này";
    } else {
        let totalTimeInstagram = localStorage.getItem(string + "-thoigianinstagram");
        document.getElementById("informationInstagram").innerText = "Trong ngày này bạn đã truy cập instagram: " +
            localStorage.getItem(string + "-solaninstagram") + " lần, tổng thời gian truy cập là: " +
            mathTime(totalTimeInstagram / 1000);
    }
}

//ham tinh thoi gian
function mathTime(time) {
    let hour = Math.floor(time / 3600);
    let min = time - hour * 3600;
    min = Math.floor(min / 60);
    let sec = Math.floor(time - hour * 3600 - min * 60);
    return formatTime(hour) + ":" + formatTime(min) + ":" + formatTime(sec);
}

//ham them so 0 dang truoc neu thoi gian < 10
function formatTime(time) {
    if (parseInt(time) < 10) {
        time = "0" + time;
        return time;
    } else return time;
}