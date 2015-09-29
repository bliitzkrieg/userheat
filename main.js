(function () {
    'use strict';

    var html,
        body,
        data = [],
        delay = false,
        DELAY_TIME = 10,
        USER_ID = new Date().getTime() + Math.random(),
        MOUSE_MOVE_TYPE = 'mousemove',
        MOUSE_CLICK_TYPE = 'click';

    function LogMouseMove(e) {

        if(!delay){

            var log = {
                timestamp: null,
                x: null,
                y: null,
                type: null,
                url: window.location.hostname + window.location.pathname
            };

            log.timestamp = new Date().getTime();
            log.x = e.clientX;
            log.y = e.clientY;
            log.type = MOUSE_MOVE_TYPE;

            data.push(log);

            delay = true;
            setTimeout( function() { delay = false; }, DELAY_TIME);
        }
    }

    function LogClick(e) {
        var log = {
            timestamp: null,
            x: null,
            y: null,
            type: null,
            url: window.location.hostname + window.location.pathname
        };

        log.timestamp = new Date();
        log.x = e.clientX;
        log.y = e.clientY;
        log.type = MOUSE_CLICK_TYPE;

        data.push(log);
    }

    function LogOnBrowserExit(e) {
        PushDataToServer();
    }

    function ShowUserHeatmap() {
        var heatmap = h337.create({
            container: html
        });

        heatmap.setData({
            max: 25,
            data: data
        });
    }

    function setup() {
        html = document.getElementsByTagName('html')[0];
        body = document.getElementsByTagName('body')[0];

        html.onmousemove = LogMouseMove;
        html.onclick = LogClick;
        window.onbeforeunload = LogOnBrowserExit;

        var button = document.getElementById('mouseMove');
        button.onclick = ShowUserHeatmap;
    }

    function PushDataToServer() {
        //DO API CALL WITH UNIQUE USER_ID AND DATA THEN CLEAR DATA
    }

    setup();

}());