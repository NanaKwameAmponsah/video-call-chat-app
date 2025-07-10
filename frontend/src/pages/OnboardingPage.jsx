import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { toast } from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShuffleIcon, CameraIcon, MapPinIcon, Brain, LoaderIcon } from "lucide-react";
import { TOPICS } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    //instead of the parameters being an empty string get the authUser data for that field and put it in, if it doesn't exist, then put empty string
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    yourBeliefsPhilosophy: authUser?.yourBeliefsPhilosophy || "",
    curiousAbout: authUser?.curiousAbout || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });
  //call this mutation whenever we click the complete onboarding button on the onboarding page
  const { mutate:onboardingMutation, isPending, isLoading } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"]});

    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) +1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    //keep everything as it is but add a new profile pic, make it random avatar
    setFormState({...formState, profilePic: randomAvatar});
    toast.success("Avatar changed successfully");
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* profile pic containter */}
            <div className="flex flex-col items-center justify-center space-y-4">
            {/* IMAGE PREVIEW */}
            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic} //if user has a profile picture, display it 
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
              <div className="flex items-center justify-center h-full"> //if this is equal to null or undefined, show a camera icon
              <CameraIcon className="size-12 text-base-content opacity-40" />
              </div>
              )}
            </div>

            {/* Generate Random Avatar BTN */}
            <div className="flex items-center gap-2">
              <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
              </div>


               </div>  
                  {/* FULL NAME */}
                <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ... formState, fullName: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                />              
                </div>
                {/* BIO */}
                <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ... formState, bio: e. target.value }) }
                  className="textarea textarea-bordered h-24"
                  placeholder="Share the topics you love to debate or wish to explore with fellow thinkers around the globe."
                  />
                </div>  
                {/* YOUR BELIEFS/PHILOSOPHY vs CURIOUS ABOUT*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Beliefs/Philosophy</span>
                  </label>

                  <select
                    name="YourBeliefs/Philosophy"
                    value={formState.yourBeliefsPhilosophy}
                    onChange={(e) => setFormState({ ... formState, yourBeliefsPhilosophy: e.target.value })}
                    className="select select-bordered w-full"
                  >
                  <option value="">Select your belief/philosophy</option>
                  {TOPICS.map((belief) =>(
                    <option key={`your-${belief}`} value={belief.toLowerCase()}>
                      {belief}
                  </option>
                  ))}
                  </select>
                  </div>


                
                </div>
                {/*CURIOUS ABOUT*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                  <label className="label">
                    <span className="label-text">Curious About</span>
                  </label>

                  <select
                    name="CuriousAbout"
                    value={formState.curiousAbout}
                    onChange={(e) => setFormState({ ... formState, curiousAbout: e.target.value })}
                    className="select select-bordered w-full"
                  >
                  <option value="">Select your belief/philosophy</option>
                  {TOPICS.map((belief) =>(
                    <option key={`curious about -${belief}`} value={belief.toLowerCase()}>
                      {belief}
                  </option>
                  ))}
                  </select> 
                </div>
                </div>
            {/* LOCATION */}
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

            {/* SUBMIT BUTTON */}

            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <Brain className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;

