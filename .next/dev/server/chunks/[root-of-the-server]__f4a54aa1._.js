module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client-2c3a283f134fdcb6", () => require("@prisma/client-2c3a283f134fdcb6"));

module.exports = mod;
}),
"[project]/node_modules/restructure/src/DecodeStream.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DecodeStream",
    ()=>DecodeStream
]);
// Node back-compat.
const ENCODING_MAPPING = {
    utf16le: 'utf-16le',
    ucs2: 'utf-16le',
    utf16be: 'utf-16be'
};
class DecodeStream {
    constructor(buffer){
        this.buffer = buffer;
        this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        this.pos = 0;
        this.length = this.buffer.length;
    }
    readString(length, encoding = 'ascii') {
        encoding = ENCODING_MAPPING[encoding] || encoding;
        let buf = this.readBuffer(length);
        try {
            let decoder = new TextDecoder(encoding);
            return decoder.decode(buf);
        } catch (err) {
            return buf;
        }
    }
    readBuffer(length) {
        return this.buffer.slice(this.pos, this.pos += length);
    }
    readUInt24BE() {
        return (this.readUInt16BE() << 8) + this.readUInt8();
    }
    readUInt24LE() {
        return this.readUInt16LE() + (this.readUInt8() << 16);
    }
    readInt24BE() {
        return (this.readInt16BE() << 8) + this.readUInt8();
    }
    readInt24LE() {
        return this.readUInt16LE() + (this.readInt8() << 16);
    }
}
DecodeStream.TYPES = {
    UInt8: 1,
    UInt16: 2,
    UInt24: 3,
    UInt32: 4,
    Int8: 1,
    Int16: 2,
    Int24: 3,
    Int32: 4,
    Float: 4,
    Double: 8
};
for (let key of Object.getOwnPropertyNames(DataView.prototype)){
    if (key.slice(0, 3) === 'get') {
        let type = key.slice(3).replace('Ui', 'UI');
        if (type === 'Float32') {
            type = 'Float';
        } else if (type === 'Float64') {
            type = 'Double';
        }
        let bytes = DecodeStream.TYPES[type];
        DecodeStream.prototype['read' + type + (bytes === 1 ? '' : 'BE')] = function() {
            const ret = this.view[key](this.pos, false);
            this.pos += bytes;
            return ret;
        };
        if (bytes !== 1) {
            DecodeStream.prototype['read' + type + 'LE'] = function() {
                const ret = this.view[key](this.pos, true);
                this.pos += bytes;
                return ret;
            };
        }
    }
}
}),
"[project]/node_modules/restructure/src/EncodeStream.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EncodeStream",
    ()=>EncodeStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$DecodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/DecodeStream.js [app-route] (ecmascript)");
;
const textEncoder = new TextEncoder();
const isBigEndian = new Uint8Array(new Uint16Array([
    0x1234
]).buffer)[0] == 0x12;
class EncodeStream {
    constructor(buffer){
        this.buffer = buffer;
        this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
        this.pos = 0;
    }
    writeBuffer(buffer) {
        this.buffer.set(buffer, this.pos);
        this.pos += buffer.length;
    }
    writeString(string, encoding = 'ascii') {
        let buf;
        switch(encoding){
            case 'utf16le':
            case 'utf16-le':
            case 'ucs2':
                buf = stringToUtf16(string, isBigEndian);
                break;
            case 'utf16be':
            case 'utf16-be':
                buf = stringToUtf16(string, !isBigEndian);
                break;
            case 'utf8':
                buf = textEncoder.encode(string);
                break;
            case 'ascii':
                buf = stringToAscii(string);
                break;
            default:
                throw new Error(`Unsupported encoding: ${encoding}`);
        }
        this.writeBuffer(buf);
    }
    writeUInt24BE(val) {
        this.buffer[this.pos++] = val >>> 16 & 0xff;
        this.buffer[this.pos++] = val >>> 8 & 0xff;
        this.buffer[this.pos++] = val & 0xff;
    }
    writeUInt24LE(val) {
        this.buffer[this.pos++] = val & 0xff;
        this.buffer[this.pos++] = val >>> 8 & 0xff;
        this.buffer[this.pos++] = val >>> 16 & 0xff;
    }
    writeInt24BE(val) {
        if (val >= 0) {
            this.writeUInt24BE(val);
        } else {
            this.writeUInt24BE(val + 0xffffff + 1);
        }
    }
    writeInt24LE(val) {
        if (val >= 0) {
            this.writeUInt24LE(val);
        } else {
            this.writeUInt24LE(val + 0xffffff + 1);
        }
    }
    fill(val, length) {
        if (length < this.buffer.length) {
            this.buffer.fill(val, this.pos, this.pos + length);
            this.pos += length;
        } else {
            const buf = new Uint8Array(length);
            buf.fill(val);
            this.writeBuffer(buf);
        }
    }
}
function stringToUtf16(string, swap) {
    let buf = new Uint16Array(string.length);
    for(let i = 0; i < string.length; i++){
        let code = string.charCodeAt(i);
        if (swap) {
            code = code >> 8 | (code & 0xff) << 8;
        }
        buf[i] = code;
    }
    return new Uint8Array(buf.buffer);
}
function stringToAscii(string) {
    let buf = new Uint8Array(string.length);
    for(let i = 0; i < string.length; i++){
        // Match node.js behavior - encoding allows 8-bit rather than 7-bit.
        buf[i] = string.charCodeAt(i);
    }
    return buf;
}
for (let key of Object.getOwnPropertyNames(DataView.prototype)){
    if (key.slice(0, 3) === 'set') {
        let type = key.slice(3).replace('Ui', 'UI');
        if (type === 'Float32') {
            type = 'Float';
        } else if (type === 'Float64') {
            type = 'Double';
        }
        let bytes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$DecodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DecodeStream"].TYPES[type];
        EncodeStream.prototype['write' + type + (bytes === 1 ? '' : 'BE')] = function(value) {
            this.view[key](this.pos, value, false);
            this.pos += bytes;
        };
        if (bytes !== 1) {
            EncodeStream.prototype['write' + type + 'LE'] = function(value) {
                this.view[key](this.pos, value, true);
                this.pos += bytes;
            };
        }
    }
}
}),
"[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Base",
    ()=>Base
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$DecodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/DecodeStream.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$EncodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/EncodeStream.js [app-route] (ecmascript)");
;
;
class Base {
    fromBuffer(buffer) {
        let stream = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$DecodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DecodeStream"](buffer);
        return this.decode(stream);
    }
    toBuffer(value) {
        let size = this.size(value);
        let buffer = new Uint8Array(size);
        let stream = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$EncodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EncodeStream"](buffer);
        this.encode(stream, value);
        return buffer;
    }
}
}),
"[project]/node_modules/restructure/src/Number.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Fixed",
    ()=>Fixed,
    "Number",
    ()=>NumberT,
    "double",
    ()=>double,
    "doublebe",
    ()=>doublebe,
    "doublele",
    ()=>doublele,
    "fixed16",
    ()=>fixed16,
    "fixed16be",
    ()=>fixed16be,
    "fixed16le",
    ()=>fixed16le,
    "fixed32",
    ()=>fixed32,
    "fixed32be",
    ()=>fixed32be,
    "fixed32le",
    ()=>fixed32le,
    "float",
    ()=>float,
    "floatbe",
    ()=>floatbe,
    "floatle",
    ()=>floatle,
    "int16",
    ()=>int16,
    "int16be",
    ()=>int16be,
    "int16le",
    ()=>int16le,
    "int24",
    ()=>int24,
    "int24be",
    ()=>int24be,
    "int24le",
    ()=>int24le,
    "int32",
    ()=>int32,
    "int32be",
    ()=>int32be,
    "int32le",
    ()=>int32le,
    "int8",
    ()=>int8,
    "uint16",
    ()=>uint16,
    "uint16be",
    ()=>uint16be,
    "uint16le",
    ()=>uint16le,
    "uint24",
    ()=>uint24,
    "uint24be",
    ()=>uint24be,
    "uint24le",
    ()=>uint24le,
    "uint32",
    ()=>uint32,
    "uint32be",
    ()=>uint32be,
    "uint32le",
    ()=>uint32le,
    "uint8",
    ()=>uint8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$DecodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/DecodeStream.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
;
;
class NumberT extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(type, endian = 'BE'){
        super();
        this.type = type;
        this.endian = endian;
        this.fn = this.type;
        if (this.type[this.type.length - 1] !== '8') {
            this.fn += this.endian;
        }
    }
    size() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$DecodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DecodeStream"].TYPES[this.type];
    }
    decode(stream) {
        return stream[`read${this.fn}`]();
    }
    encode(stream, val) {
        return stream[`write${this.fn}`](val);
    }
}
;
const uint8 = new NumberT('UInt8');
const uint16be = new NumberT('UInt16', 'BE');
const uint16 = uint16be;
const uint16le = new NumberT('UInt16', 'LE');
const uint24be = new NumberT('UInt24', 'BE');
const uint24 = uint24be;
const uint24le = new NumberT('UInt24', 'LE');
const uint32be = new NumberT('UInt32', 'BE');
const uint32 = uint32be;
const uint32le = new NumberT('UInt32', 'LE');
const int8 = new NumberT('Int8');
const int16be = new NumberT('Int16', 'BE');
const int16 = int16be;
const int16le = new NumberT('Int16', 'LE');
const int24be = new NumberT('Int24', 'BE');
const int24 = int24be;
const int24le = new NumberT('Int24', 'LE');
const int32be = new NumberT('Int32', 'BE');
const int32 = int32be;
const int32le = new NumberT('Int32', 'LE');
const floatbe = new NumberT('Float', 'BE');
const float = floatbe;
const floatle = new NumberT('Float', 'LE');
const doublebe = new NumberT('Double', 'BE');
const double = doublebe;
const doublele = new NumberT('Double', 'LE');
class Fixed extends NumberT {
    constructor(size, endian, fracBits = size >> 1){
        super(`Int${size}`, endian);
        this._point = 1 << fracBits;
    }
    decode(stream) {
        return super.decode(stream) / this._point;
    }
    encode(stream, val) {
        return super.encode(stream, val * this._point | 0);
    }
}
const fixed16be = new Fixed(16, 'BE');
const fixed16 = fixed16be;
const fixed16le = new Fixed(16, 'LE');
const fixed32be = new Fixed(32, 'BE');
const fixed32 = fixed32be;
const fixed32le = new Fixed(32, 'LE');
}),
"[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropertyDescriptor",
    ()=>PropertyDescriptor,
    "resolveLength",
    ()=>resolveLength
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Number.js [app-route] (ecmascript)");
;
function resolveLength(length, stream, parent) {
    let res;
    if (typeof length === 'number') {
        res = length;
    } else if (typeof length === 'function') {
        res = length.call(parent, parent);
    } else if (parent && typeof length === 'string') {
        res = parent[length];
    } else if (stream && length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
        res = length.decode(stream);
    }
    if (isNaN(res)) {
        throw new Error('Not a fixed size');
    }
    return res;
}
;
class PropertyDescriptor {
    constructor(opts = {}){
        this.enumerable = true;
        this.configurable = true;
        for(let key in opts){
            const val = opts[key];
            this[key] = val;
        }
    }
}
}),
"[project]/node_modules/restructure/src/Array.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Array",
    ()=>ArrayT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Number.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)");
;
;
;
class ArrayT extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(type, length, lengthType = 'count'){
        super();
        this.type = type;
        this.length = length;
        this.lengthType = lengthType;
    }
    decode(stream, parent) {
        let length;
        const { pos } = stream;
        const res = [];
        let ctx = parent;
        if (this.length != null) {
            length = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLength"](this.length, stream, parent);
        }
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            // define hidden properties
            Object.defineProperties(res, {
                parent: {
                    value: parent
                },
                _startOffset: {
                    value: pos
                },
                _currentOffset: {
                    value: 0,
                    writable: true
                },
                _length: {
                    value: length
                }
            });
            ctx = res;
        }
        if (length == null || this.lengthType === 'bytes') {
            const target = length != null ? stream.pos + length : (parent != null ? parent._length : undefined) ? parent._startOffset + parent._length : stream.length;
            while(stream.pos < target){
                res.push(this.type.decode(stream, ctx));
            }
        } else {
            for(let i = 0, end = length; i < end; i++){
                res.push(this.type.decode(stream, ctx));
            }
        }
        return res;
    }
    size(array, ctx, includePointers = true) {
        if (!array) {
            return this.type.size(null, ctx) * __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLength"](this.length, null, ctx);
        }
        let size = 0;
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            size += this.length.size();
            ctx = {
                parent: ctx,
                pointerSize: 0
            };
        }
        for (let item of array){
            size += this.type.size(item, ctx);
        }
        if (ctx && includePointers && this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            size += ctx.pointerSize;
        }
        return size;
    }
    encode(stream, array, parent) {
        let ctx = parent;
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            ctx = {
                pointers: [],
                startOffset: stream.pos,
                parent
            };
            ctx.pointerOffset = stream.pos + this.size(array, ctx, false);
            this.length.encode(stream, array.length);
        }
        for (let item of array){
            this.type.encode(stream, item, ctx);
        }
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            let i = 0;
            while(i < ctx.pointers.length){
                const ptr = ctx.pointers[i++];
                ptr.type.encode(stream, ptr.val, ptr.parent);
            }
        }
    }
}
;
}),
"[project]/node_modules/restructure/src/LazyArray.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LazyArray",
    ()=>LazyArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Number.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)");
;
;
;
class LazyArray extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Array"] {
    decode(stream, parent) {
        const { pos } = stream;
        const length = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLength"](this.length, stream, parent);
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            parent = {
                parent,
                _startOffset: pos,
                _currentOffset: 0,
                _length: length
            };
        }
        const res = new LazyArrayValue(this.type, length, stream, parent);
        stream.pos += length * this.type.size(null, parent);
        return res;
    }
    size(val, ctx) {
        if (val instanceof LazyArrayValue) {
            val = val.toArray();
        }
        return super.size(val, ctx);
    }
    encode(stream, val, ctx) {
        if (val instanceof LazyArrayValue) {
            val = val.toArray();
        }
        return super.encode(stream, val, ctx);
    }
}
class LazyArrayValue {
    constructor(type, length, stream, ctx){
        this.type = type;
        this.length = length;
        this.stream = stream;
        this.ctx = ctx;
        this.base = this.stream.pos;
        this.items = [];
    }
    get(index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        if (this.items[index] == null) {
            const { pos } = this.stream;
            this.stream.pos = this.base + this.type.size(null, this.ctx) * index;
            this.items[index] = this.type.decode(this.stream, this.ctx);
            this.stream.pos = pos;
        }
        return this.items[index];
    }
    toArray() {
        const result = [];
        for(let i = 0, end = this.length; i < end; i++){
            result.push(this.get(i));
        }
        return result;
    }
}
}),
"[project]/node_modules/restructure/src/Bitfield.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bitfield",
    ()=>Bitfield
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
;
class Bitfield extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(type, flags = []){
        super();
        this.type = type;
        this.flags = flags;
    }
    decode(stream) {
        const val = this.type.decode(stream);
        const res = {};
        for(let i = 0; i < this.flags.length; i++){
            const flag = this.flags[i];
            if (flag != null) {
                res[flag] = !!(val & 1 << i);
            }
        }
        return res;
    }
    size() {
        return this.type.size();
    }
    encode(stream, keys) {
        let val = 0;
        for(let i = 0; i < this.flags.length; i++){
            const flag = this.flags[i];
            if (flag != null) {
                if (keys[flag]) {
                    val |= 1 << i;
                }
            }
        }
        return this.type.encode(stream, val);
    }
}
}),
"[project]/node_modules/restructure/src/Boolean.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Boolean",
    ()=>BooleanT,
    "BooleanT",
    ()=>BooleanT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
;
class BooleanT extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(type){
        super();
        this.type = type;
    }
    decode(stream, parent) {
        return !!this.type.decode(stream, parent);
    }
    size(val, parent) {
        return this.type.size(val, parent);
    }
    encode(stream, val, parent) {
        return this.type.encode(stream, +val, parent);
    }
}
;
}),
"[project]/node_modules/restructure/src/Buffer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Buffer",
    ()=>BufferT,
    "BufferT",
    ()=>BufferT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Number.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)");
;
;
;
class BufferT extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(length){
        super();
        this.length = length;
    }
    decode(stream, parent) {
        const length = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLength"](this.length, stream, parent);
        return stream.readBuffer(length);
    }
    size(val, parent) {
        if (!val) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLength"](this.length, null, parent);
        }
        let len = val.length;
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            len += this.length.size();
        }
        return len;
    }
    encode(stream, buf, parent) {
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            this.length.encode(stream, buf.length);
        }
        return stream.writeBuffer(buf);
    }
}
;
}),
"[project]/node_modules/restructure/src/Enum.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Enum",
    ()=>Enum
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
;
class Enum extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(type, options = []){
        super();
        this.type = type;
        this.options = options;
    }
    decode(stream) {
        const index = this.type.decode(stream);
        return this.options[index] || index;
    }
    size() {
        return this.type.size();
    }
    encode(stream, val) {
        const index = this.options.indexOf(val);
        if (index === -1) {
            throw new Error(`Unknown option in enum: ${val}`);
        }
        return this.type.encode(stream, index);
    }
}
}),
"[project]/node_modules/restructure/src/Optional.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Optional",
    ()=>Optional
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
;
class Optional extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(type, condition = true){
        super();
        this.type = type;
        this.condition = condition;
    }
    decode(stream, parent) {
        let { condition } = this;
        if (typeof condition === 'function') {
            condition = condition.call(parent, parent);
        }
        if (condition) {
            return this.type.decode(stream, parent);
        }
    }
    size(val, parent) {
        let { condition } = this;
        if (typeof condition === 'function') {
            condition = condition.call(parent, parent);
        }
        if (condition) {
            return this.type.size(val, parent);
        } else {
            return 0;
        }
    }
    encode(stream, val, parent) {
        let { condition } = this;
        if (typeof condition === 'function') {
            condition = condition.call(parent, parent);
        }
        if (condition) {
            return this.type.encode(stream, val, parent);
        }
    }
}
}),
"[project]/node_modules/restructure/src/Reserved.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reserved",
    ()=>Reserved
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)");
;
;
class Reserved extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(type, count = 1){
        super();
        this.type = type;
        this.count = count;
    }
    decode(stream, parent) {
        stream.pos += this.size(null, parent);
        return undefined;
    }
    size(data, parent) {
        const count = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLength"](this.count, null, parent);
        return this.type.size() * count;
    }
    encode(stream, val, parent) {
        return stream.fill(0, this.size(val, parent));
    }
}
}),
"[project]/node_modules/restructure/src/String.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "String",
    ()=>StringT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Number.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)");
;
;
;
class StringT extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(length, encoding = 'ascii'){
        super();
        this.length = length;
        this.encoding = encoding;
    }
    decode(stream, parent) {
        let length, pos;
        let { encoding } = this;
        if (typeof encoding === 'function') {
            encoding = encoding.call(parent, parent) || 'ascii';
        }
        let width = encodingWidth(encoding);
        if (this.length != null) {
            length = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLength"](this.length, stream, parent);
        } else {
            let buffer;
            ({ buffer, length, pos } = stream);
            while(pos < length - width + 1 && (buffer[pos] !== 0x00 || width === 2 && buffer[pos + 1] !== 0x00)){
                pos += width;
            }
            length = pos - stream.pos;
        }
        const string = stream.readString(length, encoding);
        if (this.length == null && stream.pos < stream.length) {
            stream.pos += width;
        }
        return string;
    }
    size(val, parent) {
        // Use the defined value if no value was given
        if (val === undefined || val === null) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveLength"](this.length, null, parent);
        }
        let { encoding } = this;
        if (typeof encoding === 'function') {
            encoding = encoding.call(parent != null ? parent.val : undefined, parent != null ? parent.val : undefined) || 'ascii';
        }
        if (encoding === 'utf16be') {
            encoding = 'utf16le';
        }
        let size = byteLength(val, encoding);
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            size += this.length.size();
        }
        if (this.length == null) {
            size += encodingWidth(encoding);
        }
        return size;
    }
    encode(stream, val, parent) {
        let { encoding } = this;
        if (typeof encoding === 'function') {
            encoding = encoding.call(parent != null ? parent.val : undefined, parent != null ? parent.val : undefined) || 'ascii';
        }
        if (this.length instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Number"]) {
            this.length.encode(stream, byteLength(val, encoding));
        }
        stream.writeString(val, encoding);
        if (this.length == null) {
            return encodingWidth(encoding) == 2 ? stream.writeUInt16LE(0x0000) : stream.writeUInt8(0x00);
        }
    }
}
function encodingWidth(encoding) {
    switch(encoding){
        case 'ascii':
        case 'utf8':
            return 1;
        case 'utf16le':
        case 'utf16-le':
        case 'utf-16be':
        case 'utf-16le':
        case 'utf16be':
        case 'utf16-be':
        case 'ucs2':
            return 2;
        default:
            //TODO: assume all other encodings are 1-byters
            //throw new Error('Unknown encoding ' + encoding);
            return 1;
    }
}
function byteLength(string, encoding) {
    switch(encoding){
        case 'ascii':
            return string.length;
        case 'utf8':
            let len = 0;
            for(let i = 0; i < string.length; i++){
                let c = string.charCodeAt(i);
                if (c >= 0xd800 && c <= 0xdbff && i < string.length - 1) {
                    let c2 = string.charCodeAt(++i);
                    if ((c2 & 0xfc00) === 0xdc00) {
                        c = ((c & 0x3ff) << 10) + (c2 & 0x3ff) + 0x10000;
                    } else {
                        // unmatched surrogate.
                        i--;
                    }
                }
                if ((c & 0xffffff80) === 0) {
                    len++;
                } else if ((c & 0xfffff800) === 0) {
                    len += 2;
                } else if ((c & 0xffff0000) === 0) {
                    len += 3;
                } else if ((c & 0xffe00000) === 0) {
                    len += 4;
                }
            }
            return len;
        case 'utf16le':
        case 'utf16-le':
        case 'utf16be':
        case 'utf16-be':
        case 'ucs2':
            return string.length * 2;
        default:
            throw new Error('Unknown encoding ' + encoding);
    }
}
;
}),
"[project]/node_modules/restructure/src/Struct.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Struct",
    ()=>Struct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)");
;
;
class Struct extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(fields = {}){
        super();
        this.fields = fields;
    }
    decode(stream, parent, length = 0) {
        const res = this._setup(stream, parent, length);
        this._parseFields(stream, res, this.fields);
        if (this.process != null) {
            this.process.call(res, stream);
        }
        return res;
    }
    _setup(stream, parent, length) {
        const res = {};
        // define hidden properties
        Object.defineProperties(res, {
            parent: {
                value: parent
            },
            _startOffset: {
                value: stream.pos
            },
            _currentOffset: {
                value: 0,
                writable: true
            },
            _length: {
                value: length
            }
        });
        return res;
    }
    _parseFields(stream, res, fields) {
        for(let key in fields){
            var val;
            const type = fields[key];
            if (typeof type === 'function') {
                val = type.call(res, res);
            } else {
                val = type.decode(stream, res);
            }
            if (val !== undefined) {
                if (val instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PropertyDescriptor"]) {
                    Object.defineProperty(res, key, val);
                } else {
                    res[key] = val;
                }
            }
            res._currentOffset = stream.pos - res._startOffset;
        }
    }
    size(val, parent, includePointers = true) {
        if (val == null) {
            val = {};
        }
        const ctx = {
            parent,
            val,
            pointerSize: 0
        };
        if (this.preEncode != null) {
            this.preEncode.call(val);
        }
        let size = 0;
        for(let key in this.fields){
            const type = this.fields[key];
            if (type.size != null) {
                size += type.size(val[key], ctx);
            }
        }
        if (includePointers) {
            size += ctx.pointerSize;
        }
        return size;
    }
    encode(stream, val, parent) {
        let type;
        if (this.preEncode != null) {
            this.preEncode.call(val, stream);
        }
        const ctx = {
            pointers: [],
            startOffset: stream.pos,
            parent,
            val,
            pointerSize: 0
        };
        ctx.pointerOffset = stream.pos + this.size(val, ctx, false);
        for(let key in this.fields){
            type = this.fields[key];
            if (type.encode != null) {
                type.encode(stream, val[key], ctx);
            }
        }
        let i = 0;
        while(i < ctx.pointers.length){
            const ptr = ctx.pointers[i++];
            ptr.type.encode(stream, ptr.val, ptr.parent);
        }
    }
}
}),
"[project]/node_modules/restructure/src/VersionedStruct.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VersionedStruct",
    ()=>VersionedStruct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Struct$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Struct.js [app-route] (ecmascript)");
;
const getPath = (object, pathArray)=>{
    return pathArray.reduce((prevObj, key)=>prevObj && prevObj[key], object);
};
class VersionedStruct extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Struct$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Struct"] {
    constructor(type, versions = {}){
        super();
        this.type = type;
        this.versions = versions;
        if (typeof type === 'string') {
            this.versionPath = type.split('.');
        }
    }
    decode(stream, parent, length = 0) {
        const res = this._setup(stream, parent, length);
        if (typeof this.type === 'string') {
            res.version = getPath(parent, this.versionPath);
        } else {
            res.version = this.type.decode(stream);
        }
        if (this.versions.header) {
            this._parseFields(stream, res, this.versions.header);
        }
        const fields = this.versions[res.version];
        if (fields == null) {
            throw new Error(`Unknown version ${res.version}`);
        }
        if (fields instanceof VersionedStruct) {
            return fields.decode(stream, parent);
        }
        this._parseFields(stream, res, fields);
        if (this.process != null) {
            this.process.call(res, stream);
        }
        return res;
    }
    size(val, parent, includePointers = true) {
        let key, type;
        if (!val) {
            throw new Error('Not a fixed size');
        }
        if (this.preEncode != null) {
            this.preEncode.call(val);
        }
        const ctx = {
            parent,
            val,
            pointerSize: 0
        };
        let size = 0;
        if (typeof this.type !== 'string') {
            size += this.type.size(val.version, ctx);
        }
        if (this.versions.header) {
            for(key in this.versions.header){
                type = this.versions.header[key];
                if (type.size != null) {
                    size += type.size(val[key], ctx);
                }
            }
        }
        const fields = this.versions[val.version];
        if (fields == null) {
            throw new Error(`Unknown version ${val.version}`);
        }
        for(key in fields){
            type = fields[key];
            if (type.size != null) {
                size += type.size(val[key], ctx);
            }
        }
        if (includePointers) {
            size += ctx.pointerSize;
        }
        return size;
    }
    encode(stream, val, parent) {
        let key, type;
        if (this.preEncode != null) {
            this.preEncode.call(val, stream);
        }
        const ctx = {
            pointers: [],
            startOffset: stream.pos,
            parent,
            val,
            pointerSize: 0
        };
        ctx.pointerOffset = stream.pos + this.size(val, ctx, false);
        if (typeof this.type !== 'string') {
            this.type.encode(stream, val.version);
        }
        if (this.versions.header) {
            for(key in this.versions.header){
                type = this.versions.header[key];
                if (type.encode != null) {
                    type.encode(stream, val[key], ctx);
                }
            }
        }
        const fields = this.versions[val.version];
        for(key in fields){
            type = fields[key];
            if (type.encode != null) {
                type.encode(stream, val[key], ctx);
            }
        }
        let i = 0;
        while(i < ctx.pointers.length){
            const ptr = ctx.pointers[i++];
            ptr.type.encode(stream, ptr.val, ptr.parent);
        }
    }
}
}),
"[project]/node_modules/restructure/src/Pointer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pointer",
    ()=>Pointer,
    "VoidPointer",
    ()=>VoidPointer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Base.js [app-route] (ecmascript)");
