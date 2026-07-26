const ENDPOINT = "https://lstcjebdvvhpjvsiiquo.supabase.co/functions/v1/track-pageview";

function getOrCreate(key: string, ttlDays?: number) {
  const storage = ttlDays ? localStorage : sessionStorage;
  let v = storage.getItem(key);
  if (!v) {
    v = crypto.randomUUID();
    storage.setItem(key, v);
  }
  return v;
}

export function trackPageview(path?: string) {
  try {
    const payload = {
      site: "conference",
      path: path ?? window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      visitor_id: getOrCreate("nice_visitor_id", 365),
      session_id: getOrCreate("nice_session_id"),
      screen_size: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
    };
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
