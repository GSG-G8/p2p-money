const mongoose = require('mongoose');

const { Schema } = mongoose;

const pricesSchema = new Schema({
  screenPrice: {
    type: Array,
    required: true,
    default: [],
  },
  bankPrice: {
    type: Array,
    required: true,
    default: [
      {
        from: 'EUR',
        to: 'ILS',
        buy: 3.8323,
        sell: 3.8848,
      },
      {
        from: 'ILS',
        to: 'EUR',
        buy: 0.2609399055397542,
        sell: 0.25741350906095556,
      },
      {
        from: 'EGP',
        to: 'ILS',
        buy: 0.41326202,
        sell: 0.4645426,
      },
      {
        from: 'ILS',
        to: 'EGP',
        buy: 2.419772327493342,
        sell: 2.1526551063347044,
      },
      {
        from: 'USD',
        to: 'ILS',
        buy: 3.41,
        sell: 3.4699999999999998,
      },
      {
        from: 'ILS',
        to: 'USD',
        buy: 0.29325513196480935,
        sell: 0.2881844380403458,
      },
      {
        from: 'JOD',
        to: 'ILS',
        buy: 5.4070800000000006,
        sell: 5.47774,
      },
      {
        from: 'ILS',
        to: 'JOD',
        buy: 0.1849427047500684,
        sell: 0.1825570399471315,
      },
    ],
  },
  tellerPrice: {
    type: Array,
    required: true,
    default: [
      {
        from: 'EUR',
        to: 'ILS',
        buy: 3.8373,
        sell: 3.8798,
      },
      {
        from: 'ILS',
        to: 'EUR',
        buy: 0.2605999009720376,
        sell: 0.2577452446002371,
      },
      {
        from: 'EGP',
        to: 'ILS',
        buy: 0.41826202,
        sell: 0.4595426,
      },
      {
        from: 'ILS',
        to: 'EGP',
        buy: 2.3908458147837566,
        sell: 2.176076820734356,
      },
      {
        from: 'USD',
        to: 'ILS',
        buy: 3.415,
        sell: 3.465,
      },
      {
        from: 'ILS',
        to: 'USD',
        buy: 0.29282576866764276,
        sell: 0.28860028860028863,
      },
      {
        from: 'JOD',
        to: 'ILS',
        buy: 5.4120800000000004,
        sell: 5.47274,
      },
      {
        from: 'ILS',
        to: 'JOD',
        buy: 0.18477184372736544,
        sell: 0.1827238275525605,
      },
    ],
  },
  appPrice: {
    type: Array,
    required: true,
    default: [
      {
        from: 'USD',
        to: 'ILS',
        buy: 3.4298,
        sell: 3.4528000000000003,
      },
      {
        from: 'ILS',
        to: 'USD',
        buy: 0.2924147610971402,
        sell: 0.2887836432944438,
      },
      {
        from: 'EUR',
        to: 'ILS',
        buy: 3.8702,
        sell: 3.8951000000000002,
      },
      {
        from: 'ILS',
        to: 'EUR',
        buy: 0.2590539350292731,
        sell: 0.2560753885944022,
      },
      {
        from: 'EGP',
        to: 'ILS',
        buy: 0.42826202,
        sell: 0.4495426,
      },
      {
        from: 'ILS',
        to: 'EGP',
        buy: 2.3908458147837566,
        sell: 2.176076820734356,
      },
      {
        from: 'JOD',
        to: 'ILS',
        buy: 5.42208,
        sell: 5.462739999999999,
      },
      {
        from: 'ILS',
        to: 'JOD',
        buy: 0.18477184372736544,
        sell: 0.1827238275525605,
      },
    ],
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('price', pricesSchema);
