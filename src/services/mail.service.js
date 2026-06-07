const { Resend } = require('resend');

let resendClient = null;

const getResendClient = () => {
    if (!resendClient) {
        const apiKey = (process.env.RESEND_API_KEY || '').trim();
        if (!apiKey) {
            console.warn("Warning: RESEND_API_KEY is not set. Emails will fail to send.");
            return null;
        }
        resendClient = new Resend(apiKey);
    }
    return resendClient;
};

const sendOTP = async (email, otp) => {
    const client = getResendClient();
    if (!client) {
        throw new Error("RESEND_API_KEY is missing");
    }

    const fromEmail = (process.env.RESEND_FROM_EMAIL || process.env.GMAIL_USER || 'onboarding@resend.dev').trim();
    const fromName = 'Interview AI';

    return client.emails.send({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: 'Verification Code for Interview AI',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #4A90E2; text-align: center;">Email Verification</h2>
                <p>Hello,</p>
                <p>Thank you for joining Interview AI. Please use the following OTP code to verify your account. This code is valid for 10 minutes.</p>
                <div style="background: #f4f7f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 8px;">
                    ${otp}
                </div>
                <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 Interview AI. All rights reserved.</p>
            </div>
        `
    });
};

const sendPasswordReset = async (email, otp) => {
    const client = getResendClient();
    if (!client) {
        throw new Error("RESEND_API_KEY is missing");
    }

    const fromEmail = (process.env.RESEND_FROM_EMAIL || process.env.GMAIL_USER || 'onboarding@resend.dev').trim();
    const fromName = 'Interview AI';

    return client.emails.send({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: 'Password Reset Code - Interview AI',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #E24A4A; text-align: center;">Reset Your Password</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password. Use the following code to proceed:</p>
                <div style="background: #f4f7f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 8px;">
                    ${otp}
                </div>
                <p style="margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 Interview AI. All rights reserved.</p>
            </div>
        `
    });
};

module.exports = { sendOTP, sendPasswordReset };
