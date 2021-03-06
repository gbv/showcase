/**
 * ViewFrame to display a showcase Channel
 * @param {} element
 */
function ViewFrame(element) {

    // create new iframe and add it as child to element
    var iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder',0);
    element.appendChild(iframe);
    this.iframe = iframe;

    /**
     * Send a message to the ViewFrame
     * @method notify
     * @param {} format
     * @param {} message
     */
    this.notify = function(format, message) {
        if ( this.iframe.contentWindow ) {
            this.iframe.contentWindow.postMessage(format+": "+message,'*');
        } else {
            console.warn("contentWindow missing");
        }
    };

    /**
     * Set URL of the view
     */
    this.setUrl = function(url, callback) {
        this.iframe.setAttribute('src', url);

        // listen for callback by view (TODO: add timeout and remove listener)
        window.addEventListener("message", function(event) {
            if ( event.source != iframe.contentWindow ) return;
            var match = /^accept:\s*(.+?)\s*$/.exec(event.data);
            if ( !match ) return;
            callback(match[1].split(/\s*,\s*/));
        }, false);
    };
}

/**
 * A Channel emits messages.
 * @param {} configuration
 */
function Channel(config) {
    this.source = config.source;
    this.title  = config.title;
    this.config = config.view;

    var channel = this;

    var defaultTitle = "showcase";
    var defaultView  = "views/default.html";

    /**
     * Display the channel in a given ViewFrame
     */
    this.display = function(viewFrame) {

        document.title = 'title' in channel ? channel.title : defaultTitle;
        
        var format = "content";

        // TODO: disable old channel

        viewFrame.setUrl(
            channel.view ? channel.view : defaultView,
            function(accept) {
                console.log(accept);

                $.each(channel.config, function(key,value) {
                    viewFrame.notify("config",key+"="+value);
                });

                channel.enable(
                    function(content) {
                        viewFrame.notify(format,content);
                    }
                );
            }
        ); 

    }; // Channel.display

    this.enable = function(callback) {

        // TODO: if ws:// URL
/*
    if ("WebSocket" in window) {
        console.log("hi"); 
        var url = "ws://localhost:5000/urls";
        var ws = new WebSocket(url);
        ws.onopen = function(evt) {
            console.log("connected to "+url);
        };
        ws.onmessage = function(event) {
            console.log(event.data);

//            iframe.contentWindow.postMessage(event.data, '*'); // TODO: iframe.src
        };
        ws.onerror = function(event) {
            console.error("connection failed: "+url);
        }
        ws.onclose = function(event) {
            console.warn(event);
        }
        console.error("no WebSocket support");
    }
*/
        channel.source(callback);
        
    }; // Channel.enable

} // Channel
