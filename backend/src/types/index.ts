import {Request, Response} from 'express';

export enum ArticleType {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

export type ApplicationRequest = Request & {
    data: {
        isAuthorized?: boolean;
    };
};

export type ApplicationResponse = Response;