;
;
class Pointer extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Base"] {
    constructor(offsetType, type, options = {}){
        super();
        this.offsetType = offsetType;
        this.type = type;
        this.options = options;
        if (this.type === 'void') {
            this.type = null;
        }
        if (this.options.type == null) {
            this.options.type = 'local';
        }
        if (this.options.allowNull == null) {
            this.options.allowNull = true;
        }
        if (this.options.nullValue == null) {
            this.options.nullValue = 0;
        }
        if (this.options.lazy == null) {
            this.options.lazy = false;
        }
        if (this.options.relativeTo) {
            if (typeof this.options.relativeTo !== 'function') {
                throw new Error('relativeTo option must be a function');
            }
            this.relativeToGetter = options.relativeTo;
        }
    }
    decode(stream, ctx) {
        const offset = this.offsetType.decode(stream, ctx);
        // handle NULL pointers
        if (offset === this.options.nullValue && this.options.allowNull) {
            return null;
        }
        let relative;
        switch(this.options.type){
            case 'local':
                relative = ctx._startOffset;
                break;
            case 'immediate':
                relative = stream.pos - this.offsetType.size();
                break;
            case 'parent':
                relative = ctx.parent._startOffset;
                break;
            default:
                var c = ctx;
                while(c.parent){
                    c = c.parent;
                }
                relative = c._startOffset || 0;
        }
        if (this.options.relativeTo) {
            relative += this.relativeToGetter(ctx);
        }
        const ptr = offset + relative;
        if (this.type != null) {
            let val = null;
            const decodeValue = ()=>{
                if (val != null) {
                    return val;
                }
                const { pos } = stream;
                stream.pos = ptr;
                val = this.type.decode(stream, ctx);
                stream.pos = pos;
                return val;
            };
            // If this is a lazy pointer, define a getter to decode only when needed.
            // This obviously only works when the pointer is contained by a Struct.
            if (this.options.lazy) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PropertyDescriptor"]({
                    get: decodeValue
                });
            }
            return decodeValue();
        } else {
            return ptr;
        }
    }
    size(val, ctx) {
        const parent = ctx;
        switch(this.options.type){
            case 'local':
            case 'immediate':
                break;
            case 'parent':
                ctx = ctx.parent;
                break;
            default:
                while(ctx.parent){
                    ctx = ctx.parent;
                }
        }
        let { type } = this;
        if (type == null) {
            if (!(val instanceof VoidPointer)) {
                throw new Error("Must be a VoidPointer");
            }
            ({ type } = val);
            val = val.value;
        }
        if (val && ctx) {
            // Must be written as two separate lines rather than += in case `type.size` mutates ctx.pointerSize.
            let size = type.size(val, parent);
            ctx.pointerSize += size;
        }
        return this.offsetType.size();
    }
    encode(stream, val, ctx) {
        let relative;
        const parent = ctx;
        if (val == null) {
            this.offsetType.encode(stream, this.options.nullValue);
            return;
        }
        switch(this.options.type){
            case 'local':
                relative = ctx.startOffset;
                break;
            case 'immediate':
                relative = stream.pos + this.offsetType.size(val, parent);
                break;
            case 'parent':
                ctx = ctx.parent;
                relative = ctx.startOffset;
                break;
            default:
                relative = 0;
                while(ctx.parent){
                    ctx = ctx.parent;
                }
        }
        if (this.options.relativeTo) {
            relative += this.relativeToGetter(parent.val);
        }
        this.offsetType.encode(stream, ctx.pointerOffset - relative);
        let { type } = this;
        if (type == null) {
            if (!(val instanceof VoidPointer)) {
                throw new Error("Must be a VoidPointer");
            }
            ({ type } = val);
            val = val.value;
        }
        ctx.pointers.push({
            type,
            val,
            parent
        });
        return ctx.pointerOffset += type.size(val, parent);
    }
}
class VoidPointer {
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}
}),
"[project]/node_modules/restructure/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$EncodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/EncodeStream.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$DecodeStream$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/DecodeStream.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$LazyArray$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/LazyArray.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Bitfield$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Bitfield.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Boolean.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Buffer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Buffer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Enum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Enum.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Optional$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Optional.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Reserved$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Reserved.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$String$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/String.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Struct$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Struct.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$VersionedStruct$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/VersionedStruct.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Number.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$restructure$2f$src$2f$Pointer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/restructure/src/Pointer.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/@swc/helpers/esm/_define_property.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
"[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript) <export __decorate as _>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__decorate"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-route] (ecmascript)");
}),
"[project]/node_modules/fast-deep-equal/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// do not edit .js files directly - edit src/index.jst
module.exports = function equal(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for(i = length; i-- !== 0;)if (!equal(a[i], b[i])) return false;
            return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for(i = length; i-- !== 0;)if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for(i = length; i-- !== 0;){
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
        }
        return true;
    }
    // true if both NaN, false otherwise
    return a !== a && b !== b;
};
}),
"[project]/node_modules/base64-js/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
    }
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=');
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join('');
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
    }
    return parts.join('');
}
}),
"[project]/node_modules/linebreak/node_modules/base64-js/lib/b64.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
;
(function(exports1) {
    'use strict';
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    var PLUS = '+'.charCodeAt(0);
    var SLASH = '/'.charCodeAt(0);
    var NUMBER = '0'.charCodeAt(0);
    var LOWER = 'a'.charCodeAt(0);
    var UPPER = 'A'.charCodeAt(0);
    var PLUS_URL_SAFE = '-'.charCodeAt(0);
    var SLASH_URL_SAFE = '_'.charCodeAt(0);
    function decode(elt) {
        var code = elt.charCodeAt(0);
        if (code === PLUS || code === PLUS_URL_SAFE) return 62 // '+'
        ;
        if (code === SLASH || code === SLASH_URL_SAFE) return 63 // '/'
        ;
        if (code < NUMBER) return -1 //no match
        ;
        if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
        if (code < UPPER + 26) return code - UPPER;
        if (code < LOWER + 26) return code - LOWER + 26;
    }
    function b64ToByteArray(b64) {
        var i, j, l, tmp, placeHolders, arr;
        if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
        }
        // the number of equal signs (place holders)
        // if there are two placeholders, than the two characters before it
        // represent one byte
        // if there is only one, then the three characters before it represent 2 bytes
        // this is just a cheap hack to not do indexOf twice
        var len = b64.length;
        placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;
        // base64 is 4/3 + up to two characters of the original data
        arr = new Arr(b64.length * 3 / 4 - placeHolders);
        // if there are placeholders, only get up to the last complete 4 chars
        l = placeHolders > 0 ? b64.length - 4 : b64.length;
        var L = 0;
        function push(v) {
            arr[L++] = v;
        }
        for(i = 0, j = 0; i < l; i += 4, j += 3){
            tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
            push((tmp & 0xFF0000) >> 16);
            push((tmp & 0xFF00) >> 8);
            push(tmp & 0xFF);
        }
        if (placeHolders === 2) {
            tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
            push(tmp & 0xFF);
        } else if (placeHolders === 1) {
            tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
            push(tmp >> 8 & 0xFF);
            push(tmp & 0xFF);
        }
        return arr;
    }
    function uint8ToBase64(uint8) {
        var i, extraBytes = uint8.length % 3, output = "", temp, length;
        function encode(num) {
            return lookup.charAt(num);
        }
        function tripletToBase64(num) {
            return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
        }
        // go through the array every three bytes, we'll deal with trailing stuff later
        for(i = 0, length = uint8.length - extraBytes; i < length; i += 3){
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
            output += tripletToBase64(temp);
        }
        // pad the end with zeros, but make sure to not forget the extra bytes
        switch(extraBytes){
            case 1:
                temp = uint8[uint8.length - 1];
                output += encode(temp >> 2);
                output += encode(temp << 4 & 0x3F);
                output += '==';
                break;
            case 2:
                temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
                output += encode(temp >> 10);
                output += encode(temp >> 4 & 0x3F);
                output += encode(temp << 2 & 0x3F);
                output += '=';
                break;
        }
        return output;
    }
    exports1.toByteArray = b64ToByteArray;
    exports1.fromByteArray = uint8ToBase64;
})(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : exports);
}),
"[project]/node_modules/tiny-inflate/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var TINF_OK = 0;
var TINF_DATA_ERROR = -3;
function Tree() {
    this.table = new Uint16Array(16); /* table of code length counts */ 
    this.trans = new Uint16Array(288); /* code -> symbol translation table */ 
}
function Data(source, dest) {
    this.source = source;
    this.sourceIndex = 0;
    this.tag = 0;
    this.bitcount = 0;
    this.dest = dest;
    this.destLen = 0;
    this.ltree = new Tree(); /* dynamic length/symbol tree */ 
    this.dtree = new Tree(); /* dynamic distance tree */ 
}
/* --------------------------------------------------- *
 * -- uninitialized global data (static structures) -- *
 * --------------------------------------------------- */ var sltree = new Tree();
var sdtree = new Tree();
/* extra bits and base tables for length codes */ var length_bits = new Uint8Array(30);
var length_base = new Uint16Array(30);
/* extra bits and base tables for distance codes */ var dist_bits = new Uint8Array(30);
var dist_base = new Uint16Array(30);
/* special ordering of code length codes */ var clcidx = new Uint8Array([
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
]);
/* used by tinf_decode_trees, avoids allocations every call */ var code_tree = new Tree();
var lengths = new Uint8Array(288 + 32);
/* ----------------------- *
 * -- utility functions -- *
 * ----------------------- */ /* build extra bits and base tables */ function tinf_build_bits_base(bits, base, delta, first) {
    var i, sum;
    /* build bits table */ for(i = 0; i < delta; ++i)bits[i] = 0;
    for(i = 0; i < 30 - delta; ++i)bits[i + delta] = i / delta | 0;
    /* build base table */ for(sum = first, i = 0; i < 30; ++i){
        base[i] = sum;
        sum += 1 << bits[i];
    }
}
/* build the fixed huffman trees */ function tinf_build_fixed_trees(lt, dt) {
    var i;
    /* build fixed length tree */ for(i = 0; i < 7; ++i)lt.table[i] = 0;
    lt.table[7] = 24;
    lt.table[8] = 152;
    lt.table[9] = 112;
    for(i = 0; i < 24; ++i)lt.trans[i] = 256 + i;
    for(i = 0; i < 144; ++i)lt.trans[24 + i] = i;
    for(i = 0; i < 8; ++i)lt.trans[24 + 144 + i] = 280 + i;
    for(i = 0; i < 112; ++i)lt.trans[24 + 144 + 8 + i] = 144 + i;
    /* build fixed distance tree */ for(i = 0; i < 5; ++i)dt.table[i] = 0;
    dt.table[5] = 32;
    for(i = 0; i < 32; ++i)dt.trans[i] = i;
}
/* given an array of code lengths, build a tree */ var offs = new Uint16Array(16);
function tinf_build_tree(t, lengths, off, num) {
    var i, sum;
    /* clear code length count table */ for(i = 0; i < 16; ++i)t.table[i] = 0;
    /* scan symbol lengths, and sum code length counts */ for(i = 0; i < num; ++i)t.table[lengths[off + i]]++;
    t.table[0] = 0;
    /* compute offset table for distribution sort */ for(sum = 0, i = 0; i < 16; ++i){
        offs[i] = sum;
        sum += t.table[i];
    }
    /* create code->symbol translation table (symbols sorted by code) */ for(i = 0; i < num; ++i){
        if (lengths[off + i]) t.trans[offs[lengths[off + i]]++] = i;
    }
}
/* ---------------------- *
 * -- decode functions -- *
 * ---------------------- */ /* get one bit from source stream */ function tinf_getbit(d) {
    /* check if tag is empty */ if (!d.bitcount--) {
        /* load next tag */ d.tag = d.source[d.sourceIndex++];
        d.bitcount = 7;
    }
    /* shift bit out of tag */ var bit = d.tag & 1;
    d.tag >>>= 1;
    return bit;
}
/* read a num bit value from a stream and add base */ function tinf_read_bits(d, num, base) {
    if (!num) return base;
    while(d.bitcount < 24){
        d.tag |= d.source[d.sourceIndex++] << d.bitcount;
        d.bitcount += 8;
    }
    var val = d.tag & 0xffff >>> 16 - num;
    d.tag >>>= num;
    d.bitcount -= num;
    return val + base;
}
/* given a data stream and a tree, decode a symbol */ function tinf_decode_symbol(d, t) {
    while(d.bitcount < 24){
        d.tag |= d.source[d.sourceIndex++] << d.bitcount;
        d.bitcount += 8;
    }
    var sum = 0, cur = 0, len = 0;
    var tag = d.tag;
    /* get more bits while code value is above sum */ do {
        cur = 2 * cur + (tag & 1);
        tag >>>= 1;
        ++len;
        sum += t.table[len];
        cur -= t.table[len];
    }while (cur >= 0)
    d.tag = tag;
    d.bitcount -= len;
    return t.trans[sum + cur];
}
/* given a data stream, decode dynamic trees from it */ function tinf_decode_trees(d, lt, dt) {
    var hlit, hdist, hclen;
    var i, num, length;
    /* get 5 bits HLIT (257-286) */ hlit = tinf_read_bits(d, 5, 257);
    /* get 5 bits HDIST (1-32) */ hdist = tinf_read_bits(d, 5, 1);
    /* get 4 bits HCLEN (4-19) */ hclen = tinf_read_bits(d, 4, 4);
    for(i = 0; i < 19; ++i)lengths[i] = 0;
    /* read code lengths for code length alphabet */ for(i = 0; i < hclen; ++i){
        /* get 3 bits code length (0-7) */ var clen = tinf_read_bits(d, 3, 0);
        lengths[clcidx[i]] = clen;
    }
    /* build code length tree */ tinf_build_tree(code_tree, lengths, 0, 19);
    /* decode code lengths for the dynamic trees */ for(num = 0; num < hlit + hdist;){
        var sym = tinf_decode_symbol(d, code_tree);
        switch(sym){
            case 16:
                /* copy previous code length 3-6 times (read 2 bits) */ var prev = lengths[num - 1];
                for(length = tinf_read_bits(d, 2, 3); length; --length){
                    lengths[num++] = prev;
                }
                break;
            case 17:
                /* repeat code length 0 for 3-10 times (read 3 bits) */ for(length = tinf_read_bits(d, 3, 3); length; --length){
                    lengths[num++] = 0;
                }
                break;
            case 18:
                /* repeat code length 0 for 11-138 times (read 7 bits) */ for(length = tinf_read_bits(d, 7, 11); length; --length){
                    lengths[num++] = 0;
                }
                break;
            default:
                /* values 0-15 represent the actual code lengths */ lengths[num++] = sym;
                break;
        }
    }
    /* build dynamic trees */ tinf_build_tree(lt, lengths, 0, hlit);
    tinf_build_tree(dt, lengths, hlit, hdist);
}
/* ----------------------------- *
 * -- block inflate functions -- *
 * ----------------------------- */ /* given a stream and two trees, inflate a block of data */ function tinf_inflate_block_data(d, lt, dt) {
    while(1){
        var sym = tinf_decode_symbol(d, lt);
        /* check for end of block */ if (sym === 256) {
            return TINF_OK;
        }
        if (sym < 256) {
            d.dest[d.destLen++] = sym;
        } else {
            var length, dist, offs;
            var i;
            sym -= 257;
            /* possibly get more bits from length code */ length = tinf_read_bits(d, length_bits[sym], length_base[sym]);
            dist = tinf_decode_symbol(d, dt);
            /* possibly get more bits from distance code */ offs = d.destLen - tinf_read_bits(d, dist_bits[dist], dist_base[dist]);
            /* copy match */ for(i = offs; i < offs + length; ++i){
                d.dest[d.destLen++] = d.dest[i];
            }
        }
    }
}
/* inflate an uncompressed block of data */ function tinf_inflate_uncompressed_block(d) {
    var length, invlength;
    var i;
    /* unread from bitbuffer */ while(d.bitcount > 8){
        d.sourceIndex--;
        d.bitcount -= 8;
    }
    /* get length */ length = d.source[d.sourceIndex + 1];
    length = 256 * length + d.source[d.sourceIndex];
    /* get one's complement of length */ invlength = d.source[d.sourceIndex + 3];
    invlength = 256 * invlength + d.source[d.sourceIndex + 2];
    /* check length */ if (length !== (~invlength & 0x0000ffff)) return TINF_DATA_ERROR;
    d.sourceIndex += 4;
    /* copy block */ for(i = length; i; --i)d.dest[d.destLen++] = d.source[d.sourceIndex++];
    /* make sure we start next block on a byte boundary */ d.bitcount = 0;
    return TINF_OK;
}
/* inflate stream from source to dest */ function tinf_uncompress(source, dest) {
    var d = new Data(source, dest);
    var bfinal, btype, res;
    do {
        /* read final block flag */ bfinal = tinf_getbit(d);
        /* read block type (2 bits) */ btype = tinf_read_bits(d, 2, 0);
        /* decompress block */ switch(btype){
            case 0:
                /* decompress uncompressed block */ res = tinf_inflate_uncompressed_block(d);
                break;
            case 1:
                /* decompress block with fixed huffman trees */ res = tinf_inflate_block_data(d, sltree, sdtree);
                break;
            case 2:
                /* decompress block with dynamic huffman trees */ tinf_decode_trees(d, d.ltree, d.dtree);
                res = tinf_inflate_block_data(d, d.ltree, d.dtree);
                break;
            default:
                res = TINF_DATA_ERROR;
        }
        if (res !== TINF_OK) throw new Error('Data error');
    }while (!bfinal)
    if (d.destLen < d.dest.length) {
        if (typeof d.dest.slice === 'function') return d.dest.slice(0, d.destLen);
        else return d.dest.subarray(0, d.destLen);
    }
    return d.dest;
}
/* -------------------- *
 * -- initialization -- *
 * -------------------- */ /* build fixed huffman trees */ tinf_build_fixed_trees(sltree, sdtree);
/* build extra bits and base tables */ tinf_build_bits_base(length_bits, length_base, 4, 3);
tinf_build_bits_base(dist_bits, dist_base, 2, 1);
/* fix a special case */ length_bits[28] = 0;
length_base[28] = 258;
module.exports = tinf_uncompress;
}),
"[project]/node_modules/unicode-trie/swap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const isBigEndian = new Uint8Array(new Uint32Array([
    0x12345678
]).buffer)[0] === 0x12;
const swap = (b, n, m)=>{
    let i = b[n];
    b[n] = b[m];
    b[m] = i;
};
const swap32 = (array)=>{
    const len = array.length;
    for(let i = 0; i < len; i += 4){
        swap(array, i, i + 3);
        swap(array, i + 1, i + 2);
    }
};
const swap32LE = (array)=>{
    if (isBigEndian) {
        swap32(array);
    }
};
module.exports = {
    swap32LE: swap32LE
};
}),
"[project]/node_modules/unicode-trie/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const inflate = __turbopack_context__.r("[project]/node_modules/tiny-inflate/index.js [app-route] (ecmascript)");
const { swap32LE } = __turbopack_context__.r("[project]/node_modules/unicode-trie/swap.js [app-route] (ecmascript)");
// Shift size for getting the index-1 table offset.
const SHIFT_1 = 6 + 5;
// Shift size for getting the index-2 table offset.
const SHIFT_2 = 5;
// Difference between the two shift sizes,
// for getting an index-1 offset from an index-2 offset. 6=11-5
const SHIFT_1_2 = SHIFT_1 - SHIFT_2;
// Number of index-1 entries for the BMP. 32=0x20
// This part of the index-1 table is omitted from the serialized form.
const OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> SHIFT_1;
// Number of entries in an index-2 block. 64=0x40
const INDEX_2_BLOCK_LENGTH = 1 << SHIFT_1_2;
// Mask for getting the lower bits for the in-index-2-block offset. */
const INDEX_2_MASK = INDEX_2_BLOCK_LENGTH - 1;
// Shift size for shifting left the index array values.
// Increases possible data size with 16-bit index values at the cost
// of compactability.
// This requires data blocks to be aligned by DATA_GRANULARITY.
const INDEX_SHIFT = 2;
// Number of entries in a data block. 32=0x20
const DATA_BLOCK_LENGTH = 1 << SHIFT_2;
// Mask for getting the lower bits for the in-data-block offset.
const DATA_MASK = DATA_BLOCK_LENGTH - 1;
// The part of the index-2 table for U+D800..U+DBFF stores values for
// lead surrogate code _units_ not code _points_.
// Values for lead surrogate code _points_ are indexed with this portion of the table.
// Length=32=0x20=0x400>>SHIFT_2. (There are 1024=0x400 lead surrogates.)
const LSCP_INDEX_2_OFFSET = 0x10000 >> SHIFT_2;
const LSCP_INDEX_2_LENGTH = 0x400 >> SHIFT_2;
// Count the lengths of both BMP pieces. 2080=0x820
const INDEX_2_BMP_LENGTH = LSCP_INDEX_2_OFFSET + LSCP_INDEX_2_LENGTH;
// The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
// Length 32=0x20 for lead bytes C0..DF, regardless of SHIFT_2.
const UTF8_2B_INDEX_2_OFFSET = INDEX_2_BMP_LENGTH;
const UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; // U+0800 is the first code point after 2-byte UTF-8
// The index-1 table, only used for supplementary code points, at offset 2112=0x840.
// Variable length, for code points up to highStart, where the last single-value range starts.
// Maximum length 512=0x200=0x100000>>SHIFT_1.
// (For 0x100000 supplementary code points U+10000..U+10ffff.)
//
// The part of the index-2 table for supplementary code points starts
// after this index-1 table.
//
// Both the index-1 table and the following part of the index-2 table
// are omitted completely if there is only BMP data.
const INDEX_1_OFFSET = UTF8_2B_INDEX_2_OFFSET + UTF8_2B_INDEX_2_LENGTH;
// The alignment size of a data block. Also the granularity for compaction.
const DATA_GRANULARITY = 1 << INDEX_SHIFT;
class UnicodeTrie {
    constructor(data){
        const isBuffer = typeof data.readUInt32BE === 'function' && typeof data.slice === 'function';
        if (isBuffer || data instanceof Uint8Array) {
            // read binary format
            let uncompressedLength;
            if (isBuffer) {
                this.highStart = data.readUInt32LE(0);
                this.errorValue = data.readUInt32LE(4);
                uncompressedLength = data.readUInt32LE(8);
                data = data.slice(12);
            } else {
                const view = new DataView(data.buffer);
                this.highStart = view.getUint32(0, true);
                this.errorValue = view.getUint32(4, true);
                uncompressedLength = view.getUint32(8, true);
                data = data.subarray(12);
            }
            // double inflate the actual trie data
            data = inflate(data, new Uint8Array(uncompressedLength));
            data = inflate(data, new Uint8Array(uncompressedLength));
            // swap bytes from little-endian
            swap32LE(data);
            this.data = new Uint32Array(data.buffer);
        } else {
            // pre-parsed data
            ({ data: this.data, highStart: this.highStart, errorValue: this.errorValue } = data);
        }
    }
    get(codePoint) {
        let index;
        if (codePoint < 0 || codePoint > 0x10ffff) {
            return this.errorValue;
        }
        if (codePoint < 0xd800 || codePoint > 0xdbff && codePoint <= 0xffff) {
            // Ordinary BMP code point, excluding leading surrogates.
            // BMP uses a single level lookup.  BMP index starts at offset 0 in the index.
            // data is stored in the index array itself.
            index = (this.data[codePoint >> SHIFT_2] << INDEX_SHIFT) + (codePoint & DATA_MASK);
            return this.data[index];
        }
        if (codePoint <= 0xffff) {
            // Lead Surrogate Code Point.  A Separate index section is stored for
            // lead surrogate code units and code points.
            //   The main index has the code unit data.
            //   For this function, we need the code point data.
            index = (this.data[LSCP_INDEX_2_OFFSET + (codePoint - 0xd800 >> SHIFT_2)] << INDEX_SHIFT) + (codePoint & DATA_MASK);
            return this.data[index];
        }
        if (codePoint < this.highStart) {
            // Supplemental code point, use two-level lookup.
            index = this.data[INDEX_1_OFFSET - OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> SHIFT_1)];
            index = this.data[index + (codePoint >> SHIFT_2 & INDEX_2_MASK)];
            index = (index << INDEX_SHIFT) + (codePoint & DATA_MASK);
            return this.data[index];
        }
        return this.data[this.data.length - DATA_GRANULARITY];
    }
}
module.exports = UnicodeTrie;
}),
"[project]/node_modules/unicode-properties/dist/module.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>$747425b437e121da$export$2e2bcd8739ae039,
    "getCategory",
    ()=>$747425b437e121da$export$410364bbb673ddbc,
    "getCombiningClass",
    ()=>$747425b437e121da$export$c03b919c6651ed55,
    "getEastAsianWidth",
    ()=>$747425b437e121da$export$92f6187db8ca6d26,
    "getNumericValue",
    ()=>$747425b437e121da$export$7d1258ebb7625a0d,
    "getScript",
    ()=>$747425b437e121da$export$941569448d136665,
    "isAlphabetic",
    ()=>$747425b437e121da$export$52c8ea63abd07594,
    "isBaseForm",
    ()=>$747425b437e121da$export$a11bdcffe109e74b,
    "isDigit",
    ()=>$747425b437e121da$export$727d9dbc4fbb948f,
    "isLowerCase",
    ()=>$747425b437e121da$export$7b6804e8df61fcf5,
    "isMark",
    ()=>$747425b437e121da$export$e33ad6871e762338,
    "isPunctuation",
    ()=>$747425b437e121da$export$a5b49f4dc6a07d2c,
    "isTitleCase",
    ()=>$747425b437e121da$export$de8b4ee23b2cf823,
    "isUpperCase",
    ()=>$747425b437e121da$export$aebd617640818cda,
    "isWhiteSpace",
    ()=>$747425b437e121da$export$3c52dd84024ae72c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/base64-js/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unicode$2d$trie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unicode-trie/index.js [app-route] (ecmascript)");
