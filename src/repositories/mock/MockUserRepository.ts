import {ApplicationUserBody, UserRepository} from "../UserRepository";
import {ApplicationUser} from "@prisma/client";
import {randomString} from "@helpers/random-string";

export class MockUserRepository implements UserRepository {
    private users: ApplicationUser[] = [
        {id: randomString(), name: "Matheus Brito", email: "matheusbr032@gmail.com"}
    ]

    async create(data: ApplicationUserBody): Promise<ApplicationUser> {
        let id = "";

        while (id == "") {
            const generateId = randomString();
            id = (await this.findById(generateId)) ? "": generateId;
        }

        const user = {id, ...data};
        this.users.push(user);

        return user;
    }

    async findAll(): Promise<ApplicationUser[]> {
        return Promise.resolve(this.users);
    }

    async findById(id: string): Promise<ApplicationUser | null> {
        const user = this.users.find(user => user.id == id) ?? null;
        return Promise.resolve(user);
    }

    findByEmail(email: string): Promise<ApplicationUser | null> {
        const user = this.users.find(user => user.email == email) ?? null;
        return Promise.resolve(user);
    }

    async update(id: string, data: Partial<ApplicationUserBody>): Promise<ApplicationUser> {
        const user = await this.findById(id);

        if(!user) throw new Error("");

        const userUpdated = Object.assign(data, user);

        this.users = this.users.filter(user => user.id != userUpdated.id);
        this.users.push(userUpdated);

        return userUpdated;
    }


}