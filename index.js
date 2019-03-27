// ==UserScript==
// @name         IHeartRadio shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  IHeartRadio shortcuts: Play/Pause, Next song, Playlist relocation
// @author       Juanma Menendez
// @match        https://www.iheart.com/*
// @grant        none
// @downloadURL  https://codepen.io/juanmamenendez15/pen/rRPPJd.js
// @updateURL    https://codepen.io/juanmamenendez15/pen/rRPPJd.js
// ==/UserScript==

'use strict';

class BaseShortcut {

    constructor(keysArray, target, preventDefault = true, stopOtherHandlersChecking = true) {
        this.keysArray = keysArray;
        this.target = target;
        this.preventDefault = preventDefault;
        this.stopOtherHandlersChecking = stopOtherHandlersChecking;
    }

    action() {
        console.log('CANCELARRRR ');
    }
}


class ClickShortcut extends BaseShortcut {

    constructor(...params) {
        super(...params);
    }

    action() {
        let node = document.querySelector(this.target);

        if (node) {
            node.click();
        }
        else {
            alert('Does not exist');
        }
    }
}


class RelocationShortcut extends BaseShortcut {

    constructor(...params) {
        super(...params);
    }

    action() {
        window.location.href = this.target;
    }
}


let clickShortcutsArray = [
    new ClickShortcut(' ', 'div[data-test="mini-player-control-wrap"] button[data-test="play-button"]'),
    new ClickShortcut(['s','p'], 'div[data-test="mini-player-control-wrap"] button[data-test="play-button"]'),
    new ClickShortcut('n', 'div[data-test="mini-player-control-wrap"] button[data-test="skip-button"]'),
];

let relocationShortcutsArray = [
    new RelocationShortcut('f', 'https://www.iheart.com/playlist/collections/perfect-for/activities/concentration/'),
];


function setListeners(...shortcutsArray) {

    shortcutsArray.forEach((shortcut) => {

            document.addEventListener('keydown', function (ev) {
                ev = ev || window.event; // for IE to cover IEs window object

                if (shortcut.keysArray.includes(ev.key)) {
                    shortcut.action();
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                    return false;
                }

            });

        }
    )

}

setListeners(...clickShortcutsArray, ...relocationShortcutsArray);