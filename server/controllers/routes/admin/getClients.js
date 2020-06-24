const Client = require('../../../database/models/client');

const getClients = async (req, res) => {
  try {
    const Clients = await Client.find({});
    if (!Clients.length) {
      res.status(200).json({
        status: 'Successfully',
        message: 'No clients existing',
      });
    } else {
      res.status(200).json({
        status: 'Successfully',
        count: Clients.length,
        data: Clients,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = getClients;
