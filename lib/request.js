const RP = require('request-promise');
const API_URL = 'https://spray.chaksoft.fr';

class SprayRequest {
    constructor(method, suffix, headers) {
        this.suffix = suffix;
        this.method = method;
        this.headers = headers || {};
    }

    run(body = {}) {
        let options = {
            method: this.method.toUpperCase(),
            uri: `${API_URL}/${this.suffix}`,
            json: true,
            headers: this.headers,
            body: body
        };
        return RP(options).then(body => {
            let finalBody = body;
            if (body.login && body.login.redirect_to) {
                // Transform to match ES6 recommendations for JavaScript keys notation
                finalBody = { login: { redirectTo: body.login.redirect_to } };
            }
            return finalBody;
        });
    }
}

module.exports = SprayRequest;
