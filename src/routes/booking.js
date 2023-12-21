const bookingRouter = require("express").Router();

const { createBooking, getAllBookings, getBookingById, deleteBookingById, updateBookingById } = require("../controllers/bookingControllers");

bookingRouter.post("/create", createBooking);
bookingRouter.get("/all", getAllBookings);
bookingRouter.get("/:bookingId", getBookingById);
bookingRouter.delete("/delete/:bookingId", deleteBookingById);
bookingRouter.patch("/update/:bookingId", updateBookingById);


module.exports = bookingRouter