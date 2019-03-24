// ==UserScript==
// @name         IHeartRadio shortcuts 2
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  IHeartRadio shortcuts: Play/Pause, Next song, Playlist relocation
// @author       Juanma Menendez
// @match        https://www.iheart.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


    document.onkeydown = function (ev) {
        ev = ev || window.event; // for IE to cover IEs window object

        //s || p || space :  play/pause
        if (ev.key === 's' || ev.key === 'p' || ev.key === ' ') {
            document.querySelector('div[data-test="mini-player-control-wrap"] button[data-test="play-button"]').click();
            return false;
        }


        //n :  next song
        if (ev.key === 'n') {
            document.querySelector('div[data-test="mini-player-control-wrap"] button[data-test="skip-button"]').click();
            return false;
        }


        //f :  relocation to focus playlist
        if (ev.key === 'f') {
            window.location.href = "https://www.iheart.com/playlist/collections/perfect-for/activities/concentration/";
            return false;
        }


        //b :  test message
        if (ev.key === 'b') {
            window.alert("https://www.iheart.com/playlist/collections/perfect-for/activities/concentration/");
            return false;
        }


    };
})();