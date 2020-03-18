//a la bien the hien trang thai ban dau facebook
//a=1 -> dang su dung facebook
//a=0 -> khong su dung facebook
var a = 0;
var firstTimeFacebook;
var secondTimeFacebook;
var timeStampFacebook;

//tuong tu voi instagram
var b = 0;
var firstTimeInstagram;
var secondTimeInstagram;
var timeStampInstagram;

//2 bien dai dien cho 2 vong lap
var loopTimeFacebook;
var loopQueryFacebook;

var loopTimeInstagram;
var loopQueryInstagram;

//bien trang thai cua 2 vong lap kiem tra thoi gian gioi han
//f=0 -> chua chay vong lap
//f=1 -> dang chay vong lap
var f = 0;
var i = 0;

//2 vong lap hien hop thoai khi nguoi dung qua gioi han thoi gian
var loopMaxTimeFacebook;
var loopMaxTimeInstagram;

//bien s the hien trang thai cua vong lap query facebook
//s=1 -> dang dem
//s=0 -> khong dem
var s = 0;

//trang thai vong lap instagram
var t = 0;


//cac bien thoi gian
var date;
var data;

//ham set thoi gian luc 00:00 hang ngay
function getTimeOnDate() {
    date = new Date();
    data = new Date();
    data.setDate(date.getDate());
    data.setMonth(date.getMonth());
    data.setFullYear(date.getFullYear());
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
}


//Dinh dang ten key duoc luu trong localStorage, se luu 2 bien la tong thoi gian su dung facebook va so lan truy cap
function getNameThoiGianFacebook() {
    getTimeOnDate();
    let stringThoigian = data.getTime() + "-thoigianfacebook";
    return stringThoigian;
}

function getNameSoLanFacebook() {
    getTimeOnDate();
    let stringSolan = data.getTime() + "-solanfacebook";
    return stringSolan;
}

//2 bien cua instagram
function getNameThoiGianInstagram() {
    getTimeOnDate();
    let stringThoigian = data.getTime() + "-thoigianinstagram";
    return stringThoigian;
}

function getNameSoLanInstagram() {
    getTimeOnDate();
    let stringSolan = data.getTime() + "-solaninstagram";
    return stringSolan;
}

//Moi ngay se luu lich su vao storage voi key la timestamp cua ngay do
function checkAndSaveOnStorage() {
    if (localStorage.getItem(getNameThoiGianFacebook()) == null) {
        localStorage.setItem(getNameThoiGianFacebook(), 0);
    }
    if (localStorage.getItem(getNameSoLanFacebook()) == null) {
        localStorage.setItem(getNameSoLanFacebook(), 0);
    }
    if (localStorage.getItem(getNameThoiGianInstagram()) == null) {
        localStorage.setItem(getNameThoiGianInstagram(), 0);
    }
    if (localStorage.getItem(getNameSoLanInstagram()) == null) {
        localStorage.setItem(getNameSoLanInstagram(), 0);
    }
    if (localStorage.getItem("timestampfacebook") == null) {
        localStorage.setItem("timestampfacebook", 0);
    }
    if (localStorage.getItem("timestampinstagram") == null) {
        localStorage.setItem("timestampinstagram", 0);
    }
}

//dat lai thoi gian cho lan truy cap moi va chay vong lap dem thoi gian
function setFistTimeFacebook(st) {
    if (st == 0) {
        secondTimeFacebook = 0;
        timeStampFacebook = 0;
        firstTimeFacebook = new Date();
        let number = parseInt(localStorage.getItem(getNameSoLanFacebook())) + 1;
        localStorage.setItem(getNameSoLanFacebook(), number);
        setLoopTimeFacebook();
    }
}

//tuong tu nhu tren voi instagram
function setFistTimeInstagram(st) {
    if (st == 0) {
        secondTimeInstagram = 0;
        timeStampInstagram = 0;
        firstTimeInstagram = new Date();
        let number = parseInt(localStorage.getItem(getNameSoLanInstagram())) + 1;
        localStorage.setItem(getNameSoLanInstagram(), number);
        setLoopTimeInstagram();
    }
}

//reset thoi gian sau moi lan su dung de dem so lan truy cap va clear vong lap dem thoi gian
function resetTimeFacebook() {
    firstTimeFacebook = 0;
    secondTimeFacebook = 0;
    timeStampFacebook = 0;
    clearInterval(loopTimeFacebook);
    localStorage.setItem("timestampfacebook", 0);
}

function resetTimeInstagram() {
    firstTimeInstagram = 0;
    secondTimeInstagram = 0;
    timeStampInstagram = 0;
    clearInterval(loopTimeInstagram);
    localStorage.setItem("timestampinstagram", 0);
}

//ham tinh thoi gian facebook
function getTimeFacebook() {
    if (a == 1) {
        secondTimeFacebook = new Date();
        timeStampFacebook = secondTimeFacebook - firstTimeFacebook;
        return timeStampFacebook;
    } else return 0;
}

