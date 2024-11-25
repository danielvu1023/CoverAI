// import { PDFDocument } from "pdf-lib";

// Sample logic for PDF parsing

import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
const pdfUrl = "https://pdfobject.com/pdf/sample.pdf";
console.log("content ran");
async function fetchDataFromPdf() {
  const { data: formPdfBytes } = await axios.get(pdfUrl, {
    responseType: "arraybuffer",
  });
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();
  console.log("form", form);
}
// fetchDataFromPdf();

async function getPDFDetails() {
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  console.log(`PDF loaded. Number of pages: ${pdf.numPages}`);

  const extractedText = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join("-");
    extractedText.push(pageText);
    console.log(`Page ${i} text: ${pageText}`);
  }
}

getPDFDetails();
