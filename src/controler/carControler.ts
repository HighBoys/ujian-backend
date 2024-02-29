import { PrismaClient } from "@prisma/client";
import { Request, Response, request } from "express";

const prisma = new PrismaClient();

const createCar = async (request: Request, response: Response) => {
  try {
    const nopol = request.body.nopol;
    const merk_mobil = request.body.merk_mobil;
    const harga_perhari = Number(request.body.harga_perhari);

    const newData = await prisma.car.create({
      data: {
        nopol: nopol,
        merk_mobil: merk_mobil,
        harga_perhari:harga_perhari
      }
    })

    return response.status(200).json({
      status: true,
      message: "Car Has Been Created",
      data: newData
    })
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error
    })
  }
};

const readCar = async (request: Request, response: Response) => {
  try {
    const dataCar = await prisma.car.findMany();
    return response.status(200).json({
      status: true,
      message: "Car Has Been Loaded",
      data: dataCar,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const updateCar = async (request: Request, response: Response) => {
  try {
    const carID = Number(request.params.carID);
    const nopol = request.body.nopol;
    const merk_mobil = request.body.merk_mobil;
    const harga_perhari = Number(request.body.harga_perhari);

    const findCar = await prisma.car.findFirst({
      where: { carID: Number(carID) },
    });

    if (!findCar) {
      return response.status(400).json({
        status: false,
        message: "Data Car Not Found",
      });
    }

    const dataCar = await prisma.car.update({
      where: { carID: Number(carID) },
      data: {
        nopol,
        merk_mobil,
        harga_perhari,
      },
    });

    return response.status(200).json({
      status: true,
      message: "Car Has Been Updated",
      data: dataCar,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const deleteCar = async (request: Request, response: Response) => {
  try {
    const carID = request.params.carID;

    const findCar = await prisma.car.findFirst({
      where: { carID: Number(carID) },
    });
    if (!findCar) {
      return response.status(400).json({
        status: false,
        message: "Data Car Not Found",
      });
    }

    const dataCar = await prisma.car.delete({
      where: { carID: Number(carID) },
    });
    return response.status(200).json({
      status: true,
      message: "Data Car Has Been Deleted",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

export { createCar, readCar, updateCar, deleteCar };
