const client = require('../../../database/models/client');

const getClientById = async (req, res) => {
  try {
    const clientData = await client.findById(res.clientId);
    res.status(200).json({ message: 'Success', clientData });
  } catch (error) {
    res.status(400).json({ message: "Client doesn't exist" });
  }
};

module.exports = getClientById;
