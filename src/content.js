function contains(str, phrase1, phrase2, phrase3) {
    return str.indexOf(phrase1) > -1 || str.indexOf(phrase2) > -1 || str.indexOf(phrase3) > -1;
}

function createOption(value, text) {
    var opt = document.createElement("option");
    opt.value = value;
    opt.innerText = text;
    return opt;
}

function showByStatusLabel(tr, phrase1, phrase2, phrase3) {
    var label = tr.getElementsByTagName("td")[2].innerText;
    if (!phrase1) {
        tr.style.display="";
        return;
    }
    if (contains(label, phrase1, phrase2, phrase3)) {
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
            showByStatusLabel(tr);
        }
        if (filterElm.value == "pending") {
            showByStatusLabel(tr, "申込みを受付けました。");
        }
        if (filterElm.value == "prepared") {
            showByStatusLabel(tr, "チケットをご用意いたしました。", "発券が可能になりました。", "発券の完了を確認中です。");
        }
        if (filterElm.value == "win") {
            showByStatusLabel(tr, "チケットをご用意いたしました。", "発券");
        }
    })
});

// フィルターを画面に追加
document.getElementById("login-info").appendChild(filterElm);

