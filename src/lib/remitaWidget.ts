// Thin wrapper around the Remita inline payment widget
// (loaded via <script> in index.html).

declare global {
  interface Window {
    RmPaymentEngine?: {
      init: (opts: RemitaInitOptions) => { showPaymentWidget: () => void };
    };
  }
}

interface RemitaInitOptions {
  key: string;
  processRrr: boolean;
  transactionId: string;
  config?: { host: string };
  extendedData?: { customFields: Array<{ name: string; value: string }> };
  onSuccess?: (resp: unknown) => void;
  onError?: (resp: unknown) => void;
  onClose?: () => void;
}

export interface PayWithRemitaArgs {
  rrr: string;
  publicKey: string;
  orderId: string;
  widgetHost?: string;
  onSuccess?: (resp: unknown) => void;
  onError?: (resp: unknown) => void;
  onClose?: () => void;
}

function loadRemitaScript(host: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const src = `${host.replace(/\/$/, "")}/remita-pay-inline.bundle.js`;
    const existing = Array.from(document.scripts).find((script) => script.src === src);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Remita payment widget failed to load. Check your connection and try again."));
    document.head.appendChild(script);
  });
}

function isScriptLoadedForHost(host: string): boolean {
  const src = `${host.replace(/\/$/, "")}/remita-pay-inline.bundle.js`;
  return Array.from(document.scripts).some((script) => script.src === src);
}

function waitForEngine(widgetHost?: string, timeoutMs = 8000): Promise<NonNullable<Window["RmPaymentEngine"]>> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    let scriptLoadStarted = false;
    const tick = async () => {
      if (widgetHost && !scriptLoadStarted) {
        const targetScriptLoaded = isScriptLoadedForHost(widgetHost);
        if (!targetScriptLoaded || !window.RmPaymentEngine) {
          scriptLoadStarted = true;
          loadRemitaScript(widgetHost).then(tick).catch(reject);
          return;
        }
      }
      if (window.RmPaymentEngine) return resolve(window.RmPaymentEngine);
      if (Date.now() - start > timeoutMs) {
        return reject(new Error("Remita payment widget failed to load. Check your connection and try again."));
      }
      setTimeout(tick, 100);
    };
    tick();
  });
}

export async function payWithRemita(args: PayWithRemitaArgs): Promise<void> {
  const engine = await waitForEngine(args.widgetHost);
  let terminalEvent: "success" | "error" | null = null;
  console.log("[Remita] init", { rrr: args.rrr, orderId: args.orderId, widgetHost: args.widgetHost });
  const instance = engine.init({
    key: args.publicKey,
    processRrr: true,
    transactionId: args.orderId,
    config: args.widgetHost ? { host: args.widgetHost.replace(/\/$/, "") } : undefined,
    extendedData: { customFields: [{ name: "rrr", value: args.rrr }] },
    onSuccess: (r) => {
      terminalEvent = "success";
      console.log("[Remita] onSuccess", r);
      args.onSuccess?.(r);
    },
    onError: (r) => {
      terminalEvent = "error";
      console.error("[Remita] onError", r);
      args.onError?.(r);
    },
    onClose: () => {
      console.log("[Remita] onClose");
      if (terminalEvent === "error" || terminalEvent === "success") {
        return;
      }
      args.onClose?.();
    },
  });
  instance.showPaymentWidget();
}
