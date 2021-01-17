import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export default class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if email and password are set
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    const { LOGIN_EMAIL, LOGIN_PASSWORD } = process.env;
    if (LOGIN_EMAIL !== email || LOGIN_PASSWORD !== password) {
      res
        .status(401)
        .send({
          message: "The email address or password you entered is incorrect.",
        });
    }

    //Sign JWT, valid for 1 hour
    const token = jwt.sign({ username: LOGIN_EMAIL }, config.jwtSecret, {
      expiresIn: "1h",
    });

    //Send the jwt in the response
    res.send({ token: token });
  };
}
