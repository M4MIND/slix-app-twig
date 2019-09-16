import EventRenderingPreparation from "../event/EventRenderingPreparation";
import TwigEvent from "../event/TwigEvent";

let Response = require('slix-app').Response;
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

    render = async (params = {}, values = {}) => {
        if (typeof params === 'object') {
            let file = params.file || params.fullPath;
        }
        else {
            let file = params;
        }

        let $event = new EventRenderingPreparation(null, values);

        await this.app.dispatch(TwigEvent.RENDERING_PREPARATION, $event);

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
    };
}