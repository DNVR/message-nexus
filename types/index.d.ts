declare type EventString = Array<string | number> | string | number;
declare type EventParameters = any[];
declare type EventCallback = (...args: EventParameters) => any;
declare class MessageNexus {
    constructor();
    proclaim(type: EventString, ...args: EventParameters): void;
    devote(type: EventString, callback: EventCallback): void;
    neglect(type: EventString, callback: EventCallback): void;
}
export default MessageNexus;
//# sourceMappingURL=index.d.ts.map