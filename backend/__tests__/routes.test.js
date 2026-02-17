const request = require('supertest');
const app = require('../server');

describe('Routes', () => {
    it('should return 200 for the home route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should return 404 for a non-existent route', async () => {
        const response = await request(app).get('/non-existent');
        expect(response.status).toBe(404);
    });

    it('should return products from API', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
    });
});