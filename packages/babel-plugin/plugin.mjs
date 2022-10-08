const pipeModules = ["@fp-ts/core/Function"];

export default function plugin({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        const callee = path.node.callee;
        if (t.isIdentifier(callee) && callee.name === "pipe") {
          const binding = path.scope.getBinding("pipe").path.parent;
          if (
            t.isImportDeclaration(binding) &&
            pipeModules.includes(binding.source.value)
          ) {
            const args = path.node.arguments;
            let newCall = args[0];
            for (let i = 1; i < args.length; i++) {
              newCall = t.callExpression(args[i], [newCall]);
            }
            path.replaceWith(newCall);
          }
        }
      },
    },
  };
}
