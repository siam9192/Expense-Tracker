import { useState } from "react";
import { X, MailCheck } from "lucide-react";

interface Props {
  onClose: () => void;
  onVerify: (otp: string) => void;
}

function SignupOtpValidationDialog({ onClose, onVerify }: Props) {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // move focus to next input automatically
      if (value && index < otp.length - 1) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    onVerify(finalOtp);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-error transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <MailCheck size={30} />
          </div>
          <h2 className="text-2xl font-semibold">Verify Your Email</h2>
          <p className="text-gray-500 text-sm">
            We’ve sent a 4-digit verification code to your email. Please enter it below to verify
            your account.
          </p>
        </div>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-base-200"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="btn btn-primary w-full font-medium text-white"
            disabled={otp.join("").length !== 4}
          >
            Verify OTP
          </button>
        </form>

        {/* Resend Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <button
            type="button"
            className="text-primary font-medium hover:underline"
            onClick={() => alert("OTP resent!")}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupOtpValidationDialog;
