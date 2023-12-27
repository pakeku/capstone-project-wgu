import { envVariableCheck } from '@utils/checkEnvVariables';

describe('@utils/envVariableCheck', () => {

    const originalEnv = process.env;

    beforeAll(() => {
        process.env = { // Simulating the presence of variables
            VAR1: 'someValue',
            VAR2: 'anotherValue',
        };
    });

    afterAll(() => {
        process.env = originalEnv; // Restore original process.env after tests
    });
    it('should resolve when all variables are present', async () => {
        const variables = ['VAR1', 'VAR2']; // Variables that are present
        const callback = jest.fn(); // Mocking the callback function

        await expect(envVariableCheck(variables, callback)).resolves.toBeUndefined();
        expect(callback).toHaveBeenCalled();
    });

    it('should reject when variables are missing', async () => {
        const variables = ['VAR1', 'VAR_MISSING']; // Variable VAR_MISSING is not set
        const callback = jest.fn();

        await expect(envVariableCheck(variables, callback)).rejects.toThrowError(
            'Environment variables missing: VAR_MISSING'
        );
        expect(callback).not.toHaveBeenCalled();
    });

    it('should resolve without calling the callback for empty variables', async () => {
        const variables: string[] = [];
        const callback = jest.fn();

        await expect(envVariableCheck(variables, callback)).resolves.toBeUndefined();
        expect(callback).not.toHaveBeenCalled();
    });
});