//ham tinh thoi gian instagram
function getTimeInstagram() {
    if (b == 1) {
        secondTimeInstagram = new Date();
        timeStampInstagram = secondTimeInstagram - firstTimeInstagram;
        return timeStampInstagram;
    } else return 0;
}

//dat ham tinh thoi gian phia tren trong vong lap 1s lap 1 lan, va ghi thoi gian do vao localStorage
function setLoopTimeFacebook() {
    loopTimeFacebook = setInterval(function() {
        if (getTimeFacebook() != 0) {
            localStorage.setItem("timestampfacebook", getTimeFacebook());
            let time = localStorage.getItem(getNameThoiGianFacebook());
            time = parseFloat(time) + 1000;
            localStorage.setItem(getNameThoiGianFacebook(), time);
        };
    }, 1000);
}

function setLoopTimeInstagram() {
    loopTimeInstagram = setInterval(function() {
        if (getTimeInstagram() != 0) {
            localStorage.setItem("timestampinstagram", getTimeInstagram());
            let time = localStorage.getItem(getNameThoiGianInstagram());
            time = parseFloat(time) + 1000;
            localStorage.setItem(getNameThoiGianInstagram(), time);
        };
    }, 1000);
}

//query tat ca cac tab xem co tab nao su dung facebook khong:
//  *) neu co thi dat a=1, dat lai thoi gian ve 0 neu truoc day chua tinh thoi gian va chay vong lap dem thoi gian
//  *) neu khong co thi dat a=0
function setLoopQueryFacebook() {
    loopQueryFacebook = setInterval(function() {
        if (localStorage.getItem(getNameThoiGianFacebook()) == null) {
            resetTimeOfDay();
        } else {
            chrome.tabs.query({ 'url': "https://*.facebook.com/*" }, function(tab) {
                if (tab.length != 0) {
                    setFistTimeFacebook(a);
                    a = 1;
                } else {
                    a = 0;
                    resetTimeFacebook();
                }
            });
        }
    }, 1000);
}

function setLoopQueryInstagram() {
    loopQueryInstagram = setInterval(function() {
        if (localStorage.getItem(getNameThoiGianInstagram()) == null) {
            resetTimeOfDay();
        } else {
            chrome.tabs.query({ 'url': "https://*.instagram.com/*" }, function(tab) {
                if (tab.length != 0) {
                    setFistTimeInstagram(b);
                    b = 1;
                } else {
                    b = 0;
                    resetTimeInstagram();
                }
            });
        }
    }, 1000);
}

//ham reset lai bo dem khi trinh duyet van dang su dung qua 24:00
function resetTimeOfDay() {
    //reset lai cac gia tri ve 0
    b = 0;
    t = 0;
    firstTimeInstagram = 0;
    secondTimeInstagram = 0;
    timeStampInstagram = 0;
    clearInterval(loopTimeInstagram);
    localStorage.setItem("timestampinstagram", 0);
    clearInterval(loopQueryInstagram);

    a = 0;
    s = 0;
    firstTimeFacebook = 0;
    secondTimeFacebook = 0;
    timeStampFacebook = 0;
    clearInterval(loopTimeFacebook);
    localStorage.setItem("timestampfacebook", 0);
    clearInterval(loopQueryFacebook);

    //chay lai cac ham
    checkAndSaveOnStorage();
    setLoopQueryFacebook();
    s = 1;
    setLoopQueryInstagram();
    t = 1;
}

//ham check thoi gian su dung so voi thoi gian gioi han facebook
function checkMaxTimeFacebook() {
    setInterval(function() {
        chrome.tabs.query({ 'url': "https://*.facebook.com/*" }, function(tab) {
            if (tab.length != 0) {
                if ((localStorage.getItem("timeMax") == null) || (localStorage.getItem("timeMax") == 0)) {
                    //khong lam gi trong truong hop khong dat thoi gian gioi han
                } else {
                    let timeMax = localStorage.getItem("timeMax");
                    timeMax = timeMax - 10;
                    let totalTime = localStorage.getItem(getNameThoiGianFacebook());
                    totalTime = totalTime / 1000;
                    if (totalTime > timeMax) {
                        if (f == 0) {
                            f = 1;
                            showConfirmFacebook();
                        }
                    }
                }
            } else {
                f = 0;
                clearInterval(loopMaxTimeFacebook);
            }
        });
    }, 1000);
}

