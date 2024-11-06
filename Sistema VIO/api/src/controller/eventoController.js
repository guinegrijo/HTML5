const connect = require("../db/connect");

module.exports = class eventoController {
  static async createEvento(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    // Validação
    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `INSERT INTO evento (nome, descricao, data_hora, local, fk_id_organizador) VALUES (?, ?, ?, ?, ?)`;
    const values = [nome, descricao, data_hora, local, fk_id_organizador];

    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar evento" });
        }
        return res.status(201).json({ message: "Evento criado com sucesso!" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar o evento" });
    }
  }

  static async getAllEventos(req, res) {
    const query = `SELECT * FROM evento`;

    try {
      connect.query(query, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao buscar evento" });
        }
        return res
          .status(200)
          .json({ message: "Evento listados com sucesso", events: results });
      });
    } catch (error) {
      console.log("Error ao executar a consulta");
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async updateEvento(req, res) {
    const { id_evento, nome, descricao, data_hora, local, fk_id_organizador } =
      req.body;

    // Validação
    if (
      !id_evento ||
      !nome ||
      !descricao ||
      !data_hora ||
      !local ||
      !fk_id_organizador
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `UPDATE evento SET nome = ?, descricao = ?, data_hora = ?, local = ?, fk_id_organizador = ? WHERE id_evento = ?`;
    const values = [
      nome,
      descricao,
      data_hora,
      local,
      fk_id_organizador,
      id_evento,
    ];

    try {
        connect.query(query, values, (err,results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Erro ao atualizar evento" });
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({error: "Evento não encontrado"})
          }
          return res.status(200).json({ message: "Evento atualizado com sucesso!" });
        })
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar o evento" });
      }
  }
};
