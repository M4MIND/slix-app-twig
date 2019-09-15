export class Slix {
    public twig: Twig;

    render(path: { file?: string, fullPath?: string }, params: object): Promise<Response>;
}

export class Twig {
    render(path: { file?: string, fullPath?: string }, params: object): Promise<Response>;
}

export class Response {

}

export class TwigEvent {
    static RENDERING_PREPARATION: string;
}