import request from 'supertest';
import app from '@app';

describe('App initialization', () => {
    it('should export the app instance', () => {
        expect(app).toBeDefined();
    });

    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/nonexistent-route');
        expect(response.status).toBe(404);
    });
});
