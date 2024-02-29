import { PrismaClient } from "@prisma/client"
import { captureRejectionSymbol } from "events"
import { Request, Response } from "express"

/** create an object of Prisma */
const prisma = new PrismaClient()


const createRent = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const carID = Number(request.body.carID)
        const nama_penyewa = request.body.nama_penyewa
        const bookdate = new Date(request.body.bookdate).toISOString()
        const lama_sewa = Number(request.body.lama_sewa)

        const car = await prisma.car.findFirst({ where: { carID: carID } })
        if (!car) {
            return response.status(400).json({
                status: false,
                message: `Data car not found`
            })
        }
        const total_bayar = car.harga_perhari * lama_sewa

        /** insert to seats table using prisma */
        const newData = await prisma.rent.create({
            data: {
                carID: carID,
                nama_penyewa: nama_penyewa,
                bookdate: bookdate,
                lama_sewa: lama_sewa,
                total_bayar

            }
        })

        return response.status(200).json({
            status: true,
            message: `Rent has been created`,
            data: newData
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/** create fuction to READ tickets */
const readRent = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || "";

        const dataRent = await prisma.rent.findMany({
            take: qty, // mendefisinikan jmlh data yang diambil
            skip: (page - 1) * qty,
            where: {
                OR: [
                    { nama_penyewa: { contains: keyword } }
                ]
            },
            orderBy: { nama_penyewa: "asc" }
        })
        return response.status(200).json({
            status: true,
            message: `Rent has been loaded`,
            data: dataRent
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const updateRent = async (request: Request, response: Response) => {
    try {
        /** read id that sent from URL */
        const id = Number(request.params.id)
        /** read data perubahan */
        const carID = Number(request.body.carID)
        const nama_penyewa = request.body.nama_penyewa
        const bookdate = new Date(request.body.bookdate).toISOString()
        const lama_sewa = Number(request.body.lama_sewa)

        /** make sure that the data exists */
        const findRent = await prisma.rent.findFirst({ where: { carID: carID } })
        if (!findRent) {
            /** give a response when ticket not found */
            return response.status(400).json({
                status: false,
                message: `Data rent not found`
            })
        }
        
        const car = await prisma.car.findFirst({ where: { carID: carID } })
        if (!car) {
            return response.status(400).json({
                status: false,
                message: `Data car not found`
            })
        }
        const total_bayar = car.harga_perhari * lama_sewa

        const dataRent = await prisma.rent.update({
            where: { rentID: id },
            data: {
                carID: carID || findRent.carID,
                nama_penyewa: nama_penyewa || findRent.nama_penyewa,
                bookdate: bookdate || findRent.bookdate,
                lama_sewa: lama_sewa || findRent.lama_sewa,
                total_bayar: total_bayar || findRent.total_bayar
            }
        })

        return response.status(200).json({
            status: true,
            message: 'Data rent has been updated',
            data: dataRent
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const deleteRent = async (request: Request, response: Response) => {
    try {
        /** read id from URL */
        const id = Number(request.params.id)

        /** make sure that the data exists */
        const findRent = await prisma.rent.findFirst({ where: { rentID: id } })
        if (!findRent) {
            /** give a response when ticket not found */
            return response.status(400).json({
                status: false,
                message: `Data rent not found`
            })
        }

        /** execute for delete ticket */
        const dataRent = await prisma.rent.delete({ where: { rentID: id } })

        return response.status(200).json({
            status: true,
            message: `Data rent has been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createRent, readRent, updateRent, deleteRent };