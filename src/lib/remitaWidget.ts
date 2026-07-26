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

export function payWithRemita(args: PayWithRemitaArgs): void {
  const engine = window.RmPaymentEngine;
  if (!engine) {
    throw new Error(
      "Remita payment widget is not available yet. Please refresh the page and try again."
    );
  }
  const instance = engine.init({
    key: args.merchantId,
    processRrr: true,
    transactionId: args.orderId,
    extendedData: { customFields: [{ name: "rrr", value: args.rrr }] },
    onSuccess: args.onSuccess,
    onError: args.onError,
    onClose: args.onClose,
  });
  instance.showPaymentWidget();
}
