import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link} from "react-router";
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from "../lib/api";
import {  UsersRoundIcon, EarthIcon, UserPlusIcon, CheckLineIcon, MessageSquareIcon } from "lucide-react";
import {useEffect, useState} from "react";
import FriendCard from "../components/FriendCard";
import NoFriends from "../components/NoFriends";
import { capitalize } from "../lib/util";
const HomePage = () => {
  const QueryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const{data:friends=[], isLoading:loadingFriends} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })
  const{data:recommendedUsers=[], isLoading:loadingUsers} = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  })
  const{data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  })

  const {mutate:sendRequestMutation, isPending} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"]}),
  })
  useEffect(() => {
  const outgoingIds = new Set() 
  if(outgoingFriendReqs && outgoingFriendReqs.length > 0){
    outgoingFriendReqs.forEach((req) => {
      outgoingIds.add(req.recipient._id)
    })
    setOutgoingRequestsIds(outgoingIds) }
  }, [outgoingFriendReqs])
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersRoundIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? ( <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg">

          </span>
          </div>): friends.length == 0 ? (
            <NoFriends/>
) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}

            </div>
          )}

          <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight"> Meet Fellow Thinkers </h2>
                <p className="opacity-70">
                  Find people with different perspectives than yours
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (<div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"/>
          </div>) : recommendedUsers.length === 0 ? (
                    <div className="card bg-base-200 p-6 text-center">
                      <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
                      <p className="text-base-content opacity-70">
                        Check back later for new thinkers!
                      </p>
                    </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {

                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div key={user._id} className="card bg-base-200 hover:shadow-lg transition-all duration-300">
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                      <div className="avatar size-16 rounded-full">
                        <img src={user.profilePic} alt={user.fullName} />
                      </div>
                        <h3 className="font-semibold text-lg">{user.fullName}</h3>
                        {user.location && (
                          <div className="flex items-center text-xs opacity-70 mt-1">
                            <EarthIcon className="size-3 mr-1" />
                            {user.location}
                          </div>
                        )}
                    </div>

                  </div>
                  <div className="flex flex-wrap gap-1.5">
                <span className="badge badge-secondary">
                  Beliefs/Philosophy: {capitalize(user.yourBeliefsPhilosophy)}
                </span>
                <span className="badge badge-outline">
                  Curious About: {capitalize(user.curiousAbout)}
                </span>
              </div>
              {user.bio && <p className="text-sm opacity-70"> {user.bio}</p>}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Message Button */}
                <Link 
                  to={`/chat/${user._id}`} 
                  className="btn btn-outline flex-1"
                >
                  <MessageSquareIcon className="size-4 mr-2" />
                  Message
                </Link>

                {/* Friend Request Button */}
                <button 
                  className={`btn flex-1 ${
                    hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                  }`}
                  onClick={() => sendRequestMutation(user._id)}
                  disabled = {hasRequestBeenSent || isPending}
                  >
                    {hasRequestBeenSent ? ( 
                      <>
                        <CheckLineIcon className="size-4 mr-2" />
                        Request Sent
                    </>) : (
                      <>
                        <UserPlusIcon className="size-4 mr-2" />
                        Send Friend Request
                      </>
                    )}
                  </button>
              </div>
            </div>

                )
              })}
            </div>
        ) }

      </section>
    </div>
  </div>
)

};

export default HomePage

