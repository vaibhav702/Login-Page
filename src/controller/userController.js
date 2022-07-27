const userModel = require("../model/userModel");
const validator = require("../validator/validator");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    if (!validator.isValidRequestBody) {
      return res
        .status(400)
        .send({ status: false, msg: "not a valid request body" });
    }
    const { Name, Email, Avtar, Address, Age, country } = data; //object destruturing
    if (!validator.isValid(Name)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid name" });
    }
    let isName = /^[A-Za-z ]*$/;
    if (!isName.test(Name)) {
      return res
        .status(422)
        .send({ status: false, message: "enter valid name" });
    }
    if (!validator.isValid(Address)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid Address" });
    }
    if (!validator.isValid(Avtar)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid avtar" });
    }
    if (!validator.isValid(Age)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid Age" });
    }
    if (!validator.isValid(country)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid Country" });
    }
    if (!validator.isValidEmail(Email)) {
      return res.status(400).send({
        status: false,
        msg: "please enter valid email",
      });
    }

    if (!/^[^A-Z]*$/.test(Email)) {
      return res.status(400).send({
        status: false,
        msg: "BAD REQUEST please provied valid email which do not contain any Capital letter ",
      });
    }

    const isEmailAlreadyUsed = await userModel.findOne({
      Email,
      isDeleted: false,
    });

    if (isEmailAlreadyUsed) {
      return res.status(409).send({
        status: false,
        message: `${Email} is already used so please put valid input`,
      });
    }
    const userData = await userModel.create(data);
    return res.status(201).send({
      status: true,
      message: "successfully saved user data",
      data: userData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

module.exports.registerUser = registerUser;

const loginUser = async function (req, res) {
  try {
    let Email = req.body.Email;

    //----------------------Validation Start--------------------------------------------------------//

    if (!validator.isValidEmail(Email)) {
      return res.status(400).send({
        status: false,
        msg: "please enter valid email",
      });
    }
    if (!/^[^A-Z]*$/.test(Email)) {
      return res.status(400).send({
        status: false,
        msg: "BAD REQUEST please provied valid email which do not contain any Capital letter ",
      });
    }

    //----------------------Validation Ends--------------------------------------------------------//

    let user = await userModel.findOne({ Email: Email });

    if (!user)
      return res.status(400).send({
        status: false,
        msg: "email  is not corerct",
      });

    let token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        iat: new Date().getTime() / 1000,
      },
      "uidesignAssignment",
      {
        expiresIn: "99m",
      }
    );

    res.setHeader("x-auth-token", token);
    return res.status(200).send({ status: true, data: token });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};
module.exports.loginUser = loginUser;

const updateUser = async function (req, res) {
  try {
    const userId = req.params.userId;

    let requestBody = req.body;
    if (!validator.isValidRequestBody(req.body)) {
      return res
        .status(400)
        .send({ status: false, message: "ERROR! : request body is empty" });
    }
    const { Name, Email, Avtar, Address, Age, country } = requestBody;
    
    let isName = /^[A-Za-z ]*$/;
    if (!isName.test(Name)) {
      return res
        .status(422)
        .send({ status: false, message: "enter valid name" });
    }
    if (!validator.isValid(Address)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid Address" });
    }
    if (!validator.isValid(Avtar)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid avtar" });
    }
    if (!validator.isValid(Age)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid Age" });
    }
    if (!validator.isValid(country)) {
      return res
        .status(400)
        .send({ status: false, message: "enter valid Country" });
    }
    if (!validator.isValidEmail(Email)) {
      return res.status(400).send({
        status: false,
        msg: "please enter valid email",
      });
    }

    if (!/^[^A-Z]*$/.test(Email)) {
      return res.status(400).send({
        status: false,
        msg: "BAD REQUEST please provied valid email which do not contain any Capital letter ",
      });
    }

    const isEmailAlreadyUsed = await userModel.findOne({
      Email,
      isDeleted: false,
    });

    if (isEmailAlreadyUsed) {
      return res.status(409).send({
        status: false,
        message: `${Email} is already used so please put valid input`,
      });
    }

    const update = req.body;

    const updatedData = await userModel.findOneAndUpdate(
      { _id: userId },
      update,
      { new: true }
    );
    if (updatedData) {
      return res
        .status(200)
        .send({ status: true, msg: "user profile updated", data: updatedData });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "userid does not exist" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports.updateUser = updateUser;
