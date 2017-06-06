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
requirejs(['vue','Tone'],
    function(Vue, Tone) {

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

        var toneFinder = {};

        var app = new Vue({
            el: '#toneFinder',
            data: toneFinder,
        });


        //create a synth and connect it to the master output (your speakers)
        var synth = new Tone.Synth({
            "oscillator" : {
                "type" : "pwm",
                "modulationFrequency" : 0.9
            },
            "envelope" : {
                "attack" : 0.02,
                "decay" : 0.1,
                "sustain" : 1.2,
                "release" : 0.9,
            }
        }).toMaster();

        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease("C4", "16n", "1m");
        synth.triggerAttackRelease("D4", "16n", "2m");

    });