function sleep(sec) {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
    });
}

async function timer() {
    //await sleep(1);

    let t = document.querySelector(".video_timer").value;

    if (!Number(t)){
        let _t = t.split(':');
        if(_t.length === 2) {
            if(Number(_t[0]) && Number(_t[1])) {
                t = Number(_t[0]) * 60 + Number(_t[1]);
            }else {
                t = 0;
            }
        }else if(_t.length === 3) {
            if(Number(_t[0]) && Number(_t[1]) && Number(_t[2])) {
                t = Number(_t[0]) * 3600 + Number(_t[1]) * 60 + Number(_t[2]);
            }else {
                t = 0;
            }
        }else {
            t = 0;
        }
    }

    await sleep(t);
    play_alarm()
}

function play_alarm(){

    player.pauseVideo();
    var w = window.open("./html/popup.html", "a", `alarm shutdown, width=300, height=200`);

    async function repeat_sound(){
        while(true) {
            if(w.closed) {
                player.playVideo();
                break;
            }

            var audio = new Audio('./sound/MP_Blop.mp3');
            audio.play();
    
            await sleep(2);
        }
    }

    repeat_sound();
    
}