//ham hien hop thoai nguoi dung
function showConfirmFacebook() {
    loopMaxTimeFacebook = setInterval(function() {
        let cf = confirm("Bạn đã sử dụng quá thời gian giới hạn! \n" +
            "Click \"OK\" để đóng tất cả các tab đang sử dụng facebook \n" +
            "Click \"Cancel\" để tiếp tục sử dụng facebook \n" +
            "Trong trường hợp bạn click \"Cancel\", hộp thoại này sẽ liên tục hiện lên sau mỗi 10 giây! Để loại bỏ sự bất tiện này, hãy dừng sử dụng facebook, hoặc thiết lập lại giới hạn thời gian của bạn!");
        if (cf == true) {
            f = 0;
            chrome.tabs.query({ 'url': "https://*.facebook.com/*" }, function(tab) {
                let i = tab.length;
                for (j = 0; j < i; j++) {
                    chrome.tabs.remove(tab[j].id);
                }
            });
            clearInterval(loopMaxTimeFacebook);
        } else {
            f = 1;
        }
    }, 10000);
}

//ham check thoi gian su dung so voi thoi gian gioi han instagram
function checkMaxTimeInstagram() {
    setInterval(function() {
        chrome.tabs.query({ 'url': "https://*.instagram.com/*" }, function(tab) {
            if (tab.length != 0) {
                if ((localStorage.getItem("timeMax") == null) || (localStorage.getItem("timeMax") == 0)) {
                    //khong lam gi trong truong hop khong dat thoi gian gioi han
                } else {
                    let timeMax = localStorage.getItem("timeMax");
                    timeMax = timeMax - 10;
                    let totalTime = localStorage.getItem(getNameThoiGianInstagram());
                    totalTime = totalTime / 1000;
                    if (totalTime > timeMax) {
                        if (i == 0) {
                            i = 1;
                            showConfirmInstagram();
                        }
                    }
                }
            } else {
                i = 0;
                clearInterval(loopMaxTimeInstagram);
            }
        });
    }, 1000);
}

//ham hien hop thoai nguoi dung
function showConfirmInstagram() {
    loopMaxTimeInstagram = setInterval(function() {
        let cf = confirm("Bạn đã sử dụng quá thời gian giới hạn! \n" +
            "Click \"OK\" để đóng tất cả các tab đang sử dụng instagram \n" +
            "Click \"Cancel\" để tiếp tục sử dụng instagram \n" +
            "Trong trường hợp bạn click \"Cancel\", hộp thoại này sẽ liên tục hiện lên sau mỗi 10 giây! Để loại bỏ sự bất tiện này, hãy dừng sử dụng instagram, hoặc thiết lập lại giới hạn thời gian của bạn!");
        if (cf == true) {
            i = 0;
            chrome.tabs.query({ 'url': "https://*.instagram.com/*" }, function(tab) {
                let b = tab.length;
                for (j = 0; j < b; j++) {
                    chrome.tabs.remove(tab[j].id);
                }
            });
            clearInterval(loopMaxTimeInstagram);
        } else {
            i = 1;
        }
    }, 10000);
}

//khi mo trinh duyet, kiem tra xem trong localStorage da co key luu chua, neu chua co thi tao moi
checkAndSaveOnStorage();

//chay vong lap query
setLoopQueryFacebook();
s = 1;

setLoopQueryInstagram();
t = 1;

checkMaxTimeFacebook();

checkMaxTimeInstagram();

//thuc hien query moi khi co tab update trang thai:
//  *) neu co tab su dung facebook thi chay vong lap query
//  *) neu khong co thi reset thoi gian va xoa vong lap query
chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({ 'url': "https://*.facebook.com/*" }, function(tab) {
        if (tab.length != 0) {
            if (s == 0) {
                setLoopQueryFacebook();
                s = 1;
            }
        } else {
            a = 0;
            s = 0;
            resetTimeFacebook();
            clearInterval(loopQueryFacebook);
        }
    });
})

//instagram
chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({ 'url': "https://*.instagram.com/*" }, function(tab) {
        if (tab.length != 0) {
            if (t == 0) {
                setLoopQueryInstagram();
                t = 1;
            }
        } else {
            b = 0;
            t = 0;
            resetTimeInstagram();
            clearInterval(loopQueryInstagram);
        }
    });
})

//thuc hien tuong tu nhu tren, query moi khi co tab dong
chrome.tabs.onRemoved.addListener(function() {
    chrome.tabs.query({ 'url': "https://*.facebook.com/*" }, function(tab) {
        if (tab.length != 0) {
            if (s == 0) {
                setLoopQueryFacebook();
                s = 1;
            }
        } else {
            a = 0;
            s = 0;
            resetTimeFacebook();
            clearInterval(loopQueryFacebook);
        }
    });
})


//instagram
chrome.tabs.onRemoved.addListener(function() {
    chrome.tabs.query({ 'url': "https://*.instagram.com/*" }, function(tab) {
        if (tab.length != 0) {
            if (t == 0) {
                setLoopQueryInstagram();
                t = 1;
            }
        } else {
            b = 0;
            t = 0;
            resetTimeInstagram();
            clearInterval(loopQueryInstagram);
        }
    });
})