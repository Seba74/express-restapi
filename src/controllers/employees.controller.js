import { pool } from "../db.js";

const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.send(rows);
  } catch (e) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      parseInt(req.params.id),
    ]);
    const employee = rows[0];
    if (!employee) return res.status(404).send("Empleado no encontrado");
    res.json(employee);
  } catch (e) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (e) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "UPDATE employee SET name = ?, salary = ? WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).send("Empleado no encontrado");
    res.json({
      id,
      name,
      salary,
    });
  } catch (e) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const patchEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows <= 0)
      return res.status(404).send("Empleado no encontrado");
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (e) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      parseInt(req.params.id),
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).send("Empleado no encontrado");
    res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  patchEmployee,
  deleteEmployee,
};
