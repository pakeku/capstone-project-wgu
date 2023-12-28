import request from 'supertest';
import app from '@app';

describe('App initialization', () => {
    it('should export the app instance', () => {
        // Assert
        expect(app).toBeDefined();
    });

    it('should return 404 for unknown routes', async () => {
        // Act
        const response = await request(app).get('/nonexistent-route');

        // Assert
        expect(response.status).toBe(404);
    });
});
