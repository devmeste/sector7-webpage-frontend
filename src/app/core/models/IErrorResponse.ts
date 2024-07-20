export interface IErrorResponse {
    headers:    Headers;
    status:     number;
    statusText: string;
    url:        string;
    ok:         boolean;
    name:       string;
    message:    string;
    error:      Error;
}

export interface Error {
    timestamp: Date;
    status:    number;
    error:     string;
    message:   string;
    path:      string;
}

export interface Headers {
    normalizedNames: NormalizedNames;
    lazyUpdate:      null;
}

export interface NormalizedNames {
}
