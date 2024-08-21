"use client";
import { useUser } from "@/context/UserContext";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
type User = {
  fullname: string;
  loggedin: boolean;
};
const Header = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center">
      <Link href={"/"}>
        <Image
          className="h-8 w-auto"
          width={100}
          height={100}
          src={"/img/genz.png"}
          alt="LogoImg"
        />
      </Link>
      <div>
        {user?.loggedin ? (
          <Button
            style={{
              fontSize: "16px",
              color: "white",
              border: "1px solid white",
              outline: "none",
            }}
            onClick={handleLogout}
            type="text"
            className="text-9xl"
            title="It will logout you"
          >
            Log Out
          </Button>
        ) : (
          <Link href={"/sign-in"}>
            <Button
              style={{
                fontSize: "16px",
                color: "white",
                border: "1px solid white",
                outline: "none",
              }}
              type="text"
              className="text-9xl"
            >
              Log In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
