/**
 * helper function to initalize a showcase view
 *
 * Usage:
 *
 *     initView({
 *       oncontent: function(content) { ... },
 *       onconfig: function(key,value) { ... }
 *     });
 */
function initView(view) {
    var eventRegexp = /^([^:]+): ?((([^=]+)=)?(.+))/;

    window.addEventListener('message', function(event) {
        
        // trust parent window (whatever it may be)
        if (event.source != parent) return;

        // parse and dispatch message data
        var match = eventRegexp.exec(event.data);
        if (match) {
            if (match[1] == 'content') {
                view.oncontent(match[2]);
            } else if ( match[1] == 'config' && match[3]) {
                view.onconfig(match[4],match[5]);
            }
        }

    }, false);

    parent.postMessage('accept: *','*');
}

