module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": 'vue-eslint-parser', // 新增
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        'vue/multi-word-component-names': 'off', // 禁用vue文件名称检查此规则
        "@typescript-eslint/ban-ts-comment": "off", // 关闭"@ts-ignore的检测，请确保你不会用@ts-ignore隐藏逻辑方面或是引入的一些错误 "off" 或 0 - 关闭规则。 "warn" 或 1 - 将规则违反视为警告（不会导致程序退出）。 "errorRouters" 或 2 - 将规则违反视为错误（会导致程序退出）。
        "no-unused-vars": "off", // 完全禁用未使用变量规则
        "vue/no-unused-components": "off", // 当存在定义而未使用的组件时，关闭报错
        "@typescript-eslint/no-explicit-any": "warn", // 提醒使用any类型
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }] // 或者只对 TypeScript 文件调整，允许使用下划线作为未使用参数的前缀

    }
}

