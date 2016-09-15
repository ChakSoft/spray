/**
 * Tests for Spray Client v1.0.0-beta.3
 */
const chai = require('chai');
const expect = chai.expect;
const SprayClient = require('./index');

describe('Spray Client', () => {
    it('build client without API Key should raise an error', () => {
        let fcn = () => new SprayClient();
        expect(fcn).to.throw();
    });
    it('client login should return an object with the redirect link', () => {
        let opt = {
            apiKey: process.env.SPRAY_API_KEY
        };
        let client = new SprayClient(opt);
        return client.login().then((data) => {
            expect(data).to.have.deep.property('login.redirectTo').that.is.a('string');
        });
    });
    it('client info should return an object with minimal information', () => {
        let opt = {
            apiKey: process.env.SPRAY_API_KEY
        };
        let authToken = process.env.AUTH_TOKEN;
        let client = new SprayClient(opt);
        return client.info(authToken).then((data) => {
            expect(data).to.contain.all.keys(['username', 'email']);
        });
    });
});
