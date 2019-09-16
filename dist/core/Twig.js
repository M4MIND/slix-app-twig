"use strict";

exports.default = void 0;

var _EventRenderingPreparation = require("../event/EventRenderingPreparation");

var _TwigEvent = require("../event/TwigEvent");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Response = require('slix-app').Response;

let twigLib = require('twig');

let pathLib = require('path');

class Twig {
  /**
   * @param {{app: Slix, path: string, cache: boolean, typeFile: string}} config
   * */
  constructor(config) {
    _defineProperty(this, "render", async (params = {}, values = {}) => {
      let file = typeof params === "object" ? params.file || params.fullPath : params;
      let $event = new _EventRenderingPreparation.default(null, values);
      await this.app.dispatch(_TwigEvent.default.RENDERING_PREPARATION, $event);
      values = $event.data;
      return await new Promise((resolve, reject) => {
        let path;

        if (this.path && !params.fullPath) {
          path = pathLib.join(this.path, file);
        }

        if (this.typeFile) {
          path += this.typeFile;
        }

        twigLib.renderFile(path, values, (err, html) => {
          if (err) {
            reject(err);
          }

          resolve(new Response(html, 200));
        });
      });
    });

    this.app = config.app;
    this.path = config.path;
    this.typeFile = config.typeFile;
    twigLib.cache(config.cache);
  }

}

exports.default = Twig;