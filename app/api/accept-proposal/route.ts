import { NextResponse } from "next/server";
import { Resend } from "resend";

interface AddonItem {
  id: string;
  name: string;
  price: number;
  isYearly?: boolean;
}

interface ProposalBody {
  packageName: string;
  packagePrice: number;
  addons: AddonItem[];
  componentCount: number;
  componentPrice: number;
  subtotal: number;
  discountName: string | null;
  discountAmount: number;
  total: number;
}

export async function POST(req: Request) {
  try {
    const body: ProposalBody = await req.json();
    const {
      packageName, packagePrice, addons, componentCount,
      componentPrice, subtotal, discountName, discountAmount, total,
    } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const addonRows = addons.length > 0
      ? addons.map(a => `
          <tr>
            <td style="padding:8px 12px;color:#d4d4d8;font-size:14px;">${a.name}${a.isYearly ? " (yearly)" : ""}</td>
            <td style="padding:8px 12px;color:#ffffff;font-size:14px;text-align:right;">NPR ${a.price.toLocaleString()}</td>
          </tr>`).join("")
      : `<tr><td colspan="2" style="padding:8px 12px;color:#71717a;font-size:13px;font-style:italic;">No add-ons selected</td></tr>`;

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#18181b;border:1px solid #27272a;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <div style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:18px;padding:8px 20px;border-radius:999px;letter-spacing:0.05em;margin-bottom:16px;">
              MARKETRIX NEPAL
            </div>
            <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.3;">
              🎉 Proposal Accepted!
            </h1>
            <p style="margin:12px 0 0;color:#71717a;font-size:15px;">
              Real HR Soft has accepted the Marketrix proposal
            </p>
          </td>
        </tr>

        <!-- From / To Banner -->
        <tr>
          <td style="background:#111113;border-left:1px solid #27272a;border-right:1px solid #27272a;padding:20px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:center;">
                  <span style="background:#f97316;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:999px;letter-spacing:0.1em;">FROM</span>
                  <p style="margin:6px 0 0;color:#ffffff;font-size:14px;font-weight:600;">Marketrix Nepal</p>
                </td>
                <td style="text-align:center;color:#71717a;font-size:20px;">→</td>
                <td style="text-align:center;">
                  <span style="background:#27272a;color:#a1a1aa;font-size:11px;font-weight:700;padding:4px 12px;border-radius:999px;letter-spacing:0.1em;">CLIENT</span>
                  <p style="margin:6px 0 0;color:#ffffff;font-size:14px;font-weight:600;">Real HR Soft</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Proposal Breakdown -->
        <tr>
          <td style="background:#18181b;border-left:1px solid #27272a;border-right:1px solid #27272a;padding:32px 40px;">
            <h2 style="margin:0 0 20px;font-size:18px;font-weight:700;color:#ffffff;">Accepted Proposal Summary</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #27272a;border-radius:12px;overflow:hidden;">
              <thead>
                <tr style="background:#111113;">
                  <th style="padding:10px 12px;text-align:left;color:#71717a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Item</th>
                  <th style="padding:10px 12px;text-align:right;color:#71717a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-top:1px solid #27272a;">
                  <td style="padding:10px 12px;color:#ffffff;font-size:14px;font-weight:600;">${packageName}</td>
                  <td style="padding:10px 12px;color:#ffffff;font-size:14px;font-weight:600;text-align:right;">NPR ${packagePrice.toLocaleString()}</td>
                </tr>
                ${addonRows}
                ${componentCount > 0 ? `
                <tr style="border-top:1px solid #27272a;">
                  <td style="padding:10px 12px;color:#d4d4d8;font-size:14px;">3D Animation Components (${componentCount}×)</td>
                  <td style="padding:10px 12px;color:#ffffff;font-size:14px;text-align:right;">NPR ${componentPrice.toLocaleString()}</td>
                </tr>` : ""}
                ${discountName ? `
                <tr style="border-top:1px solid #27272a;background:#14532d22;">
                  <td style="padding:10px 12px;color:#4ade80;font-size:13px;">✓ ${discountName}</td>
                  <td style="padding:10px 12px;color:#4ade80;font-size:13px;font-weight:700;text-align:right;">−NPR ${discountAmount.toLocaleString()}</td>
                </tr>` : ""}
              </tbody>
              <tfoot>
                <tr style="background:#111113;border-top:2px solid #f97316;">
                  <td style="padding:14px 12px;color:#ffffff;font-size:16px;font-weight:800;">Total Investment</td>
                  <td style="padding:14px 12px;color:#f97316;font-size:22px;font-weight:800;text-align:right;">NPR ${total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>

            <div style="margin-top:24px;padding:16px 20px;background:#111113;border:1px solid #27272a;border-radius:10px;">
              <p style="margin:0;color:#71717a;font-size:13px;line-height:1.6;">
                <strong style="color:#ffffff;">Next Steps:</strong> The Marketrix team will reach out within 24 hours to schedule a project kickoff call and begin the onboarding process.
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111113;border:1px solid #27272a;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 8px;color:#71717a;font-size:12px;">Marketrix Nepal · info@marketrixnepal.com.np</p>
            <p style="margin:0;color:#3f3f46;font-size:11px;">This email confirms proposal acceptance from Real HR Soft.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "info@marketrixnepal.com.np",
      to: [
        process.env.TO_EMAIL_1 || "info@marketrixnepal.com.np",
        process.env.TO_EMAIL_2 || "info@tantriktech.com.np",
      ],
      subject: "Proposal Accepted by Real HR Soft — Marketrix Nepal",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send acceptance email", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
