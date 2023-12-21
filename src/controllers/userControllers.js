const { User, Booking, Branch } = require("../sequelize");

const bcrypt = require("bcrypt");

const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password, birthday, role } = req.body;

    if (!name || !lastName || !email || !password || !birthday) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios.",
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe contener al menos 8 caracteres, letras y números.",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "El correo electrónico ya está en uso.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      birthday,
      role,
    });

    res.status(201).json({ message: "Usuario creado con éxito." });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    return res
      .status(200)
      .json({ message: "¡Inicio de sesión exitoso!", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Booking,
          through: "user_booking",
          include: [
            {
              model: Branch,
              through: "branch_booking",
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();
    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { email, password, name, lastName, birthday } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (name) {
      user.name = name;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (birthday) {
      user.birthday = birthday;
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
};
