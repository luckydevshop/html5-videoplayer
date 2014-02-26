"use strict";

(function () {
    var video             = document.getElementById('video-player'),
        videoControls     = document.getElementById('controls'),
        play              = document.getElementById('action'),
        playTime          = document.getElementById('play-time'),
        totalTime         = document.getElementById('total-time'),
        progressContainer = document.getElementById('progress'),
        playProgressBar   = document.getElementById('bar'),
        volume            = document.getElementById('volume'),
        volumeTick        = document.querySelectorAll('.volume-mark'),
        VideoPlayer;

    VideoPlayer = {
        init: function () {
            video.removeAttribute('controls');

            if (video.readyState > 0) {
                // metadata is loaded already, fire event handler manually
                VideoPlayer.initializeControls();
            } else {
                video.addEventListener("loadedmetadata", VideoPlayer.initializeControls, false);
            }

            // handle button presses/click events
            VideoPlayer.handleButtonPresses();
        },

        initializeControls: function () {
            // setup customized controls
            totalTime.innerHTML = VideoPlayer.convertTime(video.duration);

            VideoPlayer.showHideControls();
        },

        showHideControls: function () {
            // attach hover events, try to account for IE
            if (video.addEventListener && videoControls.addEventListener) {
                video.addEventListener('mouseover', VideoPlayer.showControls, false);
                video.addEventListener('mouseout', VideoPlayer.hideControls, false);
                videoControls.addEventListener('mouseover', VideoPlayer.showControls, false);
                videoControls.addEventListener('mouseout', VideoPlayer.hideControls, false);
            } else {
                video.attachEvent('onmouseover', VideoPlayer.showControls, false);
                video.attachEvent('onmouseout', VideoPlayer.hideControls, false);
                videoControls.attachEvent('onmouseover', VideoPlayer.showControls, false);
                videoControls.attachEvent('onmouseout', VideoPlayer.hideControls, false);
            }
        },

        showControls: function () {
            videoControls.style.opacity = 1;
            videoControls.style.zIndex = 2;
        },

        hideControls: function () {
            videoControls.style.opacity = 0;
            videoControls.style.zIndex = -1;
        },

        handleButtonPresses: function () {
            video.addEventListener('click', VideoPlayer.playORpause, false);
            play.addEventListener('click', VideoPlayer.playORpause, false);
            volumeTick.addEventListener('click', VideoPlayer.adjustVolume, false);

            video.addEventListener('play', function() {
                play.title = 'Pause';
                play.childNodes[0].classList.remove("icon-play");
                play.childNodes[0].className += " icon-pause";
                VideoPlayer.trackPlayProgress();
            }, false);

            video.addEventListener('pause', function() {
                play.title = 'Play';
                play.childNodes[0].classList.remove("icon-pause");
                play.childNodes[0].className += " icon-play";
                VideoPlayer.stopTrackingPlayProgress();
            }, false);

            video.addEventListener('ended', function() {
                this.currentTime = 0;
                this.pause();
            }, false);
        },

        playORpause: function () {
            if (video.paused || video.ended) {
                if (video.ended) {
                    video.currentTime = 0;
                }
                video.play();
            } else {
                video.pause();
            }
        },

        adjustVolume: function (event) {
            var level = event.target.getAttribute('id');

            if (level === "master-volume") {
                if (video.volume > 0) {
                    video.volume = 0;
                } else {
                    video.volume = 1;
                }
            } else {
                level = parseInt(level);
                if (isNaN(level)) {
                    console.log("NaN, not changing level");
                } else {
                    if (level === 1) {
                        video.volume = 1;
                    } else {
                        video.volume = level * 0.1;
                    }
                }
            }
        },

        trackPlayProgress: function () {},

        updatePlayProgress: function () {},

        stopTrackingPlayProgress: function () {},

        convertTime: function (time) {
            var minutes = parseInt(time / 60, 10),
                seconds = parseInt(time % 60, 10),
                str;

            if (seconds < 10) {}
                seconds = '0' + seconds;
            }

            str = minutes + ':' + seconds;
            return str;
        }
    };

    VideoPlayer.init()
}());
