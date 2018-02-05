/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Element
 * @class
 * @author yellow date 2018/2/5
 * @example
 * const mock = new Mock(canvasElement,['width','heigh']);
 */
class Mock {
    /**
     * 
     * @param {HtmlCanvasElement} element 
     */
    constructor(element,mockList){
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
    set mockList(v){
        this._mockList = v;
    }
    /**
     * @type {Array}
     */
    get mockList(){
        return this._mockList;
    }
    /**
     * 
     * @param {String} name 
     */
    getTarget(name){
        return this._element[name];
    }

}

module.exports = Mock;