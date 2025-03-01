

async function useLoggedIn() {
  const [userResponse, doctorResponse, hospitalResponse] = await Promise.all([
    fetch("/api/userExsists").then((res) => res.json()),
    fetch("/api/userExsists/doctor").then((res) => res.json()),
    fetch("/api/userExsists/hospital").then((res) => res.json()),
  ]);

  let type = "";
  if (userResponse.success) type = "user";
  else if (doctorResponse.success) type = "doctor";
  else if (hospitalResponse.success) type = "hospital";
  if(type === "") return {status: false};
  return {status:true, type };
}

export default useLoggedIn;