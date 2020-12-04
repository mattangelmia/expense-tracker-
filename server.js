const express = require('express');
const connectDB = require('./config/db')


const app = express();

connectDB()

app.use(express.json({
    extended: false
}))


app.get('/', (req, res) => {
    res.json({
        message: 'Hello, world'
    })
})

// Routes

app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))
//app.use("/api/income", require("./routes/income"))
//app.use("/api/expense", require("./routes/expense"))

const PORT = porcess.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})