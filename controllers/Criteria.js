import Criteria from "../models/CriteriaModel.js";
import EmployeeCriteria from "../models/EmployeeCriteriaModel.js";

export const getCriterias = async (req, res) => {
  try {
    const result = await Criteria.findAll();
    res.status(200).json({ message: "Criterias fetched", result: result });
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};

export const createCriteria = async (req, res) => {
  const { name, weight, type } = req.body;
  try {
    const result = await Criteria.create({
      name: name,
      weight: weight,
      type: type,
    });

    res.status(201).json({ message: "Criteria created", result: result });
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};
export const updateCriteria = async (req, res) => {
  const { dataWeight } = req.body;

  try {
    for (let id = 0; id <= 7; id++) {
      await Criteria.update(
        { weight: dataWeight[id] },
        { where: { id: id + 1 } }
      );
    }

    res.status(200).json({ message: "Criteria updated" });
  } catch (error) {
    console.error("Error updating criteria:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
