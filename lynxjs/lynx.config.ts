import { defineConfig } from "@lynx-js/rspeedy";

import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin";
import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin-canary";

export default defineConfig({
  server: {
    host: "192.168.0.23",
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`;
      },
    }),
    pluginReactLynx(),
  ],
  // environments: {
  //   web: {
  //     output: {
  //       assetPrefix: "/",
  //     },
  //   },
  //   lynx: {},
  // },
});
