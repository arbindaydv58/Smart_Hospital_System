import { AppConfig } from "../../config/config.js";
import EmailService from "../../service/email.service.js";

class AuthEmail {
  svc;
  constructor() {
    this.svc = new EmailService();
  }
  notifyUserRegistration = async (user) => {
    try {
      const activationLink = `${AppConfig.feURL}/activate/${user.activationToken}`;

      const emailTemplate = `
<div style="margin:0;padding:0;background-color:#f0f9ff;">
  <table width="100%" style="background:linear-gradient(180deg,#e0f2fe 0%,#f0f9ff 100%);padding:30px 0;">
    <tr>
      <td align="center">
        <table width="680" style="background:#ffffff;border-radius:16px;border:1px solid #bae6fd;font-family:Arial,sans-serif;color:#0f172a;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding:30px 40px;background:linear-gradient(135deg,#0284c7,#0369a1);color:#ffffff;">
              <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
                Smart Hospital System
              </div>
              <h1 style="margin:12px 0 6px;font-size:28px;">
                Welcome to Smart Healthcare
              </h1>
              <p style="margin:0;font-size:15px;color:#e0f2fe;">
                Secure, efficient, and patient-centered digital healthcare platform.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 40px;">
              <p style="font-size:16px;margin-bottom:15px;">
                Dear <strong>${user.name || user.role}</strong>,
              </p>

              <p style="font-size:15px;line-height:25px;color:#334155;">
                Thank you for registering with our Smart Hospital System. 
                We are committed to providing a seamless and secure healthcare experience.
              </p>

              <p style="font-size:15px;line-height:25px;color:#334155;">
                By activating your account, you will be able to:
              </p>

              <ul style="font-size:14px;color:#334155;line-height:24px;">
                <li>Book and manage appointments</li>
                <li>Access prescriptions and medical records</li>
                <li>Track your queue status in real-time</li>
                <li>Receive important health notifications</li>
              </ul>

              <p style="margin:20px 0;font-size:15px;">
                Please click the button below to activate your account:
              </p>

              <a href="${activationLink}" 
                 style="display:inline-block;padding:14px 28px;background:#0284c7;color:#fff;
                        text-decoration:none;border-radius:8px;font-weight:bold;">
                Activate Account
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="font-size:13px;color:#64748b;margin-bottom:8px;">
                This is a system-generated email. Please do not reply.
              </p>
              <p style="font-size:13px;color:#64748b;">
                Smart Hospital System © All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</div>
`;

      return await this.svc.sendEmail({
        to: user.email,
        sub: "Activate your account!!",
        message: emailTemplate,
      });
    } catch (exception) {
      throw exception;
    }
  };
}

const authMailSvc = new AuthEmail();

export default authMailSvc;
