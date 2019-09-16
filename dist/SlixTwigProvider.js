"use strict";

exports.default = void 0;

var _Twig = require("./core/Twig");

let Slix = require('slix-app').Slix;

let AbstractProvider = require('slix-app').AbstractProvider;

let pathLib = require('path');

class SlixTwigProvider extends AbstractProvider {
  /**
   * @param {Slix} App
   **/
  registration(App) {}
  /**
   * @param {Slix} App
   * */


  boot(App) {
    let config = App.getParam(this.getName());
    App.twig = new _Twig.default({
      "path": pathLib.join(App.get('ROOT_DIR'), config.path || '/'),
      "cache": config.cache,
      "typeFile": config.typeFile,
      "app": App
    });
    App.render = App.twig.render;
  }

}

exports.default = SlixTwigProvider;