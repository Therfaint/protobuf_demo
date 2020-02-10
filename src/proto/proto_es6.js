/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/light";

const $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  hellopackage: {
    nested: {
      helloReq: {
        fields: {
          name: {
            type: "string",
            id: 0
          }
        }
      },
      helloRes: {
        fields: {
          hello: {
            type: "string",
            id: 0
          }
        }
      }
    }
  }
});

export { $root as default };
