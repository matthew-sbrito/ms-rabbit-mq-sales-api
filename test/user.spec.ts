import {assert, beforeEach, describe, expect, it} from "vitest";
import {MockUserRepository} from "../src/repositories/mock/MockUserRepository";
import {ApplicationUserBody, UserRepository} from "../src/repositories/UserRepository";

describe("testing user repository", () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new MockUserRepository()
    });

    it("must return user by email!", async () => {
        const emailToFindUser = "matheusbr032@gmail.com";

        const user = await userRepository.findByEmail(emailToFindUser);

        assert(user != null, "User cannot be null!");

        expect(user.email).toBe(emailToFindUser)
    });

    it("must create user and return it!", async () => {
        const userBody: ApplicationUserBody = {
            name: "John Doe",
            email: "johndoe@gmail.com"
        };

        const user = await userRepository.create(userBody);

        assert(user != null, "User cannot be null!");

        expect(user.name).toBe(userBody.name)
    });
})