;
;
function $parcel$interopDefault(a) {
    return a && a.__esModule ? a.default : a;
}
var $f4087201da764553$exports = {};
$f4087201da764553$exports = JSON.parse('{"categories":["Cc","Zs","Po","Sc","Ps","Pe","Sm","Pd","Nd","Lu","Sk","Pc","Ll","So","Lo","Pi","Cf","No","Pf","Lt","Lm","Mn","Me","Mc","Nl","Zl","Zp","Cs","Co"],"combiningClasses":["Not_Reordered","Above","Above_Right","Below","Attached_Above_Right","Attached_Below","Overlay","Iota_Subscript","Double_Below","Double_Above","Below_Right","Above_Left","CCC10","CCC11","CCC12","CCC13","CCC14","CCC15","CCC16","CCC17","CCC18","CCC19","CCC20","CCC21","CCC22","CCC23","CCC24","CCC25","CCC30","CCC31","CCC32","CCC27","CCC28","CCC29","CCC33","CCC34","CCC35","CCC36","Nukta","Virama","CCC84","CCC91","CCC103","CCC107","CCC118","CCC122","CCC129","CCC130","CCC132","Attached_Above","Below_Left","Left","Kana_Voicing","CCC26","Right"],"scripts":["Common","Latin","Bopomofo","Inherited","Greek","Coptic","Cyrillic","Armenian","Hebrew","Arabic","Syriac","Thaana","Nko","Samaritan","Mandaic","Devanagari","Bengali","Gurmukhi","Gujarati","Oriya","Tamil","Telugu","Kannada","Malayalam","Sinhala","Thai","Lao","Tibetan","Myanmar","Georgian","Hangul","Ethiopic","Cherokee","Canadian_Aboriginal","Ogham","Runic","Tagalog","Hanunoo","Buhid","Tagbanwa","Khmer","Mongolian","Limbu","Tai_Le","New_Tai_Lue","Buginese","Tai_Tham","Balinese","Sundanese","Batak","Lepcha","Ol_Chiki","Braille","Glagolitic","Tifinagh","Han","Hiragana","Katakana","Yi","Lisu","Vai","Bamum","Syloti_Nagri","Phags_Pa","Saurashtra","Kayah_Li","Rejang","Javanese","Cham","Tai_Viet","Meetei_Mayek","null","Linear_B","Lycian","Carian","Old_Italic","Gothic","Old_Permic","Ugaritic","Old_Persian","Deseret","Shavian","Osmanya","Osage","Elbasan","Caucasian_Albanian","Linear_A","Cypriot","Imperial_Aramaic","Palmyrene","Nabataean","Hatran","Phoenician","Lydian","Meroitic_Hieroglyphs","Meroitic_Cursive","Kharoshthi","Old_South_Arabian","Old_North_Arabian","Manichaean","Avestan","Inscriptional_Parthian","Inscriptional_Pahlavi","Psalter_Pahlavi","Old_Turkic","Old_Hungarian","Hanifi_Rohingya","Old_Sogdian","Sogdian","Elymaic","Brahmi","Kaithi","Sora_Sompeng","Chakma","Mahajani","Sharada","Khojki","Multani","Khudawadi","Grantha","Newa","Tirhuta","Siddham","Modi","Takri","Ahom","Dogra","Warang_Citi","Nandinagari","Zanabazar_Square","Soyombo","Pau_Cin_Hau","Bhaiksuki","Marchen","Masaram_Gondi","Gunjala_Gondi","Makasar","Cuneiform","Egyptian_Hieroglyphs","Anatolian_Hieroglyphs","Mro","Bassa_Vah","Pahawh_Hmong","Medefaidrin","Miao","Tangut","Nushu","Duployan","SignWriting","Nyiakeng_Puachue_Hmong","Wancho","Mende_Kikakui","Adlam"],"eaw":["N","Na","A","W","H","F"]}');
const $747425b437e121da$var$trie = new (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unicode$2d$trie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]).toByteArray("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"));
const $747425b437e121da$var$log2 = Math.log2 || ((n)=>Math.log(n) / Math.LN2);
const $747425b437e121da$var$bits = (n)=>$747425b437e121da$var$log2(n) + 1 | 0;
// compute the number of bits stored for each field
const $747425b437e121da$var$CATEGORY_BITS = $747425b437e121da$var$bits((0, /*@__PURE__*/ $parcel$interopDefault($f4087201da764553$exports)).categories.length - 1);
const $747425b437e121da$var$COMBINING_BITS = $747425b437e121da$var$bits((0, /*@__PURE__*/ $parcel$interopDefault($f4087201da764553$exports)).combiningClasses.length - 1);
const $747425b437e121da$var$SCRIPT_BITS = $747425b437e121da$var$bits((0, /*@__PURE__*/ $parcel$interopDefault($f4087201da764553$exports)).scripts.length - 1);
const $747425b437e121da$var$EAW_BITS = $747425b437e121da$var$bits((0, /*@__PURE__*/ $parcel$interopDefault($f4087201da764553$exports)).eaw.length - 1);
const $747425b437e121da$var$NUMBER_BITS = 10;
// compute shift and mask values for each field
const $747425b437e121da$var$CATEGORY_SHIFT = $747425b437e121da$var$COMBINING_BITS + $747425b437e121da$var$SCRIPT_BITS + $747425b437e121da$var$EAW_BITS + $747425b437e121da$var$NUMBER_BITS;
const $747425b437e121da$var$COMBINING_SHIFT = $747425b437e121da$var$SCRIPT_BITS + $747425b437e121da$var$EAW_BITS + $747425b437e121da$var$NUMBER_BITS;
const $747425b437e121da$var$SCRIPT_SHIFT = $747425b437e121da$var$EAW_BITS + $747425b437e121da$var$NUMBER_BITS;
const $747425b437e121da$var$EAW_SHIFT = $747425b437e121da$var$NUMBER_BITS;
const $747425b437e121da$var$CATEGORY_MASK = (1 << $747425b437e121da$var$CATEGORY_BITS) - 1;
const $747425b437e121da$var$COMBINING_MASK = (1 << $747425b437e121da$var$COMBINING_BITS) - 1;
const $747425b437e121da$var$SCRIPT_MASK = (1 << $747425b437e121da$var$SCRIPT_BITS) - 1;
const $747425b437e121da$var$EAW_MASK = (1 << $747425b437e121da$var$EAW_BITS) - 1;
const $747425b437e121da$var$NUMBER_MASK = (1 << $747425b437e121da$var$NUMBER_BITS) - 1;
function $747425b437e121da$export$410364bbb673ddbc(codePoint) {
    const val = $747425b437e121da$var$trie.get(codePoint);
    return (0, /*@__PURE__*/ $parcel$interopDefault($f4087201da764553$exports)).categories[val >> $747425b437e121da$var$CATEGORY_SHIFT & $747425b437e121da$var$CATEGORY_MASK];
}
function $747425b437e121da$export$c03b919c6651ed55(codePoint) {
    const val = $747425b437e121da$var$trie.get(codePoint);
    return (0, /*@__PURE__*/ $parcel$interopDefault($f4087201da764553$exports)).combiningClasses[val >> $747425b437e121da$var$COMBINING_SHIFT & $747425b437e121da$var$COMBINING_MASK];
}
function $747425b437e121da$export$941569448d136665(codePoint) {
    const val = $747425b437e121da$var$trie.get(codePoint);
    return (0, /*@__PURE__*/ $parcel$interopDefault($f4087201da764553$exports)).scripts[val >> $747425b437e121da$var$SCRIPT_SHIFT & $747425b437e121da$var$SCRIPT_MASK];
}
function $747425b437e121da$export$92f6187db8ca6d26(codePoint) {
    const val = $747425b437e121da$var$trie.get(codePoint);
    return (0, /*@__PURE__*/ $parcel$interopDefault($f4087201da764553$exports)).eaw[val >> $747425b437e121da$var$EAW_SHIFT & $747425b437e121da$var$EAW_MASK];
}
function $747425b437e121da$export$7d1258ebb7625a0d(codePoint) {
    let val = $747425b437e121da$var$trie.get(codePoint);
    let num = val & $747425b437e121da$var$NUMBER_MASK;
    if (num === 0) return null;
    else if (num <= 50) return num - 1;
    else if (num < 0x1e0) {
        const numerator = (num >> 4) - 12;
        const denominator = (num & 0xf) + 1;
        return numerator / denominator;
    } else if (num < 0x300) {
        val = (num >> 5) - 14;
        let exp = (num & 0x1f) + 2;
        while(exp > 0){
            val *= 10;
            exp--;
        }
        return val;
    } else {
        val = (num >> 2) - 0xbf;
        let exp = (num & 3) + 1;
        while(exp > 0){
            val *= 60;
            exp--;
        }
        return val;
    }
}
function $747425b437e121da$export$52c8ea63abd07594(codePoint) {
    const category = $747425b437e121da$export$410364bbb673ddbc(codePoint);
    return category === "Lu" || category === "Ll" || category === "Lt" || category === "Lm" || category === "Lo" || category === "Nl";
}
function $747425b437e121da$export$727d9dbc4fbb948f(codePoint) {
    return $747425b437e121da$export$410364bbb673ddbc(codePoint) === "Nd";
}
function $747425b437e121da$export$a5b49f4dc6a07d2c(codePoint) {
    const category = $747425b437e121da$export$410364bbb673ddbc(codePoint);
    return category === "Pc" || category === "Pd" || category === "Pe" || category === "Pf" || category === "Pi" || category === "Po" || category === "Ps";
}
function $747425b437e121da$export$7b6804e8df61fcf5(codePoint) {
    return $747425b437e121da$export$410364bbb673ddbc(codePoint) === "Ll";
}
function $747425b437e121da$export$aebd617640818cda(codePoint) {
    return $747425b437e121da$export$410364bbb673ddbc(codePoint) === "Lu";
}
function $747425b437e121da$export$de8b4ee23b2cf823(codePoint) {
    return $747425b437e121da$export$410364bbb673ddbc(codePoint) === "Lt";
}
function $747425b437e121da$export$3c52dd84024ae72c(codePoint) {
    const category = $747425b437e121da$export$410364bbb673ddbc(codePoint);
    return category === "Zs" || category === "Zl" || category === "Zp";
}
function $747425b437e121da$export$a11bdcffe109e74b(codePoint) {
    const category = $747425b437e121da$export$410364bbb673ddbc(codePoint);
    return category === "Nd" || category === "No" || category === "Nl" || category === "Lu" || category === "Ll" || category === "Lt" || category === "Lm" || category === "Lo" || category === "Me" || category === "Mc";
}
function $747425b437e121da$export$e33ad6871e762338(codePoint) {
    const category = $747425b437e121da$export$410364bbb673ddbc(codePoint);
    return category === "Mn" || category === "Me" || category === "Mc";
}
var $747425b437e121da$export$2e2bcd8739ae039 = {
    getCategory: $747425b437e121da$export$410364bbb673ddbc,
    getCombiningClass: $747425b437e121da$export$c03b919c6651ed55,
    getScript: $747425b437e121da$export$941569448d136665,
    getEastAsianWidth: $747425b437e121da$export$92f6187db8ca6d26,
    getNumericValue: $747425b437e121da$export$7d1258ebb7625a0d,
    isAlphabetic: $747425b437e121da$export$52c8ea63abd07594,
    isDigit: $747425b437e121da$export$727d9dbc4fbb948f,
    isPunctuation: $747425b437e121da$export$a5b49f4dc6a07d2c,
    isLowerCase: $747425b437e121da$export$7b6804e8df61fcf5,
    isUpperCase: $747425b437e121da$export$aebd617640818cda,
    isTitleCase: $747425b437e121da$export$de8b4ee23b2cf823,
    isWhiteSpace: $747425b437e121da$export$3c52dd84024ae72c,
    isBaseForm: $747425b437e121da$export$a11bdcffe109e74b,
    isMark: $747425b437e121da$export$e33ad6871e762338
};
;
 //# sourceMappingURL=module.mjs.map
}),
"[project]/node_modules/dfa/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var INITIAL_STATE = 1;
var FAIL_STATE = 0;
/**
 * A StateMachine represents a deterministic finite automaton.
 * It can perform matches over a sequence of values, similar to a regular expression.
 */ class StateMachine {
    constructor(dfa){
        this.stateTable = dfa.stateTable;
        this.accepting = dfa.accepting;
        this.tags = dfa.tags;
    }
    /**
   * Returns an iterable object that yields pattern matches over the input sequence.
   * Matches are of the form [startIndex, endIndex, tags].
   */ match(str) {
        var self = this;
        return {
            *[Symbol.iterator] () {
                var state = INITIAL_STATE;
                var startRun = null;
                var lastAccepting = null;
                var lastState = null;
                for(var p = 0; p < str.length; p++){
                    var c = str[p];
                    lastState = state;
                    state = self.stateTable[state][c];
                    if (state === FAIL_STATE) {
                        // yield the last match if any
                        if (startRun != null && lastAccepting != null && lastAccepting >= startRun) {
                            yield [
                                startRun,
                                lastAccepting,
                                self.tags[lastState]
                            ];
                        } // reset the state as if we started over from the initial state
                        state = self.stateTable[INITIAL_STATE][c];
                        startRun = null;
                    } // start a run if not in the failure state
                    if (state !== FAIL_STATE && startRun == null) {
                        startRun = p;
                    } // if accepting, mark the potential match end
                    if (self.accepting[state]) {
                        lastAccepting = p;
                    } // reset the state to the initial state if we get into the failure state
                    if (state === FAIL_STATE) {
                        state = INITIAL_STATE;
                    }
                } // yield the last match if any
                if (startRun != null && lastAccepting != null && lastAccepting >= startRun) {
                    yield [
                        startRun,
                        lastAccepting,
                        self.tags[state]
                    ];
                }
            }
        };
    }
    /**
   * For each match over the input sequence, action functions matching
   * the tag definitions in the input pattern are called with the startIndex,
   * endIndex, and sub-match sequence.
   */ apply(str, actions) {
        for (var [start, end, tags] of this.match(str)){
            for (var tag of tags){
                if (typeof actions[tag] === 'function') {
                    actions[tag](start, end, str.slice(start, end + 1));
                }
            }
        }
    }
}
module.exports = StateMachine; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/clone/clone.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var clone = function() {
    'use strict';
    function _instanceof(obj, type) {
        return type != null && obj instanceof type;
    }
    var nativeMap;
    try {
        nativeMap = Map;
    } catch (_) {
        // maybe a reference error because no `Map`. Give it a dummy value that no
        // value will ever be an instanceof.
        nativeMap = function() {};
    }
    var nativeSet;
    try {
        nativeSet = Set;
    } catch (_) {
        nativeSet = function() {};
    }
    var nativePromise;
    try {
        nativePromise = Promise;
    } catch (_) {
        nativePromise = function() {};
    }
    /**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/ function clone(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === 'object') {
            depth = circular.depth;
            prototype = circular.prototype;
            includeNonEnumerable = circular.includeNonEnumerable;
            circular = circular.circular;
        }
        // maintain two arrays for circular references, where corresponding parents
        // and children have the same index
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != 'undefined';
        if (typeof circular == 'undefined') circular = true;
        if (typeof depth == 'undefined') depth = Infinity;
        // recurse this function so we don't reset allParents and allChildren
        function _clone(parent, depth) {
            // cloning null always returns null
            if (parent === null) return null;
            if (depth === 0) return parent;
            var child;
            var proto;
            if (typeof parent != 'object') {
                return parent;
            }
            if (_instanceof(parent, nativeMap)) {
                child = new nativeMap();
            } else if (_instanceof(parent, nativeSet)) {
                child = new nativeSet();
            } else if (_instanceof(parent, nativePromise)) {
                child = new nativePromise(function(resolve, reject) {
                    parent.then(function(value) {
                        resolve(_clone(value, depth - 1));
                    }, function(err) {
                        reject(_clone(err, depth - 1));
                    });
                });
            } else if (clone.__isArray(parent)) {
                child = [];
            } else if (clone.__isRegExp(parent)) {
                child = new RegExp(parent.source, __getRegExpFlags(parent));
                if (parent.lastIndex) child.lastIndex = parent.lastIndex;
            } else if (clone.__isDate(parent)) {
                child = new Date(parent.getTime());
            } else if (useBuffer && Buffer.isBuffer(parent)) {
                if (Buffer.allocUnsafe) {
                    // Node.js >= 4.5.0
                    child = Buffer.allocUnsafe(parent.length);
                } else {
                    // Older Node.js versions
                    child = new Buffer(parent.length);
                }
                parent.copy(child);
                return child;
            } else if (_instanceof(parent, Error)) {
                child = Object.create(parent);
            } else {
                if (typeof prototype == 'undefined') {
                    proto = Object.getPrototypeOf(parent);
                    child = Object.create(proto);
                } else {
                    child = Object.create(prototype);
                    proto = prototype;
                }
            }
            if (circular) {
                var index = allParents.indexOf(parent);
                if (index != -1) {
                    return allChildren[index];
                }
                allParents.push(parent);
                allChildren.push(child);
            }
            if (_instanceof(parent, nativeMap)) {
                parent.forEach(function(value, key) {
                    var keyChild = _clone(key, depth - 1);
                    var valueChild = _clone(value, depth - 1);
                    child.set(keyChild, valueChild);
                });
            }
            if (_instanceof(parent, nativeSet)) {
                parent.forEach(function(value) {
                    var entryChild = _clone(value, depth - 1);
                    child.add(entryChild);
                });
            }
            for(var i in parent){
                var attrs;
                if (proto) {
                    attrs = Object.getOwnPropertyDescriptor(proto, i);
                }
                if (attrs && attrs.set == null) {
                    continue;
                }
                child[i] = _clone(parent[i], depth - 1);
            }
            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(parent);
                for(var i = 0; i < symbols.length; i++){
                    // Don't need to worry about cloning a symbol because it is a primitive,
                    // like a number or string.
                    var symbol = symbols[i];
                    var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
                    if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                        continue;
                    }
                    child[symbol] = _clone(parent[symbol], depth - 1);
                    if (!descriptor.enumerable) {
                        Object.defineProperty(child, symbol, {
                            enumerable: false
                        });
                    }
                }
            }
            if (includeNonEnumerable) {
                var allPropertyNames = Object.getOwnPropertyNames(parent);
                for(var i = 0; i < allPropertyNames.length; i++){
                    var propertyName = allPropertyNames[i];
                    var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
                    if (descriptor && descriptor.enumerable) {
                        continue;
                    }
                    child[propertyName] = _clone(parent[propertyName], depth - 1);
                    Object.defineProperty(child, propertyName, {
                        enumerable: false
                    });
                }
            }
            return child;
        }
        return _clone(parent, depth);
    }
    /**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */ clone.clonePrototype = function clonePrototype(parent) {
        if (parent === null) return null;
        var c = function() {};
        c.prototype = parent;
        return new c();
    };
    // private utility functions
    function __objToStr(o) {
        return Object.prototype.toString.call(o);
    }
    clone.__objToStr = __objToStr;
    function __isDate(o) {
        return typeof o === 'object' && __objToStr(o) === '[object Date]';
    }
    clone.__isDate = __isDate;
    function __isArray(o) {
        return typeof o === 'object' && __objToStr(o) === '[object Array]';
    }
    clone.__isArray = __isArray;
    function __isRegExp(o) {
        return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
    }
    clone.__isRegExp = __isRegExp;
    function __getRegExpFlags(re) {
        var flags = '';
        if (re.global) flags += 'g';
        if (re.ignoreCase) flags += 'i';
        if (re.multiline) flags += 'm';
        return flags;
    }
    clone.__getRegExpFlags = __getRegExpFlags;
    return clone;
}();
if (("TURBOPACK compile-time value", "object") === 'object' && module.exports) {
    module.exports = clone;
}
}),
"[project]/node_modules/linebreak/dist/module.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>$557adaaeb0c7885f$exports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unicode$2d$trie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unicode-trie/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$linebreak$2f$node_modules$2f$base64$2d$js$2f$lib$2f$b64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/linebreak/node_modules/base64-js/lib/b64.js [app-route] (ecmascript)");
;
;
var $557adaaeb0c7885f$exports = {};
"use strict";
const $1627905f8be2ef3f$export$af862512e23cb54 = 0; // Opening punctuation
const $1627905f8be2ef3f$export$9bf3043cb7503aa1 = 1; // Closing punctuation
const $1627905f8be2ef3f$export$6d0b2a5dd774590a = 2; // Closing parenthesis
const $1627905f8be2ef3f$export$bf0b2277bd569ea1 = 3; // Ambiguous quotation
const $1627905f8be2ef3f$export$bad2a840ccda93b6 = 4; // Glue
const $1627905f8be2ef3f$export$fb4028874a74450 = 5; // Non-starters
const $1627905f8be2ef3f$export$463bd1ce0149c55e = 6; // Exclamation/Interrogation
const $1627905f8be2ef3f$export$2e8caadc521d7cbb = 7; // Symbols allowing break after
const $1627905f8be2ef3f$export$bfe27467c1de9413 = 8; // Infix separator
const $1627905f8be2ef3f$export$af5f8d68aad3cd3a = 9; // Prefix
const $1627905f8be2ef3f$export$6b7e017d6825d38f = 10; // Postfix
const $1627905f8be2ef3f$export$8227ca023eb0daaa = 11; // Numeric
const $1627905f8be2ef3f$export$1bb1140fe1358b00 = 12; // Alphabetic
const $1627905f8be2ef3f$export$f3e416a182673355 = 13; // Hebrew Letter
const $1627905f8be2ef3f$export$8be180ec26319f9f = 14; // Ideographic
const $1627905f8be2ef3f$export$70824c8942178d60 = 15; // Inseparable characters
const $1627905f8be2ef3f$export$24aa617c849a894a = 16; // Hyphen
const $1627905f8be2ef3f$export$a73c4d14459b698d = 17; // Break after
const $1627905f8be2ef3f$export$921068d8846a1559 = 18; // Break before
const $1627905f8be2ef3f$export$8b85a4f193482778 = 19; // Break on either side (but not pair)
const $1627905f8be2ef3f$export$b2fd9c01d360241f = 20; // Zero-width space
const $1627905f8be2ef3f$export$dcd191669c0a595f = 21; // Combining marks
const $1627905f8be2ef3f$export$9e5d732f3676a9ba = 22; // Word joiner
const $1627905f8be2ef3f$export$cb94397127ac9363 = 23; // Hangul LV
const $1627905f8be2ef3f$export$746be9e3a3dfff1f = 24; // Hangul LVT
const $1627905f8be2ef3f$export$96e3e682276c47cf = 25; // Hangul L Jamo
const $1627905f8be2ef3f$export$fc2ff69ee2cb01bf = 26; // Hangul V Jamo
const $1627905f8be2ef3f$export$8999624a7bae9d04 = 27; // Hangul T Jamo
const $1627905f8be2ef3f$export$1dff41d5c0caca01 = 28; // Regional Indicator
const $1627905f8be2ef3f$export$ddb7a6c76d9d93eb = 29; // Emoji Base
const $1627905f8be2ef3f$export$7e93eb3105e4786d = 30; // Emoji Modifier
const $1627905f8be2ef3f$export$30a74a373318dec6 = 31; // Zero Width Joiner
const $1627905f8be2ef3f$export$54caeea5e6dab1f = 32; // Contingent break
const $1627905f8be2ef3f$export$d710c5f50fc7496a = 33; // Ambiguous (Alphabetic or Ideograph)
const $1627905f8be2ef3f$export$66498d28055820a9 = 34; // Break (mandatory)
const $1627905f8be2ef3f$export$eb6c6d0b7c8826f2 = 35; // Conditional Japanese Starter
const $1627905f8be2ef3f$export$de92be486109a1df = 36; // Carriage return
const $1627905f8be2ef3f$export$606cfc2a8896c91f = 37; // Line feed
const $1627905f8be2ef3f$export$e51d3c675bb0140d = 38; // Next line
const $1627905f8be2ef3f$export$da51c6332ad11d7b = 39; // South-East Asian
const $1627905f8be2ef3f$export$bea437c40441867d = 40; // Surrogates
const $1627905f8be2ef3f$export$c4c7eecbfed13dc9 = 41; // Space
const $1627905f8be2ef3f$export$98e1f8a379849661 = 42; // Unknown
const $32627af916ac1b00$export$98f50d781a474745 = 0; // Direct break opportunity
const $32627af916ac1b00$export$12ee1f8f5315ca7e = 1; // Indirect break opportunity
const $32627af916ac1b00$export$e4965ce242860454 = 2; // Indirect break opportunity for combining marks
const $32627af916ac1b00$export$8f14048969dcd45e = 3; // Prohibited break for combining marks
const $32627af916ac1b00$export$133eb141bf58aff4 = 4; // Prohibited break
const $32627af916ac1b00$export$5bdb8ccbf5c57afc = [
    //OP   , CL    , CP    , QU    , GL    , NS    , EX    , SY    , IS    , PR    , PO    , NU    , AL    , HL    , ID    , IN    , HY    , BA    , BB    , B2    , ZW    , CM    , WJ    , H2    , H3    , JL    , JV    , JT    , RI    , EB    , EM    , ZWJ   , CB
    [
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$8f14048969dcd45e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ],
    [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
    ] // CB
];
const $557adaaeb0c7885f$var$data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$linebreak$2f$node_modules$2f$base64$2d$js$2f$lib$2f$b64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].toByteArray("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");
const $557adaaeb0c7885f$var$classTrie = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unicode$2d$trie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]($557adaaeb0c7885f$var$data);
const $557adaaeb0c7885f$var$mapClass = function(c) {
    switch(c){
        case $1627905f8be2ef3f$export$d710c5f50fc7496a:
            return $1627905f8be2ef3f$export$1bb1140fe1358b00;
        case $1627905f8be2ef3f$export$da51c6332ad11d7b:
        case $1627905f8be2ef3f$export$bea437c40441867d:
        case $1627905f8be2ef3f$export$98e1f8a379849661:
            return $1627905f8be2ef3f$export$1bb1140fe1358b00;
        case $1627905f8be2ef3f$export$eb6c6d0b7c8826f2:
            return $1627905f8be2ef3f$export$fb4028874a74450;
        default:
            return c;
    }
};
const $557adaaeb0c7885f$var$mapFirst = function(c) {
    switch(c){
        case $1627905f8be2ef3f$export$606cfc2a8896c91f:
        case $1627905f8be2ef3f$export$e51d3c675bb0140d:
            return $1627905f8be2ef3f$export$66498d28055820a9;
        case $1627905f8be2ef3f$export$c4c7eecbfed13dc9:
            return $1627905f8be2ef3f$export$9e5d732f3676a9ba;
        default:
            return c;
    }
};
class $557adaaeb0c7885f$var$Break {
    constructor(position, required = false){
        this.position = position;
        this.required = required;
    }
}
class $557adaaeb0c7885f$var$LineBreaker {
    nextCodePoint() {
        const code = this.string.charCodeAt(this.pos++);
        const next = this.string.charCodeAt(this.pos);
        // If a surrogate pair
        if (0xd800 <= code && code <= 0xdbff && 0xdc00 <= next && next <= 0xdfff) {
            this.pos++;
            return (code - 0xd800) * 0x400 + (next - 0xdc00) + 0x10000;
        }
        return code;
    }
    nextCharClass() {
        return $557adaaeb0c7885f$var$mapClass($557adaaeb0c7885f$var$classTrie.get(this.nextCodePoint()));
    }
    getSimpleBreak() {
        // handle classes not handled by the pair table
        switch(this.nextClass){
            case $1627905f8be2ef3f$export$c4c7eecbfed13dc9:
                return false;
            case $1627905f8be2ef3f$export$66498d28055820a9:
            case $1627905f8be2ef3f$export$606cfc2a8896c91f:
            case $1627905f8be2ef3f$export$e51d3c675bb0140d:
                this.curClass = $1627905f8be2ef3f$export$66498d28055820a9;
                return false;
            case $1627905f8be2ef3f$export$de92be486109a1df:
                this.curClass = $1627905f8be2ef3f$export$de92be486109a1df;
                return false;
        }
        return null;
    }
    getPairTableBreak(lastClass) {
        // if not handled already, use the pair table
        let shouldBreak = false;
        switch($32627af916ac1b00$export$5bdb8ccbf5c57afc[this.curClass][this.nextClass]){
            case $32627af916ac1b00$export$98f50d781a474745:
                shouldBreak = true;
                break;
            case $32627af916ac1b00$export$12ee1f8f5315ca7e:
                shouldBreak = lastClass === $1627905f8be2ef3f$export$c4c7eecbfed13dc9;
                break;
            case $32627af916ac1b00$export$e4965ce242860454:
                shouldBreak = lastClass === $1627905f8be2ef3f$export$c4c7eecbfed13dc9;
                if (!shouldBreak) {
                    shouldBreak = false;
                    return shouldBreak;
                }
                break;
            case $32627af916ac1b00$export$8f14048969dcd45e:
                if (lastClass !== $1627905f8be2ef3f$export$c4c7eecbfed13dc9) return shouldBreak;
                break;
            case $32627af916ac1b00$export$133eb141bf58aff4:
                break;
        }
        if (this.LB8a) shouldBreak = false;
        // Rule LB21a
        if (this.LB21a && (this.curClass === $1627905f8be2ef3f$export$24aa617c849a894a || this.curClass === $1627905f8be2ef3f$export$a73c4d14459b698d)) {
            shouldBreak = false;
            this.LB21a = false;
        } else this.LB21a = this.curClass === $1627905f8be2ef3f$export$f3e416a182673355;
        // Rule LB30a
        if (this.curClass === $1627905f8be2ef3f$export$1dff41d5c0caca01) {
            this.LB30a++;
            if (this.LB30a == 2 && this.nextClass === $1627905f8be2ef3f$export$1dff41d5c0caca01) {
                shouldBreak = true;
                this.LB30a = 0;
            }
        } else this.LB30a = 0;
        this.curClass = this.nextClass;
        return shouldBreak;
    }
    nextBreak() {
        // get the first char if we're at the beginning of the string
        if (this.curClass == null) {
            let firstClass = this.nextCharClass();
            this.curClass = $557adaaeb0c7885f$var$mapFirst(firstClass);
            this.nextClass = firstClass;
            this.LB8a = firstClass === $1627905f8be2ef3f$export$30a74a373318dec6;
            this.LB30a = 0;
        }
        while(this.pos < this.string.length){
            this.lastPos = this.pos;
            const lastClass = this.nextClass;
            this.nextClass = this.nextCharClass();
            // explicit newline
            if (this.curClass === $1627905f8be2ef3f$export$66498d28055820a9 || this.curClass === $1627905f8be2ef3f$export$de92be486109a1df && this.nextClass !== $1627905f8be2ef3f$export$606cfc2a8896c91f) {
                this.curClass = $557adaaeb0c7885f$var$mapFirst($557adaaeb0c7885f$var$mapClass(this.nextClass));
                return new $557adaaeb0c7885f$var$Break(this.lastPos, true);
            }
            let shouldBreak = this.getSimpleBreak();
            if (shouldBreak === null) shouldBreak = this.getPairTableBreak(lastClass);
            // Rule LB8a
            this.LB8a = this.nextClass === $1627905f8be2ef3f$export$30a74a373318dec6;
            if (shouldBreak) return new $557adaaeb0c7885f$var$Break(this.lastPos);
        }
        if (this.lastPos < this.string.length) {
            this.lastPos = this.string.length;
            return new $557adaaeb0c7885f$var$Break(this.string.length);
        }
        return null;
    }
    constructor(string){
        this.string = string;
        this.pos = 0;
        this.lastPos = 0;
        this.curClass = null;
        this.nextClass = null;
        this.LB8a = false;
        this.LB21a = false;
        this.LB30a = 0;
    }
}
$557adaaeb0c7885f$exports = $557adaaeb0c7885f$var$LineBreaker;
;
 //# sourceMappingURL=module.mjs.map
}),
"[project]/node_modules/jpeg-exif/lib/tags.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"ifd":{"010e":"ImageDescription","010f":"Make","011a":"XResolution","011b":"YResolution","011c":"PlanarConfiguration","012d":"TransferFunction","013b":"Artist","013e":"WhitePoint","013f":"PrimaryChromaticities","0100":"ImageWidth","0101":"ImageHeight","0102":"BitsPerSample","0103":"Compression","0106":"PhotometricInterpretation","0110":"Model","0111":"StripOffsets","0112":"Orientation","0115":"SamplesPerPixel","0116":"RowsPerStrip","0117":"StripByteCounts","0128":"ResolutionUnit","0131":"Software","0132":"DateTime","0201":"JPEGInterchangeFormat","0202":"JPEGInterchangeFormatLength","0211":"YCbCrCoefficients","0212":"YCbCrSubSampling","0213":"YCbCrPositioning","0214":"ReferenceBlackWhite","829a":"ExposureTime","829d":"FNumber","920a":"FocalLength","927c":"MakerNote","8298":"Copyright","8769":"ExifIFDPointer","8822":"ExposureProgram","8824":"SpectralSensitivity","8825":"GPSInfoIFDPointer","8827":"PhotographicSensitivity","8828":"OECF","8830":"SensitivityType","8831":"StandardOutputSensitivity","8832":"RecommendedExposureIndex","8833":"ISOSpeed","8834":"ISOSpeedLatitudeyyy","8835":"ISOSpeedLatitudezzz","9000":"ExifVersion","9003":"DateTimeOriginal","9004":"DateTimeDigitized","9101":"ComponentsConfiguration","9102":"CompressedBitsPerPixel","9201":"ShutterSpeedValue","9202":"ApertureValue","9203":"BrightnessValue","9204":"ExposureBiasValue","9205":"MaxApertureValue","9206":"SubjectDistance","9207":"MeteringMode","9208":"LightSource","9209":"Flash","9214":"SubjectArea","9286":"UserComment","9290":"SubSecTime","9291":"SubSecTimeOriginal","9292":"SubSecTimeDigitized","a000":"FlashpixVersion","a001":"ColorSpace","a002":"PixelXDimension","a003":"PixelYDimension","a004":"RelatedSoundFile","a005":"InteroperabilityIFDPointer","a20b":"FlashEnergy","a20c":"SpatialFrequencyResponse","a20e":"FocalPlaneXResolution","a20f":"FocalPlaneYResolution","a40a":"Sharpness","a40b":"DeviceSettingDescription","a40c":"SubjectDistanceRange","a210":"FocalPlaneResolutionUnit","a214":"SubjectLocation","a215":"ExposureIndex","a217":"SensingMethod","a300":"FileSource","a301":"SceneType","a302":"CFAPattern","a401":"CustomRendered","a402":"ExposureMode","a403":"WhiteBalance","a404":"DigitalZoomRatio","a405":"FocalLengthIn35mmFilm","a406":"SceneCaptureType","a407":"GainControl","a408":"Contrast","a409":"Saturation","a420":"ImageUniqueID","a430":"CameraOwnerName","a431":"BodySerialNumber","a432":"LensSpecification","a433":"LensMake","a434":"LensModel","a435":"LensSerialNumber","a500":"Gamma"},"gps":{"0000":"GPSVersionID","0001":"GPSLatitudeRef","0002":"GPSLatitude","0003":"GPSLongitudeRef","0004":"GPSLongitude","0005":"GPSAltitudeRef","0006":"GPSAltitude","0007":"GPSTimeStamp","0008":"GPSSatellites","0009":"GPSStatus","000a":"GPSMeasureMode","000b":"GPSDOP","000c":"GPSSpeedRef","000d":"GPSSpeed","000e":"GPSTrackRef","000f":"GPSTrack","0010":"GPSImgDirectionRef","0011":"GPSImgDirection","0012":"GPSMapDatum","0013":"GPSDestLatitudeRef","0014":"GPSDestLatitude","0015":"GPSDestLongitudeRef","0016":"GPSDestLongitude","0017":"GPSDestBearingRef","0018":"GPSDestBearing","0019":"GPSDestDistanceRef","001a":"GPSDestDistance","001b":"GPSProcessingMethod","001c":"GPSAreaInformation","001d":"GPSDateStamp","001e":"GPSDifferential","001f":"GPSHPositioningError"}});}),
"[project]/node_modules/jpeg-exif/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var _fs2 = _interopRequireDefault(_fs);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var tags = __turbopack_context__.r("[project]/node_modules/jpeg-exif/lib/tags.json (json)");
/*
 unsignedByte,
 asciiStrings,
 unsignedShort,
 unsignedLong,
 unsignedRational,
 signedByte,
 undefined,
 signedShort,
 signedLong,
 signedRational,
 singleFloat,
 doubleFloat
 */ var bytes = [
    0,
    1,
    1,
    2,
    4,
    8,
    1,
    1,
    2,
    4,
    8,
    4,
    8
];
var SOIMarkerLength = 2;
var JPEGSOIMarker = 0xffd8;
var TIFFINTEL = 0x4949;
var TIFFMOTOROLA = 0x4d4d;
var APPMarkerLength = 2;
var APPMarkerBegin = 0xffe0;
var APPMarkerEnd = 0xffef;
var data = void 0;
/**
 * @param buffer {Buffer}
 * @returns {Boolean}
 * @example
 * var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
 * var isImage = isValid(content);
 * console.log(isImage);
 */ var isValid = function isValid(buffer) {
    try {
        var SOIMarker = buffer.readUInt16BE(0);
        return SOIMarker === JPEGSOIMarker;
    } catch (e) {
        throw new Error('Unsupport file format.');
    }
};
/**
 * @param buffer {Buffer}
 * @returns {Boolean}
 * @example
 */ var isTiff = function isTiff(buffer) {
    try {
        var SOIMarker = buffer.readUInt16BE(0);
        return SOIMarker === TIFFINTEL || SOIMarker === TIFFMOTOROLA;
    } catch (e) {
        throw new Error('Unsupport file format.');
    }
};
/**
 * @param buffer {Buffer}
 * @returns {Number}
 * @example
 * var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
 * var APPNumber = checkAPPn(content);
 * console.log(APPNumber);
 */ var checkAPPn = function checkAPPn(buffer) {
    try {
        var APPMarkerTag = buffer.readUInt16BE(0);
        var isInRange = APPMarkerTag >= APPMarkerBegin && APPMarkerTag <= APPMarkerEnd;
        return isInRange ? APPMarkerTag - APPMarkerBegin : false;
    } catch (e) {
        throw new Error('Invalid APP Tag.');
    }
};
/**
 * @param buffer {Buffer}
 * @param tagCollection {Object}
 * @param order {Boolean}
 * @param offset {Number}
 * @returns {Object}
 * @example
 * var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
 * var exifFragments = IFDHandler(content, 0, true, 8);
 * console.log(exifFragments.value);
 */ var IFDHandler = function IFDHandler(buffer, tagCollection, order, offset) {
    var entriesNumber = order ? buffer.readUInt16BE(0) : buffer.readUInt16LE(0);
    if (entriesNumber === 0) {
        return {};
    }
    var entriesNumberLength = 2;
    var entries = buffer.slice(entriesNumberLength);
    var entryLength = 12;
    // let nextIFDPointerBegin = entriesNumberLength + entryLength * entriesNumber;
    // let bigNextIFDPointer= buffer.readUInt32BE(nextIFDPointerBegin) ;
    // let littleNextIFDPointer= buffer.readUInt32LE(nextIFDPointerBegin);
    // let nextIFDPointer = order ?bigNextIFDPointer:littleNextIFDPointer;
    var exif = {};
    var entryCount = 0;
    for(entryCount; entryCount < entriesNumber; entryCount += 1){
        var entryBegin = entryCount * entryLength;
        var entry = entries.slice(entryBegin, entryBegin + entryLength);
        var tagBegin = 0;
        var tagLength = 2;
        var dataFormatBegin = tagBegin + tagLength;
        var dataFormatLength = 2;
        var componentsBegin = dataFormatBegin + dataFormatLength;
        var componentsNumberLength = 4;
        var dataValueBegin = componentsBegin + componentsNumberLength;
        var dataValueLength = 4;
        var tagAddress = entry.slice(tagBegin, dataFormatBegin);
        var tagNumber = order ? tagAddress.toString('hex') : tagAddress.reverse().toString('hex');
        var tagName = tagCollection[tagNumber];
        var bigDataFormat = entry.readUInt16BE(dataFormatBegin);
        var littleDataFormat = entry.readUInt16LE(dataFormatBegin);
        var dataFormat = order ? bigDataFormat : littleDataFormat;
        var componentsByte = bytes[dataFormat];
        var bigComponentsNumber = entry.readUInt32BE(componentsBegin);
        var littleComponentNumber = entry.readUInt32LE(componentsBegin);
        var componentsNumber = order ? bigComponentsNumber : littleComponentNumber;
        var dataLength = componentsNumber * componentsByte;
        var dataValue = entry.slice(dataValueBegin, dataValueBegin + dataValueLength);
        if (dataLength > 4) {
            var dataOffset = (order ? dataValue.readUInt32BE(0) : dataValue.readUInt32LE(0)) - offset;
            dataValue = buffer.slice(dataOffset, dataOffset + dataLength);
        }
        var tagValue = void 0;
        if (tagName) {
            switch(dataFormat){
                case 1:
                    tagValue = dataValue.readUInt8(0);
                    break;
                case 2:
                    tagValue = dataValue.toString('ascii').replace(/\0+$/, '');
                    break;
                case 3:
                    tagValue = order ? dataValue.readUInt16BE(0) : dataValue.readUInt16LE(0);
                    break;
                case 4:
                    tagValue = order ? dataValue.readUInt32BE(0) : dataValue.readUInt32LE(0);
                    break;
                case 5:
                    tagValue = [];
                    for(var i = 0; i < dataValue.length; i += 8){
                        var bigTagValue = dataValue.readUInt32BE(i) / dataValue.readUInt32BE(i + 4);
                        var littleTagValue = dataValue.readUInt32LE(i) / dataValue.readUInt32LE(i + 4);
                        tagValue.push(order ? bigTagValue : littleTagValue);
                    }
                    break;
                case 7:
                    switch(tagName){
                        case 'ExifVersion':
                            tagValue = dataValue.toString();
                            break;
                        case 'FlashPixVersion':
                            tagValue = dataValue.toString();
                            break;
                        case 'SceneType':
                            tagValue = dataValue.readUInt8(0);
                            break;
                        default:
                            tagValue = '0x' + dataValue.toString('hex', 0, 15);
                            break;
                    }
                    break;
                case 10:
                    {
                        var bigOrder = dataValue.readInt32BE(0) / dataValue.readInt32BE(4);
                        var littleOrder = dataValue.readInt32LE(0) / dataValue.readInt32LE(4);
                        tagValue = order ? bigOrder : littleOrder;
                        break;
                    }
                default:
                    tagValue = '0x' + dataValue.toString('hex');
                    break;
            }
            exif[tagName] = tagValue;
        }
    /*
     else {
     console.log(`Unkown Tag [0x${tagNumber}].`);
     }
     */ }
    return exif;
};
/**
 * @param buf {Buffer}
 * @returns {Undefined}
 * @example
 * var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
 * var exifFragments = EXIFHandler(content);
 */ var EXIFHandler = function EXIFHandler(buf) {
    var pad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var buffer = buf;
    if (pad) {
        buffer = buf.slice(APPMarkerLength);
        var length = buffer.readUInt16BE(0);
        buffer = buffer.slice(0, length);
        var lengthLength = 2;
        buffer = buffer.slice(lengthLength);
        var identifierLength = 5;
        buffer = buffer.slice(identifierLength);
        var padLength = 1;
        buffer = buffer.slice(padLength);
    }
    var byteOrderLength = 2;
    var byteOrder = buffer.toString('ascii', 0, byteOrderLength) === 'MM';
    var fortyTwoLength = 2;
    var fortyTwoEnd = byteOrderLength + fortyTwoLength;
    var big42 = buffer.readUInt32BE(fortyTwoEnd);
    var little42 = buffer.readUInt32LE(fortyTwoEnd);
    var offsetOfIFD = byteOrder ? big42 : little42;
    buffer = buffer.slice(offsetOfIFD);
    if (buffer.length > 0) {
        data = IFDHandler(buffer, tags.ifd, byteOrder, offsetOfIFD);
        if (data.ExifIFDPointer) {
            buffer = buffer.slice(data.ExifIFDPointer - offsetOfIFD);
            data.SubExif = IFDHandler(buffer, tags.ifd, byteOrder, data.ExifIFDPointer);
        }
        if (data.GPSInfoIFDPointer) {
            var gps = data.GPSInfoIFDPointer;
            buffer = buffer.slice(data.ExifIFDPointer ? gps - data.ExifIFDPointer : gps - offsetOfIFD);
            data.GPSInfo = IFDHandler(buffer, tags.gps, byteOrder, gps);
        }
    }
};
/**
 * @param buffer {Buffer}
 * @returns {Undefined}
 * @example
 * var content = fs.readFileSync("~/Picture/IMG_0911.JPG");
 * var exifFragments = APPnHandler(content);
 */ var APPnHandler = function APPnHandler(buffer) {
    var APPMarkerTag = checkAPPn(buffer);
    if (APPMarkerTag !== false) {
        // APP0 is 0, and 0==false
        var length = buffer.readUInt16BE(APPMarkerLength);
        switch(APPMarkerTag){
            case 1:
                // EXIF
                EXIFHandler(buffer);
                break;
            default:
                APPnHandler(buffer.slice(APPMarkerLength + length));
                break;
        }
    }
};
/**
 * @param buffer {Buffer}
 * @returns {Object}
 * @example
 */ var fromBuffer = function fromBuffer(buffer) {
    if (!buffer) {
        throw new Error('buffer not found');
    }
    data = undefined;
    if (isValid(buffer)) {
        buffer = buffer.slice(SOIMarkerLength);
        data = {};
        APPnHandler(buffer);
    } else if (isTiff(buffer)) {
        data = {};
        EXIFHandler(buffer, false);
    }
    return data;
};
/**
 * @param file {String}
 * @returns {Object}
 * @example
 * var exif = sync("~/Picture/IMG_1981.JPG");
 * console.log(exif.createTime);
 */ var sync = function sync(file) {
    if (!file) {
        throw new Error('File not found');
    }
    var buffer = _fs2.default.readFileSync(file);
    return fromBuffer(buffer);
};
/**
 * @param file {String}
 * @param callback {Function}
 * @example
 * async("~/Picture/IMG_0707.JPG", (err, data) => {
 *     if(err) {
 *         console.log(err);
 *     }
 *     if(data) {
 *         console.log(data.ExifOffset.createTime);
 *     }
 * }
 */ var async = function async(file, callback) {
    data = undefined;
    new Promise(function(resolve, reject) {
        if (!file) {
            reject(new Error('❓File not found.'));
        }
        _fs2.default.readFile(file, function(err, buffer) {
            if (err) {
                reject(err);
            } else {
                try {
                    if (isValid(buffer)) {
                        var buf = buffer.slice(SOIMarkerLength);
                        data = {};
                        APPnHandler(buf);
                        resolve(data);
                    } else if (isTiff(buffer)) {
                        data = {};
                        EXIFHandler(buffer, false);
                        resolve(data);
                    } else {
                        reject(new Error('😱Unsupport file type.'));
                    }
                } catch (e) {
                    reject(e);
                }
            }
        });
    }, function(error) {
        callback(error, undefined);
    }).then(function(d) {
        callback(undefined, d);
    }).catch(function(error) {
        callback(error, undefined);
    });
};
exports.fromBuffer = fromBuffer;
exports.parse = async;
exports.parseSync = sync; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/png-js/png-node.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
 * MIT LICENSE
 * Copyright (c) 2011 Devon Govett
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */ const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
module.exports = class PNG {
    static decode(path, fn) {
        return fs.readFile(path, function(err, file) {
            const png = new PNG(file);
            return png.decode((pixels)=>fn(pixels));
        });
    }
    static load(path) {
        const file = fs.readFileSync(path);
        return new PNG(file);
    }
    constructor(data){
        let i;
        this.data = data;
        this.pos = 8; // Skip the default header
        this.palette = [];
        this.imgData = [];
        this.transparency = {};
        this.text = {};
        while(true){
            const chunkSize = this.readUInt32();
            let section = '';
            for(i = 0; i < 4; i++){
                section += String.fromCharCode(this.data[this.pos++]);
            }
            switch(section){
                case 'IHDR':
                    // we can grab  interesting values from here (like width, height, etc)
                    this.width = this.readUInt32();
                    this.height = this.readUInt32();
                    this.bits = this.data[this.pos++];
                    this.colorType = this.data[this.pos++];
                    this.compressionMethod = this.data[this.pos++];
                    this.filterMethod = this.data[this.pos++];
                    this.interlaceMethod = this.data[this.pos++];
                    break;
                case 'PLTE':
                    this.palette = this.read(chunkSize);
                    break;
                case 'IDAT':
                    for(i = 0; i < chunkSize; i++){
                        this.imgData.push(this.data[this.pos++]);
                    }
                    break;
                case 'tRNS':
                    // This chunk can only occur once and it must occur after the
                    // PLTE chunk and before the IDAT chunk.
                    this.transparency = {};
                    switch(this.colorType){
                        case 3:
                            // Indexed color, RGB. Each byte in this chunk is an alpha for
                            // the palette index in the PLTE ("palette") chunk up until the
                            // last non-opaque entry. Set up an array, stretching over all
                            // palette entries which will be 0 (opaque) or 1 (transparent).
                            this.transparency.indexed = this.read(chunkSize);
                            var short = 255 - this.transparency.indexed.length;
                            if (short > 0) {
                                for(i = 0; i < short; i++){
                                    this.transparency.indexed.push(255);
                                }
                            }
                            break;
                        case 0:
                            // Greyscale. Corresponding to entries in the PLTE chunk.
                            // Grey is two bytes, range 0 .. (2 ^ bit-depth) - 1
                            this.transparency.grayscale = this.read(chunkSize)[0];
                            break;
                        case 2:
                            // True color with proper alpha channel.
                            this.transparency.rgb = this.read(chunkSize);
                            break;
                    }
                    break;
                case 'tEXt':
                    var text = this.read(chunkSize);
                    var index = text.indexOf(0);
                    var key = String.fromCharCode.apply(String, text.slice(0, index));
                    this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
                    break;
                case 'IEND':
                    // we've got everything we need!
                    switch(this.colorType){
                        case 0:
                        case 3:
                        case 4:
                            this.colors = 1;
                            break;
                        case 2:
                        case 6:
                            this.colors = 3;
                            break;
                    }
                    this.hasAlphaChannel = [
                        4,
                        6
                    ].includes(this.colorType);
                    var colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
                    this.pixelBitlength = this.bits * colors;
                    switch(this.colors){
                        case 1:
                            this.colorSpace = 'DeviceGray';
                            break;
                        case 3:
                            this.colorSpace = 'DeviceRGB';
                            break;
                    }
                    this.imgData = new Buffer(this.imgData);
                    return;
                    //TURBOPACK unreachable
                    ;
                default:
                    // unknown (or unimportant) section, skip it
                    this.pos += chunkSize;
            }
            this.pos += 4; // Skip the CRC
            if (this.pos > this.data.length) {
                throw new Error('Incomplete or corrupt PNG file');
            }
        }
    }
    read(bytes) {
        const result = new Array(bytes);
        for(let i = 0; i < bytes; i++){
            result[i] = this.data[this.pos++];
        }
        return result;
    }
    readUInt32() {
        const b1 = this.data[this.pos++] << 24;
        const b2 = this.data[this.pos++] << 16;
        const b3 = this.data[this.pos++] << 8;
        const b4 = this.data[this.pos++];
        return b1 | b2 | b3 | b4;
    }
    readUInt16() {
        const b1 = this.data[this.pos++] << 8;
        const b2 = this.data[this.pos++];
        return b1 | b2;
    }
    decodePixels(fn) {
        return zlib.inflate(this.imgData, (err, data)=>{
            if (err) {
                throw err;
            }
            const { width, height } = this;
            const pixelBytes = this.pixelBitlength / 8;
            const pixels = new Buffer(width * height * pixelBytes);
            const { length } = data;
            let pos = 0;
            function pass(x0, y0, dx, dy, singlePass = false) {
                const w = Math.ceil((width - x0) / dx);
                const h = Math.ceil((height - y0) / dy);
                const scanlineLength = pixelBytes * w;
                const buffer = singlePass ? pixels : new Buffer(scanlineLength * h);
                let row = 0;
                let c = 0;
                while(row < h && pos < length){
                    var byte, col, i, left, upper;
                    switch(data[pos++]){
                        case 0:
                            for(i = 0; i < scanlineLength; i++){
                                buffer[c++] = data[pos++];
                            }
                            break;
                        case 1:
                            for(i = 0; i < scanlineLength; i++){
                                byte = data[pos++];
                                left = i < pixelBytes ? 0 : buffer[c - pixelBytes];
                                buffer[c++] = (byte + left) % 256;
                            }
                            break;
                        case 2:
                            for(i = 0; i < scanlineLength; i++){
                                byte = data[pos++];
                                col = (i - i % pixelBytes) / pixelBytes;
                                upper = row && buffer[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                                buffer[c++] = (upper + byte) % 256;
                            }
                            break;
                        case 3:
                            for(i = 0; i < scanlineLength; i++){
                                byte = data[pos++];
                                col = (i - i % pixelBytes) / pixelBytes;
                                left = i < pixelBytes ? 0 : buffer[c - pixelBytes];
                                upper = row && buffer[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                                buffer[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
                            }
                            break;
                        case 4:
                            for(i = 0; i < scanlineLength; i++){
                                var paeth, upperLeft;
                                byte = data[pos++];
                                col = (i - i % pixelBytes) / pixelBytes;
                                left = i < pixelBytes ? 0 : buffer[c - pixelBytes];
                                if (row === 0) {
                                    upper = upperLeft = 0;
                                } else {
                                    upper = buffer[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
                                    upperLeft = col && buffer[(row - 1) * scanlineLength + (col - 1) * pixelBytes + i % pixelBytes];
                                }
                                const p = left + upper - upperLeft;
                                const pa = Math.abs(p - left);
                                const pb = Math.abs(p - upper);
                                const pc = Math.abs(p - upperLeft);
                                if (pa <= pb && pa <= pc) {
                                    paeth = left;
                                } else if (pb <= pc) {
                                    paeth = upper;
                                } else {
                                    paeth = upperLeft;
                                }
                                buffer[c++] = (byte + paeth) % 256;
                            }
                            break;
                        default:
                            throw new Error(`Invalid filter algorithm: ${data[pos - 1]}`);
                    }
                    if (!singlePass) {
                        let pixelsPos = ((y0 + row * dy) * width + x0) * pixelBytes;
                        let bufferPos = row * scanlineLength;
                        for(i = 0; i < w; i++){
                            for(let j = 0; j < pixelBytes; j++)pixels[pixelsPos++] = buffer[bufferPos++];
                            pixelsPos += (dx - 1) * pixelBytes;
                        }
                    }
                    row++;
                }
            }
            if (this.interlaceMethod === 1) {
                /*
          1 6 4 6 2 6 4 6
          7 7 7 7 7 7 7 7
          5 6 5 6 5 6 5 6
          7 7 7 7 7 7 7 7
          3 6 4 6 3 6 4 6
          7 7 7 7 7 7 7 7
          5 6 5 6 5 6 5 6
          7 7 7 7 7 7 7 7
        */ pass(0, 0, 8, 8); // 1
                pass(4, 0, 8, 8); // 2
                pass(0, 4, 4, 8); // 3
                pass(2, 0, 4, 4); // 4
                pass(0, 2, 2, 4); // 5
                pass(1, 0, 2, 2); // 6
                pass(0, 1, 1, 2); // 7
            } else {
                pass(0, 0, 1, 1, true);
            }
            return fn(pixels);
        });
    }
    decodePalette() {
        const { palette } = this;
        const { length } = palette;
        const transparency = this.transparency.indexed || [];
        const ret = new Buffer(transparency.length + length);
        let pos = 0;
        let c = 0;
        for(let i = 0; i < length; i += 3){
            var left;
            ret[pos++] = palette[i];
            ret[pos++] = palette[i + 1];
            ret[pos++] = palette[i + 2];
            ret[pos++] = (left = transparency[c++]) != null ? left : 255;
        }
        return ret;
    }
    copyToImageData(imageData, pixels) {
        let j, k;
        let { colors } = this;
        let palette = null;
        let alpha = this.hasAlphaChannel;
        if (this.palette.length) {
            palette = this._decodedPalette || (this._decodedPalette = this.decodePalette());
            colors = 4;
            alpha = true;
        }
        const data = imageData.data || imageData;
        const { length } = data;
        const input = palette || pixels;
        let i = j = 0;
        if (colors === 1) {
            while(i < length){
                k = palette ? pixels[i / 4] * 4 : j;
                const v = input[k++];
                data[i++] = v;
                data[i++] = v;
                data[i++] = v;
                data[i++] = alpha ? input[k++] : 255;
                j = k;
            }
        } else {
            while(i < length){
                k = palette ? pixels[i / 4] * 4 : j;
                data[i++] = input[k++];
                data[i++] = input[k++];
                data[i++] = input[k++];
                data[i++] = alpha ? input[k++] : 255;
                j = k;
            }
        }
    }
    decode(fn) {
        const ret = new Buffer(this.width * this.height * 4);
        return this.decodePixels((pixels)=>{
            this.copyToImageData(ret, pixels);
            return fn(ret);
        });
    }
};
}),
"[project]/node_modules/qrcode/lib/can-promise.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
module.exports = function() {
    return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};
}),
"[project]/node_modules/qrcode/lib/core/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

