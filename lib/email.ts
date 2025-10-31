import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Replace with your verified domain later
      to: to,
      subject: subject,
      html: html,
      ...(replyTo && { reply_to: replyTo })
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}
