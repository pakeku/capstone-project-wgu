import request from 'supertest';
import app from '@app';

describe('Health Route', () => {
    it('should respond with status 200 for GET requests', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
    });

    it('should respond with status 200 for POST requests', async () => {
        const response = await request(app).post('/health');
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
    });
});
