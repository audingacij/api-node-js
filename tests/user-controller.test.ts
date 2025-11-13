// tests/api.spec.ts
import { test, expect } from "@playwright/test";
import { cleanUpUsers } from "../src/helpers/cleanup-helper";
let baseURL: string = "http://localhost:3000/users";

test.beforeEach(async ({ request }) => {
  await cleanUpUsers(request);
});

test.describe("User management API", () => {
  test("all users: should return empty array when no users", async ({
    request,
  }) => {
    const response = await request.get(`${baseURL}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.text();
    expect(responseBody).toBe("[]");
  });

  test("find user: should return a user by ID", async ({ request }) => {
    //create a user
    const response = await request.post(`${baseURL}`);
    const responseBody = await response.json();
    const userId = responseBody.id;
    //find the user by id
    const getResponse = await request.get(baseURL + "/" + userId);
    expect(getResponse.status()).toBe(200);
  });

  test("find user: should return 404 if user not found", async ({
    request,
  }) => {
    const nonExistingUserId = 999999999;
    const getResponse = await request.delete(baseURL + "/" + nonExistingUserId);
    expect(getResponse.status()).toBe(404);
  });

  test("create user: should add a new user", async ({ request }) => {
    const response = await request.post(`${baseURL}`);
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.name).toBeDefined();
    console.log(responseBody);
  });

  test("delete user: should delete a user by ID", async ({ request }) => {
    const response = await request.post(`${baseURL}`);
    const responseBody = await response.json();
    const userId = responseBody.id;
    const deleteResponse = await request.delete(baseURL + "/" + userId);
    expect(deleteResponse.status()).toBe(200);
    console.log(await deleteResponse.json());
  });

  test("delete user: should return 404 if user not found", async ({
    request,
  }) => {
    const nonExistingUserId = 999999999;
    const deleteResponse = await request.get(baseURL + "/" + nonExistingUserId);
    expect(deleteResponse.status()).toBe(404);
  });

  test("get user ID information", async ({ request }) => {
    const responseAllUsers = await request.get(`${baseURL}`);
    const responseUsers = await responseAllUsers.json();
    const numberOfObjects = responseUsers.length;
    console.log("Number of objects: " + numberOfObjects);

    // create an empty array to store all user ID
    let userIDs = [];

    // loop through all users and store their ID in an array
    for (let i = 0; i < numberOfObjects; i++) {
      // get user ID from the response
      let userID = responseUsers[i].id;
      // push is used to add elements to the end of an array
      userIDs.push(userID);
    }
    //for user deletion
    for (let i = 0; i < numberOfObjects; i++) {
      // delete user by id
      let response = await request.delete(`${baseURL}/${userIDs[i]}`);
      // validate the response status code
      expect.soft(response.status()).toBe(200);
      console.log(`Deleted user with ID: ${userIDs[i]}`);
    }
  });
});
