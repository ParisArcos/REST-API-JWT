import User from "../models/User";
import jwt from "jsonwebtoken";
import * as config from "../config/config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  console.log(req.body);
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const userRole = await Role.findOne({ name: "user" });
    newUser.roles = [userRole._id];
  }

  const savedUser = await newUser.save();
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, //24 Hours
  });
  res.status(200).json({ token });
};

export const signIn = async (req, res) => {
  console.log(config.SECRET);
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });
  const userValidated = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  return userFound && userValidated
    ? res.json({ userFound, token })
    : res.status(400).json({ message: "User not found or invalid password" });
};
