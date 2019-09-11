"use strict";

exports.default = void 0;

function _Slix() {
  const data = require("slix-app/dist/Slix");

  _Slix = function () {
    return data;
  };

  return data;
}

var _Twig = require("./core/Twig");

let AbstractProvider = require('slix-app').AbstractProvider;

let pathLib = require('path');

class TwigProvider extends AbstractProvider {
  /**
   * @param {Slix} App
   **/
  registration(App) {
    App.setParam(this.getName(), {
      "path": "/views/",
      "cache": false,
      "typeFile": ".twig"
    });
  }
  /**
   * @param {Slix} App
   * */


  boot(App) {
    let config = App.getParam(this.getName());
    this.config.path = pathLib.join(App.get('ROOT_DIR'), this.config.path || '/');
    App.twig = new _Twig.default({
      "path": pathLib.join(App.get('ROOT_DIR'), config.path || '/'),
      "cache": config.cache,
      "typeFile": config.typeFile,
      "app": App
    });
    App.render = App.twig.render;
  }

}

exports.default = TwigProvider;