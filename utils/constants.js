// const NOT_FOUND = {"statusCode":404, name: "NotFoundError"},
// const SERVER_ERROR = {"statusCode":500, name: "ServerError"},
// const BAD_REQUEST = {"statusCode":400, name: "CastError"},
// const FORBIDDEN = {"statusCode":403, name: "NotAllowedError"},
// const UNAUTHORIZED = {"statusCode":401,name: "AuthorizationError"},
// const CONFLICT = {"statusCode":409, name: "AlreadyExistsError"}

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'NotFoundError';
//     this.statusCode = NOT_FOUND;
//   }
// }

// class ServerError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'ServerError';
//     this.statusCode = SERVER_ERROR;
//   }
// }

// class CastError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'CastError';
//     this.statusCode = BAD_REQUEST;
//   }
// }

// class ConflictError extends Error {
//   constructor(message){
//     super(message);
//     this.name = "Conflict";
//     this.statusCode = CONFLICT;
//   }
// }

// class AuthorizationError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'AuthorizationError';
//     this.statusCode = UNAUTHORIZED;
//   }
// }

// class NotAllowedError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'NotAllowedError';
//     this.statusCode = FORBIDDEN;
//   }
// }

// class AlreadyExistsError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'AlreadyExistsError';
//     this.statusCode = CONFLICT;
//   }
// }

// const ERRORS = {
//   NotFoundError,
//   ServerError,
//   CastError,
//   AuthorizationError,
//   NotAllowedError,
//   AlreadyExistsError,
//   ConflictError
// };

module.exports = {
  NOT_FOUND: {"statusCode":404, name: "NotFoundError"},
  SERVER_ERROR:  {"statusCode":500, name: "ServerError"},
  BAD_REQUEST: {"statusCode":400, name: "CastError"},
  FORBIDDEN: {"statusCode":403, name: "NotAllowedError"},
  UNAUTHORIZED:  {"statusCode":401,name: "AuthorizationError"},
  CONFLICT:  {"statusCode":409, name: "AlreadyExistsError"}
};