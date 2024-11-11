const express = require("express");
const path = require("path");
const upload = require("./middlewares/upload");

const app = express();


// publico: localhost:3000/uploads/<arquivo>
const uploadDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadDir));

// protegido: localhost:3000/uploadas/<arquivo>
app.get('/imagens/:filename', (req, res) => {
    const { filename } = req.params;

    const filePath = path.join(__dirname, "uploads", filename);

    return res.sendFile(filePath, (err) => {
        if (err) {
            return res
            .status(404)
            .json({ok: false, message: "foto nao encontrada" });
            }
        });
    });

app.post('/profile', upload.single('avatar'), 
(req, res) => {
return res.json(req.file);
});

app.post("/photos/upload", upload.array("photos", 2), 
(req, res) => {
return res.json(req.files);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);       
});