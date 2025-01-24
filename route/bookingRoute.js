const express = require('express');
const router = express.Router();
const { createReservation, getAllReservations,updateReservation,deleteReservation } = require('../controller/reservationController');
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

// POST /api/reservations - Create a new reservation
router.post("/reservations", createReservation);
router.put("/admin/reservation/:id",isAuthentictedUser, authorizeRoles("admin"), updateReservation)
  
router.delete("/admin/reservation/:id",isAuthentictedUser, authorizeRoles("admin"),deleteReservation);
// GET /api/reservations - Get all reservations
router.get("/reservations",isAuthentictedUser, authorizeRoles("admin") ,getAllReservations);

module.exports = router;


