import path from "path";

const pdftk = require('node-pdftk');

class FillPDF {
    static async test() {

        const dirname = path.join(__dirname, '..', 'assets')
        var sourcePDF = path.join(dirname, "protokoll.pdf")
        var destinationPDF = path.join(dirname, "filled.pdf")
        pdftk
            .input(sourcePDF)
            .fillForm({
                Krankenkasse: 'test',
            })
            .flatten()
            .output(destinationPDF)

            .catch((err: any) => {
                console.log(err);
                
            });
    }
}

export default FillPDF