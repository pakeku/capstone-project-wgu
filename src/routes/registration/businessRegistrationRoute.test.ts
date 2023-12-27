import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "@app";
import { getTestToken } from '@utils/auth0';
import { iTokenPayload, iBusinessInfo, mockBusinessInfo } from '@utils/data';

describe('Business Registration Route', () => {
    describe("GET /api/v1/business/:aud", () => {
        it("should return the business information for the given user", async () => {
            // Arrange
            const token = await getTestToken();
            const { aud } = jwt.decode(token) as iTokenPayload;
            const expectedResponse = { hasCompletedRegistration: true, data: mockBusinessInfo, error: {} };
            // TODO: Create a user with the given ID and business information
            // This could involve creating a user with the given ID and business information in the database

            // Act
            const response = await supertest(app)
                .get(`/api/v1/business/${aud}`)
                .set('Authorization', `Bearer ${token}`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedResponse);

        })

        it('should return false if the user ID exists but has incomplete business information', async () => {
            // Arrange
            const token = await getTestToken();
            const { aud } = jwt.decode(token) as iTokenPayload;
            const expectedResponse = {
                hasCompletedRegistration: false, data:
                {
                    businessName: "Sample Business",
                    ownerName: "Owner Name",
                    businessAddress: "Sample Address",
                    businessPhoneNumber: "",
                    businessEmail: ""
                }
                , error: {
                    message: 'Your business information is incomplete. Please complete your registration.'
                }
            };

            // Act
            const response = await supertest(app)
                .get(`/api/v1/business/${aud}`)
                .set('Authorization', `Bearer ${token}`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedResponse);
        });
    });

    describe("POST /api/v1/business/:aud", () => {
        it("should allow user to send their business information", async () => {
            // Arrange
            const token = await getTestToken();
            const { aud } = jwt.decode(token) as iTokenPayload;
            const expectedResponse = { success: true, data: mockBusinessInfo, error: null };

            // Act
            const response = await supertest(app)
                .post(`/api/v1/business/${aud}`)
                .set('Authorization', `Bearer ${token}`)
                .send(mockBusinessInfo);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedResponse);
        });

        it('should return 400 if any of the required fields are missing', async () => {
            // Arrange
            const token = await getTestToken();
            const { aud } = jwt.decode(token) as iTokenPayload;
            const expectedResponse = {
                success: false,
                data: null,
                error: {
                    message: "Missing required fields",
                    data: [
                        "businessName",
                        "ownerName",
                        "businessAddress",
                        "businessPhoneNumber",
                        "businessEmail"
                    ]
                }
            };

            // Act
            const response = await supertest(app)
                .post(`/api/v1/business/${aud}`)
                .set('Authorization', `Bearer ${token}`)
                .send({});

            // Assert
            expect(response.status).toBe(400);
            expect(response.body).toEqual(expectedResponse);
        })


    });
})