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


(function () {

    "use strict";

    class BaseShortcutAbstract {

        //"constructor method" can be invoked for a subclass through the "super()" method but cannot be called directly "new BaseShortcutAbstract()"
        constructor(keysArray, target, skipInsideTextZones = true, stopOtherHandlersChecking = true, preventKeyDefaultAction = false) {

            //abstract Class behavior
            if (new.target === BaseShortcutAbstract) {
                throw new TypeError("Forbidden to create BaseShortcutAbstract direct instance, must create a BaseShortcutAbstract subclass instead");
            }

            this.keysArray = keysArray;
            this.target = target;
            this.preventKeyDefaultAction = preventKeyDefaultAction;
            this.stopOtherHandlersChecking = stopOtherHandlersChecking;
            this.skipInsideTextZones = skipInsideTextZones;
        }

        //"abstract" method. Must be implemented for the subclass
        action() {
            throw new Error('action() method must be implemented');
        }
    }


    class ClickShortcut extends BaseShortcutAbstract {

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


    class RelocationShortcut extends BaseShortcutAbstract {

        constructor(...params) {
            super(...params);
        }

        action() {
            window.location.href = this.target;
        }
    }


    let clickShortcutsArray = [

        // Play || Pause || Stop
        new ClickShortcut(' ',                'div[data-test="mini-player-control-wrap"] button[data-test="play-button"]', true, true, true), // space key
        new ClickShortcut(['s', 'p'],         'div[data-test="mini-player-control-wrap"] button[data-test="play-button"]'),
        new ClickShortcut(['MediaPlayPause'], 'div[data-test="mini-player-control-wrap"] button[data-test="play-button"]', false), //Special Key

        // Next Song
        new ClickShortcut('n',              'div[data-test="mini-player-control-wrap"] button[data-test="skip-button"]'),
        new ClickShortcut('MediaTrackNext', 'div[data-test="mini-player-control-wrap"] button[data-test="skip-button"]', false),
    ];

    let relocationShortcutsArray = [
        new RelocationShortcut('f', 'https://www.iheart.com/playlist/collections/perfect-for/activities/concentration/'),
    ];


    let isInsideTextZone = (() => {

        let excludedTagsArrays = ['TEXTAREA'];

        return (ev) => {

            if (excludedTagsArrays.includes(ev.target.tagName) ||
                (ev.target.attributes && ev.target.attributes.type && ev.target.attributes.type.value === 'text')) {
                return true;
            }
        }

    })();


    function setListeners(...shortcutsArray) {

        shortcutsArray.forEach((shortcut) => {

                document.addEventListener('keydown', function (ev) {


                    if (shortcut.keysArray.includes(ev.key)) {

                        if (shortcut.skipInsideTextZones) {
                            if (isInsideTextZone(ev)) {
                                return;
                            }
                        }

                        shortcut.action();

                        if (shortcut.preventKeyDefaultAction) {
                            ev.preventDefault();
                        }

                        if (shortcut.stopOtherHandlersChecking) {
                            ev.stopImmediatePropagation();
                        }

                        return false;
                    }

                });

            }
        )

    }

    setListeners(...clickShortcutsArray, ...relocationShortcutsArray);


})();