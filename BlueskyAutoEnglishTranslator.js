// ==UserScript==
// @name         Blueskyの英語を自動的に翻訳
// @namespace    @lamrongol
// @version      0.1
// @description  Blueskyの英語を自動翻訳。[にがうりさんのBlueskyに翻訳ボタンを追加するスクリプト](https://greasyfork.org/ja/scripts/467069-blueskytranslatebutton)を元にしました。（日本語文字が含まれてないポストを自動で翻訳。ただし英語以外は翻訳できない）。翻訳リクエストは間隔を置いてするつもりだったが、sleep()がうまくいかない。
// @author       Laml🍞
// @match        https://bsky.app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bsky.app
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // setting
    const sourceLang = "en";
    const targetLang = "ja";

    const jaRe = /[\p{sc=Hiragana}\p{sc=Katakana}\p{sc=Han}]/u

    const postTextCSS = ".css-175oi2r > .css-175oi2r.r-1awozwy.r-18u37iz.r-1w6e6rj > .css-1rynq56";
    //const quotePostTextCSS;
    const marker = "translated";
    const base_url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=`

    const observeTarget = "#root";
    const observeOption = {
        childList: true,
        subtree: true,
    }

    async function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    let translateObserver = new MutationObserver(function (MutationRecords, MutationObserver) {
    translateObserver.disconnect();
    const elms = $(postTextCSS).not(`.${marker}`);
    for(let i = elms.length-1; i > -1; i--){
        const elem = elms[i];
        $(elem).addClass(marker);
        const originalText = elem.innerText;
        if(jaRe.test(originalText)) continue;

        const encodeText = encodeURIComponent(originalText);
        const url = base_url + encodeText;
        $.ajaxSetup({async: false});
        $.getJSON(url, function(data) {
            let text = "";
            data[0].forEach(function(element){
                text += `<p>${escapeHtml(element[0])}</p>`;
            });
            const parent = $(elem).parent();
            const translatedDiv = document.createElement("div");
            translatedDiv.classList.add("translatedText");
            parent.after(translatedDiv);

            translatedDiv.innerHTML = "<hr>"+text;
        });
        $.ajaxSetup({async: true});
        sleep(2000);//awaitを付けるとエラー これだとsleepできてないが問題なく使える？
    }

    translateObserver.observe($(observeTarget).get(0), observeOption);
    });
    translateObserver.observe($(observeTarget).get(0), observeOption);

    function escapeHtml(str) {
    var patterns = {
        '<'  : '&lt;',
        '>'  : '&gt;',
        '&'  : '&amp;',
        '"'  : '&quot;',
        '\'' : '&#x27;',
        '`'  : '&#x60;'
    };
    return str.replace(/[<>&"'`]/g, function(match) {
        return patterns[match];
    });
    };
})();