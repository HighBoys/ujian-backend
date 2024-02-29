"use strict";
/**ini adalah file utama
 * dimana ada proses menjalankan server backend
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**memanggil library express */
const express_1 = __importDefault(require("express"));
/** buat wadah untuk inisiasi express */
const app = (0, express_1.default)();
/** mendifinisikan port berjalan nya server */
const PORT = 8000;
/** proses pertama untuk handle req */
app.get(`/serena`, (request, response) => {
    /** ini adalah proses handle request dengan
     * url/address: https://localhost:8000/serena
     * method: GET
     */
    /** memberi respon */
    return response.status(200).json({
        message: `Hello Serena anaknya Bu Siane`
    });
});
/** run server */
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
