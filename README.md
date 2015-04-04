# showcase
> a zapping dashboard

## overview

A **Channel** is a stream of **items** (provided as via WebSocket, Server-Sent
Events, or **emitter** function), with some **metadata** and **view**.

Channel definitions can be read from a static config file or from another
channel.

### Channels

* WebSockets
* Server-Sent Events
* JavaScript functions

### Formats

* plain text: lines of messages, e.g. a logfile or quotes
* url: lines with URLs to display (in an iframe)
* data-uri: lines with base64 encoded data with MIME type, e.g. images
* csv: numbers to show a live-updating diagram or table

### Emitters

...

### Views

A **view** is an URL that returns a HTML page to receive and display channel
content.

### Pipes

A **Pipe** is an *Emitter* that receives items from another *Emitter*.

## Implementation

The stream of items, emitted by a channel are posted to an iframe (cross-origin
postMessage is partly broken in IE but it works between iframes, see [supported
browsers](http://caniuse.com/#search=postMessage)).