let toSJISFunction;
const CODEWORDS_COUNT = [
    0,
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
];
/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */ exports.getSymbolSize = function getSymbolSize(version) {
    if (!version) throw new Error('"version" cannot be null or undefined');
    if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
    return version * 4 + 17;
};
/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */ exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
    return CODEWORDS_COUNT[version];
};
/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */ exports.getBCHDigit = function(data) {
    let digit = 0;
    while(data !== 0){
        digit++;
        data >>>= 1;
    }
    return digit;
};
exports.setToSJISFunction = function setToSJISFunction(f) {
    if (typeof f !== 'function') {
        throw new Error('"toSJISFunc" is not a valid function.');
    }
    toSJISFunction = f;
};
exports.isKanjiModeEnabled = function() {
    return typeof toSJISFunction !== 'undefined';
};
exports.toSJIS = function toSJIS(kanji) {
    return toSJISFunction(kanji);
};
}),
"[project]/node_modules/qrcode/lib/core/error-correction-level.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

exports.L = {
    bit: 1
};
exports.M = {
    bit: 0
};
exports.Q = {
    bit: 3
};
exports.H = {
    bit: 2
};
function fromString(string) {
    if (typeof string !== 'string') {
        throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'l':
        case 'low':
            return exports.L;
        case 'm':
        case 'medium':
            return exports.M;
        case 'q':
        case 'quartile':
            return exports.Q;
        case 'h':
        case 'high':
            return exports.H;
        default:
            throw new Error('Unknown EC Level: ' + string);
    }
}
exports.isValid = function isValid(level) {
    return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};
exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
        return value;
    }
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};
}),
"[project]/node_modules/qrcode/lib/core/bit-buffer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

function BitBuffer() {
    this.buffer = [];
    this.length = 0;
}
BitBuffer.prototype = {
    get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
    },
    put: function(num, length) {
        for(let i = 0; i < length; i++){
            this.putBit((num >>> length - i - 1 & 1) === 1);
        }
    },
    getLengthInBits: function() {
        return this.length;
    },
    putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }
        if (bit) {
            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        }
        this.length++;
    }
};
module.exports = BitBuffer;
}),
"[project]/node_modules/qrcode/lib/core/bit-matrix.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */ function BitMatrix(size) {
    if (!size || size < 1) {
        throw new Error('BitMatrix size must be defined and greater than 0');
    }
    this.size = size;
    this.data = new Uint8Array(size * size);
    this.reservedBit = new Uint8Array(size * size);
}
/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */ BitMatrix.prototype.set = function(row, col, value, reserved) {
    const index = row * this.size + col;
    this.data[index] = value;
    if (reserved) this.reservedBit[index] = true;
};
/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */ BitMatrix.prototype.get = function(row, col) {
    return this.data[row * this.size + col];
};
/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */ BitMatrix.prototype.xor = function(row, col, value) {
    this.data[row * this.size + col] ^= value;
};
/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */ BitMatrix.prototype.isReserved = function(row, col) {
    return this.reservedBit[row * this.size + col];
};
module.exports = BitMatrix;
}),
"[project]/node_modules/qrcode/lib/core/alignment-pattern.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */ const getSymbolSize = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-route] (ecmascript)").getSymbolSize;
/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */ exports.getRowColCoords = function getRowColCoords(version) {
    if (version === 1) return [];
    const posCount = Math.floor(version / 7) + 2;
    const size = getSymbolSize(version);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [
        size - 7
    ] // Last coord is always (size - 7)
    ;
    for(let i = 1; i < posCount - 1; i++){
        positions[i] = positions[i - 1] - intervals;
    }
    positions.push(6); // First coord is always 6
    return positions.reverse();
};
/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const coords = [];
    const pos = exports.getRowColCoords(version);
    const posLength = pos.length;
    for(let i = 0; i < posLength; i++){
        for(let j = 0; j < posLength; j++){
            // Skip if position is occupied by finder patterns
            if (i === 0 && j === 0 || i === 0 && j === posLength - 1 || i === posLength - 1 && j === 0) {
                continue;
            }
            coords.push([
                pos[i],
                pos[j]
            ]);
        }
    }
    return coords;
};
}),
"[project]/node_modules/qrcode/lib/core/finder-pattern.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const getSymbolSize = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-route] (ecmascript)").getSymbolSize;
const FINDER_PATTERN_SIZE = 7;
/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const size = getSymbolSize(version);
    return [
        // top-left
        [
            0,
            0
        ],
        // top-right
        [
            size - FINDER_PATTERN_SIZE,
            0
        ],
        // bottom-left
        [
            0,
            size - FINDER_PATTERN_SIZE
        ]
    ];
};
}),
"[project]/node_modules/qrcode/lib/core/mask-pattern.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Data mask pattern reference
 * @type {Object}
 */ exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
};
/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */ const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
};
/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */ exports.isValid = function isValid(mask) {
    return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};
/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */ exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : undefined;
};
/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/ exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for(let row = 0; row < size; row++){
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for(let col = 0; col < size; col++){
            let module = data.get(row, col);
            if (module === lastCol) {
                sameCountCol++;
            } else {
                if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                lastCol = module;
                sameCountCol = 1;
            }
            module = data.get(col, row);
            if (module === lastRow) {
                sameCountRow++;
            } else {
                if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
                lastRow = module;
                sameCountRow = 1;
            }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
};
/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */ exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for(let row = 0; row < size - 1; row++){
        for(let col = 0; col < size - 1; col++){
            const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
            if (last === 4 || last === 0) points++;
        }
    }
    return points * PenaltyScores.N2;
};
/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */ exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for(let row = 0; row < size; row++){
        bitsCol = bitsRow = 0;
        for(let col = 0; col < size; col++){
            bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
            if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
            bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
            if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
        }
    }
    return points * PenaltyScores.N3;
};
/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */ exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for(let i = 0; i < modulesCount; i++)darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
};
/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */ function getMaskAt(maskPattern, i, j) {
    switch(maskPattern){
        case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
            return i % 2 === 0;
        case exports.Patterns.PATTERN010:
            return j % 3 === 0;
        case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
            throw new Error('bad maskPattern:' + maskPattern);
    }
}
/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */ exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for(let col = 0; col < size; col++){
        for(let row = 0; row < size; row++){
            if (data.isReserved(row, col)) continue;
            data.xor(row, col, getMaskAt(pattern, row, col));
        }
    }
};
/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */ exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for(let p = 0; p < numPatterns; p++){
        setupFormatFunc(p);
        exports.applyMask(p, data);
        // Calculate penalty
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        // Undo previously applied mask
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
        }
    }
    return bestPattern;
};
}),
"[project]/node_modules/qrcode/lib/core/error-correction-code.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const ECLevel = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-level.js [app-route] (ecmascript)");
const EC_BLOCKS_TABLE = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
];
const EC_CODEWORDS_TABLE = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
];
/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */ exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */ exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
}),
"[project]/node_modules/qrcode/lib/core/galois-field.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initTables() {
    let x = 1;
    for(let i = 0; i < 255; i++){
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1; // multiply by 2
        // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
        // This means that when a number is 256 or larger, it should be XORed with 0x11D.
        if (x & 0x100) {
            x ^= 0x11D;
        }
    }
    // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
    // stay inside the bounds (because we will mainly use this table for the multiplication of
    // two GF numbers, no more).
    // @see {@link mul}
    for(let i = 255; i < 512; i++){
        EXP_TABLE[i] = EXP_TABLE[i - 255];
    }
})();
/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.log = function log(n) {
    if (n < 1) throw new Error('log(' + n + ')');
    return LOG_TABLE[n];
};
/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.exp = function exp(n) {
    return EXP_TABLE[n];
};
/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */ exports.mul = function mul(x, y) {
    if (x === 0 || y === 0) return 0;
    // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
    // @see {@link initTables}
    return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
}),
"[project]/node_modules/qrcode/lib/core/polynomial.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const GF = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/galois-field.js [app-route] (ecmascript)");
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */ exports.mul = function mul(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for(let i = 0; i < p1.length; i++){
        for(let j = 0; j < p2.length; j++){
            coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
    }
    return coeff;
};
/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */ exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while(result.length - divisor.length >= 0){
        const coeff = result[0];
        for(let i = 0; i < divisor.length; i++){
            result[i] ^= GF.mul(divisor[i], coeff);
        }
        // remove all zeros from buffer head
        let offset = 0;
        while(offset < result.length && result[offset] === 0)offset++;
        result = result.slice(offset);
    }
    return result;
};
/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */ exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([
        1
    ]);
    for(let i = 0; i < degree; i++){
        poly = exports.mul(poly, new Uint8Array([
            1,
            GF.exp(i)
        ]));
    }
    return poly;
};
}),
"[project]/node_modules/qrcode/lib/core/reed-solomon-encoder.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Polynomial = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/polynomial.js [app-route] (ecmascript)");
function ReedSolomonEncoder(degree) {
    this.genPoly = undefined;
    this.degree = degree;
    if (this.degree) this.initialize(this.degree);
}
/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */ ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
    // create an irreducible generator polynomial
    this.degree = degree;
    this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */ ReedSolomonEncoder.prototype.encode = function encode(data) {
    if (!this.genPoly) {
        throw new Error('Encoder not initialized');
    }
    // Calculate EC for this data block
    // extends data size to data+genPoly size
    const paddedData = new Uint8Array(data.length + this.degree);
    paddedData.set(data);
    // The error correction codewords are the remainder after dividing the data codewords
    // by a generator polynomial
    const remainder = Polynomial.mod(paddedData, this.genPoly);
    // return EC data blocks (last n byte, where n is the degree of genPoly)
    // If coefficients number in remainder are less than genPoly degree,
    // pad with 0s to the left to reach the needed number of coefficients
    const start = this.degree - remainder.length;
    if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
    }
    return remainder;
};
module.exports = ReedSolomonEncoder;
}),
"[project]/node_modules/qrcode/lib/core/version-check.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */ exports.isValid = function isValid(version) {
    return !isNaN(version) && version >= 1 && version <= 40;
};
}),
"[project]/node_modules/qrcode/lib/core/regex.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');
const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
exports.testKanji = function testKanji(str) {
    return TEST_KANJI.test(str);
};
exports.testNumeric = function testNumeric(str) {
    return TEST_NUMERIC.test(str);
};
exports.testAlphanumeric = function testAlphanumeric(str) {
    return TEST_ALPHANUMERIC.test(str);
};
}),
"[project]/node_modules/qrcode/lib/core/mode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const VersionCheck = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/version-check.js [app-route] (ecmascript)");
const Regex = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/regex.js [app-route] (ecmascript)");
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */ exports.NUMERIC = {
    id: 'Numeric',
    bit: 1 << 0,
    ccBits: [
        10,
        12,
        14
    ]
};
/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */ exports.ALPHANUMERIC = {
    id: 'Alphanumeric',
    bit: 1 << 1,
    ccBits: [
        9,
        11,
        13
    ]
};
/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */ exports.BYTE = {
    id: 'Byte',
    bit: 1 << 2,
    ccBits: [
        8,
        16,
        16
    ]
};
/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */ exports.KANJI = {
    id: 'Kanji',
    bit: 1 << 3,
    ccBits: [
        8,
        10,
        12
    ]
};
/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */ exports.MIXED = {
    bit: -1
};
/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */ exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
    if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
    if (!VersionCheck.isValid(version)) {
        throw new Error('Invalid version: ' + version);
    }
    if (version >= 1 && version < 10) return mode.ccBits[0];
    else if (version < 27) return mode.ccBits[1];
    return mode.ccBits[2];
};
/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */ exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr)) return exports.KANJI;
    else return exports.BYTE;
};
/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */ exports.toString = function toString(mode) {
    if (mode && mode.id) return mode.id;
    throw new Error('Invalid mode');
};
/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */ exports.isValid = function isValid(mode) {
    return mode && mode.bit && mode.ccBits;
};
/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */ function fromString(string) {
    if (typeof string !== 'string') {
        throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'numeric':
            return exports.NUMERIC;
        case 'alphanumeric':
            return exports.ALPHANUMERIC;
        case 'kanji':
            return exports.KANJI;
        case 'byte':
            return exports.BYTE;
        default:
            throw new Error('Unknown mode: ' + string);
    }
}
/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */ exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
        return value;
    }
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};
}),
"[project]/node_modules/qrcode/lib/core/version.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-route] (ecmascript)");
const ECCode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-code.js [app-route] (ecmascript)");
const ECLevel = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-level.js [app-route] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-route] (ecmascript)");
const VersionCheck = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/version-check.js [app-route] (ecmascript)");
// Generator polynomial used to encode version information
const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
const G18_BCH = Utils.getBCHDigit(G18);
function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
            return currentVersion;
        }
    }
    return undefined;
}
function getReservedBitsCount(mode, version) {
    // Character count indicator + mode indicator bits
    return Mode.getCharCountIndicator(mode, version) + 4;
}
function getTotalBitsFromDataArray(segments, version) {
    let totalBits = 0;
    segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
}
function getBestVersionForMixedData(segments, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
            return currentVersion;
        }
    }
    return undefined;
}
/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */ exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
    }
    return defaultValue;
};
/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */ exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
    if (!VersionCheck.isValid(version)) {
        throw new Error('Invalid QR Code version');
    }
    // Use Byte mode as default
    if (typeof mode === 'undefined') mode = Mode.BYTE;
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode === Mode.MIXED) return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
    // Return max number of storable codewords
    switch(mode){
        case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
            return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
            return Math.floor(usableBits / 8);
    }
};
/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */ exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
    let seg;
    const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
    if (Array.isArray(data)) {
        if (data.length > 1) {
            return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
            return 1;
        }
        seg = data[0];
    } else {
        seg = data;
    }
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};
/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */ exports.getEncodedBits = function getEncodedBits(version) {
    if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error('Invalid QR Code version');
    }
    let d = version << 12;
    while(Utils.getBCHDigit(d) - G18_BCH >= 0){
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
    }
    return version << 12 | d;
};
}),
"[project]/node_modules/qrcode/lib/core/format-info.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-route] (ecmascript)");
const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
const G15_BCH = Utils.getBCHDigit(G15);
/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */ exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
    const data = errorCorrectionLevel.bit << 3 | mask;
    let d = data << 10;
    while(Utils.getBCHDigit(d) - G15_BCH >= 0){
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
    }
    // xor final data with mask pattern in order to ensure that
    // no combination of Error Correction Level and data mask pattern
    // will result in an all-zero data string
    return (data << 10 | d) ^ G15_MASK;
};
}),
"[project]/node_modules/qrcode/lib/core/numeric-data.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-route] (ecmascript)");
function NumericData(data) {
    this.mode = Mode.NUMERIC;
    this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
    return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength() {
    return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer) {
    let i, group, value;
    // The input data string is divided into groups of three digits,
    // and each group is converted to its 10-bit binary equivalent.
    for(i = 0; i + 3 <= this.data.length; i += 3){
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
    }
    // If the number of input digits is not an exact multiple of three,
    // the final one or two digits are converted to 4 or 7 bits respectively.
    const remainingNum = this.data.length - i;
    if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
    }
};
module.exports = NumericData;
}),
"[project]/node_modules/qrcode/lib/core/alphanumeric-data.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-route] (ecmascript)");
/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */ const ALPHA_NUM_CHARS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    ' ',
    '$',
    '%',
    '*',
    '+',
    '-',
    '.',
    '/',
    ':'
];
function AlphanumericData(data) {
    this.mode = Mode.ALPHANUMERIC;
    this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength(length) {
    return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength() {
    return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write(bitBuffer) {
    let i;
    // Input data characters are divided into groups of two characters
    // and encoded as 11-bit binary codes.
    for(i = 0; i + 2 <= this.data.length; i += 2){
        // The character value of the first character is multiplied by 45
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        // The character value of the second digit is added to the product
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        // The sum is then stored as 11-bit binary number
        bitBuffer.put(value, 11);
    }
    // If the number of input data characters is not a multiple of two,
    // the character value of the final character is encoded as a 6-bit binary number.
    if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
    }
};
module.exports = AlphanumericData;
}),
"[project]/node_modules/qrcode/lib/core/byte-data.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-route] (ecmascript)");
function ByteData(data) {
    this.mode = Mode.BYTE;
    if (typeof data === 'string') {
        this.data = new TextEncoder().encode(data);
    } else {
        this.data = new Uint8Array(data);
    }
}
ByteData.getBitsLength = function getBitsLength(length) {
    return length * 8;
};
ByteData.prototype.getLength = function getLength() {
    return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength() {
    return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer) {
    for(let i = 0, l = this.data.length; i < l; i++){
        bitBuffer.put(this.data[i], 8);
    }
};
module.exports = ByteData;
}),
"[project]/node_modules/qrcode/lib/core/kanji-data.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-route] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-route] (ecmascript)");
function KanjiData(data) {
    this.mode = Mode.KANJI;
    this.data = data;
}
KanjiData.getBitsLength = function getBitsLength(length) {
    return length * 13;
};
KanjiData.prototype.getLength = function getLength() {
    return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength() {
    return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer) {
    let i;
    // In the Shift JIS system, Kanji characters are represented by a two byte combination.
    // These byte values are shifted from the JIS X 0208 values.
    // JIS X 0208 gives details of the shift coded representation.
    for(i = 0; i < this.data.length; i++){
        let value = Utils.toSJIS(this.data[i]);
        // For characters with Shift JIS values from 0x8140 to 0x9FFC:
        if (value >= 0x8140 && value <= 0x9FFC) {
            // Subtract 0x8140 from Shift JIS value
            value -= 0x8140;
        // For characters with Shift JIS values from 0xE040 to 0xEBBF
        } else if (value >= 0xE040 && value <= 0xEBBF) {
            // Subtract 0xC140 from Shift JIS value
            value -= 0xC140;
        } else {
            throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
        }
        // Multiply most significant byte of result by 0xC0
        // and add least significant byte to product
        value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);
        // Convert result to a 13-bit binary string
        bitBuffer.put(value, 13);
    }
};
module.exports = KanjiData;
}),
"[project]/node_modules/qrcode/lib/core/segments.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-route] (ecmascript)");
const NumericData = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/numeric-data.js [app-route] (ecmascript)");
const AlphanumericData = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/alphanumeric-data.js [app-route] (ecmascript)");
const ByteData = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/byte-data.js [app-route] (ecmascript)");
const KanjiData = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/kanji-data.js [app-route] (ecmascript)");
const Regex = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/regex.js [app-route] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-route] (ecmascript)");
const dijkstra = __turbopack_context__.r("[project]/node_modules/dijkstrajs/dijkstra.js [app-route] (ecmascript)");
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */ function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
}
/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */ function getSegments(regex, mode, str) {
    const segments = [];
    let result;
    while((result = regex.exec(str)) !== null){
        segments.push({
            data: result[0],
            index: result.index,
            mode: mode,
            length: result[0].length
        });
    }
    return segments;
}
/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */ function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
    } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
    }).map(function(obj) {
        return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
        };
    });
}
/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */ function getSegmentBitsLength(length, mode) {
    switch(mode){
        case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
            return KanjiData.getBitsLength(length);
        case Mode.BYTE:
            return ByteData.getBitsLength(length);
    }
}
/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
        }
        acc.push(curr);
        return acc;
    }, []);
}
/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function buildNodes(segs) {
    const nodes = [];
    for(let i = 0; i < segs.length; i++){
        const seg = segs[i];
        switch(seg.mode){
            case Mode.NUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.ALPHANUMERIC,
                        length: seg.length
                    },
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.ALPHANUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.KANJI:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
                break;
            case Mode.BYTE:
                nodes.push([
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
        }
    }
    return nodes;
}
/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */ function buildGraph(nodes, version) {
    const table = {};
    const graph = {
        start: {}
    };
    let prevNodeIds = [
        'start'
    ];
    for(let i = 0; i < nodes.length; i++){
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for(let j = 0; j < nodeGroup.length; j++){
            const node = nodeGroup[j];
            const key = '' + i + j;
            currentNodeIds.push(key);
            table[key] = {
                node: node,
                lastCount: 0
            };
            graph[key] = {};
            for(let n = 0; n < prevNodeIds.length; n++){
                const prevNodeId = prevNodeIds[n];
                if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                    graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                    table[prevNodeId].lastCount += node.length;
                } else {
                    if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                    graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
                }
            }
        }
        prevNodeIds = currentNodeIds;
    }
    for(let n = 0; n < prevNodeIds.length; n++){
        graph[prevNodeIds[n]].end = 0;
    }
    return {
        map: graph,
        table: table
    };
}
/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */ function buildSingleSegment(data, modesHint) {
    let mode;
    const bestMode = Mode.getBestModeForData(data);
    mode = Mode.from(modesHint, bestMode);
    // Make sure data can be encoded
    if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
    }
    // Use Mode.BYTE if Kanji support is disabled
    if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
    }
    switch(mode){
        case Mode.NUMERIC:
            return new NumericData(data);
        case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
        case Mode.KANJI:
            return new KanjiData(data);
        case Mode.BYTE:
            return new ByteData(data);
    }
}
/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */ exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
        if (typeof seg === 'string') {
            acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
            acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
    }, []);
};
/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */ exports.fromString = function fromString(data, version) {
    const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version);
    const path = dijkstra.find_path(graph.map, 'start', 'end');
    const optimizedSegs = [];
    for(let i = 1; i < path.length - 1; i++){
        optimizedSegs.push(graph.table[path[i]].node);
    }
    return exports.fromArray(mergeSegments(optimizedSegs));
};
/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */ exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};
}),
"[project]/node_modules/qrcode/lib/core/qrcode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-route] (ecmascript)");
const ECLevel = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-level.js [app-route] (ecmascript)");
const BitBuffer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/bit-buffer.js [app-route] (ecmascript)");
const BitMatrix = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/bit-matrix.js [app-route] (ecmascript)");
const AlignmentPattern = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/alignment-pattern.js [app-route] (ecmascript)");
const FinderPattern = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/finder-pattern.js [app-route] (ecmascript)");
const MaskPattern = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mask-pattern.js [app-route] (ecmascript)");
const ECCode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-code.js [app-route] (ecmascript)");
const ReedSolomonEncoder = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/reed-solomon-encoder.js [app-route] (ecmascript)");
const Version = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/version.js [app-route] (ecmascript)");
const FormatInfo = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/format-info.js [app-route] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-route] (ecmascript)");
const Segments = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/segments.js [app-route] (ecmascript)");
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/ /**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupFinderPattern(matrix, version) {
    const size = matrix.size;
    const pos = FinderPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -1; r <= 7; r++){
            if (row + r <= -1 || size <= row + r) continue;
            for(let c = -1; c <= 7; c++){
                if (col + c <= -1 || size <= col + c) continue;
                if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                    matrix.set(row + r, col + c, true, true);
                } else {
                    matrix.set(row + r, col + c, false, true);
                }
            }
        }
    }
}
/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */ function setupTimingPattern(matrix) {
    const size = matrix.size;
    for(let r = 8; r < size - 8; r++){
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
    }
}
/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupAlignmentPattern(matrix, version) {
    const pos = AlignmentPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -2; r <= 2; r++){
            for(let c = -2; c <= 2; c++){
                if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
                    matrix.set(row + r, col + c, true, true);
                } else {
                    matrix.set(row + r, col + c, false, true);
                }
            }
        }
    }
}
/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupVersionInfo(matrix, version) {
    const size = matrix.size;
    const bits = Version.getEncodedBits(version);
    let row, col, mod;
    for(let i = 0; i < 18; i++){
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
    }
}
/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */ function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
    const size = matrix.size;
    const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
    let i, mod;
    for(i = 0; i < 15; i++){
        mod = (bits >> i & 1) === 1;
        // vertical
        if (i < 6) {
            matrix.set(i, 8, mod, true);
        } else if (i < 8) {
            matrix.set(i + 1, 8, mod, true);
        } else {
            matrix.set(size - 15 + i, 8, mod, true);
        }
        // horizontal
        if (i < 8) {
            matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
            matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
            matrix.set(8, 15 - i - 1, mod, true);
        }
    }
    // fixed module
    matrix.set(size - 8, 8, 1, true);
}
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */ function setupData(matrix, data) {
    const size = matrix.size;
    let inc = -1;
    let row = size - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for(let col = size - 1; col > 0; col -= 2){
        if (col === 6) col--;
        while(true){
            for(let c = 0; c < 2; c++){
                if (!matrix.isReserved(row, col - c)) {
                    let dark = false;
                    if (byteIndex < data.length) {
                        dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                    }
                    matrix.set(row, col - c, dark);
                    bitIndex--;
                    if (bitIndex === -1) {
                        byteIndex++;
                        bitIndex = 7;
                    }
                }
            }
            row += inc;
            if (row < 0 || size <= row) {
                row -= inc;
                inc = -inc;
                break;
            }
        }
    }
}
/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */ function createData(version, errorCorrectionLevel, segments) {
    // Prepare data buffer
    const buffer = new BitBuffer();
    segments.forEach(function(data) {
        // prefix data with mode indicator (4 bits)
        buffer.put(data.mode.bit, 4);
        // Prefix data with character count indicator.
        // The character count indicator is a string of bits that represents the
        // number of characters that are being encoded.
        // The character count indicator must be placed after the mode indicator
        // and must be a certain number of bits long, depending on the QR version
        // and data mode
        // @see {@link Mode.getCharCountIndicator}.
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        // add binary data sequence to buffer
        data.write(buffer);
    });
    // Calculate required number of bits
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    // Add a terminator.
    // If the bit string is shorter than the total number of required bits,
    // a terminator of up to four 0s must be added to the right side of the string.
    // If the bit string is more than four bits shorter than the required number of bits,
    // add four 0s to the end.
    if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
    }
    // If the bit string is fewer than four bits shorter, add only the number of 0s that
    // are needed to reach the required number of bits.
    // After adding the terminator, if the number of bits in the string is not a multiple of 8,
    // pad the string on the right with 0s to make the string's length a multiple of 8.
    while(buffer.getLengthInBits() % 8 !== 0){
        buffer.putBit(0);
    }
    // Add pad bytes if the string is still shorter than the total number of required bits.
    // Extend the buffer to fill the data capacity of the symbol corresponding to
    // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
    // and 00010001 (0x11) alternately.
    const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
    for(let i = 0; i < remainingByte; i++){
        buffer.put(i % 2 ? 0x11 : 0xEC, 8);
    }
    return createCodewords(buffer, version, errorCorrectionLevel);
}
/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */ function createCodewords(bitBuffer, version, errorCorrectionLevel) {
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewords = totalCodewords - ecTotalCodewords;
    // Total number of blocks
    const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
    // Calculate how many blocks each group should contain
    const blocksInGroup2 = totalCodewords % ecTotalBlocks;
    const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
    const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
    // Number of EC codewords is the same for both groups
    const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
    // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
    const rs = new ReedSolomonEncoder(ecCount);
    let offset = 0;
    const dcData = new Array(ecTotalBlocks);
    const ecData = new Array(ecTotalBlocks);
    let maxDataSize = 0;
    const buffer = new Uint8Array(bitBuffer.buffer);
    // Divide the buffer into the required number of blocks
    for(let b = 0; b < ecTotalBlocks; b++){
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        // extract a block of data from buffer
        dcData[b] = buffer.slice(offset, offset + dataSize);
        // Calculate EC codewords for this data block
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
    }
    // Create final data
    // Interleave the data and error correction codewords from each block
    const data = new Uint8Array(totalCodewords);
    let index = 0;
    let i, r;
    // Add data codewords
    for(i = 0; i < maxDataSize; i++){
        for(r = 0; r < ecTotalBlocks; r++){
            if (i < dcData[r].length) {
                data[index++] = dcData[r][i];
            }
        }
    }
    // Apped EC codewords
    for(i = 0; i < ecCount; i++){
        for(r = 0; r < ecTotalBlocks; r++){
            data[index++] = ecData[r][i];
        }
    }
    return data;
}
/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */ function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
    let segments;
    if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
    } else if (typeof data === 'string') {
        let estimatedVersion = version;
        if (!estimatedVersion) {
            const rawSegments = Segments.rawSplit(data);
            // Estimate best version that can contain raw splitted segments
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        // Build optimized segments
        // If estimated version is undefined, try with the highest version
        segments = Segments.fromString(data, estimatedVersion || 40);
    } else {
        throw new Error('Invalid data');
    }
    // Get the min version that can contain data
    const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
    // If no version is found, data cannot be stored
    if (!bestVersion) {
        throw new Error('The amount of data is too big to be stored in a QR Code');
    }
    // If not specified, use min version as default
    if (!version) {
        version = bestVersion;
    // Check if the specified version can contain the data
    } else if (version < bestVersion) {
        throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
    }
    const dataBits = createData(version, errorCorrectionLevel, segments);
    // Allocate matrix buffer
    const moduleCount = Utils.getSymbolSize(version);
    const modules = new BitMatrix(moduleCount);
    // Add function modules
    setupFinderPattern(modules, version);
    setupTimingPattern(modules);
    setupAlignmentPattern(modules, version);
    // Add temporary dummy bits for format info just to set them as reserved.
    // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
    // since the masking operation must be performed only on the encoding region.
    // These blocks will be replaced with correct values later in code.
    setupFormatInfo(modules, errorCorrectionLevel, 0);
    if (version >= 7) {
        setupVersionInfo(modules, version);
    }
    // Add data codewords
    setupData(modules, dataBits);
    if (isNaN(maskPattern)) {
        // Find best mask pattern
        maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
    }
    // Apply mask pattern
    MaskPattern.applyMask(maskPattern, modules);
    // Replace format info bits with correct values
    setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
    return {
        modules: modules,
        version: version,
        errorCorrectionLevel: errorCorrectionLevel,
        maskPattern: maskPattern,
        segments: segments
    };
}
/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */ exports.create = function create(data, options) {
    if (typeof data === 'undefined' || data === '') {
        throw new Error('No input text');
    }
    let errorCorrectionLevel = ECLevel.M;
    let version;
    let mask;
    if (typeof options !== 'undefined') {
        // Use higher error correction level as default
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
            Utils.setToSJISFunction(options.toSJISFunc);
        }
    }
    return createSymbol(data, version, errorCorrectionLevel, mask);
};
}),
"[project]/node_modules/qrcode/lib/renderer/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

