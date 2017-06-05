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
requirejs(['vue'],
    function(Vue) {

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

        var app = new Vue({
            el: '#newlyDiscovered',
            data: newlyDiscovered,
        });

    });