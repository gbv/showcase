# showcase
> a zapping dashboard

## overview

A **channel** is a stream of content (implemented as websocket) with some **metadata** such as title, **content type** and **layout**. A minimal channel consists of a websocket URL, emitting lines.

Channel definitions are read from a satic config file or websocket a JSON objects.

### content types

* plain text: lines of messages, e.g. a logfile or quotes
* url: lines with URLs to display (in an iframe)
* data-uri: lines with base64 encoded data with MIME type, e.g. images
* csv: numbers to show a live-updating diagram or table
