import express, { Express } from "express";
import { createAdmin,readAdmin,updateAdmin,deleteAdmin, login } from "../controler/adminControler";
import { verifyAdmin } from "../middleware/verifyAdmin";

const app = express()

app.use(express.json())
app.get(`/admin`, verifyAdmin, readAdmin)
app.post(`/admin`, verifyAdmin,  createAdmin)
app.put(`/admin/:adminID`, verifyAdmin,  updateAdmin)
app.delete(`/admin/:adminID`, verifyAdmin,  deleteAdmin)
app.post(`/admin/login`, login)

export default app