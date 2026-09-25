"use client";

import { useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CurrencyCode, PaymentOptions, encode } from "bysquare/pay";
import { renderSVG } from "uqr";
import { TbCheck, TbCopy } from "react-icons/tb";

/**
 * The example account from the bysquare docs. It only ever renders in
 * `next dev`, under a visible "demo" label, so the QR flow can be judged
 * before the real IBAN arrives. Production renders a pending slot instead.
 */
const DEMO_IBAN = "SK9611000000002918599669";

type Props = {
  iban: string | null;
  beneficiary: string;
  paymentNote: string;
  amounts: readonly number[];
};

/** IBAN in groups of four, the way it is printed on a bank statement. */
function formatIban(iban: string): string {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Pick an amount, and a PAY by square QR code for it is drawn in the
 * browser. Every Slovak banking app reads it; the IBAN beside it covers a
 * visitor on the same phone and banks that don't read the standard.
 */
export function DonationCard({
  iban: realIban,
  beneficiary,
  paymentNote: note,
  amounts,
}: Props) {
  const t = useTranslations("support");
  const inputId = useId();

  const isDemo = !realIban && process.env.NODE_ENV === "development";
  const iban = realIban ?? (isDemo ? DEMO_IBAN : null);

  const [preset, setPreset] = useState<number | null>(amounts[1] ?? null);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);

  const customAmount = Number(custom.replace(",", "."));
  const amount =
    preset ?? (custom && customAmount > 0 ? Math.round(customAmount * 100) / 100 : null);

  const qrSvg = useMemo(() => {
    if (!iban) return null;
    try {
      const payload = encode({
        payments: [
          {
            type: PaymentOptions.PaymentOrder,
            currencyCode: CurrencyCode.EUR,
            ...(amount ? { amount } : {}),
            paymentNote: note,
            beneficiary: { name: beneficiary },
            bankAccounts: [{ iban }],
          },
        ],
      });
      return renderSVG(payload, {
        border: 2,
        blackColor: "#262b26",
        whiteColor: "#fbf8f1",
      });
    } catch {
      return null;
    }
  }, [iban, amount, note, beneficiary]);

  async function copyIban() {
    if (!iban) return;
    try {
      await navigator.clipboard.writeText(iban);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard refused (old browser, insecure context): the IBAN is
      // plain selectable text right beside the button, so nothing is lost.
    }
  }

  const chipClass =
    "rounded-lg border-2 px-4 py-2 text-base font-semibold transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-emerald";

  return (
    <div className="self-start rounded-xl border-2 border-emerald-deep bg-cream p-5 text-charcoal sm:p-7">
      <fieldset>
        <legend className="text-sm font-semibold text-charcoal">
          {t("amountLabel")}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {amounts.map((value) => {
            const selected = preset === value;
            return (
              <label
                key={value}
                className={`${chipClass} cursor-pointer ${
                  selected
                    ? "border-emerald bg-emerald text-cream"
                    : "border-brown/40 text-charcoal hover:border-emerald"
                }`}
              >
                <input
                  type="radio"
                  name="donation-amount"
                  value={value}
                  checked={selected}
                  onChange={() => {
                    setPreset(value);
                    setCustom("");
                  }}
                  className="sr-only"
                />
                {value} €
              </label>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <label htmlFor={inputId} className="text-sm text-charcoal-soft">
            {t("customLabel")}
          </label>
          <div
            className={`flex items-center rounded-lg border-2 bg-cream pr-3 ${
              preset === null && custom
                ? "border-emerald"
                : "border-brown/40"
            }`}
          >
            <input
              id={inputId}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={custom}
              onChange={(event) => {
                setCustom(event.target.value.replace(/[^\d.,]/g, ""));
                setPreset(null);
              }}
              placeholder="30"
              className="w-20 bg-transparent px-3 py-2 text-base font-semibold outline-none"
            />
            <span className="font-semibold text-charcoal-soft">€</span>
          </div>
        </div>
      </fieldset>

      <div className="mt-6 border-t-2 border-brown/20 pt-6">
        {iban && qrSvg ? (
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
            <figure className="w-44 shrink-0">
              <div
                role="img"
                aria-label={t("qrAlt", {
                  amount: amount ? `${amount} €` : t("anyAmount"),
                })}
                className="aspect-square w-full overflow-hidden rounded-lg border-2 border-brown/40 [&>svg]:h-full [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <figcaption className="mt-2 text-xs leading-snug text-charcoal-soft">
                {t("scanHint")}
              </figcaption>
            </figure>

            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="text-charcoal-soft">{t("ibanLabel")}</dt>
                <dd className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-semibold tabular-nums text-charcoal select-all">
                    {formatIban(iban)}
                  </span>
                  <button
                    type="button"
                    onClick={copyIban}
                    className="inline-flex items-center gap-1 font-semibold text-emerald underline underline-offset-4 hover:text-emerald-deep"
                  >
                    {copied ? (
                      <TbCheck className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <TbCopy className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span aria-live="polite">
                      {copied ? t("copied") : t("copy")}
                    </span>
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-charcoal-soft">{t("recipientLabel")}</dt>
                <dd className="mt-0.5 font-semibold">{beneficiary}</dd>
              </div>
              <div>
                <dt className="text-charcoal-soft">{t("amountSummaryLabel")}</dt>
                <dd className="mt-0.5 font-semibold tabular-nums">
                  {amount ? `${amount} €` : t("anyAmount")}
                </dd>
              </div>
              <div>
                <dt className="text-charcoal-soft">{t("noteLabel")}</dt>
                <dd className="mt-0.5 font-semibold">{note}</dd>
              </div>
            </dl>
            {isDemo ? (
              <p className="rounded-lg bg-emerald-soft px-3 py-2 text-xs font-medium text-emerald-deep sm:col-span-2">
                {t("demoWarning")}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-charcoal-soft">{t("ibanPending")}</p>
        )}
      </div>
    </div>
  );
}
