function contains(str, phrase1, phrase2, phrase3) {
    return str.indexOf(phrase1) > -1 || str.indexOf(phrase2) > -1 || str.indexOf(phrase3) > -1;
}

function createOption(value, text) {
    var opt = document.createElement("option");
    opt.value = value;
    opt.innerText = text;
    return opt;
}

function allHook(tr) {
    tr.style.display="";
}

function pendingHook(tr) {
    var label = tr.getElementsByTagName("td")[2].innerText;
    if (contains(label, "申込みを受付けました。")) {
        tr.style.display="";
    } else {
        tr.style.display="none";
    }
}

function preparedHook(tr) {
    var label = tr.getElementsByTagName("td")[2].innerText;
    if (contains(label, "チケットをご用意いたしました。", "発券の完了を確認中です。")) {
        tr.style.display="";
    } else {
        tr.style.display="none";
    }
}

function winHook(tr) {
    var label = tr.getElementsByTagName("td")[2].innerText;
    if (contains(label, "チケットをご用意いたしました。", "発券")) {
        tr.style.display="";
    } else {
        tr.style.display="none";
    }
}

// ----------- main

// フィルターの作成
var filterElm = document.createElement("select");
filterElm.appendChild(createOption("all", "全て"));
filterElm.appendChild(createOption("pending", "申し込み中"));
filterElm.appendChild(createOption("prepared", "未発券"));
filterElm.appendChild(createOption("win", "ご用意できました"));

// フィルターイベント
filterElm.addEventListener("change", function(e) {
    var rows = document.querySelectorAll("tr.win-situation,tr.win-failure");
    rows.forEach(function(tr){
        if (filterElm.value == "all") {
            allHook(tr);
        }
        if (filterElm.value == "pending") {
            pendingHook(tr);
        }
        if (filterElm.value == "prepared") {
            preparedHook(tr);
        }
        if (filterElm.value == "win") {
            winHook(tr);
        }
    })
});

// フィルターを画面に追加
document.getElementById("login-info").appendChild(filterElm);

