import { PrismaClient } from "@prisma/client";
import { Request, Response, request, response } from "express";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();
const createAdmin = async (request: Request, response: Response) => {
  try {
    const adminNama = request.body.adminNama;
    const email = request.body.email;
    const password = md5(request.body.password)

    const newAdmin = await prisma.admin.create({
      data: {
        adminNama: adminNama,
        email: email,
        password: password,
      },
    });

    return response.status(200).json({
      status: true,
      message: `admin has been created`,
      data: newAdmin,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: Error,
    });
  }
};

const readAdmin = async (request: Request, response: Response) => {
  try {
    const dataAmin = await prisma.admin.findMany();
    return response.status(200).json({
      status: true,
      message: `admin has been loaded`,
      data: dataAmin,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const updateAdmin = async (request: Request, response: Response) => {
  try {
    const adminID = Number(request.params.adminID);
    const adminNama = request.body.adminNama;
    const email = request.body.email;
    const password = request.body.password;

    const findAdmin = await prisma.admin.findFirst({
      where: { adminID: Number(adminID) },
    });

    if (!findAdmin) {
      return response.status(400).json({
        status: false,
        message: `data admin not found`,
      });
    }

    const dataAdmin = await prisma.admin.update({
      where: { adminID: Number(adminID) },
      data: {
        adminID: adminID || findAdmin.adminID,
        email: email || findAdmin.email,
        password: password || findAdmin.password,
      },
    });

    return response.status(200).json({
      status: true,
      message: `admin has been update`,
      data: dataAdmin,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const deleteAdmin = async (request: Request, response: Response) => {
  try {
    const adminID = request.params.adminID;

    const findAdmin = await prisma.admin.findFirst({
      where: { adminID: Number(adminID) },
    });

    if (!findAdmin) {
      return response.status(400).json({
        status: false,
        message: `admin not found`,
      });
    }

    const dataAdmin = await prisma.admin.delete({
        where: {adminID: Number(adminID)}
    })

    return response.status(200).json({
        status: true,
        message: `data admin has been delete`,
    })
  } catch (error) {
    return response.status(500).json({
        status: false,
        message: error,
    })
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const email = request.body.email;
    const password = md5(request.body.password);
    const admin = await prisma.admin.findFirst({
      where: {email: email, password: password}
    })
    if (admin) {
      const payload = admin
      const secretkey = "abcd"
      const token = sign(payload, secretkey)
      return response.status(200).json({
        status: true,
        message: "login masuk",
        token : token
      })
    }
    else{
      return response.status(200).json({
        status: false,
        message: "gagal masuk"
      })
    }
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error
    });
  }
}

export { createAdmin, readAdmin, updateAdmin, deleteAdmin, login };
