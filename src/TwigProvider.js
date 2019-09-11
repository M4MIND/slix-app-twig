import Slix from 'slix-app/src/Slix';
import AbstractProvider from "slix-app/src/api/AbstractProvider";
import Twig from './core/Twig'

let pathLib = require('path');

export default class TwigProvider extends AbstractProvider {
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

        App.twig = new Twig({
            "path": pathLib.join(App.get('ROOT_DIR'), config.path || '/'),
            "cache": config.cache,
            "typeFile": config.typeFile,
            "app": App
        });

        App.render = App.twig.render;
    }
}