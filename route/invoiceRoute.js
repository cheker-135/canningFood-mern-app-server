const express = require("express");
const {
 
  sendInvoiceEmail,
  
} = require("../controller/invoiceController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");


const router = express.Router();



// Routes

// Send invoice via email
router.post(
  "/invoices/send-email",
  isAuthentictedUser,
  authorizeRoles("admin"),
 
  sendInvoiceEmail
);



module.exports = router;
