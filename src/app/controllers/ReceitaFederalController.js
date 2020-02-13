class ReceitaFederalController {
  async index(req, res) {
    return res.json({ Message: 'Ok' });
  }
}

export default new ReceitaFederalController();
