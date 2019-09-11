"use strict";

exports.default = void 0;

function _AbstractEvent() {
  const data = require("slix-app/src/api/AbstractEvent");

  _AbstractEvent = function () {
    return data;
  };

  return data;
}

class EventRenderingPreparation extends _AbstractEvent().default {
  constructor(request = null, data = {}) {
    super(request);
    this.data = data;
  }
  /** @return {Object} */


  get data() {
    return this._data;
  }
  /** @param {Object} value */


  set data(value) {
    this._data = value;
  }

}

exports.default = EventRenderingPreparation;