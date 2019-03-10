function contains(str, phrases) {
    return phrases.some(function(phrase) {
        return str.indexOf(phrase) > -1;
    });
}

function createOption(value, text) {
    var opt = document.createElement("option");
    opt.value = value;
    opt.innerText = text;
    return opt;
}

function showByStatusLabel(tr, phrases) {
    var label = tr.getElementsByTagName("td")[2].innerText;
    if (phrases == null) {
        tr.style.display="";
        return;
    }
    if (contains(label, phrases)) {
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
filterElm.appendChild(createOption("ticketed", "発券済み"));
filterElm.appendChild(createOption("not-ticketed", "発券済み以外"));
filterElm.appendChild(createOption("win", "当選全て"));

// フィルターイベント
filterElm.addEventListener("change", function(e) {
    var rows = document.querySelectorAll("tr.win-situation,tr.win-failure");
    rows.forEach(function(tr){
        if (filterElm.value == "all") {
            showByStatusLabel(tr);
        }
        if (filterElm.value == "pending") {
            showByStatusLabel(tr, ["お申込みを受付ました。"]);
        }
        if (filterElm.value == "prepared") {
            showByStatusLabel(tr, ["チケットをご用意いたしました。", "発券が可能になりました。", "発券の完了を確認中です。"]);
        }
        if (filterElm.value == "ticketed") {
            showByStatusLabel(tr, ["チケットが発券されました。"]);
        }
        // pending + prepared
        if (filterElm.value == "not-ticketed") {
            showByStatusLabel(tr, ["お申込みを受付ました。", "チケットをご用意いたしました。", "発券が可能になりました。", "発券の完了を確認中です。"]);
        }
        // prepared + ticketed
        if (filterElm.value == "win") {
            showByStatusLabel(tr, ["チケットをご用意いたしました。", "発券"]);
        }
    })
});

// フィルターを画面に追加
document.getElementById("login-info").appendChild(filterElm);

