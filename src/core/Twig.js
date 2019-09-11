import EventRenderingPreparation from "../event/EventRenderingPreparation";
import TwigEvent from "../event/TwigEvent";

let twigLib = require('twig');
let pathLib = require('path');

export default class Twig {
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
        values = this.app.dispatch(TwigEvent.RENDERING_PREPARATION, new EventRenderingPreparation(null, values));

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
                resolve(new Response(html, 200));
            });
        });
    };
}