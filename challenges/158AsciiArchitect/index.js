/**
 * http://www.reddit.com/r/dailyprogrammer/comments/236va2/4162014_challenge_158_intermediate_part_1_the/
 */
'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

var line = '++--***···';

function _lshift (str, padding) {
    return new Array(padding + 1).join(' ') + str.substr(0, str.length - padding);
}

function _rshift(str, padding) {
    return str.substr(padding) + new Array(padding + 1).join(' ');
}

return fs.readFileAsync('input.txt', 'utf8')
    .then(function parseBlocks(map) {
        return map.match(/[1-9]*[a-j]/gi);
    })
    .then(function buildAndTranslateBlocks(blocks) {
        return Promise
            .reduce('abcdefghij'.split(''), function buildDictionary(result, char, index) {
                result[char] = _rshift(line, line.length - index);
                return result;
            }, {})
            .then(function (dictionary) {
                return Promise.map(blocks, function translateBlocks(block) {
                    return block.length === 2 ? _lshift(dictionary[block[1]], parseInt(block[0], 10)) : dictionary[block[0]];
                })
            });
    })
    .then(function rotateLines(lines) {
        console.log(lines);
        var rotatedLines = '';
        for (var i = 0, h = line.length - 1; h >= 0; i++) {
            rotatedLines += lines[i % lines.length][h];
            if ((i + 1) % lines.length === 0) {
                rotatedLines += '\n';
                h--;
            }
        }
        return rotatedLines
    })
    .then(console.log);
