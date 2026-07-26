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
  extendedData?: { customFields: Array<{ name: string; value: string }> };
  onSuccess?: (resp: unknown) => void;
  onError?: (resp: unknown) => void;
  onClose?: () => void;
}

export interface PayWithRemitaArgs {
  rrr: string;
  merchantId: string;
  orderId: string;
  onSuccess?: (resp: unknown) => void;
  onError?: (resp: unknown) => void;
  onClose?: () => void;
}

function waitForEngine(timeoutMs = 5000): Promise<NonNullable<Window["RmPaymentEngine"]>> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
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
  const engine = await waitForEngine();
  console.log("[Remita] init", { rrr: args.rrr, merchantId: args.merchantId, orderId: args.orderId });
  const instance = engine.init({
    key: args.merchantId,
    processRrr: true,
    transactionId: args.orderId,
    extendedData: { customFields: [{ name: "rrr", value: args.rrr }] },
    onSuccess: (r) => {
      console.log("[Remita] onSuccess", r);
      args.onSuccess?.(r);
    },
    onError: (r) => {
      console.error("[Remita] onError", r);
      args.onError?.(r);
    },
    onClose: () => {
      console.log("[Remita] onClose");
      args.onClose?.();
    },
  });
  instance.showPaymentWidget();
}
