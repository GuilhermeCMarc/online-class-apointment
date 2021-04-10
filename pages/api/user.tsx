import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

interface ErrorResponseType {
  error: string;
}

interface SuccessReponseType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessReponseType>
): Promise<void> => {
  if (req.method === "POST") {
    const { db } = await connect();

    const { name, email, cellphone, teacher } = req.body;

    if (!name || !email || !cellphone || !teacher) {
      res.status(400).json({ error: "Missing body parameter" });
      return;
    }

    const response = await db.collection("users").insertOne({
      name: "Rogerio",
      age: 22,
      email: "rogerioastolfo@gmail.com",
    });

    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: "Wrong connection method" });
  }
};
