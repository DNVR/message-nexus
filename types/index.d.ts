declare type EventString = Array<string | number> | string | number;
declare type EventParameters = any[];
declare type EventCallback = (...args: EventParameters) => any;
declare class MessageNexus {
    constructor();
    publish(type: EventString, ...args: EventParameters): void;
    subscribe(type: EventString, callback: EventCallback): void;
    unsubscribe(type: EventString, callback: EventCallback): void;
}
export default MessageNexus;
//# sourceMappingURL=index.d.ts.map