const client = require('../../../database/models/client');

const getClientById = async (req, res) => {
  try {
    const clintData = await client.findById(req.clientId);
    res.status(200).json({ message: 'Successfully', clintData });
  } catch (error) {
    res.status(400).json({ message: "Client doesn't exist" });
  }
};

module.exports = getClientById;
