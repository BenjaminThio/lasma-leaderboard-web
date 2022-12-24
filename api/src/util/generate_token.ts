const crypto = require('crypto');

export default function generate_token({stringBase = 'base64', byteLength = 48} = {}) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(byteLength, (err: any, buffer: { toString: (arg0: string) => unknown; }) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString(stringBase));
            }
        });
    });
}