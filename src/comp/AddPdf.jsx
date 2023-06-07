import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const AddPdf = () => {
  const [pdfData, setPdfData] = useState(null);
  const [signature, setSignature] = useState('')


  const handleSubmit = async (e) => {

    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const fileData = await file.arrayBuffer();
    setPdfData(fileData);

  };

  const readPDFData = async (e) => {



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

    } catch (error) {
      console.error('Błąd odczytu pliku PDF:', error);
    }
  }


  return (

    <form>
      <input type="file" onChange={handleSubmit} />
      <button onClick={readPDFData}>ok</button>
    </form>

  );
};

export default AddPdf;
