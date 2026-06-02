import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    ignores: ["templates/**", ".next/**", ".history/**", "node_modules/**"]
  },
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "react/no-children-prop": "off",
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["*/templates/*", "templates/*", "../templates/*", "../../templates/*"],
              message:
                "templates/ is the design playground and must not be imported from src/. Promote per docs/component-checklist.md."
            }
          ]
        }
      ]
    }
  }
];
