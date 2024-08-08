import './cmi';
import { describe, it, expect } from 'bun:test';

describe('cmi', () => {
    it('fmt test', () => {
        expect('info'.b().cyan().bgWhite()).toBe('\u001b[47m\u001b[36m\u001b[1minfo\u001b[0m' as ColoredString);
    });
});
