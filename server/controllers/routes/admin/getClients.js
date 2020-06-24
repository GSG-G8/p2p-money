const Client = require('../../../database/models/client');

const getClients = async (req, res) => {
  try {
    const Clients = await Client.find({});
    res.status(200).json({ status: 'Successfully', data: Clients });
  } catch (error) {
    res.status(400).send({ status: 'failed', message: error.message });
  }
};

module.exports = getClients;
