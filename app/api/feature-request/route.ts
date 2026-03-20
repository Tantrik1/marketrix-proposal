import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { features } = await req.json();

    if (!features || !features.trim()) {
      return NextResponse.json({ success: false, error: "No features provided" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailContent = `
      <h2>Feature Request — Real HR Soft Client</h2>
      <p>The client has submitted a feature request via the proposal page.</p>
      <h3>Requested Features:</h3>
      <blockquote style="border-left: 4px solid #f97316; padding-left: 16px; margin: 16px 0; color: #333;">
        ${features.replace(/\n/g, "<br />")}
      </blockquote>
      <hr />
      <p style="color: #888; font-size: 13px;">Submitted on ${new Date().toUTCString()} via the Marketrix Proposal page.</p>
    `;

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || "info@tantriktech.com.np",
      to: [
        process.env.TO_EMAIL_1 || "info@marketrix.com.np",
        process.env.TO_EMAIL_2 || "info@tantriktech.com.np",
      ],
      subject: "Feature Request — Real HR Soft Client",
      html: emailContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Failed to send feature request email", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
