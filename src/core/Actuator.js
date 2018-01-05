/**
 * 执行器，用于执行Record操作，全局自带一个Actuator
 * @author yellow date 2018/1/3
 */

 /**
  * @class
  */
 class Actuator{
    
    constructor(){
        /**
         * 
         */
        this._records = [];
        /**
         * 
         */
        this._realCanvas = null;
    }
    /**
     * 
     * @param {Array} records 
     */
    play(records){
        if(!this._realCanvas)
            this._records  = this._records.concat(records);
        //
    }

 }

 const actuator = new Actuator();

 const globalCanvasElement = function(htmlCanvasElement){
    
 }

 module.exports = {
    Actuator,
    actuator
 };