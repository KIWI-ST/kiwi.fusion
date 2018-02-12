/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Element
 * @class
 * @author yellow date 2018/2/5
 * @example
 * const mock = new Mock(canvasElement,['width','heigh']);
 */

const attribute = {
    'style': 1,
    'nodeName': 1,
    'width': 1,
    'height': 1
};

/**
 * @class
 */
class Mock {
    /**
     * 
     * @param {HtmlCanvasElement} element 
     */
    constructor(element, mockList) {
        /**
         * @type {HtmlCanvasElement}
         */
        this._element = element;
        /**
         * @type {Array}
         */
        this._mockList = mockList;
    }
    /**
     * @type {Array}
     */
    set mockList(v) {
        this._mockList = v;
    }
    /**
     * @type {Array}
     */
    get mockList() {
        return this._mockList;
    }

    get element() {
        return this._element;
    }

    isAttribute(name) {
        return attribute[name] === 1;
    }

}

module.exports = Mock;