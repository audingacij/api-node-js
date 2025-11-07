// tests/api.spec.ts
import { test, expect } from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';
import { StatusCodes } from 'http-status-codes';


test.describe('User management API', () => {

    test('find user: should return a user by ID', async ({ request }) => {
        //create a user
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id;
        //find the user by id
        const getResponse = await request.get(baseURL + '/' + userId);
        expect(getResponse.status()).toBe(StatusCodes.OK);
    });

    test('find user: should return 404 if user not found', async ({ request }) => {
        const nonExistingUserId = 999999999
        const getResponse = await request.get(baseURL + '/' + nonExistingUserId);
        expect(getResponse.status()).toBe(StatusCodes.NOT_FOUND);
    });

    test('create user: should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        expect(response.status()).toBe(StatusCodes.CREATED);
        const responseBody = await response.json()
        expect(responseBody.name).toBeDefined;
        console.log(responseBody);
    });

    test('delete user: should delete a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        const responseBody = await response.json()
        const userId = responseBody.id;
        const deleteResponse  = await request.delete(baseURL + '/' + userId);
        expect(deleteResponse .status()).toBe(StatusCodes.OK);
        console.log(await deleteResponse .json());
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const nonExistingUserId = 999999999;
        const deleteResponse = await request.get(baseURL + '/' + nonExistingUserId);
        expect(deleteResponse.status()).toBe(StatusCodes.NOT_FOUND);
    });
});
