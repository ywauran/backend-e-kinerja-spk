import Criteria from "../models/CriteriaModel.js";

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
    for (const weightData of dataWeight) {
      const { id, newWeight } = weightData;

      // Update the criteria with the new weight
      await Criteria.update(
        { weight: newWeight },
        {
          where: {
            id: id,
          },
        }
      );
    }

    res.status(200).json({ message: "Criteria updated" });
  } catch (error) {
    console.error("Error updating criteria:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
