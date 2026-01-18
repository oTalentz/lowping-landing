import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Allow any type, but warn about it
      "semi": ["error", "never"], // Disallow semicolons at the end of statements
      "@typescript-eslint/no-unused-vars": [ // Disallow unused variables
        "error",
        {
          argsIgnorePattern: "^_", // Ignore unused function arguments that start with an underscore
          varsIgnorePattern: "^_" // Ignore unused variables that start with an underscore
        }
      ]
    }
  }
]

export default eslintConfig