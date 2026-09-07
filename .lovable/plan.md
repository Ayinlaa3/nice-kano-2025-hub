# "I'll Be Attending" Flyer Maker

Turn the new 2026 flyer into a personalised, shareable graphic: a delegate adds their photo and name, sees a finished flyer, then saves or shares it.

## What the delegate sees

1. **Two fields** — full name, and a photo upload (tap to pick, max 5MB, JPG/PNG/WEBP). A small round preview confirms the photo.
2. **Live flyer preview** — the photo is fitted into the gold circle and the name is centred in the dark green bar, in the flyer's bold style, shrinking automatically for long names.
3. **Ready state** — once both are filled, a headline reads "Your flyer is ready to be shared" with the finished flyer above it.
4. **Save button** — downloads a high-quality square image (1080x1080) named after the delegate.
5. **Share buttons** — WhatsApp Status, Instagram, Facebook, LinkedIn, TikTok and X. Each one first saves the image to the device, then opens that app (or its web share page) with the conference link and a short pre-written caption, so the delegate just attaches the saved image and posts. A short note explains this one-tap flow.

## Where it appears

- A new page at `/flyer`, reachable from the site menu.
- Automatically on the payment-success screen after a confirmed registration, so delegates are invited to share right away.

## Technical notes

- Upload the new flyer artwork (`NICE_2026_I_will_be_there_flyer.png`) through the asset CLI and reference the pointer JSON; retire the old `nice-template.png` usage.
- Rewrite `src/components/IllBeThere.tsx` as a reusable flyer composer: canvas 1080x1080, template drawn first, photo clipped to the circle (centre ≈ 300, 466, radius ≈ 232; cover-fit, no stretching), name drawn centred in the green bar (≈ x 495–1070, y 630–705) in bold condensed white type with auto-fit sizing.
- Re-render the canvas on every change via `useEffect` rather than a "Generate" button; keep a hidden full-size canvas and show a scaled `<img>` preview.
- Save uses `canvas.toBlob` + object URL download. Share handlers download first, then `window.open` per network: WhatsApp `https://wa.me/?text=`, Facebook sharer, LinkedIn sharing, X intent, Instagram `https://www.instagram.com/`, TikTok `https://www.tiktok.com/upload`.
- New `src/pages/Flyer.tsx` with Helmet SEO, route in `App.tsx`, menu entry in `MainLayout.tsx`, and embed the component in the success branch of `RemitaCallback.tsx`.
- Styling uses existing design tokens and card components; no colour hardcoding.
