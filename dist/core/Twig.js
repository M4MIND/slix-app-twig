"use strict";

exports.default = void 0;

function _Response() {
  const data = require("slix-app/dist/core/response/Response");

  _Response = function () {
    return data;
  };

  return data;
}

var _EventRenderingPreparation = require("../event/EventRenderingPreparation");

var _TwigEvent = require("../event/TwigEvent");

let twigLib = require('twig');

let pathLib = require('path');

class Twig {
  /**
   * @param {{app: Slix, path: string, cache: boolean, typeFile: string}} config
   * */
  constructor(config) {
    this.app = config.app;
    this.path = config.path;
    this.typeFile = config.typeFile;
    twigLib.cache(config.cache);
  }

  async render(file, values = {}) {
    values = this.app.dispatch(_TwigEvent.default.RENDERING_PREPARATION, new _EventRenderingPreparation.default(null, values));
    return await new Promise((resolve, reject) => {
      if (this.path) {
        path = pathLib.join(this.path, file);
      }

      if (this.typeFile) {
        path += this.typeFile;
      }

      twigLib.renderFile(path, values, (err, html) => {
        if (err) {
          reject(err);
        }

        resolve(new (_Response().default)(html, 200));
      });
    });
  }

}

exports.default = Twig;