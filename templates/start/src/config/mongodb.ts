export const development = {
  uri: 'mongodb://localhost/helloWorld',
  options: {
    useMongoClient: true,
  },
  promise: global.Promise,
};

export const production = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost/helloWorld',
  options: {
    useMongoClient: true,
  },
  promise: global.Promise,
};
