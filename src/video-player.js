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

        showHideControls: function () {},

        showControls: function () {},

        hideControls: function () {},

        handleButtonPresses: function () {},

        playORpause: function () {},

        adjustVolume: function (event) {},

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
