import axios from 'axios';

/**
 * Consulta um CNPJ
 */
async function consultaCNPJ(cnpj) {
  // Limpa o CNPJ para conter somente numeros, removendo traços e pontos
  cnpj = cnpj.replace(/\D/g, '');

  try {
    // Consulta o CNPJ na ReceitaWS
    return await axios.get(
      `https://www.receitaws.com.br/v1/cnpj/${encodeURI(cnpj)}`
    );
  } catch (err) {
    return null;
  }
}

class ReceitaFederalController {
  async index(req, res) {
    const { cnpj } = req.params;

    if (!cnpj) {
      return res.sendStatus(404);
    }

    const result = await consultaCNPJ(cnpj);
    return res.json(result.data);
  }
}

export default new ReceitaFederalController();
