import Role from "../models/Role";
import User from "../models/User";

export const checkRoles = async (req, res, next) => {
  let roles = await Role.find({}, { name: 1, _id: 0 });
  let roleNames = [];
  roles = roles.map((role) => {
    roleNames.push(role.name);
  });
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!roleNames.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};

export const checkDuplicatedValues = async (req, res, next) => {
  const username = await User.findOne({ username: req.body.username });
  const email = await User.findOne({ email: req.body.email });
  if (username || email) {
    return res.status(400).json({ message: "Register values alredy exist" });
  }
  next();
};
