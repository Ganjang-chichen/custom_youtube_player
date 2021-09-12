var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ISNEXT = false;
let MODE = "rotate";
let CURRENT_IDX = 0;

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {

    if(event.target === 0 && ISNEXT && MODE === "rotate"){
        CURRENT_IDX++;
        CURRENT_IDX %= playList.playList.length;
        change_video(playList.playList[CURRENT_IDX].id, playList.playList[CURRENT_IDX].start, playList.playList[CURRENT_IDX].end);
    }
    if(event.target === 0 && ISNEXT && MODE === "rand"){
        // 다음 영상 호출
    }

}

function change_video(id, start, end) {
    if(end < 0) {
        player.loadVideoById({'videoId': id,
               'startSeconds': start,
               'suggestedQuality': 'large'});
    }else {
        player.loadVideoById({'videoId': id,
               'startSeconds': start,
               'endSeconds': end,
               'suggestedQuality': 'large'});
    }
    
}

function start_play() {
    playList = mk_playlist_data();
    change_video(playList.playList[CURRENT_IDX].id, playList.playList[CURRENT_IDX].start, playList.playList[CURRENT_IDX].end);
}