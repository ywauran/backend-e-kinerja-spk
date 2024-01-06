import Employee from "../models/EmployeeModel.js";
import EmployeeCriteria from "../models/EmployeeCriteriaModel.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ["uuid", "name", "email", "nip", "position", "id"],
      include: {
        model: EmployeeCriteria,
      },
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmployeesName = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ["name"],
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      attributes: ["uuid", "name", "email", "nip", "position"],
      include: {
        model: EmployeeCriteria,
      },
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const { name, email, nip, position } = req.body;

  try {
    const result = await Employee.create({
      name,
      email,
      nip,
      position,
    });

    await EmployeeCriteria.create({
      employeeId: result.id,
    });
    res.status(201).json({ message: "Karyawan Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!employee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    const { name, email, nip, position } = req.body;

    await Employee.update(
      {
        name,
        email,
        nip,
        position,
      },
      {
        where: {
          id: employee.id,
        },
      }
    );

    res.status(200).json({ message: "Karyawan Berhasil Diperbarui" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployeeCriteria = async (req, res) => {
  const {
    effectiveness,
    efficiency,
    innovation,
    collaboration,
    speed,
    responsibility,
    compliance,
  } = req.body;

  const { employeeId } = req.params;
  try {
    const employeeCriteria = await EmployeeCriteria.findOne({
      where: {
        employeeId,
      },
    });

    if (employeeCriteria) {
      await employeeCriteria.update(
        {
          effectiveness,
          efficiency,
          innovation,
          collaboration,
          speed,
          responsibility,
          compliance,
        },
        {
          where: {
            employeeId: employeeId,
          },
        }
      );
    }

    return res
      .status(200)
      .json({ message: "Employee criteria updated successfully" });
  } catch (error) {
    console.error("Error updating employee criteria:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEmployeeCriteriaByEmployeeId = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const employeeCriteria = await EmployeeCriteria.findOne({
      where: {
        employeeId: employeeId,
      },
    });
    return res
      .status(200)
      .json({ message: "Berhasil", result: employeeCriteria });
  } catch (error) {
    console.error("Error getting employee criteria:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
