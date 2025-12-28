import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send an email
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // If SMTP is not configured, log the email instead
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email would be sent:', options);
      return true;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send appointment confirmation email
 */
export async function sendAppointmentConfirmation(
  email: string,
  fullName: string,
  date: string,
  time: string
): Promise<boolean> {
  const subject = 'Appointment Request Received - HavenBridge Home Care';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0284c7;">Appointment Request Received</h2>
      <p>Dear ${fullName},</p>
      <p>Thank you for requesting an appointment with HavenBridge Home Care. We have received your request and will review it shortly.</p>
      <div style="background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Requested Date:</strong> ${date}</p>
        <p><strong>Requested Time:</strong> ${time}</p>
      </div>
      <p>One of our team members will contact you within 24-48 hours to confirm your appointment.</p>
      <p>If you have any urgent questions, please call us at (555) 123-4567.</p>
      <p>Best regards,<br>HavenBridge Home Care Team</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}

/**
 * Send admin reply email
 */
export async function sendAdminReply(
  email: string,
  fullName: string,
  replyMessage: string,
  type: 'appointment' | 'contact'
): Promise<boolean> {
  const subject = `Response from HavenBridge Home Care - Your ${type === 'appointment' ? 'Appointment' : 'Message'}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0284c7;">Message from HavenBridge Home Care</h2>
      <p>Dear ${fullName},</p>
      <div style="background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
        ${replyMessage}
      </div>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>HavenBridge Home Care Team</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}
