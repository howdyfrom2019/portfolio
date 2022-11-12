type envType = "mobile" | "desktop";
const CheckEnv = (): envType => {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? "mobile" : "desktop";
}

export default CheckEnv;