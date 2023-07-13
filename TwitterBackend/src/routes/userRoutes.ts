import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//create a user
router.post("/", async(req, res) => {
    const { email, name, username } = req.body;
    console.log(email, name, username)
    try {
        const result = await prisma.user.create({
            data: {
                email, name, username, bio: "Hello, i'm new here on twitter"
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: "email  and username already exist"})
    }
})

//get all users, user list
router.get("/", async(req, res) => {
   try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers)
   } catch (error) {
    res.status(400).json({error: "cant find users"})
   }
})


//get one user
router.get("/:id", async(req, res) => {
    const {id}= req.params
    try {
        const user = await prisma.user.findUnique({where:{id: Number(id)}, include: {tweets: true}})
    res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: "cant find user"})
    }
})

//update user
router.put("/:id", async(req, res) => {
    const { id } = req.params
    const { name, bio, image } = req.body
    try {
        const result = await prisma.user.update({
            where: { id: Number(id) },
        data: {bio, image, name}
        })
       res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: "Failed to update user"})
    }
    
})

//delete user

router.delete("/:id", async(req, res) => {
    const { id } = req.params
    await prisma.user.delete({where: {id: Number(id)}})
    res.sendStatus(200)
})

export default router;

