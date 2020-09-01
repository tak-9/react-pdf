const pdf = require('html-pdf');
const fs = require("fs");
const path = require("path");

module.exports = function (app) {

    app.get("/api/hello", function (req, res) {
        console.log("GET /api/hello called!");
        res.json({ msg: "hello!" });
    });

    app.get("/api/pdf", function (req, res) {
        console.log("GET /api/pdf called!");
        let html = fs.readFileSync(__dirname + "/input.html", 'utf8');
        
        let outputFileName;
        if (process.env.NODE_ENV === "production") {
            outputFileName = "/tmp/output.pdf"
        } else {
            outputFileName = path.resolve("./output.pdf");
        } 

        let options = { format: 'A4' };

        pdf.create(html, options).toFile(outputFileName, function (err, resp) {
            if (err) {
                res.status(400).json(err);
                console.log(err);
                return;
            }

            console.log(resp.filename); // { filename: '/app/output.pdf' }            
            // Send output.pdf
            var data = fs.readFileSync(resp.filename);
            res.contentType("application/pdf");
            res.send(data);

            // This works too.
            // const file = fs.createReadStream(resp.filename);
            // res.header('Content-disposition', 'inline; filename=' + resp.filename );
            // res.header('Content-type', 'application/pdf');
            // file.pipe(res);
        });

    });

}
