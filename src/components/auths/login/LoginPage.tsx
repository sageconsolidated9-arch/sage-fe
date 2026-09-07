import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { formContentVariants } from "../../../utils/variants";
import Input from "../../props/Input";
import Button from "../../props/Button";
import { getImageSrc } from "../../../utils/imageUtils";
import { LogoIcon, LogoText } from "../../../utils/icons";
import AuthFooter from "../AuthFooter";
import MFAVerification from "./MFAVerifcation";
import SuccessStep from "../onboarding/steps/SuccessStep";
import AuthSideItem from "./AuthSideItem";
import { useLogin } from "../../../api/auth";
import { useToastStore } from "../../../store/toastStore";
import Loader from "../../../shared/Loader";

const heroData = {
  login: {
    imageSrc: "loginImg.png",
    imageAlt: "Cybersecurity Shield",
    title: "PROTECT WHAT MATTERS. PREDICT WHAT'S NEXT.",
    paragraph:
      "Sage AI investigates, and stops threats — before you even notice them.",
  },
  mfa: {
    imageSrc: "mfaImg.png",
    imageAlt: "AI Cybersecurity Head",
    title: "VERIFY ONCE. SECURE EVERYTHING.",
    paragraph:
      "Ingest everything. Detect intelligently. Automate everything. Adapt in real time.",
  },
};
const LoginPage = () => {
  const { mutate: handleLogin, isPending: isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [step, setStep] = useState<"login" | "mfa" | "success">("login");
  const addToast = useToastStore((s) => s.add);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleMFAVerify = (code: string) => {
    setStep("success");
  };

  const currentHeroData = step !== "success" ? heroData[step] : null;

  return (
    <div className="min-h-screen mx-auto h-full flex p-4">
      {/* Left Side - Login Form */}
      <div className="w-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-8 bg-surface relative rounded-l-xl">
        <div className="absolute inset-0 login-gradient" />

        {/* Logo */}
        <div className="flex items-center gap-2 relative">
          <img src={getImageSrc("logo.svg")} alt="Sage" className="h-8 w-8" />
          <LogoText />
        </div>

        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md mx-auto relative">
          <AnimatePresence mode="wait">
            {step === "login" ? (
              <motion.div
                variants={formContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-semibold text-text-primary mb-2">
                    Welcome back to Sage
                  </h1>
                  <p className="text-text-secondary">
                    Your command center for autonomous cybersecurity.
                  </p>
                </div>

                <form
                  onSubmit={handleLoginSubmit}
                  className="flex flex-col gap-y-4"
                >
                  <Input
                    name="email"
                    type="email"
                    label="Email address"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={keepLoggedIn}
                        onChange={(e) => setKeepLoggedIn(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">
                        Keep me logged in
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader size="20px" /> : "LOGIN"}
                  </Button>

                  {/* Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-text-secondary">
                        or
                      </span>
                    </div>
                  </div>

                  {/* SSO Buttons */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl text-text-primary hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      Continue with Azure
                    </span>
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl text-text-primary hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      Continue with Google
                    </span>
                  </button>
                </form>
              </motion.div>
            ) : step === "mfa" ? (
              <motion.div
                key="mfa-form"
                variants={formContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <MFAVerification
                  onVerify={handleMFAVerify}
                  onResend={() => console.log("Resending...")}
                />
              </motion.div>
            ) : (
              <SuccessStep />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="relative">
          <AuthFooter single={step !== "login"} />
        </div>
      </div>

      {/* Right Side - Hero Image */}
      {step !== "success" && currentHeroData && (
        <div className="hidden lg:block w-full relative bg-[#321C1F] rounded-xl">
          <AnimatePresence mode="wait">
            <AuthSideItem key={step} {...currentHeroData} />
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
