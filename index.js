// ==UserScript==
// @name         IHeartRadio shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  IHeartRadio shortcuts: Play/Pause, Next song, Playlist relocation
// @author       Juanma Menendez
// @match        https://www.iheart.com/*
// @grant        none
// @downloadURL https://codepen.io/juanmamenendez15/pen/rRPPJd.js
// @updateURL https://codepen.io/juanmamenendez15/pen/rRPPJd.js
// ==/UserScript==

(function () {
    'use strict';


    document.addEventListener('keydown', function (ev) {
        ev = ev || window.event; // for IE to cover IEs window object

        //s || p || space :  play/pause
        if (ev.key === 's' || ev.key === 'p' || ev.key === ' ') {

          let playButton = document.querySelector('div[data-test="mini-player-control-wrap"] button[data-test="play-button"]');

            if (playButton){
                playButton.click();
            }
            else {
                alert('Does not existe');
            }

            ev.preventDefault();

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

        //a :  test message
        if (ev.key === 'a') {
            window.alert("Update test 5");
            return false;
        }

    });
})();