@AGENTS.md

do not commit directly, always ask me first.

do not use multiple libraries for one thing, always ask me if you can install new package.

Icons: `react-icons`, prefer the `tb` (Tabler) outline subset for visual consistency with the rest of the site.

Ask before wanting to run playwright mcp.

Do not use typical AI dashes.

Real-world details (phone, IBAN, address, map pin, social links, funding) live only in `src/content/site.ts`. Read them from there, never copy them into components or translations, and never invent a placeholder value: anything not yet confirmed stays `null` and renders as a pending slot. The IBAN (Fio banka) feeds the PAY by square QR code in the Support us section, so check any change to it with the `bysquare` encoder.

Do not use AI dashes.
