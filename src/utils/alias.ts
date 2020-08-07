import path from "path";
import moduleAlias from "module-alias";
export default () => {
  moduleAlias.addAliases({
    "@": path.resolve(__dirname, "../")
  });
};
