let _baseUrl = "";

export const setBaseURL = (baseUrl: string) => (_baseUrl = baseUrl);
export const endpoint = (path: string) => new URL(path, _baseUrl).toString();
