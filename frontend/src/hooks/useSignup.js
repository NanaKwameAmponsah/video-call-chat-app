import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
  //once you create an account this method will run, then cal the mutate function just above, which sends a request 
  // to our endpoint with the signup data we have, if everything goes successfully we'll refetch the onSuccess query
  // the route path will be reevaluated and well be navigated to the homepage
const useSignup = () => {
  const queryClient = useQueryClient();


  const {mutate, isPending, error} = useMutation({
    mutationFn: signup,
    //if everything goes successfully this function will fetch the authenticated user data so we're redirected
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]}),


  });   
  return { isPending, error, signupMutation: mutate};

};

export default useSignup;