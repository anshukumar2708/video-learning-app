const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const ConnectDb = require("./config/db");

const PORT = 8000;


const StartServer = async () => {
    try {
        await ConnectDb();
        app.listen(PORT, () => {
            console.log(`server is running on port http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Server Start Error")
    }
}


StartServer();
