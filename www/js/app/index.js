requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['vue', 'Tone', 'store'],
    function(Vue, Tone, store) {

        Vue.component('link-item', {
            props: ['link'],
            template: '#link-item',
            methods: {
                removeTravelLog: function(event) {
                    tl.remove(this.link.url);
                    return false;
                }
            },
        });

        getRandomFromList = function(array) {
            return array[Math.floor(Math.random() * array.length)];
        };

        var oscialltorTypes = [
            "pwm",
            "pulse",

            "sine",
            "fmsine",
            "amsine",
            "fatsine",

            "square",
            "fmsquare",
            "amsquare",
            "fatsquare",

            "triangle",
            "fmtriangle",
            "amtriangle",
            "fattriangle",

            "sawtooth",
            "fmsawtooth",
            "amsawtooth",
            "fatsawtooth",
        ];

        var curveTypes = ["linear", "exponential", "sine", "cosine", "bounce", "ripple", "step"];

        createRandomSynth = function() {
            return new Tone.Synth({
                "oscillator": {
                    "type": getRandomFromList(oscialltorTypes),
                    "phase": Math.random() * 360
                },
                "envelope": {
                    "attack": Math.random() * 2,
                    "attackCurve": getRandomFromList(curveTypes),
                    "decay": Math.random() * 2,
                    "sustain": Math.random() * 2,
                    "release": Math.random() * 2,
                    "releaseCurve": getRandomFromList(curveTypes),
                }
            }).toMaster();
        };

        createRandomTone = function() {
            var tone = {};
            tone.synth = createRandomSynth();
            tone.frequency = Math.random() * 2000 + 10;
            tone.duration = Math.random() * 1;
            tone.name = Math.floor(Math.random() * Math.pow(10,6));

            return tone;
        };

        var toneFinder = {};
        toneFinder.tone = createRandomTone();


        Vue.component('saved-template', {
            props: ['saved'],
            template: '#saved-template',
            computed: {},
            methods: {
                remove: function() {
                    var tones = store.get("tones");
                    tones.forEach(function(tone) {
                        if(tone.name == this.saved.name){
                            //tones.re
                        }
                    }, this);
                    tones.push(toneFinder.tone);
                    store.set("tones", tones);
                },
                load: function() {
                    var tones = store.get("tones");
                    tones.forEach(function(tone) {
                        if(tone.name == this.saved.name){
                            app.tone = tone;
                        }
                    }, this);
                }
            }
        });

        var app = new Vue({
            el: '#toneFinder',
            data: toneFinder,
            computed: {
            },
            methods: {
                play: function() {
                    toneFinder.tone.synth.triggerAttackRelease(toneFinder.tone.frequency, toneFinder.tone.duration);
                },
                randomise: function() {
                    toneFinder.tone = createRandomTone();
                },
                save: function(){
                    var tones = store.get("tones");
                    if(tones === undefined){
                        tones = [];
                    }
                    tones.push(toneFinder.tone);
                    store.set("tones", tones);
                },                
                savedTones: function(){
                    return store.get("tones");
                }
            }
        });

    });