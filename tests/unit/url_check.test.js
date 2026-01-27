/**
 * @jest-environment jsdom
 */

const { isTwitterUrl } = require('../../content.js');

describe('isTwitterUrl', () => {
    const testCases = [
        // Twitter variations
        { url: 'https://twitter.com', expected: true },
        { url: 'https://www.twitter.com', expected: true },
        { url: 'https://mobile.twitter.com', expected: true },
        { url: 'https://twitter.com/user/status/123', expected: true },
        
        // X variations
        { url: 'https://x.com', expected: true },
        { url: 'https://www.x.com', expected: true },
        { url: 'https://api.x.com', expected: true },
        { url: 'https://x.com/i/flow/login', expected: true },
        
        // Should NOT match
        { url: 'https://netflix.com', expected: false },
        { url: 'https://www.netflix.com', expected: false },
        { url: 'https://example.com', expected: false },
        { url: 'https://box.com', expected: false },
        { url: 'https://fox.com', expected: false },
        { url: 'https://not-x.com', expected: false },
        { url: 'https://examplex.com', expected: false },
        
        // Edge cases that technically match the suffix but not the domain boundary logic
        // The current implementation checks:
        // hostname === 'x.com' || hostname.endsWith('.x.com')
        // 'com.x.com' -> endsWith('.x.com') -> true (This is a subdomain of x.com, so it SHOULD match)
        { url: 'https://sub.x.com', expected: true },
    ];

    testCases.forEach(({ url, expected }) => {
        test(`should return ${expected} for ${url}`, () => {
            expect(isTwitterUrl(url)).toBe(expected);
        });
    });
});
