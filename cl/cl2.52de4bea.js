class BusSignalEvent extends Event {
    #data;
    constructor(data){
        super("signal");
        this.#data = data;
    }
    //get data() { return this._data }
    get msg() {
        return this.#data;
    }
}
class BusHelper {
    static getWSPort() {
        const url = new URL(location.href);
        if (url.port == "") return 81;
        return parseInt(url.port) + 1;
    }
    static getWSHost() {
        return "127.0.0.1";
    }
    static getWSAddrLocal() {
        return localStorage.getItem("json2dbus_wsaddr");
    }
    static setValuesLocal() {
        localStorage.setItem("json2dbus_wsaddr", `ws://${this.getWSHost()}:${this.getWSPort()}`);
        localStorage.setItem("json2dbus_debug", "1");
    }
}
class BusHTML {
    static updateWSAddr() {
        if (document.getElementById("wsaddr")) document.getElementById("wsaddr").innerHTML = BusHelper.getWSAddrLocal();
    }
    static indicateOpen() {
        BusHTML.indicate("✔", "green");
    }
    static indicateClose() {
        BusHTML.indicate("✖", "red");
    }
    static indicateConnecting() {
        BusHTML.indicate("◯", "orange");
    }
    static indicate(symbol, color = "auto") {
        if (document.getElementById("wsindicator")) document.getElementById("wsindicator").innerHTML = `<span style='color:${color}' >${symbol}</span>`;
    }
}
class BusMessage {
    constructor(obj){
        this._msg = JSON.parse(obj);
    }
    get isSignal() {
        return this._msg.type == 4;
    }
    get interface() {
        return this._msg.interface;
    }
    get member() {
        return this._msg.member;
    }
    get path() {
        return this._msg.path;
    }
    get objects() {
        return this._msg.objects;
    }
    get sender() {
        return this._msg.sender;
    }
    get senderShort() {
        if (this.sender.startsWith(":1.")) return this.sender.substring(3);
        else return this.sender;
    }
    get isDBus() {
        return this.interface == "org.freedesktop.DBus";
    }
    get isDBusNameAcquired() {
        return this.isDBus && this.member == "NameAcquired";
    }
    get url() {
        return "bus://" + this.senderShort + this.path + "/" + this.interface + "." + this.member;
    }
    get descShort() {
        if (this.objects.length) return this.url + " -> " + JSON.stringify(this.objects);
        else return this.url;
    }
}
if (localStorage.getItem("json2dbus_wsaddr")) {
    const wsaddr = localStorage.getItem("json2dbus_wsaddr");
    const debug = localStorage.getItem("json2dbus_debug");
    window.json2dbus__ws = new WebSocket(wsaddr);
    window.busws = json2dbus__ws;
    //window.addEventListener('load', BusHTML.indicateConnecting)
    json2dbus__ws.onclose = function() {
        BusHTML.indicateClose();
    };
    json2dbus__ws.onerror = function() {
        BusHTML.indicateClose();
    };
    json2dbus__ws.onopen = function() {
        BusHTML.indicateOpen();
    };
    if (debug) json2dbus__ws.addEventListener("message", function(evt) {
        const parsed_msg = JSON.parse(evt.data.replace("\n", ""));
    //console.log(parsed_msg)
    });
    window.busSignalEvents = new EventTarget();
    json2dbus__ws.addEventListener("message", function(evt) {
        const msg = new BusMessage(evt.data.replace("\n", ""));
        if (msg.isSignal) {
            const event = new BusSignalEvent(msg);
            busSignalEvents.dispatchEvent(event);
        }
        if (msg.isDBusNameAcquired) {
            if (document.title == "") document.title = msg.objects[0];
        }
    });
    window.addEventListener('load', BusHTML.updateWSAddr);
}
// function busCall() {
// example: bus://org.mpris.MediaPlayer2.mpv/org/mpris/MediaPlayer2/org.freedesktop.DBus.Introspectable.Introspect
// }
function busCall(destination, path, interface_, member) {
    busws.send(JSON.stringify({
        "destination": destination,
        "path": path,
        "interface": interface_,
        "member": member,
        "type": 1
    }));
}
function busCallArgs(destination, path, interface_, member, signature, objects) {
    busws.send(JSON.stringify({
        "destination": destination,
        "path": path,
        "interface": interface_,
        "member": member,
        "signature": signature,
        "objects": objects,
        "type": 1
    }));
}
function busCallReply(destination, path, interface_, member, signature, objects, serial) {
    busws.send(JSON.stringify({
        "destination": destination,
        "path": path,
        "interface": interface_,
        "member": member,
        "signature": signature,
        "objects": objects,
        "serial": serial,
        "type": 2
    }));
}
function busEmit(path, interface_, member, signature, objects) {
    busws.send(JSON.stringify({
        "path": path,
        "interface": interface_,
        "member": member,
        "signature": signature,
        "objects": objects,
        "type": 4
    }));
}
function busCallAddMatch(match) {
    busCallArgs("org.freedesktop.DBus", "/org/freedesktop/DBus", "org.freedesktop.DBus", "AddMatch", "s", [
        match
    ]);
}
function busChangeProperty(path, interface_, changes) {
    window.bus_savedProps = window.bus_savedProps || {
    };
    let foundChange = false;
    for(const change in changes){
        console.log("found change", change, changes[change]);
        let key = path + "::" + interface_ + "::" + change;
        let valueStr = JSON.stringify(changes[change]);
        if (window.bus_savedProps[key] != valueStr) {
            bus_savedProps[key] = valueStr;
            foundChange = true;
            for (let el of document.querySelectorAll("span[bus-path]"))if (el.getAttribute("bus-path") == path && el.getAttribute("bus-member") == change && el.getAttribute("bus-interface") == interface_) el.innerText = changes[change][1].toString();
        }
    }
    if (foundChange) {
        console.log("sending");
        busEmit(path, "org.freedesktop.DBus", "PropertiesChanged", "sa{sv}as", [
            interface_,
            changes,
            []
        ]);
    }
}

