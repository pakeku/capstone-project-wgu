import supertest from "supertest";
import app from "@app";
import { getTestToken } from '@utils/auth0'

// Test for GET /api/registration/business/:userId
// returns wheather the user has already provided their business information [true/false]

describe("GET /api/registration/business/:userId", () => {
    it("should return true if the user has already provided their business information", async () => {
        const token = await getTestToken()
        const response = await supertest(app)
            .get("/api/registration/business/123")
            .set('Authorization', `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200);
        expect(response.body).toEqual({ hasBusinessInfo: true });
    });
});

// Test for POST /api/registration/business/:userId
// user should be able to provide their business information [business name, person-oweenr name, address of business, business phone number, ]
