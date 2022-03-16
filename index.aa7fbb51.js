function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}
parcelRequire.register("2JpsI", function(module, exports) {

$parcel$export(module.exports, "register", () => $1fd388fe1a0c2157$export$6503ec6e8aabbaf, (v) => $1fd388fe1a0c2157$export$6503ec6e8aabbaf = v);
$parcel$export(module.exports, "resolve", () => $1fd388fe1a0c2157$export$f7ad0328861e2f03, (v) => $1fd388fe1a0c2157$export$f7ad0328861e2f03 = v);
var $1fd388fe1a0c2157$export$6503ec6e8aabbaf;
var $1fd388fe1a0c2157$export$f7ad0328861e2f03;
"use strict";
var $1fd388fe1a0c2157$var$mapping = {
};
function $1fd388fe1a0c2157$var$register(pairs) {
    var keys = Object.keys(pairs);
    for(var i = 0; i < keys.length; i++)$1fd388fe1a0c2157$var$mapping[keys[i]] = pairs[keys[i]];
}
function $1fd388fe1a0c2157$var$resolve(id) {
    var resolved = $1fd388fe1a0c2157$var$mapping[id];
    if (resolved == null) throw new Error('Could not resolve bundle with id ' + id);
    return resolved;
}
$1fd388fe1a0c2157$export$6503ec6e8aabbaf = $1fd388fe1a0c2157$var$register;
$1fd388fe1a0c2157$export$f7ad0328861e2f03 = $1fd388fe1a0c2157$var$resolve;

});

parcelRequire.register("ay5XN", function(module, exports) {

module.exports = import("./" + (parcelRequire("2JpsI")).resolve("046jT")).then(()=>parcelRequire('49pUz')
);

});

parcelRequire.register("3l26p", function(module, exports) {


module.exports = Promise.all([
    import("./" + (parcelRequire("2JpsI")).resolve("046jT")),
    import("./" + (parcelRequire("2JpsI")).resolve("gHJYl"))
]).then(()=>parcelRequire('9gwv8')
);

});

parcelRequire.register("3JGCg", function(module, exports) {


module.exports = Promise.all([
    import("./" + (parcelRequire("2JpsI")).resolve("046jT")),
    import("./" + (parcelRequire("2JpsI")).resolve("kelbT"))
]).then(()=>parcelRequire('776mU')
);

});

var $050a469e30885357$exports = {};

(parcelRequire("2JpsI")).register(JSON.parse("{\"aLWjg\":\"index.aa7fbb51.js\",\"046jT\":\"three.module.127a2df4.js\",\"gHJYl\":\"GLTFLoader.c7e4add5.js\",\"kelbT\":\"OrbitControls.04d345c6.js\"}"));

