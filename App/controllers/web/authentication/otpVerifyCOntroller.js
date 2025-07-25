const { transporter } = require("../../../Config/mailConfig");

const otpdata = new Map(); // Map to store OTPs and timestamps per email

// ✅ Send OTP controller
const otpVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ status: 0, message: 'Email is required' });
  }

  try {
    const otp = Math.floor(10000 + Math.random() * 90000);

    otpdata.set(email, {
      otp: otp,
      createdAt: Date.now()
    });

    await transporter.sendMail({
      from: '"Maxiwise Learning" <maxiwise.fullstackdev@gmail.com>',
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 500px; margin: auto; padding: 24px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #eee;">
          <h2 style="text-align: center; color: #2F80ED;">Maxiwise Learning</h2>
          <p style="font-size: 16px; color: #333;">Hi there,</p>
          <p style="font-size: 16px; color: #333;">Please use the OTP below to complete your verification process:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; letter-spacing: 6px; color: #2F80ED; font-weight: bold;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #444; text-align: center;">
            This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.
          </p>
          <p style="font-size: 13px; color: #777; text-align: center; margin-top: 30px;">
            If you didn’t request this OTP, you can ignore this email.
          </p>
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
            © ${new Date().getFullYear()} Maxiwise Learning. All rights reserved.
          </p>
        </div>`
    });

    return res.status(200).json({
      status: 1,
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      status: 0,
      message: "Failed to send OTP"
    });
  }
};

// ✅ Verify OTP controller (without expiration logic)
const otpVerifyController = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      status: 0,
      message: "Email and OTP are required"
    });
  }

  const record = otpdata.get(email);

  if (!record) {
    return res.status(400).json({
      status: 0,
      message: "No OTP found for this email"
    });
  }

  const { otp: storedOtp } = record;

  if (storedOtp != otp) {
    return res.status(400).json({
      status: 0,
      message: "Invalid OTP"
    });
  }

  otpdata.delete(email); // clear OTP

  // ✅ Send confirmation email
  try {
    await transporter.sendMail({
      from: '"Maxiwise Learning" <maxiwise.fullstackdev@gmail.com>',
      to: email,
      subject: "Email Verified Successfully",
     html: `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 520px; margin: 40px auto; background-color: #ffffff; border-radius: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.07); padding: 36px;">
    <div style="text-align: center;">
      <h2 style="color: #27ae60; margin-bottom: 8px;">🎉 Email Verified Successfully!</h2>
      <p style="font-size: 16px; color: #444;">Hi,</p>
    </div>
    <p style="font-size: 15px; color: #333; line-height: 1.6; margin-top: 20px;">
      We're excited to confirm that your email <strong style="color: #2980b9;">${email}</strong> has been verified.
    </p>
    <p style="font-size: 15px; color: #333; line-height: 1.6; margin-top: 10px;">
      You’re now eligible to take exams on <strong style="color: #2c3e50;">Maxiwise Learning</strong>. Whether it’s GMAT, CAT, Banking, or Campus placement prep — we’ve got everything covered!
    </p>
    <p style="font-size: 14px; color: #c0392b; line-height: 1.6; margin-top: 16px; font-weight: bold;">
      🚨 Note: Each user is allowed to attempt the exam only once using their verified email. Multiple attempts are not permitted.
    </p>
    <div style="background-color: #f4fafe; padding: 16px; border-radius: 8px; margin-top: 20px;">
      <p style="font-size: 14px; color: #2c3e50; margin: 0;">
        Explore more test series, detailed explanations, real-time analytics, and personalized progress tracking.
      </p>
    </div>
    <p style="font-size: 14px; color: #555; margin-top: 20px;">
      Visit our platform anytime to level up your preparation and achieve your dream score!
    </p>
    <p style="font-size: 13px; color: #999; text-align: center; margin-top: 36px;">
      If this action wasn’t done by you, please report it to our support team immediately.
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
    <p style="font-size: 12px; color: #aaa; text-align: center;">
      © ${new Date().getFullYear()} Maxiwise Learning. All rights reserved.
    </p>
  </div>
`

    });
  } catch (err) {
    console.error("Confirmation mail error:", err);
  }

  return res.status(200).json({
    status: 1,
    message: "OTP verified successfully"
  });
};

module.exports = { otpVerify, otpVerifyController };





