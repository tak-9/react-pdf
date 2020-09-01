const pdf = require('html-pdf');
const fs = require("fs");
const path = require("path");

module.exports = function (app) {

    app.get("/api/hello", function (req, res) {
        console.log("GET /api/hello called!");
        res.json({ msg: "hello!" });
    });

    function htmlToPdf(inputFile, outputFile){
        let options = { format: 'A4' };
        return new Promise((resolve, reject) => {
            pdf.create(inputFile, options).toFile(outputFile, function (err, resp) {
                if (err) {
                    reject(err);
                }
                resolve(resp);
            });
        });
    }

    app.get("/api/pdf", function (req, res) {
        console.log("POST /api/pdf called!");
        let inputFileName = fs.readFileSync(__dirname + "/input.html", 'utf8');
        
        let outputFileName;
        if (process.env.NODE_ENV === "production") {
            outputFileName = "/tmp/output.pdf"
        } else {
            outputFileName = path.resolve("./output.pdf");
        } 

        htmlToPdf(inputFileName, outputFileName)
        .then((resp)=>{
            // Send output.pdf
            console.log(resp.filename);
            let data = fs.readFileSync(resp.filename);
            res.contentType("application/pdf");
            res.send(data);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    
    });

}
