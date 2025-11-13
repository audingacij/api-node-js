import { expect } from "@playwright/test";
import { StatusCodes } from "http-status-codes";

const baseURL = "http://localhost:3000/users";

export async function cleanUpUsers(request: any): Promise<void> {
  const allUsersResponse = await request.get(baseURL);
  expect(allUsersResponse.status()).toBe(StatusCodes.OK);

  const users = await allUsersResponse.json();
  console.log("Total users:", users.length);

  const userIDs: number[] = users.map((user: any) => user.id);

  for (const id of userIDs) {
    const deleteResponse = await request.delete(`${baseURL}/${id}`);
    expect.soft(deleteResponse.status()).toBe(200);
  }

  const checkResponse = await request.get(baseURL);
  expect(checkResponse.status()).toBe(StatusCodes.OK);
  const finalList = await checkResponse.json();
  expect(finalList).toEqual([]);
}
