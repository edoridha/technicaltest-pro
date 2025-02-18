const { generateTokenMember, generateTokenAdmin } = require("../helpers/jwt");
const { Admin, Member } = require("../models");
const bcrypt = require("bcrypt");

class Controller {
  static async getAdmin(req, res) {
    try {
      const admins = await Admin.findAll();
      res.status(200).json({ admins });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async loginAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ where: { username } });
      if (!admin) {
        throw new Error("Username not found");
      }
      if (bcrypt.compareSync(password, admin.password)) {
        const access_token = generateTokenAdmin(admin);
        res.status(200).json({
          status: true,
          statuCode: "OK",
          message: "Success to login",
          access_token,
        });
      } else {
        throw new Error("Wrong password");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createMember(req, res) {
    try {
      const { fullName, email, password, gender, birthDate } = req.body;

      await Member.create({
        fullName,
        email,
        password,
        gender,
        birthday: birthDate,
      });

      res.status(201).json({
        status: true,
        statuCode: "Created",
        message: "Successfully create user",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async memberLogin(req, res) {
    try {
      const { email, password } = req.body;
      const member = await Member.findOne({ where: { email } });
      if (!member) {
        throw new Error("Email not found");
      }
      if (bcrypt.compareSync(password, member.password)) {
        const access_token = generateTokenMember(member);
        res.status(200).json({
          status: true,
          statuCode: "OK",
          message: "Success to login",
          access_token,
        });
      } else {
        throw new Error("Wrong password");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async memberList(req, res) {
    try {
      const { page, limit, sortBy, sortOrder } = req.query;

      const options = {
        limit: Number(limit),
        offset: Number(page) * Number(limit),
        where: {status: true},
        order: [],
      };

      if (sortBy && sortOrder && sortBy !== "null" && sortOrder !== "null") {
        const sortFields = sortBy.split(",");
        const sortOrders = sortOrder.split(",");
        for (let i = 0; i < sortFields.length; i++) {
          options.order.push([sortFields[i], sortOrders[i]]);
        }
      }

      const members = await Member.findAll(options);

      const totalItem = await Member.count({ where: options.where });

      const startItem = Number(page) * Number(limit) + 1;
      const endItem = Math.min(startItem + members.length - 1, totalItem);

      const pagination = {
        currentPage: parseInt(page, 10),
        totalItem,
        startItem,
        endItem,
      };
      res.status(200).json({
        status: true,
        message: "Successfully retrieved Member list",
        statusCode: "OK",
        response: members,
        pagination,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const { id } = req.user;
      const member = await Member.findByPk(id);
      if (!member) {
        throw new Error("Member not found");
      }

      res.status(200).json({
        status: true,
        statusCode: "OK",
        message: "Successfully retrieved user data",
        response: member,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: error.message });
    }
  }

  static async getMemberById(req, res) {
    try {
      const { id } = req.params;
      const member = await Member.findByPk(id);
      if (!member) {
        throw new Error("Member not found");
      }
      res.status(200).json({
        status: true,
        statusCode: "OK",
        message: "Successfully retrieved user data",
        response: member,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateMember(req, res) {
    try {
      
      const { id } = req.params;
      const { fullName, email, birthday, gender } = req.body;

      const member = await Member.findByPk(id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      member.fullName = fullName || member.fullName;
      member.email = email || member.email;
      member.birthday = birthday || member.birthday;
      member.gender = gender || member.gender;

      await member.save();

      res.status(200).json({
        status: true,
        statusCode: "OK",
        message: "Successfully updated member data",
        response: member,
      });
    } catch (error) {      
      res.status(500).json({ message: error.message });
    }
  }

  static async updateStatus(req, res){
    try {
      const { id } = req.params;
      const member = await Member.findByPk(id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      member.status = !member.status;
      await member.save();
      res.status(200).json({
        status: true,
        statusCode: "OK",
        message: "Successfully updated member status",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = Controller;
