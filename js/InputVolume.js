(function(global){
    var context = new AudioContext(),
        currentHigh = false,
        eventHigh = new Event('input_volume_high'),
        analyzeMinLimit = 50,
        analyzeMaxLimit = 100,
        analyzeArray = [0, 0, 0],
        analyser = context.createAnalyser();
    var sum  = function(arr) {
        return arr.reduce(function(prev, current, i, arr) {
            return prev+current;
        });
    };
    var average = function(arr, fn) {
        return sum(arr, fn)/arr.length;
    };
    navigator.getUserMedia = (navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
    window.URL = (window.URL ||
            window.webkitURL ||
            window.mozURL ||
            navigator.msURL);

    var listener = (function(self){
        return function(){
            requestAnimationFrame(listener);
            if(analyser){
                var num = 0;
                var data = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(data);
                for(var i = 0; i < data.length; ++i) {
                    num += data[i];
                }
                num = num / data.length;
                num = Math.min(num, analyzeMaxLimit);
                analyzeArray.push(num);
                analyzeArray.shift();
                if(average(analyzeArray) > analyzeMinLimit){
                    if(!currentHigh){
                        currentHigh = true;
                        global.dispatchEvent(eventHigh);
                    }
                }else{
                    currentHigh = false;
                }
            }
        }
    })(this);

    if(navigator.getUserMedia){
        listener();
        navigator.getUserMedia({
                audio: true,
                video: false
            }, function(stream){
                mediaStream = context.createMediaStreamSource(stream);
                mediaStream.connect(analyser)
            }, function(){
                alert("Mic access error!");
            });
    }else{
        alert('オーディオ入力が取得できません');
    }
})(window);

// window.addEventListener('input_volume_high', function(e){
//     console.log('きたー');
// });
