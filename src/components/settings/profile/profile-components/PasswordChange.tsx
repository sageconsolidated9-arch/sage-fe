import { useMemo, useState } from "react";
import SettingsCard from "../../props/SettingsCard";
import {
  CheckIcon,
  CircleCheckIcon,
  CircleFilledCheckIcon,
  EditIcon,
  PortIcon,
  SquaredInfoIcon,
} from "../../../../utils/icons";
import Modal from "../../../props/Modal";
import Input from "../../../props/Input";
import Button from "../../../props/Button";
import { useOnboardStore } from "../../../../store/onboardStore";
import {
  calculatePasswordStrength,
  getStrengthTextColor,
  isPasswordValid,
  validatePasswordRequirements,
} from "../../../../utils/passwordValidation";
import { RequirementRow } from "../../../props/RequirementRow";

const PasswordChange = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isBackupEmailOpen, setIsBackupEmailOpen] = useState(false);
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);
  const {
    password,
    confirmPassword,
    touched,
    setPassword,
    setConfirmPassword,
    setTouched,
  } = useOnboardStore();

  const requirements = useMemo(
    () => validatePasswordRequirements(password),
    [password],
  );
  const passwordValid = useMemo(
    () => isPasswordValid(requirements),
    [requirements],
  );
  const strength = useMemo(
    () => calculatePasswordStrength(password),
    [password],
  );

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const confirmError =
    touched.confirm && confirmPassword && password !== confirmPassword;

  const isValid = passwordValid && passwordsMatch;
  return (
    <>
      <SettingsCard>
        <SettingsCard.Header
          title="Login Credentials"
          children={
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsChangePasswordOpen(true)}
            >
              <EditIcon className="w-[18px] h-[18px] text-primary-hover" />
              <span>Change Password</span>
            </button>
          }
        />

        <SettingsCard.Row label="Last Changed" value="Dec 14, 2025" />
        <SettingsCard.Row label="Recommended" value="Change every 180 days" />
        <SettingsCard.Row
          label="Authenticator App"
          children={
            <div className="flex items-center gap-2">
              <CircleFilledCheckIcon className="w-[18px] h-[18px] text-success" />
              <p>Enabled</p>
            </div>
          }
        />
        <SettingsCard.Row label="Backup Email">
          <button
            className="underline text-primary hover:text-primary-hover cursor-pointer"
            onClick={() => setIsBackupEmailOpen(true)}
          >
            Configure
          </button>
        </SettingsCard.Row>
        <SettingsCard.Row label="Hardware Key [FIDO2]">
          <button
            className="underline text-primary hover:text-primary-hover cursor-pointer"
            onClick={() => setIsConfigureOpen(true)}
          >
            Configure
          </button>
        </SettingsCard.Row>
      </SettingsCard>

      {/* edit ChangePassword */}
      <Modal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        maxWidth="607px"
      >
        <Modal.Header title="Change Password" />

        <Modal.Body>
          <form className="flex flex-col gap-[22px]">
            <Input
              name="password"
              type="password"
              placeholder="Enter a strong password"
              label="Current Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouched("password");
              }}
              error={touched.password && !passwordValid && password.length > 0}
            />

            <Input
              name="password"
              type="password"
              placeholder="Enter a strong password"
              label="New Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouched("password");
              }}
              error={touched.password && !passwordValid && password.length > 0}
            />

            {/* Requirements Check */}
            <div className="bg-surface shadow-check py-3 px-4 rounded-xl flex flex-col gap-y-3 w-full">
              <p className="text-xs text-text-primary">
                Your password must include
              </p>

              <RequirementRow
                met={requirements.length}
                label="At least 12 characters"
              />
              <RequirementRow
                met={requirements.special}
                label="At least two special characters"
              />

              <div className="flex items-center gap-2">
                <CheckIcon className="w-[18px] h-[18px] text-success" />
                <p className="text-xs text-text-primary">
                  Passwords are case sensitive
                </p>
              </div>

              {/* Password Strength */}
              <div className="mt-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-text-secondary">
                    Password strength
                  </p>
                  {strength.score > 0 && (
                    <p
                      className={`text-xs font-medium ${getStrengthTextColor(strength.score)}`}
                    >
                      {strength.label}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((segment) => (
                    <div
                      key={segment}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        segment <= strength.score
                          ? strength.colorClass
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Input
              name="cpassword"
              type="password"
              placeholder="Confirm Password"
              label="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setTouched("confirm");
              }}
              approved={passwordsMatch}
              error={confirmError}
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button icon={<CircleCheckIcon className="w-5 h-5 text-white" />}>
              Save Changes
            </Button>
          </div>
          <div>
            <Button
              paddingX="px-6"
              paddingY="py-3"
              onClick={() => setIsChangePasswordOpen(false)}
              variant="white"
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* configure backup email */}
      <Modal
        isOpen={isBackupEmailOpen}
        onClose={() => setIsBackupEmailOpen(false)}
        maxWidth="607px"
      >
        <Modal.Header title="Configure Backup Email" />

        <Modal.Body>
          <div>
            <p className="text-text-secondary">
              Add a backup email address for account recovery. We'll send a
              verification code to confirm this email.
            </p>

            <form className="flex flex-col gap-[22px] mt-6">
              <Input
                name="backupEmail"
                type="email"
                placeholder="Enter your email"
                label="Backup Email Address"
                required
                value={password}
              />

              <div className="flex items-center gap-2 text-xs text-warning leading-4 tracking-[0.5%]">
                <SquaredInfoIcon className="text-warning" />
                <p>
                  Note: This email must be different from your primary email
                  address.
                </p>
              </div>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button icon={<CircleCheckIcon className="w-5 h-5 text-white" />}>
              Save Changes
            </Button>
          </div>
          <div>
            <Button
              paddingX="px-6"
              paddingY="py-3"
              onClick={() => setIsBackupEmailOpen(false)}
              variant="white"
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* configure Hardware Key */}
      <Modal
        isOpen={isConfigureOpen}
        onClose={() => setIsConfigureOpen(false)}
        maxWidth="607px"
      >
        <Modal.Header title="Configure Hardware Key" />

        <Modal.Body>
          <div>
            <p className="text-text-secondary">
              Register a FIDO2-compatible hardware security key for passwordless
              authentication and enhanced account security.
            </p>

            <form className="flex flex-col gap-[22px] py-4 border-b border-text-secondary">
              <div>
                <Input
                  name="securityKeyName"
                  type="text"
                  placeholder="eg.. Yubikey"
                  label="Security Key Name"
                  required
                  value={password}
                />

                <div className="flex items-center gap-2 text-xs text-warning leading-4 tracking-[0.5%] mt-1">
                  <p>Give your key a memorable name to identify it later</p>
                </div>
              </div>
            </form>

            {/* instructions */}
            <div className="my-6 bg-surface shadow-check rounded-xl py-3 px-4">
              <div className="flex items-center gap-2">
                <PortIcon className="text-primary" />
                <p className="text-sm font-bold text-text-primary">
                  Before you continue:
                </p>
              </div>
              <ul className="pl-5 list-disc mt-3">
                <li className="text-xs text-text-primary">
                  Insert your security key into a USB port
                </li>
                <li className="text-xs text-text-primary py-1">
                  Make sure your key is FIDO2/WebAuthn compatible
                </li>
                <li className="text-xs text-text-primary">
                  You may need to touch your key during registration
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button icon={<CircleCheckIcon className="w-5 h-5 text-white" />}>
              Save Changes
            </Button>
          </div>
          <div>
            <Button
              paddingX="px-6"
              paddingY="py-3"
              onClick={() => setIsConfigureOpen(false)}
              variant="white"
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasswordChange;
