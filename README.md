# Message Nexus

A simple message broker.

## Install
`npm install @dnvr/message-nexus`

## Usage
```JS
import MessageNexus from '@dnvr/message-nexus'

const Broker = new MessageNexus

// Subscribe to the 'greet' event
Broker.subscribe( 'greet', function () {
  console.log( 'Hello world!!!' )
})
// Subscribe to title change request
Broker.subscribe( [ 'title', 'change', 'request' ], function ( newTitle ) {
  document.title = newTitle
})


// Enact a title change
Broker.publish( [ 'title', 'change', 'request' ], 'This is a new title' )
// Enact a greeting to the developer
Broker.publish( 'greet' )
```