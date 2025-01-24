const Reservation = require('../model/Reservation');
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");

/**
 * @desc    Create a new reservation
 * @route   POST /api/reservations
 * @access  Public (Adjust if you have authentication)
 */
exports.createReservation = async (req, res) => {
  try {
    const { name,phone, email, message, date, time } = req.body;

    // Basic validation (You can add more as needed)
    if (!name || !email || !phone ||  !message || !date || !time) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Convert date from front-end if needed, front-end likely sends a valid date string
    // Ensure `new Date(date)` is valid or date is already in proper format.

    const reservation = new Reservation({
      name,
      email,
      phone,
      
      message,
      date: new Date(date),
      time
    });

    const savedReservation = await reservation.save();

    return res.status(201).json({
      success: true,
      data: savedReservation,
      message: 'Reservation created successfully!'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server error, please try again later.'
    });
  }
};


/**
 * @desc    Get all reservations
 * @route   GET /api/reservations
 * @access  Public
 */
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 }); 
    // sort by creation date descending if you like. You can remove or adjust as needed.
  
    return res.status(200).json({
      success: true,
      count: reservations.length,
       reservations
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server error, please try again later.'
    });
  }
};

exports.updateReservation = asyncWrapper(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, email, service, message, date, time } = req.body;

    // Validate the required fields
    if (!name || !phone || !email || !service || !message || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let booking = await Reservation.findById(id);

    if (!booking) {
      return next(new ErrorHandler("Booking not found", 404));
    }

    // Update the booking details
    booking.name = name;
    booking.phone = phone;
    booking.email = email;
    booking.service = service;
    booking.message = message;
    booking.date = new Date(date); // Ensure the date is properly formatted
    booking.time = time;

    const updatedBooking = await Reservation.save();

    return res.status(200).json({
      success: true,
      data: updatedBooking,
      message: "Booking updated successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error, please try again later." });
  }
});


exports.deleteReservation = asyncWrapper(async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await Reservation.findById(id);

    if (!booking) {
      return next(new ErrorHandler("Booking not found", 404));
    }

    await booking.remove();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error, please try again later." });
  }
});
