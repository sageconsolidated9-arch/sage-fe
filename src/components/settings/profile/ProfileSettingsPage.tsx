import ProfileHeader from "./profile-components/ProfileHeader";
import ProfileInformation from "./profile-components/ProfileInformation";
import PasswordChange from "./profile-components/PasswordChange";
import RecoveryOptions from "./profile-components/RecoveryOptions";
import PrefencesLocal from "./profile-components/PrefencesLocal";

const ProfileSettingsPage = () => {
  return (
    <div className="h-full min-h-screen flex flex-col xlg:flex-row gap-6 py-[27px] px-[30px] bg-surface rounded-[18px] shadow-card">
      <div className="w-full xlg:w-[36%]">
        {/* profile image / banner */}
        <ProfileHeader />

        {/* other content */}
        <div className="flex flex-col gap-[22px] mt-48">
          {/* profile information */}
          <ProfileInformation />

          {/* login credentials */}
          <PasswordChange />

          {/* recovery options */}
          <RecoveryOptions />
        </div>
      </div>
      <div className="w-full xlg:w-[62%]">
        {/* Preferences / Localization */}
        <PrefencesLocal />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
