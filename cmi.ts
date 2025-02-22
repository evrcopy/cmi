/***
 * Copyright (c) 2024 Vojtech Hrib
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

declare const __brand: unique symbol;
type Brand<T, BrandName> = T & {[__brand]: BrandName};

const ESC = '\u001b';
const CODE_TABLE = {
    // Control and special
    reset: 0,
    b: 1,

    // Default color set
    black  : 30, bgBlack  : 40,
    red    : 31, bgRed    : 41,
    green  : 32, bgGreen  : 42,
    yellow : 33, bgYellow : 43,
    blue   : 34, bgBlue   : 44,
    magenta: 35, bgMagenta: 45,
    cyan   : 36, bgCyan   : 46,
    white  : 37, bgWhite  : 47,

    // Extended color set
    grey         : 90, bgGrey         : 100,
    brightBlack  : 90, bgBrightBlack  : 100,
    brightRed    : 91, bgBrightRed    : 101,
    brightGreen  : 92, bgBrightGreen  : 102,
    brightYellow : 93, bgBrightYellow : 103,
    brightBlue   : 94, bgBrightBlue   : 104,
    brightMagenta: 95, bgBrightMagenta: 105,
    brightCyan   : 96, bgBrightCyan   : 106,
    brightWhite  : 97, bgBrightWhite  : 107,
};

declare global {
    type ColoredString = Brand<string, 'ColoredString'>;
    type ColorFns = { [k in keyof typeof CODE_TABLE]: () => ColoredString };
    interface String extends ColorFns {
        fmt(code: string|number): ColoredString;
    }
}

String.prototype.fmt = function(code: string|number): ColoredString {
    return (
        `${ESC}[${code}m` + this + (!code || this.endsWith('[0m') ? '' : ''.fmt(CODE_TABLE.reset))
    ) as ColoredString;
}

for (const [name, code] of Object.entries(CODE_TABLE)) {
    String.prototype[name as keyof typeof CODE_TABLE] = function(): ColoredString {
        return this.fmt(code);
    }
}
