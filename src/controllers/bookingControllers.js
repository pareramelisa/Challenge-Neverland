const { Booking, User, Branch } = require("../sequelize");

const createBooking = async (req, res) => {
  const { date, userId, branchId } = req.body;

  try {
    const newBooking = await Booking.create({
      date,
    });

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
  
    if (user) {
      await newBooking.addUser(user);
    }

    let branch = await Branch.findOne({
      where: {
        id: branchId,
      },
    });
    await newBooking.addBranch(branch);

    return res.status(201).json(newBooking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const postActivities = async (req, res) => {
  try {
    const { name, difficult, duration, season, countries } = req.body

    console.log(req.body)

    if (!name || !difficult || !duration || !season || !countries) {
      return res
        .status(400)
        .json({
          message:
            "Todos los campos son obligatorios y debes relacionar al menos un país.",
        });
    }

    const newActivity = await Activity.create({
      name,
      difficult,
      duration,
      season,
    });

    countries.forEach(async (country) => {
      let activityCountry = await Country.findOne({
        where: {
          id: country,
        },
      });
      await newActivity.addCountry(activityCountry);
    });

    res.status(201).json({ message: "Actividad turística creada con éxito." })

  } catch (error) {
    console.error("Error al crear actividad turística:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getBookingById = async (req, res) => {
  const { bookingId } = req.params;
 
  try {
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Reserva no encontrado" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteBookingById = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrado' });
    }

    await booking.destroy();
    return res.status(200).json({ message: 'Reserva eliminada exitosamente' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

const updateBookingById = async (req, res) => {
  const { bookingId } = req.params;
  const { hour, date } = req.body;

  try {
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrado' });
    }

    if (hour) {
      booking.hour = hour;
    }
    if (date) {
      booking.date = date;
    }

    await booking.save();

    return res.status(200).json({ message: 'Reserva actualizado exitosamente', booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    deleteBookingById,
    updateBookingById
}
