import { Trim } from "./trim.pipe";

describe('TrimPipe', () => {
    let pipe = new Trim();

    it('should transform long sender text to short text', () => {
        expect(pipe.transform('tz1YpWsMwc4gSyjtxEF3JbmN6YrGiDidaSmg')).toBe('tz....daSmg');
    });
});