class $9fe07d4bfbbf7c98$var$BusSignalEvent extends Event {
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
class $9fe07d4bfbbf7c98$var$BusHelper {
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
class $9fe07d4bfbbf7c98$var$BusHTML {
    static updateWSAddr() {
        if (document.getElementById("wsaddr")) document.getElementById("wsaddr").innerHTML = $9fe07d4bfbbf7c98$var$BusHelper.getWSAddrLocal();
    }
    static indicateOpen() {
        $9fe07d4bfbbf7c98$var$BusHTML.indicate("✔", "green");
    }
    static indicateClose() {
        $9fe07d4bfbbf7c98$var$BusHTML.indicate("✖", "red");
    }
    static indicateConnecting() {
        $9fe07d4bfbbf7c98$var$BusHTML.indicate("◯", "orange");
    }
    static indicate(symbol, color = "auto") {
        if (document.getElementById("wsindicator")) document.getElementById("wsindicator").innerHTML = `<span style='color:${color}' >${symbol}</span>`;
    }
}
class $9fe07d4bfbbf7c98$var$BusMessage {
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
        $9fe07d4bfbbf7c98$var$BusHTML.indicateClose();
    };
    json2dbus__ws.onerror = function() {
        $9fe07d4bfbbf7c98$var$BusHTML.indicateClose();
    };
    json2dbus__ws.onopen = function() {
        $9fe07d4bfbbf7c98$var$BusHTML.indicateOpen();
    };
    if (debug) json2dbus__ws.addEventListener("message", function(evt) {
        const parsed_msg = JSON.parse(evt.data.replace("\n", ""));
    //console.log(parsed_msg)
    });
    window.busSignalEvents = new EventTarget();
    json2dbus__ws.addEventListener("message", function(evt) {
        const msg = new $9fe07d4bfbbf7c98$var$BusMessage(evt.data.replace("\n", ""));
        if (msg.isSignal) {
            const event = new $9fe07d4bfbbf7c98$var$BusSignalEvent(msg);
            busSignalEvents.dispatchEvent(event);
        }
        if (msg.isDBusNameAcquired) {
            if (document.title == "") document.title = msg.objects[0];
        }
    });
    window.addEventListener('load', $9fe07d4bfbbf7c98$var$BusHTML.updateWSAddr);
}
// function busCall() {
// example: bus://org.mpris.MediaPlayer2.mpv/org/mpris/MediaPlayer2/org.freedesktop.DBus.Introspectable.Introspect
// }
function $9fe07d4bfbbf7c98$var$busCall(destination, path, interface_, member) {
    busws.send(JSON.stringify({
        "destination": destination,
        "path": path,
        "interface": interface_,
        "member": member,
        "type": 1
    }));
}
function $9fe07d4bfbbf7c98$var$busCallArgs(destination, path, interface_, member, signature, objects) {
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
function $9fe07d4bfbbf7c98$var$busCallReply(destination, path, interface_, member, signature, objects, serial) {
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
function $9fe07d4bfbbf7c98$var$busEmit(path, interface_, member, signature, objects) {
    busws.send(JSON.stringify({
        "path": path,
        "interface": interface_,
        "member": member,
        "signature": signature,
        "objects": objects,
        "type": 4
    }));
}
function $9fe07d4bfbbf7c98$var$busCallAddMatch(match) {
    $9fe07d4bfbbf7c98$var$busCallArgs("org.freedesktop.DBus", "/org/freedesktop/DBus", "org.freedesktop.DBus", "AddMatch", "s", [
        match
    ]);
}
function $9fe07d4bfbbf7c98$var$busChangeProperty(path, interface_, changes) {
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
        $9fe07d4bfbbf7c98$var$busEmit(path, "org.freedesktop.DBus", "PropertiesChanged", "sa{sv}as", [
            interface_,
            changes,
            []
        ]);
    }
}


class $9096bdf2563115e9$var$WordCount extends HTMLElement {
    constructor(){
        super();
        this.innerHTML = `<h1>
       title: ${Math.random()}
    </h1>`;
    }
}
customElements.define('word-count', $9096bdf2563115e9$var$WordCount);



// Three.js Library
// Homepage: https://github.com/mrdoob/three.js/tree/r136
// License: MIT See: https://github.com/mrdoob/three.js/blob/r136/LICENSE
customElements.define('three-renderer', class extends HTMLElement {
    #renderer;
    #camera;
    async connectedCallback() {
        const THREE = await (parcelRequire("ay5XN"));
        this.#renderer = new THREE.WebGLRenderer();
        this.#camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.#camera.position.z = 5;
        this.#renderer.setPixelRatio(window.devicePixelRatio);
        this.appendChild(this.#renderer.domElement);
        this.#renderer.setSize(this.#renderer.domElement.clientWidth, this.#renderer.domElement.clientHeight);
        this.#camera.aspect = this.#renderer.domElement.clientWidth / this.#renderer.domElement.clientHeight;
        this.#camera.updateProjectionMatrix();
        this.animate();
    }
    get childScene() {
        for (let ch of this.children){
            if (ch.scene) return ch;
        }
    }
    animate() {
        requestAnimationFrame(()=>{
            this.animate();
        });
        let childSc = this.childScene;
        if (childSc) {
            this.#renderer.render(childSc.scene, this.#camera);
            childSc.update();
        }
    }
});



// Three.js Library
// Homepage: https://github.com/mrdoob/three.js/tree/r136
// License: MIT See: https://github.com/mrdoob/three.js/blob/r136/LICENSE
customElements.define('three-renderer-advanced', class extends HTMLElement {
    renderer;
    camera;
    scene;
    connectionPromiseResolver;
    connectionPromise = new Promise((resolve, reject)=>{
        this.connectionPromiseResolver = resolve;
    });
    async connectedCallback() {
        const THREE = await (parcelRequire("ay5XN"));
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 2000);
        this.camera.position.set(2, 0, 4);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.domElement.setAttribute('tabindex', 1);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.shadowMap.enabled = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.appendChild(this.renderer.domElement);
        this.renderer.setSize(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);
        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
        this.animate();
        // let getRendererInt = (attr) => parseInt(getComputedStyle(renderer.domElement)[attr])
        // let updateSizes = function () {
        //     renderer.setSize( getRendererInt("width"), getRendererInt("height"), false )
        //     camera.aspect = getRendererInt("width")/ getRendererInt("height")
        //     camera.updateProjectionMatrix()
        // }
        // updateSizes()
        // const resizeObserver = new ResizeObserver(entries => updateSizes());
        // resizeObserver.observe(renderer.domElement);
        this.connectionPromiseResolver();
    }
    get childScene() {
        if (this.scene) return this.scene;
        for (let ch of this.children){
            if (ch.scene) return ch;
        }
    }
    animate() {
        requestAnimationFrame(()=>{
            this.animate();
        });
        let childSc = this.childScene;
        if (childSc) {
            this.renderer.render(childSc.scene, this.camera);
            childSc?.update?.();
            try {
                const diff = (attr)=>childSc.scene.children[0].position[attr] - this.camera.position[attr]
                ;
                this.camera.position.x += diff("x") / 5;
                this.camera.position.y += diff("y") / 5;
            } catch (e) {
            }
        }
    }
});



// Three.js Library
// Homepage: https://github.com/mrdoob/three.js/tree/r136
// License: MIT See: https://github.com/mrdoob/three.js/blob/r136/LICENSE
customElements.define('three-scene-demo', class extends HTMLElement {
    #scene;
    #cube;
    async connectedCallback() {
        const THREE = await (parcelRequire("ay5XN"));
        if (this.#scene) return; // do not recreate scene
        this.#scene = new THREE.Scene();
        const geometry = new THREE.BoxGeometry();
        let color = this.getAttribute("cube-color") || 65535;
        const material = new THREE.MeshBasicMaterial({
            color: color
        });
        this.#cube = new THREE.Mesh(geometry, material);
        this.#scene.add(this.#cube);
    }
    get scene() {
        return this.#scene;
    }
    update() {
        if (this.#cube) {
            this.#cube.rotation.x += 0.01;
            this.#cube.rotation.y += 0.01;
        }
    }
});


// from https://gist.github.com/DmitrySoshnikov/2a434dda67019a4a7c37
// by Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
// MIT Style License, 2016
/**
 * S-expression parser
 *
 * Recursive descent parser of a simplified sub-set of s-expressions.
 *
 * NOTE: the format of the programs is used in the "Essentials of interpretation"
 * course: https://github.com/DmitrySoshnikov/Essentials-of-interpretation
 *
 * Grammar:
 *
 *   s-exp : atom
 *         | list
 *
 *   list : '(' list-entries ')'
 *
 *   list-entries : s-exp list-entries
 *                | ε
 *
 *   atom : symbol
 *        | number
 *
 * Examples:
 *
 *   (+ 10 5)
 *   > ['+', 10, 5]
 *
 *   (define (fact n)
 *     (if (= n 0)
 *       1
 *       (* n (fact (- n 1)))))
 *
 *   >
 *   ['define', ['fact', 'n'],
 *     ['if', ['=', 'n', 0],
 *       1,
 *       ['*', 'n', ['fact', ['-', 'n', 1]]]]]
 *
 * by Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 * MIT Style License, 2016
 */ 'use strict';
/**
 * Parses a recursive s-expression into
 * equivalent Array representation in JS.
 */ const $93bf3d5e1b2c7a60$var$SExpressionParser = {
    parse (expression) {
        this._expression = expression;
        this._cursor = 0;
        this._ast = [];
        return this._parseExpression();
    },
    /**
   * s-exp : atom
   *       | list
   */ _parseExpression () {
        this._whitespace();
        if (this._expression[this._cursor] === '(') return this._parseList();
        return this._parseAtom();
    },
    /**
   * list : '(' list-entries ')'
   */ _parseList () {
        // Allocate a new (sub-)list.
        this._ast.push([]);
        this._expect('(');
        this._parseListEntries();
        this._expect(')');
        return this._ast[0];
    },
    /**
   * list-entries : s-exp list-entries
   *              | ε
   */ _parseListEntries () {
        this._whitespace();
        // ε
        if (this._expression[this._cursor] === ')') return;
        // s-exp list-entries
        let entry = this._parseExpression();
        if (entry !== '') {
            // Lists may contain nested sub-lists. In case we have parsed a nested
            // sub-list, it should be on top of the stack (see `_parseList` where we
            // allocate a list and push it onto the stack). In this case we don't
            // want to push the parsed entry to it (since it's itself), but instead
            // pop it, and push to previous (parent) entry.
            if (Array.isArray(entry)) entry = this._ast.pop();
            this._ast[this._ast.length - 1].push(entry);
        }
        return this._parseListEntries();
    },
    /**
   * atom : symbol
   *      | number
   */ _parseAtom () {
        const terminator = /\s+|\)/;
        let atom = '';
        while(this._expression[this._cursor] && !terminator.test(this._expression[this._cursor])){
            atom += this._expression[this._cursor];
            this._cursor++;
        }
        if (atom !== '' && !isNaN(atom)) atom = Number(atom);
        return atom;
    },
    _whitespace () {
        const ws = /^\s+/;
        while(this._expression[this._cursor] && ws.test(this._expression[this._cursor]))this._cursor++;
    },
    _expect (c) {
        if (this._expression[this._cursor] !== c) throw new Error(`Unexpected token: ${this._expression[this._cursor]}, expected ${c}.`);
        this._cursor++;
    }
};
var $93bf3d5e1b2c7a60$export$2e2bcd8739ae039 = $93bf3d5e1b2c7a60$var$SExpressionParser;


function $fd031936a1577495$export$627a43533819333e(applyInstrFunc, onmsg) {
    busCallAddMatch("type=signal,interface=proglines2dbus.local");
    window.busSignalEvents.addEventListener("signal", function(evt) {
        if (evt.msg.interface != "proglines2dbus.local") return;
        if (evt.msg.path != "/") return;
        if (evt.msg.member != "ReadLine") return;
        const parsed = $93bf3d5e1b2c7a60$export$2e2bcd8739ae039.parse(evt.msg.objects[0]);
        //console.log(parsed)
        if (Array.isArray(parsed)) //console.log(parsed)
        for (const instr of parsed)applyInstrFunc(instr);
        onmsg?.();
    });
}
function $fd031936a1577495$export$ecb7cf06b95259d3(txt) {
    busCallArgs("proglines2dbus.ws8081", "/", "proglines2dbus.local", "WriteLine", "s", [
        txt
    ]);
}
function $fd031936a1577495$export$3fdd3998b41d28c1(num, posvec) {
    $fd031936a1577495$export$ecb7cf06b95259d3(`set ${num} :px ${posvec.x}`);
    $fd031936a1577495$export$ecb7cf06b95259d3(`set ${num} :py ${posvec.y}`);
    $fd031936a1577495$export$ecb7cf06b95259d3(`set ${num} :pz ${posvec.z}`);
}
function $fd031936a1577495$export$48a2a2421dc1fbfd(num, rotvec) {
    $fd031936a1577495$export$ecb7cf06b95259d3(`set ${num} :rx ${rotvec.x}`);
    $fd031936a1577495$export$ecb7cf06b95259d3(`set ${num} :ry ${rotvec.y}`);
    $fd031936a1577495$export$ecb7cf06b95259d3(`set ${num} :rz ${rotvec.z}`);
}






customElements.define('three-scene-ecssh', class extends HTMLElement {
    scene;
    connectionPromiseResolver;
    connectionPromise = new Promise((resolve, reject)=>{
        this.connectionPromiseResolver = resolve;
    });
    async connectedCallback() {
        const THREE = await (parcelRequire("ay5XN"));
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('black');
        // TODO use url from attribute
        $fd031936a1577495$export$627a43533819333e((instr)=>{
            this.applyInstruction(instr);
        });
        await this.parentElement.connectionPromise;
        // addKeys
        const addEl = this.parentElement.renderer.domElement.addEventListener;
        addEl("keydown", (ev)=>$fd031936a1577495$export$ecb7cf06b95259d3("set :root :k" + ev.key + " t")
        , false);
        addEl("keyup", (ev)=>$fd031936a1577495$export$ecb7cf06b95259d3("set :root :k" + ev.key + " nil")
        , false);
        addEl("keydown", (ev)=>{
            if (ev.key == "l") this.addLight();
        });
        this.connectionPromiseResolver();
        $fd031936a1577495$export$ecb7cf06b95259d3("get-urllist");
    }
    update() {
        this.light?.target.updateMatrixWorld();
        this.lighthelper?.update();
        $fd031936a1577495$export$ecb7cf06b95259d3("gena");
    }
    async addLight() {
        const THREE = await (parcelRequire("ay5XN"));
        const light = new THREE.DirectionalLight(16777215, 1);
        light.castShadow = true;
        light.position.set(-5, 5, 5);
        // light.position.set(0, 20, 0);
        light.target.position.set(0, 0, -4);
        // light.target.position.set(0, 0, 0);
        light.shadow.mapSize.width = 4096;
        light.shadow.mapSize.height = 4096;
        light.shadow.bias = -0.00004; // fixes artifacts https://threejs.org/docs/#api/en/lights/shadows/LightShadow.bias
        light.shadow.camera.near = 0.5; // default
        light.shadow.camera.far = 500; // default
        this.light = light;
        const lighthelper = new THREE.DirectionalLightHelper(light);
        this.lighthelper = lighthelper;
        this.scene.add(lighthelper);
        this.scene.add(light);
        this.scene.add(light.target);
        const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
        this.scene.add(cameraHelper);
    }
    applyInstruction(instr) {
        if (instr[0] == "DECF") //console.log("we are decrementing something", instr[1], instr[2])
        {
            if (instr[1][0] == "C") {
                const entity = instr[1][1];
                const value = instr[2];
                if (instr[1][2] == ":PX") this.scene.children[entity].position.x -= value;
                else if (instr[1][2] == ":PY") this.scene.children[entity].position.y -= value;
                else if (instr[1][2] == ":PZ") this.scene.children[entity].position.z -= value;
                else if (instr[1][2] == ":RX") this.scene.children[entity].rotation.x -= value;
                else if (instr[1][2] == ":RY") this.scene.children[entity].rotation.y -= value;
                else if (instr[1][2] == ":RZ") this.scene.children[entity].rotation.z -= value;
            }
        } else if (instr[0] == "INCF") //console.log("we are incrementing something", instr[1], instr[2])
        {
            if (instr[1][0] == "C") {
                const entity = instr[1][1];
                const value = instr[2];
                if (instr[1][2] == ":PX") this.scene.children[entity].position.x += value;
                else if (instr[1][2] == ":PY") this.scene.children[entity].position.y += value;
                else if (instr[1][2] == ":PZ") this.scene.children[entity].position.z += value;
                else if (instr[1][2] == ":RX") this.scene.children[entity].rotation.x += value;
                else if (instr[1][2] == ":RY") this.scene.children[entity].rotation.y += value;
                else if (instr[1][2] == ":RZ") this.scene.children[entity].rotation.z += value;
            }
        } else if (instr[0] == "LOAD-GLTF") {
            console.log("loading gltf", instr[1]);
            this.addGLTF(JSON.parse(instr[1]));
        }
    }
    async loadGLTF(url) {
        const GLTFLoaderModule = await (parcelRequire("3l26p"));
        const loader = new GLTFLoaderModule.GLTFLoader();
        return new Promise((resolve, reject)=>loader.load(url, resolve, null, reject)
        );
    }
    async addGLTF(url) {
        let gltf = await this.loadGLTF(url);
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;
        this.scene.add(gltf.scene);
        let setMeshMat = function(mesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        };
        for (const ch of this.scene.children){
            if (ch.type == "Mesh") setMeshMat(ch);
            else if (ch.type == "Group") {
                for (const ch2 of ch.children)if (ch2.type == "Mesh") setMeshMat(ch2);
            }
        }
        $fd031936a1577495$export$3fdd3998b41d28c1(this.scene.children.length - 1, this.scene.children.at(-1).position);
        $fd031936a1577495$export$48a2a2421dc1fbfd(this.scene.children.length - 1, this.scene.children.at(-1).rotation);
    }
});



// Three.js Library
// Homepage: https://github.com/mrdoob/three.js/tree/r136
// License: MIT See: https://github.com/mrdoob/three.js/blob/r136/LICENSE
customElements.define('three-orbitcontroller', class extends HTMLElement {
    async connectedCallback() {
        const OrbitControlsModule = await (parcelRequire("3JGCg"));
        const camera = this.parentElement.camera;
        const renderer = this.parentElement.renderer;
        const controls = new OrbitControlsModule.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.update();
    }
});




