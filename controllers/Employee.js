import Employee from "../models/EmployeeModel.js";
import argon2 from "argon2";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ["uuid", "name", "email", "nip", "position"],
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
    await Employee.create({
      name,
      email,
      nip,
      position,
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
