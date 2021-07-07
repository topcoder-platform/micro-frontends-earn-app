/**
 * Configure all routes for express app
 */

const _ = require("lodash");
const config = require("config");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const helper = require("./common/helper");
const errors = require("./common/errors");
const routes = require("./routes");
const authenticator = require("tc-core-library-js").middleware.jwtAuthenticator;

/**
 * Configure all routes for express app
 * @param app the express app
 */
module.exports = (app) => {
  app.use(express.json());
  app.use(
    cors({
      // Allow browsers access pagination data in headers
      exposedHeaders: [
        "X-Page",
        "X-Per-Page",
        "X-Total",
        "X-Total-Pages",
        "X-Prev-Page",
        "X-Next-Page",
      ],
    })
  );
  app.use(
    fileUpload({
      limits: {
        fields: 20,
        fileSize: config.MAX_ALLOWED_FILE_SIZE_MB * 1024 * 1024,
        files: 1,
      },
      debug: config.get("LOG_LEVEL") === "debug",
    })
  );
  // intercept the response body from jwtAuthenticator
  app.use(helper.interceptor);
  // Load all routes
  _.each(routes, (verbs, path) => {
    _.each(verbs, (def, verb) => {
      const controllerPath = `./controllers/${def.controller}`;
      const method = require(controllerPath)[def.method];
      if (!method) {
        throw new Error(`${def.method} is undefined`);
      }

      const actions = [];
      actions.push((req, res, next) => {
        req.signature = `${def.controller}#${def.method}`;
        next();
      });

      // add Authenticator check if route has auth
      if (def.auth) {
        actions.push((req, res, next) => {
          authenticator(_.pick(config, ["AUTH_SECRET", "VALID_ISSUERS"]))(
            req,
            res,
            next
          );
        });

        actions.push((req, res, next) => {
          if (req.authUser.isMachine) {
            // M2M
            if (
              !req.authUser.scopes ||
              !helper.checkIfExists(def.scopes, req.authUser.scopes)
            ) {
              next(
                new errors.ForbiddenError(
                  "You are not allowed to perform this action!"
                )
              );
            } else {
              req.authUser.userId = config.m2m.M2M_AUDIT_USER_ID;
              req.authUser.handle = config.m2m.M2M_AUDIT_HANDLE;
              next();
            }
          } else {
            req.authUser.jwtToken = req.headers.authorization;
            next();
          }
        });
      }

      actions.push(method);
      const fullPath = config.get("API_BASE_PATH") + path;
      app[verb](fullPath, helper.autoWrapExpress(actions));
    });
  });
  // handle api errors
  app.use(helper.errorHandler);
};
