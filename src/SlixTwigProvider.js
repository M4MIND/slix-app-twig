import Twig from './core/Twig'

let Slix = require('slix-app').Slix;
let AbstractProvider = require('slix-app').AbstractProvider;
let pathLib = require('path');

export default class SlixTwigProvider extends AbstractProvider {
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

        App.twig = new Twig({
            "path": pathLib.join(App.get('ROOT_DIR'), config.path || '/'),
            "cache": config.cache,
            "typeFile": config.typeFile,
            "app": App
        });

        App.render = App.twig.render;
    }
}
