// Function to validate MongoDB Atlas URI format
export function validateMongoDBAtlasURI(uri: string) {
    // Regular expression pattern for MongoDB Atlas URI
    const atlasUriPattern = /^mongodb\+srv:\/\/[a-zA-Z0-9]+:[a-zA-Z0-9]+@[\w.-]+(?:\/[\w-]+)?(?:\?.+)?$/;

    return atlasUriPattern.test(uri);
}