import { Edit } from "lucide-react";
import Button from "../../../props/Button";
import SettingsCard from "../../props/SettingsCard";
import { CircleCheckIcon, EditIcon } from "../../../../utils/icons";
import { useState } from "react";
import Modal from "../../../props/Modal";
import Input from "../../../props/Input";
import { Select } from "../../../props/Select";
import { industries } from "../../../../utils/timezone";

const ProfileInformation = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  return (
    <>
      <SettingsCard>
        <SettingsCard.Header
          title="Information"
          children={
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <EditIcon className="w-[18px] h-[18px] text-primary-hover" />
              <span>Edit Profile</span>
            </button>
          }
        />

        <SettingsCard.Row label="Job Title" value="Senior Software Engineer" />
        <SettingsCard.Row label="Phone Number" value="+1 (555) 123-4567" />
        <SettingsCard.Row label="Department" value="Engineering" />
        <SettingsCard.Row label="Joined">
          <p className="text-text-muted ">23 March 20204</p>
        </SettingsCard.Row>
      </SettingsCard>
      {/* edit profilemodal */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        maxWidth="607px"
      >
        <Modal.Header title="Edit Profile" />

        <Modal.Body>
          <form className="flex flex-col gap-[22px]">
            {/* firstname */}
            <Input name="fullName" type="text" label="Full Name" />

            {/* firstname */}
            <div>
              <Input name="email" type="email" label="Email" disabled />
              <p className="text-xs text-error mt-1">
                Email address cant be changed
              </p>
            </div>

            {/* jobtitle */}
            <Input name="jobTitle" type="text" label="Job Title" />

            {/* phone number */}
            <Input name="phonenumber" type="text" label="Phone Number" />

            {/* Department */}
            <Select
              label="Industry"
              options={industries}
              placeholder="Select an industry"
              iconVariant="down1"
              // value={profile.industry}
              // onChange={(value) => updateProfile("industry", value)}
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
              onClick={() => setIsEditProfileOpen(false)}
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

export default ProfileInformation;
