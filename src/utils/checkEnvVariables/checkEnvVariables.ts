export const envVariableCheck = (variables: string[], callback: () => void): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (variables.length === 0) {
            resolve(); // Resolve immediately for empty variables
            return;
        }

        const missingVariables: string[] = [];

        variables.forEach((variable) => {
            if (!process.env[variable]) {
                missingVariables.push(variable);
            }
        });

        if (missingVariables.length > 0) {
            const errorMessage = `Environment variables missing: ${missingVariables.join(', ')}`;
            reject(new Error(errorMessage));
        } else {
            resolve(callback());
        }
    });
};