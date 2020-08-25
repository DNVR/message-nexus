import EventTarget, {
  EventListenerOptions
} from './fixes'

type EventString = Array<string | number> | string | number
type EventParameters = any[]

type EventCallback = ( ...args: EventParameters ) => any

let MessageNexusArgsMap: WeakMap<MessageNexusEvent, EventParameters> = new WeakMap

class MessageNexusEvent extends Event {
  constructor ( type: string, { args }: { args: EventParameters } ) {
    super( type )

    MessageNexusArgsMap.set( this, this.args = args )
  }

  get args (): EventParameters {
    return MessageNexusArgsMap.get( this ) as EventParameters
  }
  set args ( value: EventParameters ) {
    value
  }
}

let listenerOptions: EventListenerOptions = {
  passive: true
}

type FunctionMap = WeakMap<EventCallback, EventListener>

let MessageNexus2Target: WeakMap<MessageNexus, EventTarget> = new WeakMap
let MessageNexus2FunctionMap: WeakMap<MessageNexus, FunctionMap> = new WeakMap

class MessageNexus {

  constructor () {
    MessageNexus2Target.set( this, new EventTarget )
    MessageNexus2FunctionMap.set( this, new WeakMap )
  }

  publish ( type: EventString, ...args: EventParameters ) {
    type = `${ [ type ] }`
    let event = new MessageNexusEvent( type, { args } )

    void ( MessageNexus2Target.get( this ) as EventTarget ).dispatchEvent( event )
  }

  subscribe ( type: EventString, callback: EventCallback ) {
    type = `${ [ type ] }`

    let f: EventListener

    let list = MessageNexus2FunctionMap.get( this ) as FunctionMap

    if ( list.has( callback ) ) {
      f = list.get( callback ) as EventListener
    }
    else {
      f = async function ( this: MessageNexus, event: MessageNexusEvent ) {
        callback.apply( this, event.args )
      } as unknown as EventListener
      list.set( callback, f )
    }

    void ( MessageNexus2Target.get( this ) as EventTarget ).addEventListener( type, f, listenerOptions )
  }

  unsubscribe ( type: EventString, callback: EventCallback ) {
    type = `${ [ type ] }`

    let list = MessageNexus2FunctionMap.get( this ) as FunctionMap

    if ( list.has( callback ) ) {
      void ( MessageNexus2Target.get( this ) as EventTarget ).removeEventListener( type, list.get( callback ) as EventCallback, listenerOptions )
    }
  }
}

export default MessageNexus