const { Branch, Booking } = require("../sequelize");

const createBranch = async (req, res) => {
  const { openHour, closeHour, adress, coordinateX, coordinateY } = req.body;

  try {
    await Branch.create({
      openHour,
      closeHour,
      adress,
      coordinateX,
      coordinateY,
    });

    return res.status(201).json({ message: "Sucursal creada con éxito." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "No se pudo crear la sucursal" });
  }
};

const getAllBranches = async (req, res) => {
  try {
    const bdBranches = await Branch.findAll({
      include: [
        {
          model: Booking,
          through: "branch_booking",
        },
      ],
    });

    const parseBranches = [];
    bdBranches.map((branch) => {
      parseBranches.push({
        bookings: branch.Bookings,
        id: branch.id,
        adress: branch.adress,
        coordinates: [branch.coordinateX, branch.coordinateY],
      });
    });

    return res.status(200).json({ branches: parseBranches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getBranchById = async (req, res) => {
  const { branchId } = req.params;
  console.log(branchId);
  try {
    const branch = await Branch.findByPk(branchId);

    if (!branch) {
      return res.status(404).json({ message: "Sucursal no encontrado" });
    }

    return res.status(200).json(branch);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateBranchById = async (req, res) => {
  const { branchId } = req.params;
  const { openHour, closeHour, adress } = req.body;

  try {
    const branch = await Branch.findByPk(branchId);

    if (!branch) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (openHour) {
      branch.openHour = openHour;
    }
    if (closeHour) {
      branch.closeHour = closeHour;
    }
    if (adress) {
      branch.adress = adress;
    }

    await branch.save();

    return res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente", branch });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranchById,
};
