const multer = require("multer");
const nodemailer = require("nodemailer");
const pdfTemplate = require('../document/template');
const htmlToPdf = require('html-pdf');
const asyncWrapper = require("../middleWare/asyncWrapper");




exports.sendInvoiceEmail = asyncWrapper( async (req, res) => {
  const { email, invoiceData } = req.body;


  try {
    // Generate HTML from template
    const html = pdfTemplate(invoiceData);

    // Convert HTML to PDF
    const pdfBuffer = await new Promise((resolve, reject) => {
      htmlToPdf.create(html, {}).toBuffer((err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });

    // Send email with PDF attachment
    // Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user:process.env.TRANSPORTER_USER,
    pass: process.env.TRANSPORTER_PASS,
   
  }
});
    const mailOptions = {
      from: process.env.TRANSPORTER_USER,
      to: email,
      subject: 'Reçu Conserverie Menzah 9',
      text: 'Veuillez consulter votre reçu ci-dessous.',
      attachments: [
        {
          filename: 'reçu.pdf',
          content: pdfBuffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'Invoice sent successfully to ' + email,
      invoiceData, // Include the invoice data in the response
    });
  } catch (error) {
    console.error('Error sending invoice:', error);
    res.status(500).json({ error: 'An error occurred while sending the invoice.' });
  }
});;


exports.getTotalRevenue = asyncWrapper(async (req, res) => {
  try {
    const invoices = await Invoice.find(); // Remplacez par votre modèle d'invoice
    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.totalPrice, 0); // Calcule le total
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    res.status(500).json({ error: "Failed to fetch total revenue" });
  }
});












