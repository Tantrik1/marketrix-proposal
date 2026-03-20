import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { client, package: selectedPackage, addons, componentCount, subtotal, discountAmount, total } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailContent = `
      <h2>New Package Inquiry from ${client.name} — Marketrix</h2>
      <p><strong>Name:</strong> ${client.name}</p>
      <p><strong>Email:</strong> ${client.email}</p>
      <p><strong>Phone:</strong> ${client.phone}</p>
      <p><strong>Company:</strong> ${client.company || "N/A"}</p>
      
      <h3>Package Details</h3>
      <p><strong>Base Package:</strong> ${selectedPackage?.name} (NPR ${selectedPackage?.price})</p>
      
      <h4>Add-ons:</h4>
      <ul>
        ${addons.map((a: { name: string; price: number } | null | undefined) => `<li>${a?.name} (+NPR ${a?.price})</li>`).join("")}
        ${componentCount > 0 ? `<li>3D Components (${componentCount}x) (+NPR ${componentCount * 15000})</li>` : ""}
      </ul>

      <hr />
      <p><strong>Subtotal:</strong> NPR ${subtotal}</p>
      <p><strong>Discount Applied:</strong> - NPR ${discountAmount}</p>
      <h3><strong>Final Total:</strong> NPR ${total}</h3>
    `;

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || "info@tantriktech.com.np",
      to: [
        process.env.TO_EMAIL_1 || "info@marketrixnepal.com.np",
        process.env.TO_EMAIL_2 || "info@tantriktech.com.np"
      ],
      subject: `New Package Inquiry from ${client.name} — Marketrix`,
      html: emailContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Failed to send email", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
