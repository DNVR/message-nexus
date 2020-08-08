export interface EventListenerOptions {
  capture?: boolean
  passive?: boolean
}

let Interface = EventTarget

try {
  new Interface
}
catch ( e ) {
  class Polyfill extends Comment implements EventTarget {
    constructor () {
      super()

      // Safari is annoying
      Reflect.setPrototypeOf( this, new.target.prototype )
    }
  }

  Interface = Polyfill
}

export default Interface