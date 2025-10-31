import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { projectName, projectUrl, recipientEmail } = await request.json();

    // Validate input
    if (!projectName || !projectUrl || !recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    await sendEmail(
      recipientEmail,
      `🎉 Project ${projectName} is now live!`,
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">🎉 Your Project is Live!</h1>
          <p>Hello there,</p>
          <p>Great news! Your project <strong>${projectName}</strong> is now live and accessible to the public.</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${projectUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; 
                      color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              View Live Project
            </a>
          </div>
          
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #4F46E5;">${projectUrl}</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6B7280;">
            <p>Best regards,<br>Your Portfolio Team</p>
          </div>
          
          <div style="margin-top: 40px; font-size: 12px; color: #9CA3AF;">
            <p>This is an automated message, please do not reply directly to this email.</p>
          </div>
        </div>
      `
    );

    return NextResponse.json(
      { message: 'Project live notification sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending project live notification:', error);
    return NextResponse.json(
      { error: 'Failed to send project live notification' },
      { status: 500 }
    );
  }
}
