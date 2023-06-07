import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const AddPdf = () => {
  const [pdfData, setPdfData] = useState(null);

  const handleSubmit = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const fileData = await file.arrayBuffer();
    setPdfData(fileData);

  };

  const readPDFData = async () => {
    console.log(pdfData);
    try {
      if (!pdfData) {
        console.error('Nie wybrano pliku PDF');
        return;
      }
  
      const pdfDoc = await PDFDocument.load(pdfData);
      console.log(pdfDoc)
     
      const form = pdfDoc.getForm()
      console.log(form)

      const fields = form.getFields()
      console.log('Fields:', fields)
      fields.forEach(field => {
        const name = field.getName()
        console.log('Field name:', name)
      })

     // const signature = form.getSignature('Page1.Foo.Signature[0]')
      //console.log(signature)
    } catch (error) {
      console.error('Błąd odczytu pliku PDF:', error);
    }

 /*      const hasSignature = pdfDoc.getSignatureNames().length > 0;
      if (hasSignature) {
        console.log("Podpis", pdfDoc.getSignatureNames())
      }else{
        console.log("brak podpisu")
      }

   
    } */

    /* const hasSignature = pdfDoc.getSignatureNames().length > 0;
    if (hasSignature) {
      console.log('Podpis', pdfDoc.getSignatureNames());
    } else {
      console.log('brak podpisu');
    } */
    /*   for (const file of fileList) {
      const fileData = await readFile(file); // Funkcja do odczytu pliku (np. przy użyciu FileReader lub odpowiednich bibliotek)
  
      // Tworzenie obiektu PDFDocument z danymi pliku PDF
      const pdfDoc = await PDFDocument.load(fileData);
  
      // Sprawdzenie, czy dokument ma podpis elektroniczny
      const hasSignature = pdfDoc.getSignatureNames().length > 0;
      if (hasSignature) {
        console.log("Podpis", pdfDoc.getSignatureNames())
      }else{
        console.log("brak podpisu")
      }
      if (!hasSignature) {
        unsignedPDFs.push(file);
      }
    } */
  }

  return (
    <form>
      <input type="file" onChange={handleSubmit} />
      <button onClick={readPDFData}>ok</button>
    </form>
  );
};

export default AddPdf;
