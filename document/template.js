const fs = require('fs');
const path = require('path');
const __dirname1 = path.resolve();
const logoPath = path.join(__dirname1, 'public', 'logo2.jpeg');
const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });

// Use this in your template:
const imageSrc = `data:image/jpeg;base64,${logoBase64}`;

const pdfTemplate = ({
  name,
  phoneNumber,
  email,
  notes,
  items,
  dueDate,
  issuedDate,
  totalQuantity,
  totalAmount,
  invoiceNumber,
  resteAPayer,
  paye,
}) => {
  const formattedItems = items
    ?.map(
      (item) => `
        <tr>
          <td style="font-size: 10px">${item.itemName}</td>
          <td style="font-size: 10px">${item.quantity}</td>
          <td style="font-size: 10px">${item.unitPrice}</td>
          <td style="font-size: 10px">${(item.quantity * item.unitPrice).toFixed(1)}</td>
        </tr>
      `
    )
    .join('');

  const currency = 'TND'; // Assuming TND for Tunisia, adjust as necessary

  return `
    <!DOCTYPE html>
    <html>
    <head>
     <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
      }
      .invoice-container {
        width: 530px;
        margin: 0 auto;
        border: 1px solid black;
        border-radius: 0.3rem;
        padding: 1rem;
      }
      .invoice-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }
         .mot-recu {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 23px;
        font-family: 'Dancing Script', cursive;
        font-weight: bold;
        color: #333;
         text-align: center;
  padding-bottom: 5px; /* Space between text and line */
  border-bottom: 2px solid #333;
      }
      .invoice-header img {
        width: 100px;
        height: 70px;
        margin-right: 20px;
        border-radius: 0.3rem;
        border: 5px solid white;
      }
      .invoice-header h3, .invoice-header h4 {
        font-family: 'Brush Script MT', cursive;
        margin: 0;
      }
      table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
        font-size: 10px;
      }
      table td, table th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      table tr:nth-child(even){background-color: #f8f8f8;}
      table tr:hover {background-color: #f3f3f3;}
      table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #f2f2f2;
        color: black;
      }
      .custom-border {
        border-width: 2px; 
        border-style: solid;
        border-color: black;
      }
      .custom-border td, .custom-border th {
        border-width: 2px;
      }
    </style>
    </head>
    <body>
    <div class="invoice-container">
      <div class="invoice-header">
     
       <img src="${imageSrc}" alt="Conserverie Menzah 9 logo" />
        <div>
          <h3>Conserverie Menzah 9</h3>
          <h4>Tel: 50 55 80 40</h4>
        </div>
         <span class="mot-recu"> Reçu</span>
      </div>
      
      <table class="custom-border">
        <tbody>
          <tr>
            <td><strong>Nom Client:</strong></td>
            <td>${name || ""}</td>
          </tr>
          <tr>
            <td><strong>Tel:</strong></td>
            <td>${phoneNumber || ""}</td>
          </tr>
          <tr>
            <td><strong>Code commande:</strong></td>
            <td>${invoiceNumber || ""}</td>
          </tr>
          <tr>
            <td><strong>Date de remplissage:</strong></td>
            <td>${new Date(issuedDate).toLocaleDateString() || ""}</td>
          </tr>
          <tr>
            <td><strong>Date de récupération:</strong></td>
            <td>${new Date(dueDate).toLocaleDateString() || ""}</td>
          </tr>
        </tbody>
      </table>
      
      <table class="custom-border">
        <thead>
          <tr>
            <th>Article</th>
            <th>P.U.</th>
            <th>Qté</th>
            <th>P.T.</th>
          </tr>
        </thead>
        <tbody>
          ${formattedItems}
        </tbody>
      </table>

      <table class="custom-border">
        <tbody>
          <tr>
            <td><strong>Prix Total:</strong></td>
            <td>${totalAmount} ${currency}</td>
          </tr>
           <tr>
            <td><strong>Payé:</strong></td>
            <td>${paye} ${currency}</td>
          </tr>
            <tr>
            <td><strong>Reste à payer:</strong></td>
            <td>${resteAPayer} ${currency}</td>
          </tr>
          <tr>
            <td><strong>Note:</strong></td>
            <td>${notes || ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </body>
    </html>`;
};

module.exports = pdfTemplate;