const Client = require('../models/client');

module.exports = async () => {
  const client = [
    {
      fullName: 'حسان النجار',
      email: 'hassan@gmail.com',
      password: '$2b$10$x4DEJ5nMKgowH6F554uUJ.TKOVjIPQzRjXg2SOmDMeb6chafCJ3u6',
      avatar:
        'https://cdn.shopify.com/s/files/1/0074/5432/6862/files/mongoose-envoy-0063-tested_grande.jpg?v=1585927855',
      mobileNumber: '0599875794',
      bankAccounts: [
        {
          bankName: 'بنك فلسطين',
          accountNumber: 7895648237,
          balance: [
            { type: 'USD', total: 5000 },
            { type: 'ILS', total: 300 },
          ],
        },
        {
          bankName: 'بنك القدس',
          accountNumber: 798434351,
          balance: [{ type: 'USD', total: 200 }],
        },
      ],
      mainBalance: [
        { type: 'USD', total: 5000 },
        { type: 'ILS', total: 300 },
      ],
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 7895648237,
    },
    {
      fullName: 'محمد فليفل',
      email: 'mm2020@gmail.com',
      password: '$2b$10$gB8D2bI6/X7xTwsSRs5JQe2BvwOLEdMag8dinhfIY4Eu0tIEWVTr2',
      avatar:
        'https://cdn.shopify.com/s/files/1/0074/5432/6862/files/mongoose-envoy-0063-tested_grande.jpg?v=1585927855',
      mobileNumber: '0599875421',
      bankAccounts: [
        {
          bankName: 'بنك فلسطين',
          accountNumber: 7895641237,
          balance: [
            { type: 'USD', total: 5000 },
            { type: 'ILS', total: 300 },
          ],
        },
        {
          bankName: 'بنك القدس',
          accountNumber: 9856438127,
          balance: [{ type: 'USD', total: 1000 }],
        },
      ],
      mainBalance: [{ type: 'USD', total: 1000 }],
      mainBankName: 'بنك القدس',
      mainBankAccount: 9856438127,
    },
    {
      fullName: 'علي الدحدوح',
      email: 'ali@gmail.com',
      password: '$2b$10$x4DEJ5nMKgowH6F554uUJ.TKOVjIPQzRjXg2SOmDMeb6chafCJ3u6',
      avatar:
        'https://cdn.shopify.com/s/files/1/0074/5432/6862/files/mongoose-envoy-0063-tested_grande.jpg?v=1585927855',
      mobileNumber: '0599875471',
      bankAccounts: [
        {
          bankName: 'بنك فلسطين',
          accountNumber: 1785648957,
          balance: [
            { type: 'USD', total: 5000 },
            { type: 'ILS', total: 300 },
          ],
        },
        {
          bankName: 'بنك القدس',
          accountNumber: 7984132412,
          balance: [{ type: 'USD', total: 700 }],
        },
        {
          bankName: 'بنك الإسكان',
          accountNumber: 7813569742,
          balance: [{ type: 'USD', total: 200 }],
        },
      ],
      mainBalance: [{ type: 'USD', total: 200 }],
      mainBankName: 'بنك الإسكان',
      mainBankAccount: 7813569742,
    },
    {
      fullName: 'أحمد صلاح',
      email: 'ahmed@gmail.com',
      password: '$2b$10$gB8D2bI6/X7xTwsSRs5JQe2BvwOLEdMag8dinhfIY4Eu0tIEWVTr2',
      avatar:
        'https://cdn.shopify.com/s/files/1/0074/5432/6862/files/mongoose-envoy-0063-tested_grande.jpg?v=1585927855',
      mobileNumber: '0591875471',
      bankAccounts: [
        {
          bankName: 'بنك فلسطين',
          accountNumber: 7894562894,
          balance: [
            { type: 'USD', total: 1000 },
            { type: 'ILS', total: 9000 },
          ],
        },
        {
          bankName: 'بنك القدس',
          accountNumber: 5246318975,
          balance: [{ type: 'USD', total: 2356 }],
        },
        {
          bankName: 'بنك الإسكان',
          accountNumber: 9245613876,
          balance: [{ type: 'USD', total: 341 }],
        },
      ],
      mainBalance: [
        { type: 'USD', total: 1000 },
        { type: 'ILS', total: 9000 },
      ],
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 7894562894,
    },
  ];
  await Client.create(client);
};
