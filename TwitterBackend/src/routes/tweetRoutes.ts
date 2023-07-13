import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = "SuperSecret";
//create a tweet
router.post("/", async (req, res) => {
  const { content, image } = req.body;
  //@ts-ignore
  const user = req.user;

  try {
    const result = await prisma.tweet.create({
      data: {
        image,
        userId: user.id,
        content,
      }, include: {user: true},
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "failure creatin tweet" });
  }
});

//get all tweets, tweet list
router.get("/", async (req, res) => {
  try {
    const allUsers = await prisma.tweet.findMany({
      include: {
        user: { select: { id: true, name: true, image: true, username: true } },
      },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: "cant find tweets" });
  }
});

//get one tweet
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await prisma.tweet.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });
    // setTimeout(() => res.status(200).json(tweet), 2000);
    res.status(200).json(tweet)
  } catch (error) {
    res.status(400).json({ error: "cant find tweet" });
  }
});

//update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not Implemented: ${id}` });
});

//delete tweet

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.tweet.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default router;

