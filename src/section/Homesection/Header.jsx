
import useAuthStore from "../Store/useCounterStore";
import NavbarAfterLogin from "./NavbarAfterLogin";
import NavbarBeforeLogin from "./NavbarBeforeLogin";

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <>
      {isLoggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
    </>
  );
}
