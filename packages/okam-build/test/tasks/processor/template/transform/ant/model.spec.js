/**
 * @file v-model support
 * @author xiaohong8023@outlook.com
 */

'use strict';

const assert = require('assert');
const {readFile, fakeProcessorOptions} = require('test/helper');
const templateProcessor = require('okam/processor/template/index');

function readTpl(file, isExpect) {
    return readFile(
        file
        + (isExpect ? '-ant.expect' : '')
        + '.tpl'
    );
}

describe('支付宝: template processor: v-model plugin of template', function () {
    it('v-model: input', function () {
        const file = {
            path: 'test/fakefile',
            content: '<input v-model="inputVal" />'
        };
        let result = templateProcessor(file, fakeProcessorOptions(undefined, undefined, 'ant'));
        assert(result.content === '<input onInput="__handlerProxy" value="{{inputVal}}" data-okam-model-args="inputVal,value"/>');
    });

    it('v-model: support component', function () {
        let file = {
            content: readTpl('model/model-support')
        };
        let result = templateProcessor(file, fakeProcessorOptions(undefined, undefined, 'ant'));
        assert.equal(result.content, readTpl('model/model-support', true));
    });

    it('v-model: not support component', function () {
        let file = {
            content: readTpl('model/model-nosupport')
        };
        let result = templateProcessor(file, fakeProcessorOptions(undefined, undefined, 'ant'));
        assert.equal(result.content, readTpl('model/model-nosupport', true));
    });

    it('v-model: support but have conflict', function () {
        let file = {
            content: readTpl('model/model-conflict')
        };
        let result = templateProcessor(file, fakeProcessorOptions(undefined, undefined, 'ant'));
        assert.equal(result.content, readTpl('model/model-conflict', true));
    });
});
