// Auth0 token payload
export interface iTokenPayload {
    iss: string;
    sub: string;
    aud: string;
    iat: number;
    exp: number;
    azp: string;
    scope: string;
    gty: string;
    permissions: string[];
}

export interface iBusinessInfo {
    businessName: string;
    ownerName: string;
    businessAddress: string;
    businessPhoneNumber: string;
    businessEmail: string;
}

export const mockBusinessInfo: iBusinessInfo = {
    businessName: "Sample Business",
    ownerName: "Owner Name",
    businessAddress: "Sample Address",
    businessPhoneNumber: "1234567890",
    businessEmail: "linarespachecoerick+donotreply@gmail.com"
};
