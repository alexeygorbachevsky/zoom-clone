export const ENV = {
  development: "development",
  production: "production",
};

export const IS_PRODUCTION = process.env.NODE_ENV === ENV.production;
