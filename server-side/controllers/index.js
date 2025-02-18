const { generateTokenMember, generateTokenAdmin } = require('../helpers/jwt');
const { Admin, Member } = require('../models');
const bcrypt = require('bcrypt');

class Controller {
    static async getAdmin(req, res) {
        try {
            const admins = await Admin.findAll();
            res.status(200).json({admins});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async loginAdmin(req, res) {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ where: { username } });
            if (!admin) {
                throw new Error('Username not found');
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
                throw new Error('Wrong password');
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createMember(req, res) {
        try {
            const { fullName, email, password,gender, birthday } = req.body;

            await Member.create({fullName, email, password,gender, birthday});

            res.status(201).json({
                status: true,
                statuCode: "Created",
                message: "Successfully create user",
              });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async memberLogin(req, res) {
        try {
            const { email, password } = req.body;
            const member = await Member.findOne({ where: { email } });
            if (!member) {
                throw new Error('Email not found');
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
                throw new Error('Wrong password');
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async memberList (req, res) {
        try {
            const { page, limit } = req.query;

            const options = {
                limit: Number(limit),
                offset: (Number(page)) * Number(limit),
                where: {},
              };

              const members = await Member.findAll(options);

              res.status(200).json({
                status: true,
                message: "Successfully retrieved customer list",
                statusCode: "OK",
                response: members
              });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async getProfile(req, res) {
        try {
            const { id } = req.user;
            const member = await Member.findByPk(id);
            if (!member) {
                throw new Error('Member not found');
            }
            res.status(200).json({
                status: true,
                statusCode: "OK",
                message: "Successfully retrieved user data",
                response: member
              });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = Controller;