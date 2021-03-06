"use strict";

var video           = document.querySelector('.video-player'),
    videoControls   = document.querySelector('.controls'),
    play            = document.querySelector('.action'),
    playTime        = document.querySelector('.play-time'),
    totalTime       = document.querySelector('.total-time'),
    playProgressBar = document.querySelector('.progress'),
    fullscreen      = document.querySelector('.fullscreen'),
    VideoPlayer;

VideoPlayer = {
    playProgressInterval: undefined,

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
        videoControls.classList.remove('hidden');
        videoControls.style.zIndex = 2;
    },

    hideControls: function () {
        videoControls.classList.add('hidden');
        videoControls.style.zIndex = -1;
    },

    handleButtonPresses: function () {
        video.addEventListener('click', VideoPlayer.playORpause, false);
        play.addEventListener('click', VideoPlayer.playORpause, false);
        fullscreen.addEventListener('click', VideoPlayer.fullScreen, false);

        // iterate over each volume mark
        [].forEach.call(
            document.querySelectorAll('.volume-mark'),
            function (el) {
                el.addEventListener('click', VideoPlayer.adjustVolume, false);
            }
        );

        video.addEventListener('play', function () {
            play.innerHTML = '||';
            VideoPlayer.trackPlayProgress();
        }, false);

        video.addEventListener('pause', function () {
            play.innerHTML = '&gt;';
            VideoPlayer.stopTrackingPlayProgress();
        }, false);

        video.addEventListener('ended', function () {
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
        var level = event.target.getAttribute('data-level');

        if (level === "master-volume") {
            if (video.volume > 0) {
                video.volume = 0;
            } else {
                video.volume = 1;
            }
        } else {
            level = parseInt(level, 10);
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

    trackPlayProgress: function () {
        (function progressTrack() {
            VideoPlayer.updatePlayProgress();
            VideoPlayer.playProgressInterval = setTimeout(progressTrack, 500);
        }());
    },

    updatePlayProgress: function () {
        var progressAmount = parseInt(((video.currentTime / video.duration) * 100), 10);
        playTime.innerHTML = VideoPlayer.convertTime(video.currentTime);
        playProgressBar.setAttribute('value', progressAmount);
    },

    stopTrackingPlayProgress: function () {
        clearTimeout(VideoPlayer.playProgressInterval);
    },

    fullScreen: function () {
        if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
            if (fullscreen.classList.contains('active')) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                fullscreen.classList.remove('active');
            } else {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
                fullscreen.classList.add('active');
            }
        } else {
            fullscreen.classList.add('error');
        }
    },

    convertTime: function (time) {
        var minutes = parseInt(time / 60, 10),
            seconds = parseInt(time % 60, 10),
            str;

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        str = minutes + ':' + seconds;
        return str;
    }
};

(function () {
    VideoPlayer.init();
}());