function hex2rgba(hex) {
    if (typeof hex === 'number') {
        hex = hex.toString();
    }
    if (typeof hex !== 'string') {
        throw new Error('Color should be defined as hex string');
    }
    let hexCode = hex.slice().replace('#', '').split('');
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error('Invalid hex color: ' + hex);
    }
    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
            return [
                c,
                c
            ];
        }));
    }
    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F');
    const hexValue = parseInt(hexCode.join(''), 16);
    return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: '#' + hexCode.slice(0, 6).join('')
    };
}
exports.getOptions = function getOptions(options) {
    if (!options) options = {};
    if (!options.color) options.color = {};
    const margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : undefined;
    const scale = options.scale || 4;
    return {
        width: width,
        scale: width ? 4 : scale,
        margin: margin,
        color: {
            dark: hex2rgba(options.color.dark || '#000000ff'),
            light: hex2rgba(options.color.light || '#ffffffff')
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
    };
};
exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};
exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
};
exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [
        opts.color.light,
        opts.color.dark
    ];
    for(let i = 0; i < symbolSize; i++){
        for(let j = 0; j < symbolSize; j++){
            let posDst = (i * symbolSize + j) * 4;
            let pxColor = opts.color.light;
            if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
                const iSrc = Math.floor((i - scaledMargin) / scale);
                const jSrc = Math.floor((j - scaledMargin) / scale);
                pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
            }
            imgData[posDst++] = pxColor.r;
            imgData[posDst++] = pxColor.g;
            imgData[posDst++] = pxColor.b;
            imgData[posDst] = pxColor.a;
        }
    }
};
}),
"[project]/node_modules/qrcode/lib/renderer/canvas.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utils.js [app-route] (ecmascript)");
function clearCanvas(ctx, canvas, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!canvas.style) canvas.style = {};
    canvas.height = size;
    canvas.width = size;
    canvas.style.height = size + 'px';
    canvas.style.width = size + 'px';
}
function getCanvasElement() {
    try {
        return document.createElement('canvas');
    } catch (e) {
        throw new Error('You need to specify a canvas element');
    }
}
exports.render = function render(qrData, canvas, options) {
    let opts = options;
    let canvasEl = canvas;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!canvas) {
        canvasEl = getCanvasElement();
    }
    opts = Utils.getOptions(opts);
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext('2d');
    const image = ctx.createImageData(size, size);
    Utils.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
};
exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
    let opts = options;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!opts) opts = {};
    const canvasEl = exports.render(qrData, canvas, opts);
    const type = opts.type || 'image/png';
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
};
}),
"[project]/node_modules/qrcode/lib/renderer/svg-tag.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utils.js [app-route] (ecmascript)");
function getColorAttrib(color, attrib) {
    const alpha = color.a / 255;
    const str = attrib + '="' + color.hex + '"';
    return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
    let str = cmd + x;
    if (typeof y !== 'undefined') str += ' ' + y;
    return str;
}
function qrToPath(data, size, margin) {
    let path = '';
    let moveBy = 0;
    let newRow = false;
    let lineLength = 0;
    for(let i = 0; i < data.length; i++){
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
            lineLength++;
            if (!(i > 0 && col > 0 && data[i - 1])) {
                path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
                moveBy = 0;
                newRow = false;
            }
            if (!(col + 1 < size && data[i + 1])) {
                path += svgCmd('h', lineLength);
                lineLength = 0;
            }
        } else {
            moveBy++;
        }
    }
    return path;
}
exports.render = function render(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const qrcodesize = size + opts.margin * 2;
    const bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
    const path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
    const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
    const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
    const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
    if (typeof cb === 'function') {
        cb(null, svgTag);
    }
    return svgTag;
};
}),
"[project]/node_modules/qrcode/lib/browser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const canPromise = __turbopack_context__.r("[project]/node_modules/qrcode/lib/can-promise.js [app-route] (ecmascript)");
const QRCode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/qrcode.js [app-route] (ecmascript)");
const CanvasRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/canvas.js [app-route] (ecmascript)");
const SvgRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/svg-tag.js [app-route] (ecmascript)");
function renderCanvas(renderFunc, canvas, text, opts, cb) {
    const args = [].slice.call(arguments, 1);
    const argsNum = args.length;
    const isLastArgCb = typeof args[argsNum - 1] === 'function';
    if (!isLastArgCb && !canPromise()) {
        throw new Error('Callback required as last argument');
    }
    if (isLastArgCb) {
        if (argsNum < 2) {
            throw new Error('Too few arguments provided');
        }
        if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === 'undefined') {
                cb = opts;
                opts = undefined;
            } else {
                cb = opts;
                opts = text;
                text = canvas;
                canvas = undefined;
            }
        }
    } else {
        if (argsNum < 1) {
            throw new Error('Too few arguments provided');
        }
        if (argsNum === 1) {
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = undefined;
        }
        return new Promise(function(resolve, reject) {
            try {
                const data = QRCode.create(text, opts);
                resolve(renderFunc(data, canvas, opts));
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        const data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
    } catch (e) {
        cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
// only svg for now.
exports.toString = renderCanvas.bind(null, function(data, _, opts) {
    return SvgRenderer.render(data, opts);
});
}),
"[project]/node_modules/qrcode/lib/renderer/png.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const PNG = __turbopack_context__.r("[project]/node_modules/pngjs/lib/png.js [app-route] (ecmascript)").PNG;
const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utils.js [app-route] (ecmascript)");
exports.render = function render(qrData, options) {
    const opts = Utils.getOptions(options);
    const pngOpts = opts.rendererOpts;
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    pngOpts.width = size;
    pngOpts.height = size;
    const pngImage = new PNG(pngOpts);
    Utils.qrToImageData(pngImage.data, qrData, opts);
    return pngImage;
};
exports.renderToDataURL = function renderToDataURL(qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    exports.renderToBuffer(qrData, options, function(err, output) {
        if (err) cb(err);
        let url = 'data:image/png;base64,';
        url += output.toString('base64');
        cb(null, url);
    });
};
exports.renderToBuffer = function renderToBuffer(qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const png = exports.render(qrData, options);
    const buffer = [];
    png.on('error', cb);
    png.on('data', function(data) {
        buffer.push(data);
    });
    png.on('end', function() {
        cb(null, Buffer.concat(buffer));
    });
    png.pack();
};
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    let called = false;
    const done = (...args)=>{
        if (called) return;
        called = true;
        cb.apply(null, args);
    };
    const stream = fs.createWriteStream(path);
    stream.on('error', done);
    stream.on('close', done);
    exports.renderToFileStream(stream, qrData, options);
};
exports.renderToFileStream = function renderToFileStream(stream, qrData, options) {
    const png = exports.render(qrData, options);
    png.pack().pipe(stream);
};
}),
"[project]/node_modules/qrcode/lib/renderer/utf8.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utils.js [app-route] (ecmascript)");
const BLOCK_CHAR = {
    WW: ' ',
    WB: '▄',
    BB: '█',
    BW: '▀'
};
const INVERTED_BLOCK_CHAR = {
    BB: ' ',
    BW: '▄',
    WW: '█',
    WB: '▀'
};
function getBlockChar(top, bottom, blocks) {
    if (top && bottom) return blocks.BB;
    if (top && !bottom) return blocks.BW;
    if (!top && bottom) return blocks.WB;
    return blocks.WW;
}
exports.render = function(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    let blocks = BLOCK_CHAR;
    if (opts.color.dark.hex === '#ffffff' || opts.color.light.hex === '#000000') {
        blocks = INVERTED_BLOCK_CHAR;
    }
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    let output = '';
    let hMargin = Array(size + opts.margin * 2 + 1).join(blocks.WW);
    hMargin = Array(opts.margin / 2 + 1).join(hMargin + '\n');
    const vMargin = Array(opts.margin + 1).join(blocks.WW);
    output += hMargin;
    for(let i = 0; i < size; i += 2){
        output += vMargin;
        for(let j = 0; j < size; j++){
            const topModule = data[i * size + j];
            const bottomModule = data[(i + 1) * size + j];
            output += getBlockChar(topModule, bottomModule, blocks);
        }
        output += vMargin + '\n';
    }
    output += hMargin.slice(0, -1);
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
};
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    const utf8 = exports.render(qrData, options);
    fs.writeFile(path, utf8, cb);
};
}),
"[project]/node_modules/qrcode/lib/renderer/terminal/terminal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// let Utils = require('./utils')
exports.render = function(qrData, options, cb) {
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    // let opts = Utils.getOptions(options)
    // use same scheme as https://github.com/gtanner/qrcode-terminal because it actually works! =)
    const black = '\x1b[40m  \x1b[0m';
    const white = '\x1b[47m  \x1b[0m';
    let output = '';
    const hMargin = Array(size + 3).join(white);
    const vMargin = Array(2).join(white);
    output += hMargin + '\n';
    for(let i = 0; i < size; ++i){
        output += white;
        for(let j = 0; j < size; j++){
            // let topModule = data[i * size + j]
            // let bottomModule = data[(i + 1) * size + j]
            output += data[i * size + j] ? black : white; // getBlockChar(topModule, bottomModule)
        }
        // output += white+'\n'
        output += vMargin + '\n';
    }
    output += hMargin + '\n';
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
}; /*
exports.renderToFile = function renderToFile (path, qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options
    options = undefined
  }

  let fs = require('fs')
  let utf8 = exports.render(qrData, options)
  fs.writeFile(path, utf8, cb)
}
*/ 
}),
"[project]/node_modules/qrcode/lib/renderer/terminal/terminal-small.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const backgroundWhite = '\x1b[47m';
const backgroundBlack = '\x1b[40m';
const foregroundWhite = '\x1b[37m';
const foregroundBlack = '\x1b[30m';
const reset = '\x1b[0m';
const lineSetupNormal = backgroundWhite + foregroundBlack // setup colors
;
const lineSetupInverse = backgroundBlack + foregroundWhite // setup colors
;
const createPalette = function(lineSetup, foregroundWhite, foregroundBlack) {
    return {
        // 1 ... white, 2 ... black, 0 ... transparent (default)
        '00': reset + ' ' + lineSetup,
        '01': reset + foregroundWhite + '▄' + lineSetup,
        '02': reset + foregroundBlack + '▄' + lineSetup,
        10: reset + foregroundWhite + '▀' + lineSetup,
        11: ' ',
        12: '▄',
        20: reset + foregroundBlack + '▀' + lineSetup,
        21: '▀',
        22: '█'
    };
};
/**
 * Returns code for QR pixel
 * @param {boolean[][]} modules
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @return {'0' | '1' | '2'}
 */ const mkCodePixel = function(modules, size, x, y) {
    const sizePlus = size + 1;
    if (x >= sizePlus || y >= sizePlus || y < -1 || x < -1) return '0';
    if (x >= size || y >= size || y < 0 || x < 0) return '1';
    const idx = y * size + x;
    return modules[idx] ? '2' : '1';
};
/**
 * Returns code for four QR pixels. Suitable as key in palette.
 * @param {boolean[][]} modules
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @return {keyof palette}
 */ const mkCode = function(modules, size, x, y) {
    return mkCodePixel(modules, size, x, y) + mkCodePixel(modules, size, x, y + 1);
};
exports.render = function(qrData, options, cb) {
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const inverse = !!(options && options.inverse);
    const lineSetup = options && options.inverse ? lineSetupInverse : lineSetupNormal;
    const white = inverse ? foregroundBlack : foregroundWhite;
    const black = inverse ? foregroundWhite : foregroundBlack;
    const palette = createPalette(lineSetup, white, black);
    const newLine = reset + '\n' + lineSetup;
    let output = lineSetup // setup colors
    ;
    for(let y = -1; y < size + 1; y += 2){
        for(let x = -1; x < size; x++){
            output += palette[mkCode(data, size, x, y)];
        }
        output += palette[mkCode(data, size, size, y)] + newLine;
    }
    output += reset;
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
};
}),
"[project]/node_modules/qrcode/lib/renderer/terminal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const big = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/terminal/terminal.js [app-route] (ecmascript)");
const small = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/terminal/terminal-small.js [app-route] (ecmascript)");
exports.render = function(qrData, options, cb) {
    if (options && options.small) {
        return small.render(qrData, options, cb);
    }
    return big.render(qrData, options, cb);
};
}),
"[project]/node_modules/qrcode/lib/renderer/svg.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const svgTagRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/svg-tag.js [app-route] (ecmascript)");
exports.render = svgTagRenderer.render;
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    const svgTag = exports.render(qrData, options);
    const xmlStr = '<?xml version="1.0" encoding="utf-8"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + svgTag;
    fs.writeFile(path, xmlStr, cb);
};
}),
"[project]/node_modules/qrcode/lib/server.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const canPromise = __turbopack_context__.r("[project]/node_modules/qrcode/lib/can-promise.js [app-route] (ecmascript)");
const QRCode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/qrcode.js [app-route] (ecmascript)");
const PngRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/png.js [app-route] (ecmascript)");
const Utf8Renderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utf8.js [app-route] (ecmascript)");
const TerminalRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/terminal.js [app-route] (ecmascript)");
const SvgRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/svg.js [app-route] (ecmascript)");
function checkParams(text, opts, cb) {
    if (typeof text === 'undefined') {
        throw new Error('String required as first argument');
    }
    if (typeof cb === 'undefined') {
        cb = opts;
        opts = {};
    }
    if (typeof cb !== 'function') {
        if (!canPromise()) {
            throw new Error('Callback required as last argument');
        } else {
            opts = cb || {};
            cb = null;
        }
    }
    return {
        opts: opts,
        cb: cb
    };
}
function getTypeFromFilename(path) {
    return path.slice((path.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
}
function getRendererFromType(type) {
    switch(type){
        case 'svg':
            return SvgRenderer;
        case 'txt':
        case 'utf8':
            return Utf8Renderer;
        case 'png':
        case 'image/png':
        default:
            return PngRenderer;
    }
}
function getStringRendererFromType(type) {
    switch(type){
        case 'svg':
            return SvgRenderer;
        case 'terminal':
            return TerminalRenderer;
        case 'utf8':
        default:
            return Utf8Renderer;
    }
}
function render(renderFunc, text, params) {
    if (!params.cb) {
        return new Promise(function(resolve, reject) {
            try {
                const data = QRCode.create(text, params.opts);
                return renderFunc(data, params.opts, function(err, data) {
                    return err ? reject(err) : resolve(data);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        const data = QRCode.create(text, params.opts);
        return renderFunc(data, params.opts, params.cb);
    } catch (e) {
        params.cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = __turbopack_context__.r("[project]/node_modules/qrcode/lib/browser.js [app-route] (ecmascript)").toCanvas;
exports.toString = function toString(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const type = params.opts ? params.opts.type : undefined;
    const renderer = getStringRendererFromType(type);
    return render(renderer.render, text, params);
};
exports.toDataURL = function toDataURL(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const renderer = getRendererFromType(params.opts.type);
    return render(renderer.renderToDataURL, text, params);
};
exports.toBuffer = function toBuffer(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const renderer = getRendererFromType(params.opts.type);
    return render(renderer.renderToBuffer, text, params);
};
exports.toFile = function toFile(path, text, opts, cb) {
    if (typeof path !== 'string' || !(typeof text === 'string' || typeof text === 'object')) {
        throw new Error('Invalid argument');
    }
    if (arguments.length < 3 && !canPromise()) {
        throw new Error('Too few arguments provided');
    }
    const params = checkParams(text, opts, cb);
    const type = params.opts.type || getTypeFromFilename(path);
    const renderer = getRendererFromType(type);
    const renderToFile = renderer.renderToFile.bind(null, path);
    return render(renderToFile, text, params);
};
exports.toFileStream = function toFileStream(stream, text, opts) {
    if (arguments.length < 2) {
        throw new Error('Too few arguments provided');
    }
    const params = checkParams(text, opts, stream.emit.bind(stream, 'error'));
    const renderer = getRendererFromType('png') // Only png support for now
    ;
    const renderToFileStream = renderer.renderToFileStream.bind(null, stream);
    render(renderToFileStream, text, params);
};
}),
"[project]/node_modules/qrcode/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
*copyright Ryan Day 2012
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* this is the main server side application file for node-qrcode.
* these exports use serverside canvas api methods for file IO and buffers
*
*/ module.exports = __turbopack_context__.r("[project]/node_modules/qrcode/lib/server.js [app-route] (ecmascript)");
}),
"[project]/node_modules/dijkstrajs/dijkstra.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/ var dijkstra = {
    single_source_shortest_paths: function(graph, s, d) {
        // Predecessor map for each node that has been encountered.
        // node ID => predecessor node ID
        var predecessors = {};
        // Costs of shortest paths from s to all nodes encountered.
        // node ID => cost
        var costs = {};
        costs[s] = 0;
        // Costs of shortest paths from s to all nodes encountered; differs from
        // `costs` in that it provides easy access to the node that currently has
        // the known shortest path from s.
        // XXX: Do we actually need both `costs` and `open`?
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while(!open.empty()){
            // In the nodes remaining in graph that have a known cost from s,
            // find the node, u, that currently has the shortest path from s.
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            // Get nodes adjacent to u...
            adjacent_nodes = graph[u] || {};
            // ...and explore the edges that connect u to those nodes, updating
            // the cost of the shortest paths to any or all of those nodes as
            // necessary. v is the node across the current edge from u.
            for(v in adjacent_nodes){
                if (adjacent_nodes.hasOwnProperty(v)) {
                    // Get the cost of the edge running from u to v.
                    cost_of_e = adjacent_nodes[v];
                    // Cost of s to u plus the cost of u to v across e--this is *a*
                    // cost from s to v that may or may not be less than the current
                    // known cost to v.
                    cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                    // If we haven't visited v yet OR if the current known cost from s to
                    // v is greater than the new cost we just found (cost of s to u plus
                    // cost of u to v across e), update v's cost in the cost list and
                    // update v's predecessor in the predecessor list (it's now u).
                    cost_of_s_to_v = costs[v];
                    first_visit = typeof costs[v] === 'undefined';
                    if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                        costs[v] = cost_of_s_to_u_plus_cost_of_e;
                        open.push(v, cost_of_s_to_u_plus_cost_of_e);
                        predecessors[v] = u;
                    }
                }
            }
        }
        if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
            var msg = [
                'Could not find a path from ',
                s,
                ' to ',
                d,
                '.'
            ].join('');
            throw new Error(msg);
        }
        return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while(u){
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
    },
    find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    },
    /**
   * A very naive priority queue implementation.
   */ PriorityQueue: {
        make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for(key in T){
                if (T.hasOwnProperty(key)) {
                    t[key] = T[key];
                }
            }
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
        },
        default_sorter: function(a, b) {
            return a.cost - b.cost;
        },
        /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */ push: function(value, cost) {
            var item = {
                value: value,
                cost: cost
            };
            this.queue.push(item);
            this.queue.sort(this.sorter);
        },
        /**
     * Return the highest priority element in the queue.
     */ pop: function() {
            return this.queue.shift();
        },
        empty: function() {
            return this.queue.length === 0;
        }
    }
};
// node.js module exports
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = dijkstra;
}
}),
"[project]/node_modules/pngjs/lib/chunkstream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let ChunkStream = module.exports = function() {
    Stream.call(this);
    this._buffers = [];
    this._buffered = 0;
    this._reads = [];
    this._paused = false;
    this._encoding = "utf8";
    this.writable = true;
};
util.inherits(ChunkStream, Stream);
ChunkStream.prototype.read = function(length, callback) {
    this._reads.push({
        length: Math.abs(length),
        allowLess: length < 0,
        func: callback
    });
    process.nextTick((function() {
        this._process();
        // its paused and there is not enought data then ask for more
        if (this._paused && this._reads && this._reads.length > 0) {
            this._paused = false;
            this.emit("drain");
        }
    }).bind(this));
};
ChunkStream.prototype.write = function(data, encoding) {
    if (!this.writable) {
        this.emit("error", new Error("Stream not writable"));
        return false;
    }
    let dataBuffer;
    if (Buffer.isBuffer(data)) {
        dataBuffer = data;
    } else {
        dataBuffer = Buffer.from(data, encoding || this._encoding);
    }
    this._buffers.push(dataBuffer);
    this._buffered += dataBuffer.length;
    this._process();
    // ok if there are no more read requests
    if (this._reads && this._reads.length === 0) {
        this._paused = true;
    }
    return this.writable && !this._paused;
};
ChunkStream.prototype.end = function(data, encoding) {
    if (data) {
        this.write(data, encoding);
    }
    this.writable = false;
    // already destroyed
    if (!this._buffers) {
        return;
    }
    // enqueue or handle end
    if (this._buffers.length === 0) {
        this._end();
    } else {
        this._buffers.push(null);
        this._process();
    }
};
ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;
ChunkStream.prototype._end = function() {
    if (this._reads.length > 0) {
        this.emit("error", new Error("Unexpected end of input"));
    }
    this.destroy();
};
ChunkStream.prototype.destroy = function() {
    if (!this._buffers) {
        return;
    }
    this.writable = false;
    this._reads = null;
    this._buffers = null;
    this.emit("close");
};
ChunkStream.prototype._processReadAllowingLess = function(read) {
    // ok there is any data so that we can satisfy this request
    this._reads.shift(); // == read
    // first we need to peek into first buffer
    let smallerBuf = this._buffers[0];
    // ok there is more data than we need
    if (smallerBuf.length > read.length) {
        this._buffered -= read.length;
        this._buffers[0] = smallerBuf.slice(read.length);
        read.func.call(this, smallerBuf.slice(0, read.length));
    } else {
        // ok this is less than maximum length so use it all
        this._buffered -= smallerBuf.length;
        this._buffers.shift(); // == smallerBuf
        read.func.call(this, smallerBuf);
    }
};
ChunkStream.prototype._processRead = function(read) {
    this._reads.shift(); // == read
    let pos = 0;
    let count = 0;
    let data = Buffer.alloc(read.length);
    // create buffer for all data
    while(pos < read.length){
        let buf = this._buffers[count++];
        let len = Math.min(buf.length, read.length - pos);
        buf.copy(data, pos, 0, len);
        pos += len;
        // last buffer wasn't used all so just slice it and leave
        if (len !== buf.length) {
            this._buffers[--count] = buf.slice(len);
        }
    }
    // remove all used buffers
    if (count > 0) {
        this._buffers.splice(0, count);
    }
    this._buffered -= read.length;
    read.func.call(this, data);
};
ChunkStream.prototype._process = function() {
    try {
        // as long as there is any data and read requests
        while(this._buffered > 0 && this._reads && this._reads.length > 0){
            let read = this._reads[0];
            // read any data (but no more than length)
            if (read.allowLess) {
                this._processReadAllowingLess(read);
            } else if (this._buffered >= read.length) {
                // ok we can meet some expectations
                this._processRead(read);
            } else {
                break;
            }
        }
        if (this._buffers && !this.writable) {
            this._end();
        }
    } catch (ex) {
        this.emit("error", ex);
    }
};
}),
"[project]/node_modules/pngjs/lib/interlace.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Adam 7
//   0 1 2 3 4 5 6 7
// 0 x 6 4 6 x 6 4 6
// 1 7 7 7 7 7 7 7 7
// 2 5 6 5 6 5 6 5 6
// 3 7 7 7 7 7 7 7 7
// 4 3 6 4 6 3 6 4 6
// 5 7 7 7 7 7 7 7 7
// 6 5 6 5 6 5 6 5 6
// 7 7 7 7 7 7 7 7 7
let imagePasses = [
    {
        // pass 1 - 1px
        x: [
            0
        ],
        y: [
            0
        ]
    },
    {
        // pass 2 - 1px
        x: [
            4
        ],
        y: [
            0
        ]
    },
    {
        // pass 3 - 2px
        x: [
            0,
            4
        ],
        y: [
            4
        ]
    },
    {
        // pass 4 - 4px
        x: [
            2,
            6
        ],
        y: [
            0,
            4
        ]
    },
    {
        // pass 5 - 8px
        x: [
            0,
            2,
            4,
            6
        ],
        y: [
            2,
            6
        ]
    },
    {
        // pass 6 - 16px
        x: [
            1,
            3,
            5,
            7
        ],
        y: [
            0,
            2,
            4,
            6
        ]
    },
    {
        // pass 7 - 32px
        x: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        y: [
            1,
            3,
            5,
            7
        ]
    }
];
exports.getImagePasses = function(width, height) {
    let images = [];
    let xLeftOver = width % 8;
    let yLeftOver = height % 8;
    let xRepeats = (width - xLeftOver) / 8;
    let yRepeats = (height - yLeftOver) / 8;
    for(let i = 0; i < imagePasses.length; i++){
        let pass = imagePasses[i];
        let passWidth = xRepeats * pass.x.length;
        let passHeight = yRepeats * pass.y.length;
        for(let j = 0; j < pass.x.length; j++){
            if (pass.x[j] < xLeftOver) {
                passWidth++;
            } else {
                break;
            }
        }
        for(let j = 0; j < pass.y.length; j++){
            if (pass.y[j] < yLeftOver) {
                passHeight++;
            } else {
                break;
            }
        }
        if (passWidth > 0 && passHeight > 0) {
            images.push({
                width: passWidth,
                height: passHeight,
                index: i
            });
        }
    }
    return images;
};
exports.getInterlaceIterator = function(width) {
    return function(x, y, pass) {
        let outerXLeftOver = x % imagePasses[pass].x.length;
        let outerX = (x - outerXLeftOver) / imagePasses[pass].x.length * 8 + imagePasses[pass].x[outerXLeftOver];
        let outerYLeftOver = y % imagePasses[pass].y.length;
        let outerY = (y - outerYLeftOver) / imagePasses[pass].y.length * 8 + imagePasses[pass].y[outerYLeftOver];
        return outerX * 4 + outerY * width * 4;
    };
};
}),
"[project]/node_modules/pngjs/lib/paeth-predictor.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function paethPredictor(left, above, upLeft) {
    let paeth = left + above - upLeft;
    let pLeft = Math.abs(paeth - left);
    let pAbove = Math.abs(paeth - above);
    let pUpLeft = Math.abs(paeth - upLeft);
    if (pLeft <= pAbove && pLeft <= pUpLeft) {
        return left;
    }
    if (pAbove <= pUpLeft) {
        return above;
    }
    return upLeft;
};
}),
"[project]/node_modules/pngjs/lib/filter-parse.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let interlaceUtils = __turbopack_context__.r("[project]/node_modules/pngjs/lib/interlace.js [app-route] (ecmascript)");
let paethPredictor = __turbopack_context__.r("[project]/node_modules/pngjs/lib/paeth-predictor.js [app-route] (ecmascript)");
function getByteWidth(width, bpp, depth) {
    let byteWidth = width * bpp;
    if (depth !== 8) {
        byteWidth = Math.ceil(byteWidth / (8 / depth));
    }
    return byteWidth;
}
let Filter = module.exports = function(bitmapInfo, dependencies) {
    let width = bitmapInfo.width;
    let height = bitmapInfo.height;
    let interlace = bitmapInfo.interlace;
    let bpp = bitmapInfo.bpp;
    let depth = bitmapInfo.depth;
    this.read = dependencies.read;
    this.write = dependencies.write;
    this.complete = dependencies.complete;
    this._imageIndex = 0;
    this._images = [];
    if (interlace) {
        let passes = interlaceUtils.getImagePasses(width, height);
        for(let i = 0; i < passes.length; i++){
            this._images.push({
                byteWidth: getByteWidth(passes[i].width, bpp, depth),
                height: passes[i].height,
                lineIndex: 0
            });
        }
    } else {
        this._images.push({
            byteWidth: getByteWidth(width, bpp, depth),
            height: height,
            lineIndex: 0
        });
    }
    // when filtering the line we look at the pixel to the left
    // the spec also says it is done on a byte level regardless of the number of pixels
    // so if the depth is byte compatible (8 or 16) we subtract the bpp in order to compare back
    // a pixel rather than just a different byte part. However if we are sub byte, we ignore.
    if (depth === 8) {
        this._xComparison = bpp;
    } else if (depth === 16) {
        this._xComparison = bpp * 2;
    } else {
        this._xComparison = 1;
    }
};
Filter.prototype.start = function() {
    this.read(this._images[this._imageIndex].byteWidth + 1, this._reverseFilterLine.bind(this));
};
Filter.prototype._unFilterType1 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        unfilteredLine[x] = rawByte + f1Left;
    }
};
Filter.prototype._unFilterType2 = function(rawData, unfilteredLine, byteWidth) {
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f2Up = lastLine ? lastLine[x] : 0;
        unfilteredLine[x] = rawByte + f2Up;
    }
};
Filter.prototype._unFilterType3 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f3Up = lastLine ? lastLine[x] : 0;
        let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f3Add = Math.floor((f3Left + f3Up) / 2);
        unfilteredLine[x] = rawByte + f3Add;
    }
};
Filter.prototype._unFilterType4 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f4Up = lastLine ? lastLine[x] : 0;
        let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
        let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
        unfilteredLine[x] = rawByte + f4Add;
    }
};
Filter.prototype._reverseFilterLine = function(rawData) {
    let filter = rawData[0];
    let unfilteredLine;
    let currentImage = this._images[this._imageIndex];
    let byteWidth = currentImage.byteWidth;
    if (filter === 0) {
        unfilteredLine = rawData.slice(1, byteWidth + 1);
    } else {
        unfilteredLine = Buffer.alloc(byteWidth);
        switch(filter){
            case 1:
                this._unFilterType1(rawData, unfilteredLine, byteWidth);
                break;
            case 2:
                this._unFilterType2(rawData, unfilteredLine, byteWidth);
                break;
            case 3:
                this._unFilterType3(rawData, unfilteredLine, byteWidth);
                break;
            case 4:
                this._unFilterType4(rawData, unfilteredLine, byteWidth);
                break;
            default:
                throw new Error("Unrecognised filter type - " + filter);
        }
    }
    this.write(unfilteredLine);
    currentImage.lineIndex++;
    if (currentImage.lineIndex >= currentImage.height) {
        this._lastLine = null;
        this._imageIndex++;
        currentImage = this._images[this._imageIndex];
    } else {
        this._lastLine = unfilteredLine;
    }
    if (currentImage) {
        // read, using the byte width that may be from the new current image
        this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
    } else {
        this._lastLine = null;
        this.complete();
    }
};
}),
"[project]/node_modules/pngjs/lib/filter-parse-async.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let ChunkStream = __turbopack_context__.r("[project]/node_modules/pngjs/lib/chunkstream.js [app-route] (ecmascript)");
let Filter = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-parse.js [app-route] (ecmascript)");
let FilterAsync = module.exports = function(bitmapInfo) {
    ChunkStream.call(this);
    let buffers = [];
    let that = this;
    this._filter = new Filter(bitmapInfo, {
        read: this.read.bind(this),
        write: function(buffer) {
            buffers.push(buffer);
        },
        complete: function() {
            that.emit("complete", Buffer.concat(buffers));
        }
    });
    this._filter.start();
};
util.inherits(FilterAsync, ChunkStream);
}),
"[project]/node_modules/pngjs/lib/constants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {
    PNG_SIGNATURE: [
        0x89,
        0x50,
        0x4e,
        0x47,
        0x0d,
        0x0a,
        0x1a,
        0x0a
    ],
    TYPE_IHDR: 0x49484452,
    TYPE_IEND: 0x49454e44,
    TYPE_IDAT: 0x49444154,
    TYPE_PLTE: 0x504c5445,
    TYPE_tRNS: 0x74524e53,
    TYPE_gAMA: 0x67414d41,
    // color-type bits
    COLORTYPE_GRAYSCALE: 0,
    COLORTYPE_PALETTE: 1,
    COLORTYPE_COLOR: 2,
    COLORTYPE_ALPHA: 4,
    // color-type combinations
    COLORTYPE_PALETTE_COLOR: 3,
    COLORTYPE_COLOR_ALPHA: 6,
    COLORTYPE_TO_BPP_MAP: {
        0: 1,
        2: 3,
        3: 1,
        4: 2,
        6: 4
    },
    GAMMA_DIVISION: 100000
};
}),
"[project]/node_modules/pngjs/lib/crc.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let crcTable = [];
(function() {
    for(let i = 0; i < 256; i++){
        let currentCrc = i;
        for(let j = 0; j < 8; j++){
            if (currentCrc & 1) {
                currentCrc = 0xedb88320 ^ currentCrc >>> 1;
            } else {
                currentCrc = currentCrc >>> 1;
            }
        }
        crcTable[i] = currentCrc;
    }
})();
let CrcCalculator = module.exports = function() {
    this._crc = -1;
};
CrcCalculator.prototype.write = function(data) {
    for(let i = 0; i < data.length; i++){
        this._crc = crcTable[(this._crc ^ data[i]) & 0xff] ^ this._crc >>> 8;
    }
    return true;
};
CrcCalculator.prototype.crc32 = function() {
    return this._crc ^ -1;
};
CrcCalculator.crc32 = function(buf) {
    let crc = -1;
    for(let i = 0; i < buf.length; i++){
        crc = crcTable[(crc ^ buf[i]) & 0xff] ^ crc >>> 8;
    }
    return crc ^ -1;
};
}),
"[project]/node_modules/pngjs/lib/parser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-route] (ecmascript)");
let CrcCalculator = __turbopack_context__.r("[project]/node_modules/pngjs/lib/crc.js [app-route] (ecmascript)");
let Parser = module.exports = function(options, dependencies) {
    this._options = options;
    options.checkCRC = options.checkCRC !== false;
    this._hasIHDR = false;
    this._hasIEND = false;
    this._emittedHeadersFinished = false;
    // input flags/metadata
    this._palette = [];
    this._colorType = 0;
    this._chunks = {};
    this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
    this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
    this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
    this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
    this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
    this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);
    this.read = dependencies.read;
    this.error = dependencies.error;
    this.metadata = dependencies.metadata;
    this.gamma = dependencies.gamma;
    this.transColor = dependencies.transColor;
    this.palette = dependencies.palette;
    this.parsed = dependencies.parsed;
    this.inflateData = dependencies.inflateData;
    this.finished = dependencies.finished;
    this.simpleTransparency = dependencies.simpleTransparency;
    this.headersFinished = dependencies.headersFinished || function() {};
};
Parser.prototype.start = function() {
    this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
};
Parser.prototype._parseSignature = function(data) {
    let signature = constants.PNG_SIGNATURE;
    for(let i = 0; i < signature.length; i++){
        if (data[i] !== signature[i]) {
            this.error(new Error("Invalid file signature"));
            return;
        }
    }
    this.read(8, this._parseChunkBegin.bind(this));
};
Parser.prototype._parseChunkBegin = function(data) {
    // chunk content length
    let length = data.readUInt32BE(0);
    // chunk type
    let type = data.readUInt32BE(4);
    let name = "";
    for(let i = 4; i < 8; i++){
        name += String.fromCharCode(data[i]);
    }
    //console.log('chunk ', name, length);
    // chunk flags
    let ancillary = Boolean(data[4] & 0x20); // or critical
    //    priv = Boolean(data[5] & 0x20), // or public
    //    safeToCopy = Boolean(data[7] & 0x20); // or unsafe
    if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
        this.error(new Error("Expected IHDR on beggining"));
        return;
    }
    this._crc = new CrcCalculator();
    this._crc.write(Buffer.from(name));
    if (this._chunks[type]) {
        return this._chunks[type](length);
    }
    if (!ancillary) {
        this.error(new Error("Unsupported critical chunk type " + name));
        return;
    }
    this.read(length + 4, this._skipChunk.bind(this));
};
Parser.prototype._skipChunk = function() {
    this.read(8, this._parseChunkBegin.bind(this));
};
Parser.prototype._handleChunkEnd = function() {
    this.read(4, this._parseChunkEnd.bind(this));
};
Parser.prototype._parseChunkEnd = function(data) {
    let fileCrc = data.readInt32BE(0);
    let calcCrc = this._crc.crc32();
    // check CRC
    if (this._options.checkCRC && calcCrc !== fileCrc) {
        this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
        return;
    }
    if (!this._hasIEND) {
        this.read(8, this._parseChunkBegin.bind(this));
    }
};
Parser.prototype._handleIHDR = function(length) {
    this.read(length, this._parseIHDR.bind(this));
};
Parser.prototype._parseIHDR = function(data) {
    this._crc.write(data);
    let width = data.readUInt32BE(0);
    let height = data.readUInt32BE(4);
    let depth = data[8];
    let colorType = data[9]; // bits: 1 palette, 2 color, 4 alpha
    let compr = data[10];
    let filter = data[11];
    let interlace = data[12];
    // console.log('    width', width, 'height', height,
    //     'depth', depth, 'colorType', colorType,
    //     'compr', compr, 'filter', filter, 'interlace', interlace
    // );
    if (depth !== 8 && depth !== 4 && depth !== 2 && depth !== 1 && depth !== 16) {
        this.error(new Error("Unsupported bit depth " + depth));
        return;
    }
    if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
        this.error(new Error("Unsupported color type"));
        return;
    }
    if (compr !== 0) {
        this.error(new Error("Unsupported compression method"));
        return;
    }
    if (filter !== 0) {
        this.error(new Error("Unsupported filter method"));
        return;
    }
    if (interlace !== 0 && interlace !== 1) {
        this.error(new Error("Unsupported interlace method"));
        return;
    }
    this._colorType = colorType;
    let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];
    this._hasIHDR = true;
    this.metadata({
        width: width,
        height: height,
        depth: depth,
        interlace: Boolean(interlace),
        palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
        color: Boolean(colorType & constants.COLORTYPE_COLOR),
        alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
        bpp: bpp,
        colorType: colorType
    });
    this._handleChunkEnd();
};
Parser.prototype._handlePLTE = function(length) {
    this.read(length, this._parsePLTE.bind(this));
};
Parser.prototype._parsePLTE = function(data) {
    this._crc.write(data);
    let entries = Math.floor(data.length / 3);
    // console.log('Palette:', entries);
    for(let i = 0; i < entries; i++){
        this._palette.push([
            data[i * 3],
            data[i * 3 + 1],
            data[i * 3 + 2],
            0xff
        ]);
    }
    this.palette(this._palette);
    this._handleChunkEnd();
};
Parser.prototype._handleTRNS = function(length) {
    this.simpleTransparency();
    this.read(length, this._parseTRNS.bind(this));
};
Parser.prototype._parseTRNS = function(data) {
    this._crc.write(data);
    // palette
    if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
        if (this._palette.length === 0) {
            this.error(new Error("Transparency chunk must be after palette"));
            return;
        }
        if (data.length > this._palette.length) {
            this.error(new Error("More transparent colors than palette size"));
            return;
        }
        for(let i = 0; i < data.length; i++){
            this._palette[i][3] = data[i];
        }
        this.palette(this._palette);
    }
    // for colorType 0 (grayscale) and 2 (rgb)
    // there might be one gray/color defined as transparent
    if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
        // grey, 2 bytes
        this.transColor([
            data.readUInt16BE(0)
        ]);
    }
    if (this._colorType === constants.COLORTYPE_COLOR) {
        this.transColor([
            data.readUInt16BE(0),
            data.readUInt16BE(2),
            data.readUInt16BE(4)
        ]);
    }
    this._handleChunkEnd();
};
Parser.prototype._handleGAMA = function(length) {
    this.read(length, this._parseGAMA.bind(this));
};
Parser.prototype._parseGAMA = function(data) {
    this._crc.write(data);
    this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);
    this._handleChunkEnd();
};
Parser.prototype._handleIDAT = function(length) {
    if (!this._emittedHeadersFinished) {
        this._emittedHeadersFinished = true;
        this.headersFinished();
    }
    this.read(-length, this._parseIDAT.bind(this, length));
};
Parser.prototype._parseIDAT = function(length, data) {
    this._crc.write(data);
    if (this._colorType === constants.COLORTYPE_PALETTE_COLOR && this._palette.length === 0) {
        throw new Error("Expected palette not found");
    }
    this.inflateData(data);
    let leftOverLength = length - data.length;
    if (leftOverLength > 0) {
        this._handleIDAT(leftOverLength);
    } else {
        this._handleChunkEnd();
    }
};
Parser.prototype._handleIEND = function(length) {
    this.read(length, this._parseIEND.bind(this));
};
Parser.prototype._parseIEND = function(data) {
    this._crc.write(data);
    this._hasIEND = true;
    this._handleChunkEnd();
    if (this.finished) {
        this.finished();
    }
};
}),
"[project]/node_modules/pngjs/lib/bitmapper.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let interlaceUtils = __turbopack_context__.r("[project]/node_modules/pngjs/lib/interlace.js [app-route] (ecmascript)");
let pixelBppMapper = [
    // 0 - dummy entry
    function() {},
    // 1 - L
    // 0: 0, 1: 0, 2: 0, 3: 0xff
    function(pxData, data, pxPos, rawPos) {
        if (rawPos === data.length) {
            throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = 0xff;
    },
    // 2 - LA
    // 0: 0, 1: 0, 2: 0, 3: 1
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 1 >= data.length) {
            throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = data[rawPos + 1];
    },
    // 3 - RGB
    // 0: 0, 1: 1, 2: 2, 3: 0xff
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 2 >= data.length) {
            throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = 0xff;
    },
    // 4 - RGBA
    // 0: 0, 1: 1, 2: 2, 3: 3
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 3 >= data.length) {
            throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = data[rawPos + 3];
    }
];
let pixelBppCustomMapper = [
    // 0 - dummy entry
    function() {},
    // 1 - L
    // 0: 0, 1: 0, 2: 0, 3: 0xff
    function(pxData, pixelData, pxPos, maxBit) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = maxBit;
    },
    // 2 - LA
    // 0: 0, 1: 0, 2: 0, 3: 1
    function(pxData, pixelData, pxPos) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = pixelData[1];
    },
    // 3 - RGB
    // 0: 0, 1: 1, 2: 2, 3: 0xff
    function(pxData, pixelData, pxPos, maxBit) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = maxBit;
    },
    // 4 - RGBA
    // 0: 0, 1: 1, 2: 2, 3: 3
    function(pxData, pixelData, pxPos) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = pixelData[3];
    }
];
function bitRetriever(data, depth) {
    let leftOver = [];
    let i = 0;
    function split() {
        if (i === data.length) {
            throw new Error("Ran out of data");
        }
        let byte = data[i];
        i++;
        let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
        switch(depth){
            default:
                throw new Error("unrecognised depth");
            case 16:
                byte2 = data[i];
                i++;
                leftOver.push((byte << 8) + byte2);
                break;
            case 4:
                byte2 = byte & 0x0f;
                byte1 = byte >> 4;
                leftOver.push(byte1, byte2);
                break;
            case 2:
                byte4 = byte & 3;
                byte3 = byte >> 2 & 3;
                byte2 = byte >> 4 & 3;
                byte1 = byte >> 6 & 3;
                leftOver.push(byte1, byte2, byte3, byte4);
                break;
            case 1:
                byte8 = byte & 1;
                byte7 = byte >> 1 & 1;
                byte6 = byte >> 2 & 1;
                byte5 = byte >> 3 & 1;
                byte4 = byte >> 4 & 1;
                byte3 = byte >> 5 & 1;
                byte2 = byte >> 6 & 1;
                byte1 = byte >> 7 & 1;
                leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
                break;
        }
    }
    return {
        get: function(count) {
            while(leftOver.length < count){
                split();
            }
            let returner = leftOver.slice(0, count);
            leftOver = leftOver.slice(count);
            return returner;
        },
        resetAfterLine: function() {
            leftOver.length = 0;
        },
        end: function() {
            if (i !== data.length) {
                throw new Error("extra data found");
            }
        }
    };
}
function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
    // eslint-disable-line max-params
    let imageWidth = image.width;
    let imageHeight = image.height;
    let imagePass = image.index;
    for(let y = 0; y < imageHeight; y++){
        for(let x = 0; x < imageWidth; x++){
            let pxPos = getPxPos(x, y, imagePass);
            pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
            rawPos += bpp; //eslint-disable-line no-param-reassign
        }
    }
    return rawPos;
}
function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
    // eslint-disable-line max-params
    let imageWidth = image.width;
    let imageHeight = image.height;
    let imagePass = image.index;
    for(let y = 0; y < imageHeight; y++){
        for(let x = 0; x < imageWidth; x++){
            let pixelData = bits.get(bpp);
            let pxPos = getPxPos(x, y, imagePass);
            pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
        }
        bits.resetAfterLine();
    }
}
exports.dataToBitMap = function(data, bitmapInfo) {
    let width = bitmapInfo.width;
    let height = bitmapInfo.height;
    let depth = bitmapInfo.depth;
    let bpp = bitmapInfo.bpp;
    let interlace = bitmapInfo.interlace;
    let bits;
    if (depth !== 8) {
        bits = bitRetriever(data, depth);
    }
    let pxData;
    if (depth <= 8) {
        pxData = Buffer.alloc(width * height * 4);
    } else {
        pxData = new Uint16Array(width * height * 4);
    }
    let maxBit = Math.pow(2, depth) - 1;
    let rawPos = 0;
    let images;
    let getPxPos;
    if (interlace) {
        images = interlaceUtils.getImagePasses(width, height);
        getPxPos = interlaceUtils.getInterlaceIterator(width, height);
    } else {
        let nonInterlacedPxPos = 0;
        getPxPos = function() {
            let returner = nonInterlacedPxPos;
            nonInterlacedPxPos += 4;
            return returner;
        };
        images = [
            {
                width: width,
                height: height
            }
        ];
    }
    for(let imageIndex = 0; imageIndex < images.length; imageIndex++){
        if (depth === 8) {
            rawPos = mapImage8Bit(images[imageIndex], pxData, getPxPos, bpp, data, rawPos);
        } else {
            mapImageCustomBit(images[imageIndex], pxData, getPxPos, bpp, bits, maxBit);
        }
    }
    if (depth === 8) {
        if (rawPos !== data.length) {
            throw new Error("extra data found");
        }
    } else {
        bits.end();
    }
    return pxData;
};
}),
"[project]/node_modules/pngjs/lib/format-normaliser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function dePalette(indata, outdata, width, height, palette) {
    let pxPos = 0;
    // use values from palette
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let color = palette[indata[pxPos]];
            if (!color) {
                throw new Error("index " + indata[pxPos] + " not in palette");
            }
            for(let i = 0; i < 4; i++){
                outdata[pxPos + i] = color[i];
            }
            pxPos += 4;
        }
    }
}
function replaceTransparentColor(indata, outdata, width, height, transColor) {
    let pxPos = 0;
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let makeTrans = false;
            if (transColor.length === 1) {
                if (transColor[0] === indata[pxPos]) {
                    makeTrans = true;
                }
            } else if (transColor[0] === indata[pxPos] && transColor[1] === indata[pxPos + 1] && transColor[2] === indata[pxPos + 2]) {
                makeTrans = true;
            }
            if (makeTrans) {
                for(let i = 0; i < 4; i++){
                    outdata[pxPos + i] = 0;
                }
            }
            pxPos += 4;
        }
    }
}
function scaleDepth(indata, outdata, width, height, depth) {
    let maxOutSample = 255;
    let maxInSample = Math.pow(2, depth) - 1;
    let pxPos = 0;
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            for(let i = 0; i < 4; i++){
                outdata[pxPos + i] = Math.floor(indata[pxPos + i] * maxOutSample / maxInSample + 0.5);
            }
            pxPos += 4;
        }
    }
}
module.exports = function(indata, imageData) {
    let depth = imageData.depth;
    let width = imageData.width;
    let height = imageData.height;
    let colorType = imageData.colorType;
    let transColor = imageData.transColor;
    let palette = imageData.palette;
    let outdata = indata; // only different for 16 bits
    if (colorType === 3) {
        // paletted
        dePalette(indata, outdata, width, height, palette);
    } else {
        if (transColor) {
            replaceTransparentColor(indata, outdata, width, height, transColor);
        }
        // if it needs scaling
        if (depth !== 8) {
            // if we need to change the buffer size
            if (depth === 16) {
                outdata = Buffer.alloc(width * height * 4);
            }
            scaleDepth(indata, outdata, width, height, depth);
        }
    }
    return outdata;
};
}),
"[project]/node_modules/pngjs/lib/parser-async.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let ChunkStream = __turbopack_context__.r("[project]/node_modules/pngjs/lib/chunkstream.js [app-route] (ecmascript)");
let FilterAsync = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-parse-async.js [app-route] (ecmascript)");
let Parser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/parser.js [app-route] (ecmascript)");
let bitmapper = __turbopack_context__.r("[project]/node_modules/pngjs/lib/bitmapper.js [app-route] (ecmascript)");
let formatNormaliser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/format-normaliser.js [app-route] (ecmascript)");
let ParserAsync = module.exports = function(options) {
    ChunkStream.call(this);
    this._parser = new Parser(options, {
        read: this.read.bind(this),
        error: this._handleError.bind(this),
        metadata: this._handleMetaData.bind(this),
        gamma: this.emit.bind(this, "gamma"),
        palette: this._handlePalette.bind(this),
        transColor: this._handleTransColor.bind(this),
        finished: this._finished.bind(this),
        inflateData: this._inflateData.bind(this),
        simpleTransparency: this._simpleTransparency.bind(this),
        headersFinished: this._headersFinished.bind(this)
    });
    this._options = options;
    this.writable = true;
    this._parser.start();
};
util.inherits(ParserAsync, ChunkStream);
ParserAsync.prototype._handleError = function(err) {
    this.emit("error", err);
    this.writable = false;
    this.destroy();
    if (this._inflate && this._inflate.destroy) {
        this._inflate.destroy();
    }
    if (this._filter) {
        this._filter.destroy();
        // For backward compatibility with Node 7 and below.
        // Suppress errors due to _inflate calling write() even after
        // it's destroy()'ed.
        this._filter.on("error", function() {});
    }
    this.errord = true;
};
ParserAsync.prototype._inflateData = function(data) {
    if (!this._inflate) {
        if (this._bitmapInfo.interlace) {
            this._inflate = zlib.createInflate();
            this._inflate.on("error", this.emit.bind(this, "error"));
            this._filter.on("complete", this._complete.bind(this));
            this._inflate.pipe(this._filter);
        } else {
            let rowSize = (this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1;
            let imageSize = rowSize * this._bitmapInfo.height;
            let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);
            this._inflate = zlib.createInflate({
                chunkSize: chunkSize
            });
            let leftToInflate = imageSize;
            let emitError = this.emit.bind(this, "error");
            this._inflate.on("error", function(err) {
                if (!leftToInflate) {
                    return;
                }
                emitError(err);
            });
            this._filter.on("complete", this._complete.bind(this));
            let filterWrite = this._filter.write.bind(this._filter);
            this._inflate.on("data", function(chunk) {
                if (!leftToInflate) {
                    return;
                }
                if (chunk.length > leftToInflate) {
                    chunk = chunk.slice(0, leftToInflate);
                }
                leftToInflate -= chunk.length;
                filterWrite(chunk);
            });
            this._inflate.on("end", this._filter.end.bind(this._filter));
        }
    }
    this._inflate.write(data);
};
ParserAsync.prototype._handleMetaData = function(metaData) {
    this._metaData = metaData;
    this._bitmapInfo = Object.create(metaData);
    this._filter = new FilterAsync(this._bitmapInfo);
};
ParserAsync.prototype._handleTransColor = function(transColor) {
    this._bitmapInfo.transColor = transColor;
};
ParserAsync.prototype._handlePalette = function(palette) {
    this._bitmapInfo.palette = palette;
};
ParserAsync.prototype._simpleTransparency = function() {
    this._metaData.alpha = true;
};
ParserAsync.prototype._headersFinished = function() {
    // Up until this point, we don't know if we have a tRNS chunk (alpha)
    // so we can't emit metadata any earlier
    this.emit("metadata", this._metaData);
};
ParserAsync.prototype._finished = function() {
    if (this.errord) {
        return;
    }
    if (!this._inflate) {
        this.emit("error", "No Inflate block");
    } else {
        // no more data to inflate
        this._inflate.end();
    }
};
ParserAsync.prototype._complete = function(filteredData) {
    if (this.errord) {
        return;
    }
    let normalisedBitmapData;
    try {
        let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);
        normalisedBitmapData = formatNormaliser(bitmapData, this._bitmapInfo);
        bitmapData = null;
    } catch (ex) {
        this._handleError(ex);
        return;
    }
    this.emit("parsed", normalisedBitmapData);
};
}),
"[project]/node_modules/pngjs/lib/bitpacker.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-route] (ecmascript)");
module.exports = function(dataIn, width, height, options) {
    let outHasAlpha = [
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.colorType) !== -1;
    if (options.colorType === options.inputColorType) {
        let bigEndian = function() {
            let buffer = new ArrayBuffer(2);
            new DataView(buffer).setInt16(0, 256, true);
            // Int16Array uses the platform's endianness.
            return new Int16Array(buffer)[0] !== 256;
        }();
        // If no need to convert to grayscale and alpha is present/absent in both, take a fast route
        if (options.bitDepth === 8 || options.bitDepth === 16 && bigEndian) {
            return dataIn;
        }
    }
    // map to a UInt16 array if data is 16bit, fix endianness below
    let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);
    let maxValue = 255;
    let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
    if (inBpp === 4 && !options.inputHasAlpha) {
        inBpp = 3;
    }
    let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
    if (options.bitDepth === 16) {
        maxValue = 65535;
        outBpp *= 2;
    }
    let outData = Buffer.alloc(width * height * outBpp);
    let inIndex = 0;
    let outIndex = 0;
    let bgColor = options.bgColor || {};
    if (bgColor.red === undefined) {
        bgColor.red = maxValue;
    }
    if (bgColor.green === undefined) {
        bgColor.green = maxValue;
    }
    if (bgColor.blue === undefined) {
        bgColor.blue = maxValue;
    }
    function getRGBA() {
        let red;
        let green;
        let blue;
        let alpha = maxValue;
        switch(options.inputColorType){
            case constants.COLORTYPE_COLOR_ALPHA:
                alpha = data[inIndex + 3];
                red = data[inIndex];
                green = data[inIndex + 1];
                blue = data[inIndex + 2];
                break;
            case constants.COLORTYPE_COLOR:
                red = data[inIndex];
                green = data[inIndex + 1];
                blue = data[inIndex + 2];
                break;
            case constants.COLORTYPE_ALPHA:
                alpha = data[inIndex + 1];
                red = data[inIndex];
                green = red;
                blue = red;
                break;
            case constants.COLORTYPE_GRAYSCALE:
                red = data[inIndex];
                green = red;
                blue = red;
                break;
            default:
                throw new Error("input color type:" + options.inputColorType + " is not supported at present");
        }
        if (options.inputHasAlpha) {
            if (!outHasAlpha) {
                alpha /= maxValue;
                red = Math.min(Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0), maxValue);
                green = Math.min(Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0), maxValue);
                blue = Math.min(Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0), maxValue);
            }
        }
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha
        };
    }
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let rgba = getRGBA(data, inIndex);
            switch(options.colorType){
                case constants.COLORTYPE_COLOR_ALPHA:
                case constants.COLORTYPE_COLOR:
                    if (options.bitDepth === 8) {
                        outData[outIndex] = rgba.red;
                        outData[outIndex + 1] = rgba.green;
                        outData[outIndex + 2] = rgba.blue;
                        if (outHasAlpha) {
                            outData[outIndex + 3] = rgba.alpha;
                        }
                    } else {
                        outData.writeUInt16BE(rgba.red, outIndex);
                        outData.writeUInt16BE(rgba.green, outIndex + 2);
                        outData.writeUInt16BE(rgba.blue, outIndex + 4);
                        if (outHasAlpha) {
                            outData.writeUInt16BE(rgba.alpha, outIndex + 6);
                        }
                    }
                    break;
                case constants.COLORTYPE_ALPHA:
                case constants.COLORTYPE_GRAYSCALE:
                    {
                        // Convert to grayscale and alpha
                        let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
                        if (options.bitDepth === 8) {
                            outData[outIndex] = grayscale;
                            if (outHasAlpha) {
                                outData[outIndex + 1] = rgba.alpha;
                            }
                        } else {
                            outData.writeUInt16BE(grayscale, outIndex);
                            if (outHasAlpha) {
                                outData.writeUInt16BE(rgba.alpha, outIndex + 2);
                            }
                        }
                        break;
                    }
                default:
                    throw new Error("unrecognised color Type " + options.colorType);
            }
            inIndex += inBpp;
            outIndex += outBpp;
        }
    }
    return outData;
};
}),
"[project]/node_modules/pngjs/lib/filter-pack.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let paethPredictor = __turbopack_context__.r("[project]/node_modules/pngjs/lib/paeth-predictor.js [app-route] (ecmascript)");
function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
    for(let x = 0; x < byteWidth; x++){
        rawData[rawPos + x] = pxData[pxPos + x];
    }
}
function filterSumNone(pxData, pxPos, byteWidth) {
    let sum = 0;
    let length = pxPos + byteWidth;
    for(let i = pxPos; i < length; i++){
        sum += Math.abs(pxData[i]);
    }
    return sum;
}
function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        rawData[rawPos + x] = val;
    }
}
function filterSumSub(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        sum += Math.abs(val);
    }
    return sum;
}
function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
    for(let x = 0; x < byteWidth; x++){
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - up;
        rawData[rawPos + x] = val;
    }
}
function filterSumUp(pxData, pxPos, byteWidth) {
    let sum = 0;
    let length = pxPos + byteWidth;
    for(let x = pxPos; x < length; x++){
        let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
        let val = pxData[x] - up;
        sum += Math.abs(val);
    }
    return sum;
}
function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        rawData[rawPos + x] = val;
    }
}
function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        sum += Math.abs(val);
    }
    return sum;
}
function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        rawData[rawPos + x] = val;
    }
}
function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        sum += Math.abs(val);
    }
    return sum;
}
let filters = {
    0: filterNone,
    1: filterSub,
    2: filterUp,
    3: filterAvg,
    4: filterPaeth
};
let filterSums = {
    0: filterSumNone,
    1: filterSumSub,
    2: filterSumUp,
    3: filterSumAvg,
    4: filterSumPaeth
};
module.exports = function(pxData, width, height, options, bpp) {
    let filterTypes;
    if (!("filterType" in options) || options.filterType === -1) {
        filterTypes = [
            0,
            1,
            2,
            3,
            4
        ];
    } else if (typeof options.filterType === "number") {
        filterTypes = [
            options.filterType
        ];
    } else {
        throw new Error("unrecognised filter types");
    }
    if (options.bitDepth === 16) {
        bpp *= 2;
    }
    let byteWidth = width * bpp;
    let rawPos = 0;
    let pxPos = 0;
    let rawData = Buffer.alloc((byteWidth + 1) * height);
    let sel = filterTypes[0];
    for(let y = 0; y < height; y++){
        if (filterTypes.length > 1) {
            // find best filter for this line (with lowest sum of values)
            let min = Infinity;
            for(let i = 0; i < filterTypes.length; i++){
                let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
                if (sum < min) {
                    sel = filterTypes[i];
                    min = sum;
                }
            }
        }
        rawData[rawPos] = sel;
        rawPos++;
        filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
        rawPos += byteWidth;
        pxPos += byteWidth;
    }
    return rawData;
};
}),
"[project]/node_modules/pngjs/lib/packer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-route] (ecmascript)");
let CrcStream = __turbopack_context__.r("[project]/node_modules/pngjs/lib/crc.js [app-route] (ecmascript)");
let bitPacker = __turbopack_context__.r("[project]/node_modules/pngjs/lib/bitpacker.js [app-route] (ecmascript)");
let filter = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-pack.js [app-route] (ecmascript)");
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let Packer = module.exports = function(options) {
    this._options = options;
    options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
    options.deflateLevel = options.deflateLevel != null ? options.deflateLevel : 9;
    options.deflateStrategy = options.deflateStrategy != null ? options.deflateStrategy : 3;
    options.inputHasAlpha = options.inputHasAlpha != null ? options.inputHasAlpha : true;
    options.deflateFactory = options.deflateFactory || zlib.createDeflate;
    options.bitDepth = options.bitDepth || 8;
    // This is outputColorType
    options.colorType = typeof options.colorType === "number" ? options.colorType : constants.COLORTYPE_COLOR_ALPHA;
    options.inputColorType = typeof options.inputColorType === "number" ? options.inputColorType : constants.COLORTYPE_COLOR_ALPHA;
    if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.colorType) === -1) {
        throw new Error("option color type:" + options.colorType + " is not supported at present");
    }
    if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.inputColorType) === -1) {
        throw new Error("option input color type:" + options.inputColorType + " is not supported at present");
    }
    if (options.bitDepth !== 8 && options.bitDepth !== 16) {
        throw new Error("option bit depth:" + options.bitDepth + " is not supported at present");
    }
};
Packer.prototype.getDeflateOptions = function() {
    return {
        chunkSize: this._options.deflateChunkSize,
        level: this._options.deflateLevel,
        strategy: this._options.deflateStrategy
    };
};
Packer.prototype.createDeflate = function() {
    return this._options.deflateFactory(this.getDeflateOptions());
};
Packer.prototype.filterData = function(data, width, height) {
    // convert to correct format for filtering (e.g. right bpp and bit depth)
    let packedData = bitPacker(data, width, height, this._options);
    // filter pixel data
    let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
    let filteredData = filter(packedData, width, height, this._options, bpp);
    return filteredData;
};
Packer.prototype._packChunk = function(type, data) {
    let len = data ? data.length : 0;
    let buf = Buffer.alloc(len + 12);
    buf.writeUInt32BE(len, 0);
    buf.writeUInt32BE(type, 4);
    if (data) {
        data.copy(buf, 8);
    }
    buf.writeInt32BE(CrcStream.crc32(buf.slice(4, buf.length - 4)), buf.length - 4);
    return buf;
};
Packer.prototype.packGAMA = function(gamma) {
    let buf = Buffer.alloc(4);
    buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
    return this._packChunk(constants.TYPE_gAMA, buf);
};
Packer.prototype.packIHDR = function(width, height) {
    let buf = Buffer.alloc(13);
    buf.writeUInt32BE(width, 0);
    buf.writeUInt32BE(height, 4);
    buf[8] = this._options.bitDepth; // Bit depth
    buf[9] = this._options.colorType; // colorType
    buf[10] = 0; // compression
    buf[11] = 0; // filter
    buf[12] = 0; // interlace
    return this._packChunk(constants.TYPE_IHDR, buf);
};
Packer.prototype.packIDAT = function(data) {
    return this._packChunk(constants.TYPE_IDAT, data);
};
Packer.prototype.packIEND = function() {
    return this._packChunk(constants.TYPE_IEND, null);
};
}),
"[project]/node_modules/pngjs/lib/packer-async.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-route] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/node_modules/pngjs/lib/packer.js [app-route] (ecmascript)");
let PackerAsync = module.exports = function(opt) {
    Stream.call(this);
    let options = opt || {};
    this._packer = new Packer(options);
    this._deflate = this._packer.createDeflate();
    this.readable = true;
};
util.inherits(PackerAsync, Stream);
PackerAsync.prototype.pack = function(data, width, height, gamma) {
    // Signature
    this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
    this.emit("data", this._packer.packIHDR(width, height));
    if (gamma) {
        this.emit("data", this._packer.packGAMA(gamma));
    }
    let filteredData = this._packer.filterData(data, width, height);
    // compress it
    this._deflate.on("error", this.emit.bind(this, "error"));
    this._deflate.on("data", (function(compressedData) {
        this.emit("data", this._packer.packIDAT(compressedData));
    }).bind(this));
    this._deflate.on("end", (function() {
        this.emit("data", this._packer.packIEND());
        this.emit("end");
    }).bind(this));
    this._deflate.end(filteredData);
};
}),
"[project]/node_modules/pngjs/lib/sync-inflate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let assert = __turbopack_context__.r("[externals]/assert [external] (assert, cjs)").ok;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let kMaxLength = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").kMaxLength;
function Inflate(opts) {
    if (!(this instanceof Inflate)) {
        return new Inflate(opts);
    }
    if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
        opts.chunkSize = zlib.Z_MIN_CHUNK;
    }
    zlib.Inflate.call(this, opts);
    // Node 8 --> 9 compatibility check
    this._offset = this._offset === undefined ? this._outOffset : this._offset;
    this._buffer = this._buffer || this._outBuffer;
    if (opts && opts.maxLength != null) {
        this._maxLength = opts.maxLength;
    }
}
function createInflate(opts) {
    return new Inflate(opts);
}
function _close(engine, callback) {
    if (callback) {
        process.nextTick(callback);
    }
    // Caller may invoke .close after a zlib error (which will null _handle).
    if (!engine._handle) {
        return;
    }
    engine._handle.close();
    engine._handle = null;
}
Inflate.prototype._processChunk = function(chunk, flushFlag, asyncCb) {
    if (typeof asyncCb === "function") {
        return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
    }
    let self = this;
    let availInBefore = chunk && chunk.length;
    let availOutBefore = this._chunkSize - this._offset;
    let leftToInflate = this._maxLength;
    let inOff = 0;
    let buffers = [];
    let nread = 0;
    let error;
    this.on("error", function(err) {
        error = err;
    });
    function handleChunk(availInAfter, availOutAfter) {
        if (self._hadError) {
            return;
        }
        let have = availOutBefore - availOutAfter;
        assert(have >= 0, "have should not go down");
        if (have > 0) {
            let out = self._buffer.slice(self._offset, self._offset + have);
            self._offset += have;
            if (out.length > leftToInflate) {
                out = out.slice(0, leftToInflate);
            }
            buffers.push(out);
            nread += out.length;
            leftToInflate -= out.length;
            if (leftToInflate === 0) {
                return false;
            }
        }
        if (availOutAfter === 0 || self._offset >= self._chunkSize) {
            availOutBefore = self._chunkSize;
            self._offset = 0;
            self._buffer = Buffer.allocUnsafe(self._chunkSize);
        }
        if (availOutAfter === 0) {
            inOff += availInBefore - availInAfter;
            availInBefore = availInAfter;
            return true;
        }
        return false;
    }
    assert(this._handle, "zlib binding closed");
    let res;
    do {
        res = this._handle.writeSync(flushFlag, chunk, inOff, availInBefore, this._buffer, this._offset, availOutBefore); // out_len
        // Node 8 --> 9 compatibility check
        res = res || this._writeState;
    }while (!this._hadError && handleChunk(res[0], res[1]))
    if (this._hadError) {
        throw error;
    }
    if (nread >= kMaxLength) {
        _close(this);
        throw new RangeError("Cannot create final Buffer. It would be larger than 0x" + kMaxLength.toString(16) + " bytes");
    }
    let buf = Buffer.concat(buffers, nread);
    _close(this);
    return buf;
};
util.inherits(Inflate, zlib.Inflate);
function zlibBufferSync(engine, buffer) {
    if (typeof buffer === "string") {
        buffer = Buffer.from(buffer);
    }
    if (!(buffer instanceof Buffer)) {
        throw new TypeError("Not a string or buffer");
    }
    let flushFlag = engine._finishFlushFlag;
    if (flushFlag == null) {
        flushFlag = zlib.Z_FINISH;
    }
    return engine._processChunk(buffer, flushFlag);
}
function inflateSync(buffer, opts) {
    return zlibBufferSync(new Inflate(opts), buffer);
}
module.exports = exports = inflateSync;
exports.Inflate = Inflate;
exports.createInflate = createInflate;
exports.inflateSync = inflateSync;
}),
"[project]/node_modules/pngjs/lib/sync-reader.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let SyncReader = module.exports = function(buffer) {
    this._buffer = buffer;
    this._reads = [];
};
SyncReader.prototype.read = function(length, callback) {
    this._reads.push({
        length: Math.abs(length),
        allowLess: length < 0,
        func: callback
    });
};
SyncReader.prototype.process = function() {
    // as long as there is any data and read requests
    while(this._reads.length > 0 && this._buffer.length){
        let read = this._reads[0];
        if (this._buffer.length && (this._buffer.length >= read.length || read.allowLess)) {
            // ok there is any data so that we can satisfy this request
            this._reads.shift(); // == read
            let buf = this._buffer;
            this._buffer = buf.slice(read.length);
            read.func.call(this, buf.slice(0, read.length));
        } else {
            break;
        }
    }
    if (this._reads.length > 0) {
        return new Error("There are some read requests waitng on finished stream");
    }
    if (this._buffer.length > 0) {
        return new Error("unrecognised content at end of stream");
    }
};
}),
"[project]/node_modules/pngjs/lib/filter-parse-sync.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let SyncReader = __turbopack_context__.r("[project]/node_modules/pngjs/lib/sync-reader.js [app-route] (ecmascript)");
let Filter = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-parse.js [app-route] (ecmascript)");
exports.process = function(inBuffer, bitmapInfo) {
    let outBuffers = [];
    let reader = new SyncReader(inBuffer);
    let filter = new Filter(bitmapInfo, {
        read: reader.read.bind(reader),
        write: function(bufferPart) {
            outBuffers.push(bufferPart);
        },
        complete: function() {}
    });
    filter.start();
    reader.process();
    return Buffer.concat(outBuffers);
};
}),
"[project]/node_modules/pngjs/lib/parser-sync.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let hasSyncZlib = true;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let inflateSync = __turbopack_context__.r("[project]/node_modules/pngjs/lib/sync-inflate.js [app-route] (ecmascript)");
if (!zlib.deflateSync) {
    hasSyncZlib = false;
}
let SyncReader = __turbopack_context__.r("[project]/node_modules/pngjs/lib/sync-reader.js [app-route] (ecmascript)");
let FilterSync = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-parse-sync.js [app-route] (ecmascript)");
let Parser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/parser.js [app-route] (ecmascript)");
let bitmapper = __turbopack_context__.r("[project]/node_modules/pngjs/lib/bitmapper.js [app-route] (ecmascript)");
let formatNormaliser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/format-normaliser.js [app-route] (ecmascript)");
module.exports = function(buffer, options) {
    if (!hasSyncZlib) {
        throw new Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
    }
    let err;
    function handleError(_err_) {
        err = _err_;
    }
    let metaData;
    function handleMetaData(_metaData_) {
        metaData = _metaData_;
    }
    function handleTransColor(transColor) {
        metaData.transColor = transColor;
    }
    function handlePalette(palette) {
        metaData.palette = palette;
    }
    function handleSimpleTransparency() {
        metaData.alpha = true;
    }
    let gamma;
    function handleGamma(_gamma_) {
        gamma = _gamma_;
    }
    let inflateDataList = [];
    function handleInflateData(inflatedData) {
        inflateDataList.push(inflatedData);
    }
    let reader = new SyncReader(buffer);
    let parser = new Parser(options, {
        read: reader.read.bind(reader),
        error: handleError,
        metadata: handleMetaData,
        gamma: handleGamma,
        palette: handlePalette,
        transColor: handleTransColor,
        inflateData: handleInflateData,
        simpleTransparency: handleSimpleTransparency
    });
    parser.start();
    reader.process();
    if (err) {
        throw err;
    }
    //join together the inflate datas
    let inflateData = Buffer.concat(inflateDataList);
    inflateDataList.length = 0;
    let inflatedData;
    if (metaData.interlace) {
        inflatedData = zlib.inflateSync(inflateData);
    } else {
        let rowSize = (metaData.width * metaData.bpp * metaData.depth + 7 >> 3) + 1;
        let imageSize = rowSize * metaData.height;
        inflatedData = inflateSync(inflateData, {
            chunkSize: imageSize,
            maxLength: imageSize
        });
    }
    inflateData = null;
    if (!inflatedData || !inflatedData.length) {
        throw new Error("bad png - invalid inflate data response");
    }
    let unfilteredData = FilterSync.process(inflatedData, metaData);
    inflateData = null;
    let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
    unfilteredData = null;
    let normalisedBitmapData = formatNormaliser(bitmapData, metaData);
    metaData.data = normalisedBitmapData;
    metaData.gamma = gamma || 0;
    return metaData;
};
}),
"[project]/node_modules/pngjs/lib/packer-sync.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let hasSyncZlib = true;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
if (!zlib.deflateSync) {
    hasSyncZlib = false;
}
let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-route] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/node_modules/pngjs/lib/packer.js [app-route] (ecmascript)");
module.exports = function(metaData, opt) {
    if (!hasSyncZlib) {
        throw new Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
    }
    let options = opt || {};
    let packer = new Packer(options);
    let chunks = [];
    // Signature
    chunks.push(Buffer.from(constants.PNG_SIGNATURE));
    // Header
    chunks.push(packer.packIHDR(metaData.width, metaData.height));
    if (metaData.gamma) {
        chunks.push(packer.packGAMA(metaData.gamma));
    }
    let filteredData = packer.filterData(metaData.data, metaData.width, metaData.height);
    // compress it
    let compressedData = zlib.deflateSync(filteredData, packer.getDeflateOptions());
    filteredData = null;
    if (!compressedData || !compressedData.length) {
        throw new Error("bad png - invalid compressed data response");
    }
    chunks.push(packer.packIDAT(compressedData));
    // End
    chunks.push(packer.packIEND());
    return Buffer.concat(chunks);
};
}),
"[project]/node_modules/pngjs/lib/png-sync.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let parse = __turbopack_context__.r("[project]/node_modules/pngjs/lib/parser-sync.js [app-route] (ecmascript)");
let pack = __turbopack_context__.r("[project]/node_modules/pngjs/lib/packer-sync.js [app-route] (ecmascript)");
exports.read = function(buffer, options) {
    return parse(buffer, options || {});
};
exports.write = function(png, options) {
    return pack(png, options);
};
}),
"[project]/node_modules/pngjs/lib/png.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let Parser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/parser-async.js [app-route] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/node_modules/pngjs/lib/packer-async.js [app-route] (ecmascript)");
let PNGSync = __turbopack_context__.r("[project]/node_modules/pngjs/lib/png-sync.js [app-route] (ecmascript)");
let PNG = exports.PNG = function(options) {
    Stream.call(this);
    options = options || {}; // eslint-disable-line no-param-reassign
    // coerce pixel dimensions to integers (also coerces undefined -> 0):
    this.width = options.width | 0;
    this.height = options.height | 0;
    this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null;
    if (options.fill && this.data) {
        this.data.fill(0);
    }
    this.gamma = 0;
    this.readable = this.writable = true;
    this._parser = new Parser(options);
    this._parser.on("error", this.emit.bind(this, "error"));
    this._parser.on("close", this._handleClose.bind(this));
    this._parser.on("metadata", this._metadata.bind(this));
    this._parser.on("gamma", this._gamma.bind(this));
    this._parser.on("parsed", (function(data) {
        this.data = data;
        this.emit("parsed", data);
    }).bind(this));
    this._packer = new Packer(options);
    this._packer.on("data", this.emit.bind(this, "data"));
    this._packer.on("end", this.emit.bind(this, "end"));
    this._parser.on("close", this._handleClose.bind(this));
    this._packer.on("error", this.emit.bind(this, "error"));
};
util.inherits(PNG, Stream);
PNG.sync = PNGSync;
PNG.prototype.pack = function() {
    if (!this.data || !this.data.length) {
        this.emit("error", "No data provided");
        return this;
    }
    process.nextTick((function() {
        this._packer.pack(this.data, this.width, this.height, this.gamma);
    }).bind(this));
    return this;
};
PNG.prototype.parse = function(data, callback) {
    if (callback) {
        let onParsed, onError;
        onParsed = (function(parsedData) {
            this.removeListener("error", onError);
            this.data = parsedData;
            callback(null, this);
        }).bind(this);
        onError = (function(err) {
            this.removeListener("parsed", onParsed);
            callback(err, null);
        }).bind(this);
        this.once("parsed", onParsed);
        this.once("error", onError);
    }
    this.end(data);
    return this;
};
PNG.prototype.write = function(data) {
    this._parser.write(data);
    return true;
};
PNG.prototype.end = function(data) {
    this._parser.end(data);
};
PNG.prototype._metadata = function(metadata) {
    this.width = metadata.width;
    this.height = metadata.height;
    this.emit("metadata", metadata);
};
PNG.prototype._gamma = function(gamma) {
    this.gamma = gamma;
};
PNG.prototype._handleClose = function() {
    if (!this._parser.writable && !this._packer.readable) {
        this.emit("close");
    }
};
PNG.bitblt = function(src, dst, srcX, srcY, width, height, deltaX, deltaY) {
    // eslint-disable-line max-params
    // coerce pixel dimensions to integers (also coerces undefined -> 0):
    /* eslint-disable no-param-reassign */ srcX |= 0;
    srcY |= 0;
    width |= 0;
    height |= 0;
    deltaX |= 0;
    deltaY |= 0;
    /* eslint-enable no-param-reassign */ if (srcX > src.width || srcY > src.height || srcX + width > src.width || srcY + height > src.height) {
        throw new Error("bitblt reading outside image");
    }
    if (deltaX > dst.width || deltaY > dst.height || deltaX + width > dst.width || deltaY + height > dst.height) {
        throw new Error("bitblt writing outside image");
    }
    for(let y = 0; y < height; y++){
        src.data.copy(dst.data, (deltaY + y) * dst.width + deltaX << 2, (srcY + y) * src.width + srcX << 2, (srcY + y) * src.width + srcX + width << 2);
    }
};
PNG.prototype.bitblt = function(dst, srcX, srcY, width, height, deltaX, deltaY) {
    // eslint-disable-line max-params
    PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
    return this;
};
PNG.adjustGamma = function(src) {
    if (src.gamma) {
        for(let y = 0; y < src.height; y++){
            for(let x = 0; x < src.width; x++){
                let idx = src.width * y + x << 2;
                for(let i = 0; i < 3; i++){
                    let sample = src.data[idx + i] / 255;
                    sample = Math.pow(sample, 1 / 2.2 / src.gamma);
                    src.data[idx + i] = Math.round(sample * 255);
                }
            }
        }
        src.gamma = 0;
    }
};
PNG.prototype.adjustGamma = function() {
    PNG.adjustGamma(this);
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f4a54aa1._.js.map