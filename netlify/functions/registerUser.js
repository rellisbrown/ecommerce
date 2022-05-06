const { dbAdmin } = require('./firebaseAdmin');

exports.handler = async (request) => {
  const data = JSON.parse(request.body);

  try {
    const res = await dbAdmin
      .collection('users')
      .doc(data.uid)
      .set(data.userDetails);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User Added' }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error' }),
    };
  }
};
