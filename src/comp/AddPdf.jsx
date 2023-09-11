import React, { useState } from 'react';
import { PDFDocument, PDFSignature } from 'pdf-lib';

const AddPdf = () => {
  const [pdfData, setPdfData] = useState(null);
  const [signature, setSignature] = useState('');

  const handleSubmit = async (e) => {
    setSignature('');
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const fileData = await file.arrayBuffer();
    console.log("NAZWA",file.name)
    setPdfData(fileData);
  };

  const readPDFData = async (e) => {
    e.preventDefault();
    console.log(pdfData);
    try {
      if (!pdfData) {
        console.error('Nie wybrano pliku PDF');
        return;
      }
      const pdfDoc = await PDFDocument.load(pdfData);
      console.log(pdfDoc);

      const form = pdfDoc.getForm();
      console.log(form);

     const sig = PDFSignature.acroField
    console.log('poka sign', sig)

      const fields = form.getFields();
      console.log('Fields:', fields);
    if (!fields.length>0) {
      setSignature('Brak podpisu')
      console.log('jest false',fields)
    }

      fields.forEach((field) => {
        const name = field.getName();
        setSignature("Ma podpis: "+name)
        
        console.log('Field name:', name);
      });
      
    } catch (error) {
      console.error('Błąd odczytu pliku PDF:', error);
    }
  };

  return (
    <>
    <form>
      <input type="file" onChange={handleSubmit} />
      <button onClick={readPDFData}>ok</button>
    </form>
    <h2>{signature}</h2>
    </>
  );
};

export default AddPdf;
