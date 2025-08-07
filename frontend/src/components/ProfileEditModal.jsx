import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateProfile } from "../lib/api";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShuffleIcon, CameraIcon, MapPinIcon, LoaderIcon, X } from "lucide-react";
import { TOPICS } from "../constants";

const ProfileEditModal = ({ isOpen, onClose, authUser }) => {
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    yourBeliefsPhilosophy: authUser?.yourBeliefsPhilosophy || "",
    curiousAbout: authUser?.curiousAbout || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Avatar changed successfully");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card bg-base-200 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="card-body p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <button 
              onClick={onClose}
              className="btn btn-ghost btn-circle"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <button 
                type="button" 
                onClick={handleRandomAvatar} 
                className="btn btn-accent"
              >
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />              
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Share the topics you love to debate or wish to explore with fellow thinkers around the globe."
              />
            </div>  

            {/* Your Beliefs/Philosophy */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Beliefs/Philosophy</span>
              </label>
              <select
                name="yourBeliefsPhilosophy"
                value={formState.yourBeliefsPhilosophy}
                onChange={(e) => setFormState({ ...formState, yourBeliefsPhilosophy: e.target.value })}
                className="select select-bordered w-full"
              >
                <option value="">Select your belief/philosophy</option>
                {TOPICS.map((belief) => (
                  <option key={`your-${belief}`} value={belief.toLowerCase()}>
                    {belief}
                  </option>
                ))}
              </select>
            </div>

            {/* Curious About */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Curious About</span>
              </label>
              <select
                name="curiousAbout"
                value={formState.curiousAbout}
                onChange={(e) => setFormState({ ...formState, curiousAbout: e.target.value })}
                className="select select-bordered w-full"
              >
                <option value="">Select what you're curious about</option>
                {TOPICS.map((belief) => (
                  <option key={`curious-${belief}`} value={belief.toLowerCase()}>
                    {belief}
                  </option>
                ))}
              </select> 
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end">
              <button 
                type="button" 
                onClick={onClose}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                disabled={isPending} 
                type="submit"
              >
                {isPending ? (
                  <>
                    <LoaderIcon className="animate-spin size-5 mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
