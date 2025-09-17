// <define:__ROUTES__>
var define_ROUTES_default = { version: 1, include: ["/*"], exclude: ["/DEPLOYMENT.md", "/LICENSE", "/README.md", "/_worker.js.map", "/extract_html.py", "/index.html", "/rag_advanced.py", "/rag_example_formatted.py", "/rag_index.html", "/rag_pure_python.html", "/rag_pyodide_demo.html", "/rag_web_demo.html", "/seminar_yandex.html", "/static/*", "/vector_databases_guide.html"] };

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/home/user/webapp/.wrangler/tmp/pages-wng9yo/bundledWorker-0.5392857642760269.mjs";
import { isRoutingRuleMatch } from "/home/user/webapp/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/home/user/webapp/.wrangler/tmp/pages-wng9yo/bundledWorker-0.5392857642760269.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=jukkn3z6zod.js.map
