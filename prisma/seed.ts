import {OrderStatus, PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.applicationUser.create({
        data: {
            name: "Matheus Brito",
            email: "matheusbr032@gmail.com",
        }
    })

    const order = await prisma.order.create({
        data: {
            products: {
                create: [
                    {
                        productId: 1,
                        quantity: 2
                    },
                    {
                        productId: 2,
                        quantity: 1
                    }
                ]
            },
            applicationUser: {
                connect: {email: user.email}
            },
            status: OrderStatus.APPROVED
        }
    })

    console.log(`Order created with id: [${order.id}]`);
}

main().then(() => console.log("Seed done!"));