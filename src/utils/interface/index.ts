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
